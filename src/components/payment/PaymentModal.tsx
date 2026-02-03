import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, AlertCircle, Loader2, Sparkles, Shield } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    id: string;
    title: string;
    budget: number;
  };
  onSuccess: () => void;
}

const PLATFORM_FEE_PERCENT = 10;

export const PaymentModal = ({ isOpen, onClose, campaign, onSuccess }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const creatorFee = campaign.budget;
  const platformFee = campaign.budget * PLATFORM_FEE_PERCENT / 100;
  const totalAmount = creatorFee + platformFee;

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Get the current user session
      const { data: { session }, error: authError } = await supabase.auth.getSession();

      if (authError || !session) {
        toast.error("Please sign in to continue");
        setIsProcessing(false);
        return;
      }

      // Construct success and cancel URLs
      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/payment/status?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${baseUrl}/dashboard/brand`;

      // Call the Edge Function to create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          campaign_id: campaign.id,
          amount: totalAmount,
          currency: 'usd',
          success_url: successUrl,
          cancel_url: cancelUrl
        }
      });

      if (error) {
        console.error('Checkout session creation error:', error);
        toast.error("Failed to create payment session. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }

    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error("An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-2xl">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>

              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            Activate Your Gig
          </DialogTitle>
          <DialogDescription>
            Review the payment details and activate your campaign
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Campaign Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-primary/20 shadow-lg">

            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {campaign.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{campaign.title}</h3>
                    <p className="text-xs text-muted-foreground">Campaign Launch Payment</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4 bg-border/50" />

            {/* Fee Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Creator Prize Pool</span>
                <span className="font-mono font-semibold text-foreground">
                  ${creatorFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  Platform Fee
                  <span className="text-xs text-primary">({PLATFORM_FEE_PERCENT}%)</span>
                </span>
                <span className="font-mono font-semibold text-foreground">
                  ${platformFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <Separator className="bg-primary/20" />

              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total Payment</span>
                <motion.span
                  className="font-display text-2xl font-bold gradient-text"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}>

                  ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/5 rounded-xl p-4 border border-primary/20">

            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Secure Escrow Payment</p>
                <p className="text-xs text-muted-foreground">
                  Funds are held securely in escrow until winners are selected.
                  Powered by Stripe with bank-grade security.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Warning */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">

            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Important</p>
                <p className="text-xs text-muted-foreground">
                  Once payment is completed, your campaign will be immediately activated and visible to all creators.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1">

              Cancel
            </Button>
            <Button
              variant="hero"
              onClick={handlePayment}
              disabled={isProcessing}
              className="flex-1 relative overflow-hidden group">

              <AnimatePresence mode="wait">
                {isProcessing ?
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2">

                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </motion.span> :

                <motion.span
                  key="pay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2">

                    <Lock className="w-4 h-4" />
                    Pay & Activate
                    <CreditCard className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                }
              </AnimatePresence>
            </Button>
          </div>

          {/* Stripe Badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" />
            <span>Secured by Stripe</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>);

};