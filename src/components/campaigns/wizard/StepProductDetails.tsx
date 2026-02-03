import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Upload, Link2, X } from "lucide-react";
import { useCampaignWizard } from "@/contexts/CampaignWizardContext";
import { productDetailsSchema } from "@/lib/campaign-wizard-schema";
import { useToast } from "@/hooks/use-toast";

const categories = [
"Fashion",
"Beauty",
"Fitness",
"Tech",
"Food",
"Travel",
"Lifestyle",
"Gaming",
"Music",
"Sports",
"Education",
"Entertainment"];


export const StepProductDetails = () => {
  const { productDetails, setProductDetails, setCurrentStep } = useCampaignWizard();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContinue = () => {
    const result = productDetailsSchema.safeParse(productDetails);

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
        description: "Please fix the errors before continuing",
        variant: "destructive"
      });
      return;
    }

    setErrors({});
    setCurrentStep(3); // Move to Smart Brief
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // For now, use Unsplash placeholder - in production, use file upload API
    const mockUrl = `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800`;
    setProductDetails({ ...productDetails, productImage: mockUrl });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto">

      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Product Details
        </h1>
        <p className="text-muted-foreground">Tell us about your product or brand</p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
        {/* Campaign Title */}
        <div>
          <Label htmlFor="title">Campaign Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Summer Fashion Challenge"
            className="mt-1.5"
            value={productDetails.title}
            onChange={(e) =>
            setProductDetails({ ...productDetails, title: e.target.value })
            } />

          {errors.title &&
          <p className="text-destructive text-sm mt-1">{errors.title}</p>
          }
        </div>

        {/* Product URL */}
        <div>
          <Label htmlFor="productUrl">Product/Brand URL</Label>
          <div className="relative mt-1.5">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="productUrl"
              type="url"
              placeholder="https://yourbrand.com/product"
              className="pl-10"
              value={productDetails.productUrl}
              onChange={(e) =>
              setProductDetails({ ...productDetails, productUrl: e.target.value })
              } />

          </div>
          {errors.productUrl &&
          <p className="text-destructive text-sm mt-1">{errors.productUrl}</p>
          }
        </div>

        {/* Product Image */}
        <div>
          <Label>Product Image</Label>
          <div className="mt-1.5">
            {productDetails.productImage ?
            <div className="relative">
                <img
                src={productDetails.productImage}
                alt="Product"
                className="w-full h-48 object-cover rounded-xl border border-border" />

                <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() =>
                setProductDetails({ ...productDetails, productImage: "" })
                }>

                  <X className="w-4 h-4" />
                </Button>
              </div> :

            <label className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer block">
                <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload} />

                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload product image
                </p>
              </label>
            }
          </div>
        </div>

        {/* Category */}
        <div>
          <Label>Category *</Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-1.5">
            {categories.map((cat) =>
            <button
              key={cat}
              type="button"
              onClick={() =>
              setProductDetails({ ...productDetails, category: cat })
              }
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              productDetails.category === cat ?
              "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground hover:bg-muted/80"}`
              }>

                {cat}
              </button>
            )}
          </div>
          {errors.category &&
          <p className="text-destructive text-sm mt-1">{errors.category}</p>
          }
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4 border-t border-border">
          <Button variant="ghost" onClick={() => setCurrentStep(1)}>
            Back
          </Button>
          <Button variant="hero" onClick={handleContinue}>
            Continue
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>);

};