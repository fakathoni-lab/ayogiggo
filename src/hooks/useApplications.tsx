import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/db/client";
import { TABLES } from "@/lib/db/schema";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

type ApplicationStatus = "applied" | "hired" | "rejected" | "completed";
type ShippingStatus = "pending" | "shipped" | "delivered";

export interface Application {
  id: string;
  campaign_id: string;
  creator_id: string;
  status: ApplicationStatus;
  applied_at?: string;
  hired_at?: string | null;
  completed_at?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
  // Joined data
  campaigns?: {
    title: string;
    end_date?: string;
  } | null;
}

// Fetch applications for creators
export const useCreatorApplications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["creator-applications", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data: applications, error } = await db
        .from(TABLES.APPLICATIONS)
        .select("*")
        .eq("creator_id", user.id)
        .order("ID", { ascending: false });

      if (error) {
        console.error("Error fetching creator applications:", error);
        throw new Error(error);
      }

      // Fetch campaign details for each application
      const campaignIds = [...new Set(applications?.map((a: any) => a.campaign_id) || [])];

      if (campaignIds.length === 0) {
        return [];
      }

      // Fetch campaigns
      const campaignsPromises = campaignIds.map((id) =>
        db.from(TABLES.CAMPAIGNS).select("*").eq("ID", id).single()
      );

      const campaignsResults = await Promise.all(campaignsPromises);
      const campaignMap = new Map(
        campaignsResults
          .filter((r) => !r.error && r.data)
          .map((r) => [String(r.data.ID), { title: r.data.title, end_date: r.data.end_date }])
      );

      return (applications || []).map((app: any) => ({
        id: String(app.ID),
        campaign_id: String(app.campaign_id),
        creator_id: app.creator_id,
        status: app.status as ApplicationStatus,
        cover_letter: app.cover_letter,
        portfolio_url: app.portfolio_url,
        created_at: app.CreatedTime,
        campaigns: campaignMap.get(String(app.campaign_id)) || null,
      })) as Application[];
    },
    enabled: !!user?.id,
  });
};

// Create new application
export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({
      campaignId,
      coverLetter,
      portfolioUrl,
    }: {
      campaignId: string;
      coverLetter?: string;
      portfolioUrl?: string;
    }) => {
      if (!user?.id) {
        throw new Error("You must be logged in to apply");
      }

      const applicationData = {
        campaign_id: parseInt(campaignId),
        creator_id: user.id,
        status: "applied",
        cover_letter: coverLetter || null,
        portfolio_url: portfolioUrl || null,
      };

      const { data, error } = await db.insert(TABLES.APPLICATIONS, applicationData);

      if (error) {
        console.error("Error creating application:", error);
        throw new Error(error);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creator-applications", user?.id] });
      toast({
        title: "Application Submitted! 🎉",
        description: "Your application has been sent to the brand.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to apply",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
};

// Fetch applications for brand's campaigns (hired status for shipping)
export const useBrandHiredApplications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["brand-hired-applications", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // First get brand's campaigns
      const { data: campaigns, error: campaignError } = await db
        .from(TABLES.CAMPAIGNS)
        .select("*")
        .eq("brand_id", user.id);

      if (campaignError) {
        console.error("Error fetching brand campaigns:", campaignError);
        return [];
      }

      if (!campaigns || campaigns.length === 0) return [];

      const campaignIds = campaigns.map((c: any) => c.ID);

      // Fetch applications for those campaigns with 'hired' status
      const applicationsPromises = campaignIds.map((id) =>
        db.from(TABLES.APPLICATIONS).select("*").eq("campaign_id", id).eq("status", "hired")
      );

      const applicationsResults = await Promise.all(applicationsPromises);
      const allApplications = applicationsResults.flatMap((r) => (r.error ? [] : r.data || []));

      if (allApplications.length === 0) return [];

      const campaignMap = new Map(campaigns.map((c: any) => [c.ID, { title: c.title }]));

      return allApplications.map((app: any) => ({
        id: String(app.ID),
        campaign_id: String(app.campaign_id),
        creator_id: app.creator_id,
        status: app.status as ApplicationStatus,
        created_at: app.CreatedTime,
        campaigns: campaignMap.get(app.campaign_id) || null,
      })) as Application[];
    },
    enabled: !!user?.id,
  });
};

// Update shipping information (courier and tracking number)
export const useUpdateShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      courierName,
      trackingNumber,
    }: {
      applicationId: string;
      courierName: string;
      trackingNumber: string;
    }) => {
      const { data, error } = await db.update(
        TABLES.APPLICATIONS,
        {
          courier_name: courierName,
          tracking_number: trackingNumber,
          shipping_status: "shipped",
        },
        { ID: parseInt(applicationId) }
      );

      if (error) {
        console.error("Error updating shipping:", error);
        throw new Error(error);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand-hired-applications"] });
      toast({
        title: "Shipping Updated! 📦",
        description: "The shipping information has been saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Could not update shipping information.",
        variant: "destructive",
      });
    },
  });
};

// Update shipping status only
export const useUpdateShippingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      applicationId,
      shippingStatus,
    }: {
      applicationId: string;
      shippingStatus: ShippingStatus;
    }) => {
      const { data, error } = await db.update(
        TABLES.APPLICATIONS,
        {
          shipping_status: shippingStatus,
        },
        { ID: parseInt(applicationId) }
      );

      if (error) {
        console.error("Error updating shipping status:", error);
        throw new Error(error);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand-hired-applications"] });
      toast({
        title: "Status Updated! ✅",
        description: "The shipping status has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update Failed",
        description: error.message || "Could not update shipping status.",
        variant: "destructive",
      });
    },
  });
};
