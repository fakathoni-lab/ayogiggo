import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import LazyVideo from "@/components/shared/LazyVideo";
import { usePublicProfile, useCreatorSubmissions } from "@/hooks/usePublicProfile";
import {
  MapPin,
  Instagram,
  Music2,
  Youtube,
  Briefcase,
  CheckCircle,
  Mail,
  ExternalLink } from
"lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const PublicProfile = () => {
  const { userId } = useParams<{userId: string;}>();
  const { data: profile, isLoading: profileLoading } = usePublicProfile(userId);
  const { data: submissions = [], isLoading: submissionsLoading } = useCreatorSubmissions(userId);
  const [hireDialogOpen, setHireDialogOpen] = useState(false);

  const handleHireRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Request sent! The creator will be notified.");
    setHireDialogOpen(false);
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header Skeleton */}
        <div className="bg-gradient-to-br from-primary/20 via-background to-background border-b border-border">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <Skeleton className="w-32 h-32 rounded-2xl" />
              <div className="flex-1 space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-96" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
        {/* Content Skeleton */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) =>
            <Skeleton key={i} className="h-64 rounded-2xl" />
            )}
          </div>
        </div>
      </div>);

  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
          <p className="text-muted-foreground">This creator profile doesn't exist.</p>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/20 via-background to-background border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row gap-8 items-start">

            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative">

              <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                <img
                  src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.user_name}`}
                  alt={profile.user_name}
                  className="w-full h-full object-cover" />

              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-success rounded-full border-4 border-background flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            {/* Profile Info */}
            <div className="flex-1">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                {profile.user_name}
              </h1>
              <p className="text-lg text-primary mb-4">{profile.portfolio_headline || "Creative Professional"}</p>

              {profile.bio &&
              <p className="text-muted-foreground mb-6 max-w-2xl">{profile.bio}</p>
              }

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                {profile.location &&
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </span>
                }
                {profile.rate_per_video > 0 &&
                <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Briefcase className="w-4 h-4" />
                    {formatCurrency(profile.rate_per_video)}/video
                  </span>
                }
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success" />
                  {submissions.length} projects completed
                </span>
              </div>

              {/* Skills */}
              {profile.skills &&
              <div className="flex flex-wrap gap-2 mb-6">
                  {profile.skills.split(",").map((skill: string, idx: number) =>
                <Badge key={idx} variant="secondary">
                      {skill.trim()}
                    </Badge>
                )}
                </div>
              }

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 mb-6">
                {profile.social_instagram &&
                <a
                  href={`https://instagram.com/${profile.social_instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary transition-colors">

                    <Instagram className="w-4 h-4" />
                    <span className="text-sm">@{profile.social_instagram}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                }
                {profile.social_tiktok &&
                <a
                  href={`https://tiktok.com/@${profile.social_tiktok}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary transition-colors">

                    <Music2 className="w-4 h-4" />
                    <span className="text-sm">@{profile.social_tiktok}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                }
                {profile.social_youtube &&
                <a
                  href={profile.social_youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary transition-colors">

                    <Youtube className="w-4 h-4" />
                    <span className="text-sm">YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                }
              </div>

              {/* CTA Button */}
              <Button variant="hero" size="lg" onClick={() => setHireDialogOpen(true)}>
                <Mail className="w-4 h-4" />
                Hire Me
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
          Portfolio
        </h2>

        {submissionsLoading ?
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) =>
          <Skeleton key={i} className="h-64 rounded-2xl" />
          )}
          </div> :
        submissions.length === 0 ?
        <div className="text-center py-16">
            <p className="text-muted-foreground">No portfolio items yet.</p>
          </div> :

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {submissions.map((submission: any, index: number) =>
          <motion.div
            key={submission.ID}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300">

                <LazyVideo
              src={submission.video_url}
              thumbnail={submission.thumbnail_url}
              alt={submission.caption || "Portfolio item"}
              className="w-full aspect-video object-cover" />

                {submission.caption &&
            <div className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{submission.caption}</p>
                  </div>
            }
              </motion.div>
          )}
          </motion.div>
        }
      </div>

      {/* Hire Dialog */}
      <Dialog open={hireDialogOpen} onOpenChange={setHireDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact {profile.user_name}</DialogTitle>
            <DialogDescription>
              Send a message to discuss your project requirements.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleHireRequest} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell them about your project..."
                rows={5}
                required />

            </div>
            <Button type="submit" variant="hero" className="w-full">
              Send Message
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>);

};

export default PublicProfile;