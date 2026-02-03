import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreatorProfile, useUpdateCreatorProfile } from "@/hooks/useCreatorProfile";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Compass,
  Video,
  Trophy,
  Wallet,
  Settings,
  TrendingUp,
  User,
  Briefcase,
  Globe,
  Upload
} from "lucide-react";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/creator" },
  { id: "discover", icon: Compass, label: "Discover Gigs" },
  { id: "entries", icon: Video, label: "My Entries" },
  { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
  { id: "wallet", icon: Wallet, label: "My Wallet", path: "/dashboard/creator/wallet" },
  { id: "analytics", icon: TrendingUp, label: "Analytics", path: "/dashboard/creator/analytics" },
  { id: "settings", icon: Settings, label: "Settings", path: "/dashboard/creator/settings" }
];

// Zod validation schema
const profileSchema = z.object({
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  skills: z.string().max(200, "Skills must be less than 200 characters").optional(),
  rate_per_video: z.number().min(0, "Rate must be positive").max(100000000, "Rate is too high"),
  portfolio_headline: z.string().max(100, "Headline must be less than 100 characters").optional(),
  location: z.string().max(100, "Location must be less than 100 characters").optional(),
  social_instagram: z.string().max(50, "Username too long").optional(),
  social_tiktok: z.string().max(50, "Username too long").optional(),
  social_youtube: z.string().url("Must be a valid URL").optional().or(z.literal(""))
});

type ProfileFormData = z.infer<typeof profileSchema>;

const CreatorSettings = () => {
  const [activeTab, setActiveTab] = useState("settings");
  const { data: profile, isLoading } = useCreatorProfile();
  const updateProfile = useUpdateCreatorProfile();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile || {}
  });

  // Update form when profile loads
  useState(() => {
    if (profile) {
      Object.keys(profile).forEach((key) => {
        setValue(key as keyof ProfileFormData, profile[key as keyof typeof profile]);
      });
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile.mutateAsync(data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted flex">
        <DashboardSidebar
          variant="creator"
          navItems={navItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userName="Creator"
          userInitial="C"
        />
        <main className="flex-1 overflow-auto p-8">
          <Skeleton className="h-12 w-64 mb-8" />
          <Skeleton className="h-96 w-full" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted flex">
      <DashboardSidebar
        variant="creator"
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="Creator"
        userInitial="C"
      />

      <main className="flex-1 overflow-auto">
        <DashboardHeader
          title="Profile Settings ⚙️"
          subtitle="Manage your professional profile and rates"
        />

        <div className="p-4 md:p-8 max-w-4xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  This information will be displayed on your public portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="portfolio_headline">Portfolio Headline</Label>
                  <Input
                    id="portfolio_headline"
                    placeholder="e.g., Creative Video Producer & Content Strategist"
                    {...register("portfolio_headline")}
                  />
                  {errors.portfolio_headline && (
                    <p className="text-sm text-destructive">{errors.portfolio_headline.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell brands about yourself, your experience, and what makes you unique..."
                    rows={5}
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className="text-sm text-destructive">{errors.bio.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Jakarta, Indonesia"
                    {...register("location")}
                  />
                  {errors.location && (
                    <p className="text-sm text-destructive">{errors.location.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills & Rates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Skills & Rates
                </CardTitle>
                <CardDescription>
                  Help brands find you and understand your pricing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills (comma-separated)</Label>
                  <Input
                    id="skills"
                    placeholder="e.g., Video Editing, Content Strategy, UGC, Product Reviews"
                    {...register("skills")}
                  />
                  {errors.skills && (
                    <p className="text-sm text-destructive">{errors.skills.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Separate skills with commas. These will be shown as tags on your profile.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate_per_video">Rate Per Video (IDR)</Label>
                  <Input
                    id="rate_per_video"
                    type="number"
                    placeholder="e.g., 1000000"
                    {...register("rate_per_video", { valueAsNumber: true })}
                  />
                  {errors.rate_per_video && (
                    <p className="text-sm text-destructive">{errors.rate_per_video.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Your standard rate for a single video production. This helps brands budget their campaigns.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Social Media Links
                </CardTitle>
                <CardDescription>
                  Connect your social profiles to build credibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="social_instagram">Instagram Username</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">@</span>
                    <Input
                      id="social_instagram"
                      placeholder="username"
                      {...register("social_instagram")}
                    />
                  </div>
                  {errors.social_instagram && (
                    <p className="text-sm text-destructive">{errors.social_instagram.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="social_tiktok">TikTok Username</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">@</span>
                    <Input
                      id="social_tiktok"
                      placeholder="username"
                      {...register("social_tiktok")}
                    />
                  </div>
                  {errors.social_tiktok && (
                    <p className="text-sm text-destructive">{errors.social_tiktok.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="social_youtube">YouTube Channel URL</Label>
                  <Input
                    id="social_youtube"
                    type="url"
                    placeholder="https://youtube.com/@channel"
                    {...register("social_youtube")}
                  />
                  {errors.social_youtube && (
                    <p className="text-sm text-destructive">{errors.social_youtube.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                variant="hero"
                disabled={!isDirty || updateProfile.isPending}
              >
                {updateProfile.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatorSettings;
