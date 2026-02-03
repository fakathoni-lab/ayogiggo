import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Sparkles, Loader2, Edit3, Check } from "lucide-react";
import { useCampaignWizard } from "@/contexts/CampaignWizardContext";
import { scriptSelectionSchema } from "@/lib/campaign-wizard-schema";
import { useToast } from "@/hooks/use-toast";

interface ScriptOption {
  id: string;
  title: string;
  content: string;
}

export const StepAIScript = () => {
  const {
    productDetails,
    smartBrief,
    script,
    setScript,
    setCurrentStep
  } = useCampaignWizard();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);
  const [scriptOptions, setScriptOptions] = useState<ScriptOption[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [customScript, setCustomScript] = useState("");

  const generateScripts = async () => {
    setGenerating(true);

    // Mock AI generation with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockScripts: ScriptOption[] = [
    {
      id: "script-1",
      title: "Hook-First Approach",
      content: `[HOOK] Stop scrolling! ${smartBrief.keyBenefits[0] || "This is game-changing"}!

[PROBLEM] We've all struggled with [common pain point], right?

[SOLUTION] That's why ${productDetails.title} is different. ${smartBrief.keyBenefits.slice(0, 3).map((b) => `✓ ${b}`).join("\n")}

[CTA] ${smartBrief.cta} - Link in bio! ${smartBrief.mustMention.length > 0 ? `Don't forget: ${smartBrief.mustMention[0]}` : ""}`
    },
    {
      id: "script-2",
      title: "Story-Driven",
      content: `[PERSONAL INTRO] Hey everyone! Let me tell you about something that changed my [routine/life].

[DISCOVERY] I discovered ${productDetails.title}, and here's why I'm obsessed:
${smartBrief.keyBenefits.slice(0, 3).map((b, i) => `${i + 1}. ${b}`).join("\n")}

[SOCIAL PROOF] Thousands are already loving it, and now you can too!

[CTA] ${smartBrief.cta} using the link below! ${smartBrief.mustMention.length > 0 ? smartBrief.mustMention[0] : ""}`
    },
    {
      id: "script-3",
      title: "Quick & Punchy",
      content: `POV: You just found the perfect [product category] 🔥

${productDetails.title} delivers:
${smartBrief.keyBenefits.slice(0, 4).map((b) => `→ ${b}`).join("\n")}

${smartBrief.mustMention.length > 0 ? `💡 Pro tip: ${smartBrief.mustMention[0]}\n` : ""}
Ready? ${smartBrief.cta} now! 🚀`
    }];


    setScriptOptions(mockScripts);
    setGenerating(false);
    toast({
      title: "Scripts Generated! ✨",
      description: "Choose one or customize your own"
    });
  };

  const handleSelectScript = (option: ScriptOption) => {
    setSelectedId(option.id);
    setScript({ selectedScript: option.content, isCustom: false });
    setCustomScript(option.content);
  };

  const handleContinue = () => {
    const scriptToValidate = isEditing ?
    { selectedScript: customScript, isCustom: true } :
    script;

    const result = scriptSelectionSchema.safeParse(scriptToValidate);

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
        description: "Please select or write a script",
        variant: "destructive"
      });
      return;
    }

    if (isEditing) {
      setScript({ selectedScript: customScript, isCustom: true });
    }

    setErrors({});
    setCurrentStep(5); // Move to Budget & Timeline
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto">

      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          AI Script Generator
        </h1>
        <p className="text-muted-foreground">
          Let AI create engaging scripts based on your brief
        </p>
      </div>

      {/* Generate Button */}
      {scriptOptions.length === 0 &&
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-card rounded-2xl border border-border p-12 text-center">

          <div className="w-20 h-20 mx-auto mb-6 relative">
            <motion.div
            animate={{
              boxShadow: [
              "0 0 20px rgba(147, 51, 234, 0.3)",
              "0 0 40px rgba(147, 51, 234, 0.5)",
              "0 0 20px rgba(147, 51, 234, 0.3)"]

            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center">

              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </motion.div>
          </div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            Ready to generate?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Our AI will create 3 high-performing scripts tailored to your product and
            brief
          </p>
          <Button
          variant="hero"
          size="lg"
          onClick={generateScripts}
          disabled={generating}
          className="relative overflow-hidden group">

            <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              background: [
              "linear-gradient(90deg, rgba(147,51,234,0.8), rgba(236,72,153,0.8))",
              "linear-gradient(180deg, rgba(236,72,153,0.8), rgba(147,51,234,0.8))",
              "linear-gradient(270deg, rgba(147,51,234,0.8), rgba(236,72,153,0.8))"]

            }}
            transition={{ duration: 3, repeat: Infinity }} />

            <span className="relative flex items-center gap-2">
              {generating ?
            <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Magic...
                </> :

            <>
                  <Sparkles className="w-5 h-5" />
                  Generate AI Scripts
                </>
            }
            </span>
          </Button>
        </motion.div>
      }

      {/* Script Options */}
      <AnimatePresence>
        {scriptOptions.length > 0 && !isEditing &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 mb-6">

            {scriptOptions.map((option, idx) =>
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleSelectScript(option)}
            className={`bg-card rounded-2xl border-2 p-6 cursor-pointer transition-all ${
            selectedId === option.id ?
            "border-primary bg-primary/5" :
            "border-border hover:border-primary/50"}`
            }>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {option.title}
                  </h3>
                  {selectedId === option.id &&
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">

                      <Check className="w-4 h-4 text-primary-foreground" />
                    </motion.div>
              }
                </div>
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans">
                  {option.content}
                </pre>
              </motion.div>
          )}
          </motion.div>
        }
      </AnimatePresence>

      {/* Custom Script Editor */}
      {isEditing &&
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border p-6 mb-6">

          <div className="flex items-center gap-2 mb-4">
            <Edit3 className="w-5 h-5 text-primary" />
            <h3 className="font-display text-lg font-semibold text-foreground">
              Custom Script
            </h3>
          </div>
          <Textarea
          value={customScript}
          onChange={(e) => setCustomScript(e.target.value)}
          rows={12}
          className="font-mono text-sm"
          placeholder="Write your custom script here..." />

          {errors.selectedScript &&
        <p className="text-destructive text-sm mt-2">{errors.selectedScript}</p>
        }
        </motion.div>
      }

      {/* Actions */}
      {scriptOptions.length > 0 &&
      <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setCurrentStep(3)}>
            Back
          </Button>
          <div className="flex gap-2">
            {!isEditing ?
          <>
                <Button
              variant="outline"
              onClick={() => {
                setIsEditing(true);
                if (!customScript && selectedId) {
                  const selected = scriptOptions.find((s) => s.id === selectedId);
                  if (selected) setCustomScript(selected.content);
                }
              }}>

                  <Edit3 className="w-4 h-4" />
                  Customize
                </Button>
                <Button
              variant="hero"
              onClick={handleContinue}
              disabled={!selectedId && !script.selectedScript}>

                  Continue
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </> :

          <Button variant="hero" onClick={handleContinue}>
                Continue
                <ChevronRight className="w-5 h-5" />
              </Button>
          }
          </div>
        </div>
      }
    </motion.div>);

};