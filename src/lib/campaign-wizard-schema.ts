import { z } from "zod";

// Step 1: Product Details
export const productDetailsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  productUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  productImage: z.string().optional(),
  category: z.string().min(1, "Please select a category")
});

// Step 2: Smart Brief
export const smartBriefSchema = z.object({
  hookStyle: z.string().optional(),
  mustMention: z.array(z.string()).default([]),
  avoid: z.array(z.string()).default([]),
  keyBenefits: z.array(z.string()).max(5, "Maximum 5 key benefits").default([]),
  cta: z.string().min(1, "Please select a call to action"),
  tone: z.enum(["funny", "professional", "casual", "inspiring", "educational"]).default("professional")
});

// Step 3: Script Selection
export const scriptSelectionSchema = z.object({
  selectedScript: z.string().min(10, "Script must be at least 10 characters"),
  isCustom: z.boolean().default(false)
});

// Step 4: Budget & Timeline
export const budgetTimelineSchema = z.object({
  budget: z.number().min(100, "Minimum budget is $100"),
  prizeBreakdown: z.string().optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required")
});

// Full wizard data
export const campaignWizardSchema = z.object({
  type: z.enum(["contest", "deal"]),
  productDetails: productDetailsSchema,
  smartBrief: smartBriefSchema,
  script: scriptSelectionSchema,
  budgetTimeline: budgetTimelineSchema
});

export type ProductDetails = z.infer<typeof productDetailsSchema>;
export type SmartBrief = z.infer<typeof smartBriefSchema>;
export type ScriptSelection = z.infer<typeof scriptSelectionSchema>;
export type BudgetTimeline = z.infer<typeof budgetTimelineSchema>;
export type CampaignWizardData = z.infer<typeof campaignWizardSchema>;