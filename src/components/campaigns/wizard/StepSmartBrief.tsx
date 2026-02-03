import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Plus, X, Zap } from "lucide-react";
import { useCampaignWizard } from "@/contexts/CampaignWizardContext";
import { smartBriefSchema } from "@/lib/campaign-wizard-schema";
import { useToast } from "@/hooks/use-toast";

const ctaOptions = [
"Shop Now",
"Learn More",
"Get Started",
"Sign Up",
"Download",
"Try Free",
"Book Now",
"Join Waitlist"];


const toneOptions = [
{ value: "funny", label: "Funny", emoji: "😂" },
{ value: "professional", label: "Professional", emoji: "💼" },
{ value: "casual", label: "Casual", emoji: "😎" },
{ value: "inspiring", label: "Inspiring", emoji: "✨" },
{ value: "educational", label: "Educational", emoji: "📚" }];


export const StepSmartBrief = () => {
  const { smartBrief, setSmartBrief, setCurrentStep } = useCampaignWizard();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newBenefit, setNewBenefit] = useState("");
  const [newMention, setNewMention] = useState("");
  const [newAvoid, setNewAvoid] = useState("");

  const handleContinue = () => {
    const result = smartBriefSchema.safeParse(smartBrief);

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
        description: "Please select a call to action",
        variant: "destructive"
      });
      return;
    }

    setErrors({});
    setCurrentStep(4); // Move to AI Script Generator
  };

  const addBenefit = () => {
    if (newBenefit.trim() && smartBrief.keyBenefits.length < 5) {
      setSmartBrief({
        ...smartBrief,
        keyBenefits: [...smartBrief.keyBenefits, newBenefit.trim()]
      });
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setSmartBrief({
      ...smartBrief,
      keyBenefits: smartBrief.keyBenefits.filter((_, i) => i !== index)
    });
  };

  const addMention = () => {
    if (newMention.trim()) {
      setSmartBrief({
        ...smartBrief,
        mustMention: [...smartBrief.mustMention, newMention.trim()]
      });
      setNewMention("");
    }
  };

  const removeMention = (index: number) => {
    setSmartBrief({
      ...smartBrief,
      mustMention: smartBrief.mustMention.filter((_, i) => i !== index)
    });
  };

  const addAvoid = () => {
    if (newAvoid.trim()) {
      setSmartBrief({
        ...smartBrief,
        avoid: [...smartBrief.avoid, newAvoid.trim()]
      });
      setNewAvoid("");
    }
  };

  const removeAvoid = (index: number) => {
    setSmartBrief({
      ...smartBrief,
      avoid: smartBrief.avoid.filter((_, i) => i !== index)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto">

      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Smart Brief Builder
        </h1>
        <p className="text-muted-foreground">
          Structure your brief for better creator results
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
        {/* Key Benefits */}
        <div>
          <Label>Key Benefits (Max 5)</Label>
          <p className="text-sm text-muted-foreground mb-2">
            What makes your product special?
          </p>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="e.g., Eco-friendly materials"
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
              disabled={smartBrief.keyBenefits.length >= 5} />

            <Button
              onClick={addBenefit}
              disabled={!newBenefit.trim() || smartBrief.keyBenefits.length >= 5}>

              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {smartBrief.keyBenefits.map((benefit, idx) =>
            <motion.span
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">

                {benefit}
                <button onClick={() => removeBenefit(idx)} className="hover:text-primary/70">
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            )}
          </div>
        </div>

        {/* Must Mention */}
        <div>
          <Label>Must Mention</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Key points creators must include
          </p>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="e.g., Free shipping code"
              value={newMention}
              onChange={(e) => setNewMention(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addMention())} />

            <Button onClick={addMention} disabled={!newMention.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {smartBrief.mustMention.map((item, idx) =>
            <motion.span
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">

                {item}
                <button onClick={() => removeMention(idx)} className="hover:opacity-70">
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            )}
          </div>
        </div>

        {/* Avoid */}
        <div>
          <Label>Avoid</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Things creators should NOT mention
          </p>
          <div className="flex gap-2 mb-2">
            <Input
              placeholder="e.g., Competitor names"
              value={newAvoid}
              onChange={(e) => setNewAvoid(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAvoid())} />

            <Button onClick={addAvoid} disabled={!newAvoid.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {smartBrief.avoid.map((item, idx) =>
            <motion.span
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-destructive/10 text-destructive rounded-full text-sm font-medium">

                {item}
                <button onClick={() => removeAvoid(idx)} className="hover:opacity-70">
                  <X className="w-3 h-3" />
                </button>
              </motion.span>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div>
          <Label>Call to Action *</Label>
          <div className="grid grid-cols-4 gap-2 mt-1.5">
            {ctaOptions.map((cta) =>
            <button
              key={cta}
              type="button"
              onClick={() => setSmartBrief({ ...smartBrief, cta })}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              smartBrief.cta === cta ?
              "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground hover:bg-muted/80"}`
              }>

                {cta}
              </button>
            )}
          </div>
          {errors.cta && <p className="text-destructive text-sm mt-1">{errors.cta}</p>}
        </div>

        {/* Tone */}
        <div>
          <Label>Content Tone</Label>
          <div className="grid grid-cols-5 gap-2 mt-1.5">
            {toneOptions.map((tone) =>
            <button
              key={tone.value}
              type="button"
              onClick={() =>
              setSmartBrief({
                ...smartBrief,
                tone: tone.value as typeof smartBrief.tone
              })
              }
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              smartBrief.tone === tone.value ?
              "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground hover:bg-muted/80"}`
              }>

                <div className="text-lg mb-1">{tone.emoji}</div>
                {tone.label}
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t border-border">
          <Button variant="ghost" onClick={() => setCurrentStep(2)}>
            Back
          </Button>
          <Button variant="hero" onClick={handleContinue}>
            Generate Scripts
            <Zap className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>);

};