import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import ConfettiCelebration from "@/components/shared/ConfettiCelebration";

type PaymentStatus = "processing" | "success" | "error";

interface CampaignData {
  id: string;
  title: string;
  status: string;
}

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<PaymentStatus>("processing");
  const [campaignData, setCampaignData] = useState<CampaignData | null>(null);
  const [error, setError] = useState<string>("");
  const [showConfetti, setShowConfetti] = useState(false);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setError("Invalid payment session");
      return;
    }

    let pollInterval: NodeJS.Timeout;
    let pollCount = 0;
    const MAX_POLLS = 60; // Poll for up to 60 seconds (60 * 1 second)

    const pollCampaignStatus = async () => {
      try {
        // Get user session
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          setStatus("error");
          setError("Authentication failed. Please sign in.");
          clearInterval(pollInterval);
          return;
        }

        // Query campaigns owned by this user that were recently activated
        const { data: campaigns, error: campaignError } = await supabase
          .from("campaigns")
          .select("id, title, status")
          .eq("brand_id", user.id)
          .eq("status", "live")
          .order("updated_at", { ascending: false })
          .limit(1);

        if (campaignError) {
          console.error("Campaign query error:", campaignError);
          pollCount++;

          if (pollCount >= MAX_POLLS) {
            setStatus("error");
            setError("Unable to verify payment. Please check your dashboard.");
            clearInterval(pollInterval);
          }
          return;
        }

        // Check if we found an activated campaign
        if (campaigns && campaigns.length > 0) {
          setCampaignData(campaigns[0]);
          setStatus("success");
          setShowConfetti(true);
          clearInterval(pollInterval);
        } else {
          pollCount++;

          if (pollCount >= MAX_POLLS) {
            setStatus("error");
            setError("Payment verification timed out. Please contact support if your campaign is not activated.");
            clearInterval(pollInterval);
          }
        }
      } catch (error) {
        console.error("Polling error:", error);
        pollCount++;

        if (pollCount >= MAX_POLLS) {
          setStatus("error");
          setError("An unexpected error occurred. Please check your dashboard.");
          clearInterval(pollInterval);
        }
      }
    };

    // Initial check
    pollCampaignStatus();

    // Poll every 1 second
    pollInterval = setInterval(pollCampaignStatus, 1000);

    // Cleanup on unmount
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [sessionId]);

  // Alternative: Listen to Realtime changes (if you have Realtime enabled)
  useEffect(() => {
    if (status !== "processing") return;

    const channel = supabase
      .channel("campaign-status-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "campaigns",
          filter: `status=eq.live`,
        },
        (payload) => {
          console.log("Realtime campaign update:", payload);
          const updatedCampaign = payload.new as CampaignData;

          if (updatedCampaign.status === "live") {
            setCampaignData(updatedCampaign);
            setStatus("success");
            setShowConfetti(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      {showConfetti && <ConfettiCelebration />}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="relative overflow-hidden border-primary/20 bg-card/50 backdrop-blur-xl">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-pulse" />

          <div className="relative p-8 sm:p-12">
            {status === "processing" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                {/* Processing Animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-20 h-20 mx-auto gradient-primary rounded-2xl flex items-center justify-center"
                >
                  <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
                </motion.div>

                <div className="space-y-2">
                  <h1 className="font-display text-3xl font-bold gradient-text">
                    Processing Your Payment
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Please wait while we activate your campaign...
                  </p>
                </div>

                {/* Processing steps */}
                <div className="space-y-3 max-w-md mx-auto text-left">
                  {[
                    "Verifying payment with Stripe",
                    "Crediting escrow account",
                    "Activating your campaign",
                  ].map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.3 }}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      {step}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {status === "success" && campaignData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="w-20 h-20 mx-auto bg-success/20 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-success" />
                </motion.div>

                <div className="space-y-2">
                  <h1 className="font-display text-3xl font-bold gradient-text">
                    Campaign Activated!
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Your campaign is now live and visible to creators
                  </p>
                </div>

                {/* Campaign Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-primary/5 rounded-2xl p-6 border border-primary/20"
                >
                  <div className="flex items-center gap-3 justify-center">
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl">
                      {campaignData.title.charAt(0)}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground text-lg">
                        {campaignData.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-success/10 text-success font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        Live Now
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/campaigns/${campaignData.id}`)}
                    className="gap-2"
                  >
                    View Campaign
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="hero"
                    onClick={() => navigate("/dashboard/brand")}
                    className="gap-2"
                  >
                    Go to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6"
              >
                {/* Error Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="w-20 h-20 mx-auto bg-destructive/20 rounded-full flex items-center justify-center"
                >
                  <XCircle className="w-12 h-12 text-destructive" />
                </motion.div>

                <div className="space-y-2">
                  <h1 className="font-display text-3xl font-bold text-foreground">
                    Payment Verification Issue
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    {error || "We encountered an issue verifying your payment"}
                  </p>
                </div>

                {/* Error Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-yellow-500/10 rounded-2xl p-6 border border-yellow-500/20"
                >
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className="text-left space-y-1">
                      <p className="text-sm font-medium text-foreground">What to do next</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Check your dashboard to see if the campaign was activated</li>
                        <li>• If payment was processed, you'll receive a confirmation email</li>
                        <li>• Contact support if the issue persists</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/dashboard/brand")}
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    variant="hero"
                    onClick={() => window.location.href = "mailto:support@giggo.com"}
                  >
                    Contact Support
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </Card>

        {/* Session ID for debugging */}
        {sessionId && (
          <p className="text-center text-xs text-muted-foreground mt-4">
            Session ID: {sessionId.slice(0, 20)}...
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentStatus;
