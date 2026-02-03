import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Zap,
  Users,
  DollarSign,
  ChevronRight,
  Calendar,
  Loader2,
} from "lucide-react";
import { CampaignWizardProvider, useCampaignWizard } from "@/contexts/CampaignWizardContext";
import { StepProductDetails } from "@/components/campaigns/wizard/StepProductDetails";
import { StepSmartBrief } from "@/components/campaigns/wizard/StepSmartBrief";
import { StepAIScript } from "@/components/campaigns/wizard/StepAIScript";
import { budgetTimelineSchema } from "@/lib/campaign-wizard-schema";
import { useToast } from "@/hooks/use-toast";
import { PaymentModal } from "@/components/payment/PaymentModal";

const CreateCampaignContent = () => {
  const {
    currentStep,
    setCurrentStep,
    campaignType,
    setCampaignType,
    productDetails,
    smartBrief,
    script,
    budgetTimeline,
    setBudgetTimeline,
    resetWizard,
  } = useCampaignWizard();

  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [creating, setCreating] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [createdCampaign, setCreatedCampaign] = useState<any>(null);

  const handleBudgetContinue = () => {
    const result = budgetTimelineSchema.safeParse({
      budget: parseFloat(budgetTimeline.budget.toString()) || 0,
      prizeBreakdown: budgetTimeline.prizeBreakdown,
      startDate: budgetTimeline.startDate,
      endDate: budgetTimeline.endDate,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setErrors({});
    setCurrentStep(6); // Review
  };

  const handleCreateCampaign = async () => {
    if (!campaignType) return;

    setCreating(true);

    try {
      // Prepare brief structure
      const briefStructure = {
        hook_style: smartBrief.hookStyle,
        key_benefits: smartBrief.keyBenefits,
        must_mention: smartBrief.mustMention,
        avoid: smartBrief.avoid,
        cta: smartBrief.cta,
      };

      // Parse prize breakdown for contests
      let prizeBreakdownParsed: { rank: number; amount: number; label: string }[] = [];
      if (campaignType === "contest" && budgetTimeline.prizeBreakdown) {
        const parts = budgetTimeline.prizeBreakdown.split(",").map((p) => p.trim());
        prizeBreakdownParsed = parts
          .map((part, idx) => {
            const match = part.match(/\$?(\d+)/);
            const amount = match ? parseInt(match[1]) : 0;
            return {
              rank: idx + 1,
              amount,
              label: `${idx + 1}${idx === 0 ? "st" : idx === 1 ? "nd" : idx === 2 ? "rd" : "th"} Place`,
            };
          })
          .filter((p) => p.amount > 0);
      }

      // Use EZSite Database API to create campaign
      const campaignData = {
        brand_id: 0, // Will be set by server from auth
        title: productDetails.title,
        description: `${productDetails.title} - ${productDetails.category}`,
        category: productDetails.category,
        type: campaignType,
        status: "draft",
        product_url: productDetails.productUrl || "",
        product_image: productDetails.productImage || "",
        brief_structure: JSON.stringify(briefStructure),
        suggested_script: script.selectedScript,
        script_tone: smartBrief.tone,
        budget: parseFloat(budgetTimeline.budget.toString()),
        prize_breakdown: prizeBreakdownParsed.length > 0 ? JSON.stringify(prizeBreakdownParsed) : "",
        start_date: budgetTimeline.startDate,
        end_date: budgetTimeline.endDate,
        submission_count: 0,
        view_count: 0,
      };

      // Call EZSite Database Insert API
      const response = await window.ezsite.apis.insertToTable({
        tableName: "campaigns",
        records: [campaignData],
      });

      if (response.error) {
        throw new Error(response.error);
      }

      toast({
        title: "Campaign Created! 🎉",
        description: "Your campaign is ready. Complete payment to activate.",
      });

      // Mock created campaign for payment modal
      setCreatedCampaign({
        id: response.data?.[0]?.id || Math.random().toString(),
        ...campaignData,
      });
      setShowPaymentModal(true);
    } catch (error: any) {
      toast({
        title: "Failed to create campaign",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  const stepLabels = [
    { num: 1, label: "Type" },
    { num: 2, label: "Product" },
    { num: 3, label: "Brief" },
    { num: 4, label: "Script" },
    { num: 5, label: "Budget" },
    { num: 6, label: "Review" },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard/brand"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-foreground">Create Campaign</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {stepLabels.map((step, idx) => (
              <div key={step.num} className="flex items-center gap-2">
                <span
                  className={
                    currentStep >= step.num ? "text-primary font-medium" : ""
                  }
                >
                  {step.label}
                </span>
                {idx < stepLabels.length - 1 && <ChevronRight className="w-4 h-4" />}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Campaign Type */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  What type of campaign?
                </h1>
                <p className="text-muted-foreground">
                  Choose how you want to collaborate with creators
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => setCampaignType("contest")}
                  className={`text-left p-6 rounded-2xl border-2 transition-all ${
                    campaignType === "contest"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <Users className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Challenge
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Run a competition with multiple winners and performance-based payouts.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Multiple winners possible</li>
                    <li>• Scoring based on engagement</li>
                    <li>• Great for brand awareness</li>
                  </ul>
                </button>
                <button
                  onClick={() => setCampaignType("deal")}
                  className={`text-left p-6 rounded-2xl border-2 transition-all ${
                    campaignType === "deal"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-4">
                    <DollarSign className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Collab
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Offer fixed-price collaborations and select specific creators.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Select specific creators</li>
                    <li>• Fixed payout per creator</li>
                    <li>• More control over output</li>
                  </ul>
                </button>
              </div>
              <div className="flex justify-end mt-8">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setCurrentStep(2)}
                  disabled={!campaignType}
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Product Details */}
          {currentStep === 2 && <StepProductDetails key="step-2" />}

          {/* Step 3: Smart Brief */}
          {currentStep === 3 && <StepSmartBrief key="step-3" />}

          {/* Step 4: AI Script */}
          {currentStep === 4 && <StepAIScript key="step-4" />}

          {/* Step 5: Budget & Timeline */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  Budget & Timeline
                </h1>
                <p className="text-muted-foreground">Set your budget and campaign dates</p>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                <div>
                  <Label htmlFor="budget">Total Budget (USD) *</Label>
                  <div className="relative mt-1.5">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="budget"
                      type="number"
                      placeholder="5000"
                      className="pl-10"
                      value={budgetTimeline.budget || ""}
                      onChange={(e) =>
                        setBudgetTimeline({
                          ...budgetTimeline,
                          budget: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  {errors.budget && (
                    <p className="text-destructive text-sm mt-1">{errors.budget}</p>
                  )}
                </div>

                {campaignType === "contest" && (
                  <div>
                    <Label htmlFor="prizeBreakdown">Prize Breakdown</Label>
                    <Textarea
                      id="prizeBreakdown"
                      placeholder="e.g., 1st: $2500, 2nd: $1500, 3rd: $1000"
                      className="mt-1.5"
                      rows={3}
                      value={budgetTimeline.prizeBreakdown}
                      onChange={(e) =>
                        setBudgetTimeline({
                          ...budgetTimeline,
                          prizeBreakdown: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <div className="relative mt-1.5">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="startDate"
                        type="date"
                        className="pl-10"
                        value={budgetTimeline.startDate}
                        onChange={(e) =>
                          setBudgetTimeline({
                            ...budgetTimeline,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    {errors.startDate && (
                      <p className="text-destructive text-sm mt-1">{errors.startDate}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <div className="relative mt-1.5">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="endDate"
                        type="date"
                        className="pl-10"
                        value={budgetTimeline.endDate}
                        onChange={(e) =>
                          setBudgetTimeline({
                            ...budgetTimeline,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    {errors.endDate && (
                      <p className="text-destructive text-sm mt-1">{errors.endDate}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-border">
                  <Button variant="ghost" onClick={() => setCurrentStep(4)}>
                    Back
                  </Button>
                  <Button variant="hero" onClick={handleBudgetContinue}>
                    Review Campaign
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  Review & Launch
                </h1>
                <p className="text-muted-foreground">Everything looks good?</p>
              </div>
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center text-primary-foreground">
                    {campaignType === "contest" ? (
                      <Users className="w-8 h-8" />
                    ) : (
                      <DollarSign className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {campaignType === "contest" ? "Challenge" : "Collab"}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-foreground mt-1">
                      {productDetails.title}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium text-foreground">{productDetails.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-medium text-foreground">${budgetTimeline.budget}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">
                      {budgetTimeline.startDate || "Not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium text-foreground">
                      {budgetTimeline.endDate || "Not set"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">AI Script Preview</p>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm text-foreground whitespace-pre-wrap font-sans">
                      {script.selectedScript.substring(0, 200)}...
                    </pre>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-border">
                  <Button variant="ghost" onClick={() => setCurrentStep(5)}>
                    Back
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleCreateCampaign}
                    disabled={creating}
                  >
                    {creating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Launch Campaign
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Payment Modal */}
      {createdCampaign && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          campaign={createdCampaign}
          onSuccess={() => {
            setShowPaymentModal(false);
            resetWizard();
          }}
        />
      )}
    </div>
  );
};

const CreateCampaignWizard = () => {
  return (
    <CampaignWizardProvider>
      <CreateCampaignContent />
    </CampaignWizardProvider>
  );
};

export default CreateCampaignWizard;
