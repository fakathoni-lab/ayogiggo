import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/db/client";
import { TABLES } from "@/lib/db/schema";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// --- ENUMS & CONSTANTS ---
export enum CampaignType {
  CONTEST = "contest",
  DEAL = "deal",
  ALL = "all",
}

export enum CampaignStatus {
  DRAFT = "draft",
  LIVE = "live",
  JUDGING = "judging",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum SortOption {
  FOR_YOU = "for-you",
  TRENDING = "trending",
  NEW = "new",
  ENDING_SOON = "ending-soon",
}

// Public campaign type - excludes ALL sensitive fields
export interface PublicCampaign {
  id: string;
  title: string;
  description: string;
  cover_image: string | null;
  category: string;
  type: CampaignType;
  status: CampaignStatus;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  // Brand identity
  brand_name: string | null;
  brand_logo: string | null;
}

// Full campaign type - includes sensitive fields (for brand owners only)
export interface Campaign extends PublicCampaign {
  brief: string | null;
  budget: number;
  submission_count: number;
  view_count: number;
  prize_breakdown: {rank: number;amount: number;label: string;}[] | null;
  required_hashtags: string[] | null;
  platform_requirements: string[] | null;
  rules: string[] | null;
  assets: {name: string;type: string;size: string;}[] | null;
  brand_profiles?: {
    company_name: string;
    company_logo: string | null;
  } | null;
}

export interface CampaignFilters {
  search?: string;
  category?: string;
  type?: CampaignType | "all";
  sortBy?: SortOption;
}

// Hook for PUBLIC campaign listings - only shows live campaigns
export const usePublicCampaigns = (filters?: CampaignFilters) => {
  return useQuery({
    queryKey: ["public-campaigns", filters],
    queryFn: async (): Promise<PublicCampaign[]> => {
      let query = db.from(TABLES.CAMPAIGNS).select("*");

      // Only show live campaigns to public
      query = query.eq("status", "live");

      // Filter: Category
      if (filters?.category && filters.category !== "all") {
        query = query.eq("category", filters.category);
      }

      // Filter: Type
      if (filters?.type && filters.type !== CampaignType.ALL) {
        query = query.eq("type", filters.type);
      }

      // Filter: Search
      if (filters?.search && filters.search.trim()) {
        const searchTerm = filters.search.trim();
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // Apply sorting
      switch (filters?.sortBy) {
        case SortOption.ENDING_SOON:
          query = query.order("end_date", { ascending: true });
          break;
        case SortOption.NEW:
        case SortOption.FOR_YOU:
        case SortOption.TRENDING:
        default:
          query = query.order("ID", { ascending: false });
          break;
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching public campaigns:", error);
        throw new Error(error);
      }

      return (data || []).map(campaign => ({
        ...campaign,
        id: String(campaign.ID),
        type: campaign.type as CampaignType,
        status: campaign.status as CampaignStatus,
        brand_name: campaign.company_name || "Brand",
        brand_logo: campaign.company_logo || null,
      })) as PublicCampaign[];
    }
  });
};

// Hook for BRAND OWNER campaigns - uses full table
export const useBrandCampaigns = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["brand-campaigns", user?.id],
    queryFn: async (): Promise<Campaign[]> => {
      if (!user?.id) {
        return [];
      }

      const { data, error } = await db.
      from(TABLES.CAMPAIGNS).
      select("*").
      eq("brand_id", user.id).
      order("ID", { ascending: false });

      if (error) {
        console.error("Error fetching brand campaigns:", error);
        throw new Error(error);
      }

      return (data || []).map((campaign) => ({
        ...campaign,
        id: String(campaign.ID),
        type: campaign.type as CampaignType,
        status: campaign.status as CampaignStatus,
        brand_name: null,
        brand_logo: null,
        prize_breakdown: campaign.prize_breakdown ? JSON.parse(campaign.prize_breakdown) : null,
        required_hashtags: campaign.required_hashtags ? campaign.required_hashtags.split(',') : null,
        platform_requirements: campaign.platform_requirements ? campaign.platform_requirements.split(',') : null,
        rules: campaign.rules ? [campaign.rules] : null,
      })) as Campaign[];
    },
    enabled: !!user?.id
  });
};

// Hook for PUBLIC single campaign view
export const usePublicCampaign = (id: string | undefined) => {
  return useQuery({
    queryKey: ["public-campaign", id],
    queryFn: async (): Promise<PublicCampaign | null> => {
      if (!id) return null;

      const { data, error } = await db.
      from(TABLES.CAMPAIGNS).
      select("*").
      eq("ID", id).
      eq("status", "live").
      maybeSingle();

      if (error) {
        console.error("Error fetching public campaign:", error);
        throw new Error(error);
      }

      if (!data) return null;

      return {
        ...data,
        id: String(data.ID),
        type: data.type as CampaignType,
        status: data.status as CampaignStatus,
        brand_name: data.company_name || "Brand",
        brand_logo: data.company_logo || null,
      } as PublicCampaign;
    },
    enabled: !!id
  });
};

// Hook for BRAND OWNER single campaign
export const useBrandCampaign = (id: string | undefined) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["brand-campaign", id],
    queryFn: async (): Promise<Campaign | null> => {
      if (!id || !user?.id) return null;

      const { data, error } = await db.
      from(TABLES.CAMPAIGNS).
      select("*").
      eq("ID", id).
      eq("brand_id", user.id).
      maybeSingle();

      if (error) {
        console.error("Error fetching brand campaign:", error);
        throw new Error(error);
      }

      if (!data) return null;

      return {
        ...data,
        id: String(data.ID),
        type: data.type as CampaignType,
        status: data.status as CampaignStatus,
        brand_name: null,
        brand_logo: null,
        prize_breakdown: data.prize_breakdown ? JSON.parse(data.prize_breakdown) : null,
        required_hashtags: data.required_hashtags ? data.required_hashtags.split(',') : null,
        platform_requirements: data.platform_requirements ? data.platform_requirements.split(',') : null,
        rules: data.rules ? [data.rules] : null,
      } as Campaign;
    },
    enabled: !!(id && user?.id)
  });
};

// Type for creating a new campaign
export interface CreateCampaignInput {
  title: string;
  description: string;
  brief?: string;
  category: string;
  type: CampaignType;
  budget: number;
  prize_breakdown?: {rank: number;amount: number;label: string;}[];
  start_date: string;
  end_date: string;
  required_hashtags?: string[];
  platform_requirements?: string[];
  rules?: string[];
  cover_image?: string;
  status?: CampaignStatus;
}

// Hook to CREATE a new campaign
export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (input: CreateCampaignInput): Promise<Campaign> => {
      if (!user?.id) {
        throw new Error("You must be logged in to create a campaign");
      }

      const campaignData = {
        brand_id: user.id,
        title: input.title,
        description: input.description,
        brief: input.brief || null,
        category: input.category,
        type: input.type,
        budget: input.budget,
        prize_breakdown: input.prize_breakdown ? JSON.stringify(input.prize_breakdown) : null,
        start_date: input.start_date,
        end_date: input.end_date,
        required_hashtags: input.required_hashtags?.join(',') || null,
        platform_requirements: input.platform_requirements?.join(',') || null,
        rules: input.rules?.join('\n') || null,
        cover_image: input.cover_image || null,
        status: input.status || CampaignStatus.DRAFT,
        submission_count: 0,
        view_count: 0,
      };

      const { data, error } = await db.insert(TABLES.CAMPAIGNS, campaignData);

      if (error) {
        console.error("Error creating campaign:", error);
        throw new Error(error);
      }

      return {
        ...data,
        id: String(data.ID),
        type: data.type as CampaignType,
        status: data.status as CampaignStatus,
        brand_name: null,
        brand_logo: null,
        prize_breakdown: data.prize_breakdown ? JSON.parse(data.prize_breakdown) : null,
        required_hashtags: data.required_hashtags ? data.required_hashtags.split(',') : null,
        platform_requirements: data.platform_requirements ? data.platform_requirements.split(',') : null,
        rules: data.rules ? [data.rules] : null,
      } as Campaign;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand-campaigns"] });
      toast({
        title: "Gig Created! 🎉",
        description: "Your gig has been saved. Complete payment to activate."
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create gig",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  });
};