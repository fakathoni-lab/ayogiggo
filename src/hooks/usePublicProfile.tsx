import { useQuery } from "@tanstack/react-query";

const CREATOR_PROFILES_TABLE_ID = 74435;
const SUBMISSIONS_TABLE_ID = 74434;
const USERS_TABLE_ID = 74428;

export interface PublicProfile {
  ID: number;
  user_id: number;
  user_name: string;
  user_email: string;
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

// Fetch public profile data
export const usePublicProfile = (userId?: string) => {
  return useQuery({
    queryKey: ["public-profile", userId],
    queryFn: async (): Promise<PublicProfile | null> => {
      if (!userId) return null;

      try {
        // Fetch user info
        const { data: userData, error: userError } = await window.ezsite.apis.tablePage(
          USERS_TABLE_ID,
          {
            PageNo: 1,
            PageSize: 1,
            Filters: [{ name: "ID", op: "Equal", value: userId }]
          }
        );

        if (userError || !userData?.List?.[0]) throw new Error("User not found");

        const user = userData.List[0];

        // Fetch creator profile
        const { data: profileData, error: profileError } = await window.ezsite.apis.tablePage(
          CREATOR_PROFILES_TABLE_ID,
          {
            PageNo: 1,
            PageSize: 1,
            Filters: [{ name: "user_id", op: "Equal", value: userId }]
          }
        );

        if (profileError) throw new Error(profileError);

        const profile = profileData?.List?.[0] || {};

        return {
          ID: profile.ID || 0,
          user_id: user.ID,
          user_name: user.name || "Creator",
          user_email: user.email,
          bio: profile.bio || "",
          skills: profile.skills || "",
          rate_per_video: Number(profile.rate_per_video) || 0,
          avatar_url: profile.avatar_url || "",
          portfolio_headline: profile.portfolio_headline || "",
          location: profile.location || "",
          social_instagram: profile.social_instagram || "",
          social_tiktok: profile.social_tiktok || "",
          social_youtube: profile.social_youtube || ""
        };
      } catch (error) {
        console.error("Public profile fetch error:", error);
        return null;
      }
    },
    enabled: !!userId,
    staleTime: 300000 // 5 minutes
  });
};

// Fetch creator's approved submissions for portfolio
export const useCreatorSubmissions = (userId?: string) => {
  return useQuery({
    queryKey: ["creator-submissions", userId],
    queryFn: async () => {
      if (!userId) return [];

      try {
        const { data, error } = await window.ezsite.apis.tablePage(
          SUBMISSIONS_TABLE_ID,
          {
            PageNo: 1,
            PageSize: 50,
            OrderByField: "created_at",
            IsAsc: false,
            Filters: [
            { name: "creator_id", op: "Equal", value: userId },
            { name: "status", op: "Equal", value: "approved" }]

          }
        );

        if (error) throw new Error(error);

        return data?.List || [];
      } catch (error) {
        console.error("Submissions fetch error:", error);
        return [];
      }
    },
    enabled: !!userId,
    staleTime: 60000 // 1 minute
  });
};