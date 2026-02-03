import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const CREATOR_PROFILES_TABLE_ID = 74435;

export interface CreatorProfile {
  ID?: number;
  user_id: number;
  bio: string;
  skills: string;
  rate_per_video: number;
  avatar_url: string;
  portfolio_headline: string;
  location: string;
  social_instagram: string;
  social_tiktok: string;
  social_youtube: string;
}

// Fetch creator's own profile
export const useCreatorProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["creator-profile", user?.ID],
    queryFn: async (): Promise<CreatorProfile | null> => {
      if (!user) throw new Error("Not authenticated");

      try {
        const { data, error } = await window.ezsite.apis.tablePage(
          CREATOR_PROFILES_TABLE_ID,
          {
            PageNo: 1,
            PageSize: 1,
            Filters: [{ name: "user_id", op: "Equal", value: String(user.ID) }]
          }
        );

        if (error) throw new Error(error);

        const profile = data?.List?.[0];

        // Return existing profile or default values
        return profile ?
        {
          ID: profile.ID,
          user_id: user.ID,
          bio: profile.bio || "",
          skills: profile.skills || "",
          rate_per_video: Number(profile.rate_per_video) || 0,
          avatar_url: profile.avatar_url || "",
          portfolio_headline: profile.portfolio_headline || "",
          location: profile.location || "",
          social_instagram: profile.social_instagram || "",
          social_tiktok: profile.social_tiktok || "",
          social_youtube: profile.social_youtube || ""
        } :
        {
          user_id: user.ID,
          bio: "",
          skills: "",
          rate_per_video: 0,
          avatar_url: "",
          portfolio_headline: "",
          location: "",
          social_instagram: "",
          social_tiktok: "",
          social_youtube: ""
        };
      } catch (error) {
        console.error("Profile fetch error:", error);
        return null;
      }
    },
    enabled: !!user,
    staleTime: 60000 // 1 minute
  });
};

// Update creator profile
export const useUpdateCreatorProfile = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (profileData: Partial<CreatorProfile>) => {
      if (!user) throw new Error("Not authenticated");

      try {
        // Check if profile exists
        const { data: existingData } = await window.ezsite.apis.tablePage(
          CREATOR_PROFILES_TABLE_ID,
          {
            PageNo: 1,
            PageSize: 1,
            Filters: [{ name: "user_id", op: "Equal", value: String(user.ID) }]
          }
        );

        const existingProfile = existingData?.List?.[0];

        if (existingProfile) {
          // Update existing profile
          const { error } = await window.ezsite.apis.tableUpdate(
            CREATOR_PROFILES_TABLE_ID,
            {
              ID: existingProfile.ID,
              ...profileData,
              updated_at: new Date().toISOString()
            }
          );

          if (error) throw new Error(error);
        } else {
          // Create new profile
          const { error } = await window.ezsite.apis.tableCreate(
            CREATOR_PROFILES_TABLE_ID,
            {
              user_id: user.ID,
              ...profileData,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          );

          if (error) throw new Error(error);
        }

        return { success: true };
      } catch (error: any) {
        throw new Error(error.message || "Failed to update profile");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["creator-profile", user?.ID] });
      toast.success("Profile updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update profile");
    }
  });
};