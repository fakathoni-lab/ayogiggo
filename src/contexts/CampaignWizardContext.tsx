import { createContext, useContext, useState, ReactNode } from "react";
import {
  CampaignWizardData,
  ProductDetails,
  SmartBrief,
  ScriptSelection,
  BudgetTimeline } from
"@/lib/campaign-wizard-schema";

interface CampaignWizardContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  campaignType: "contest" | "deal" | null;
  setCampaignType: (type: "contest" | "deal") => void;
  productDetails: ProductDetails;
  setProductDetails: (data: ProductDetails) => void;
  smartBrief: SmartBrief;
  setSmartBrief: (data: SmartBrief) => void;
  script: ScriptSelection;
  setScript: (data: ScriptSelection) => void;
  budgetTimeline: BudgetTimeline;
  setBudgetTimeline: (data: BudgetTimeline) => void;
  resetWizard: () => void;
}

const CampaignWizardContext = createContext<CampaignWizardContextType | undefined>(undefined);

const initialProductDetails: ProductDetails = {
  title: "",
  productUrl: "",
  productImage: "",
  category: ""
};

const initialSmartBrief: SmartBrief = {
  hookStyle: "",
  mustMention: [],
  avoid: [],
  keyBenefits: [],
  cta: "",
  tone: "professional"
};

const initialScript: ScriptSelection = {
  selectedScript: "",
  isCustom: false
};

const initialBudgetTimeline: BudgetTimeline = {
  budget: 0,
  prizeBreakdown: "",
  startDate: "",
  endDate: ""
};

export const CampaignWizardProvider = ({ children }: {children: ReactNode;}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignType, setCampaignType] = useState<"contest" | "deal" | null>(null);
  const [productDetails, setProductDetails] = useState<ProductDetails>(initialProductDetails);
  const [smartBrief, setSmartBrief] = useState<SmartBrief>(initialSmartBrief);
  const [script, setScript] = useState<ScriptSelection>(initialScript);
  const [budgetTimeline, setBudgetTimeline] = useState<BudgetTimeline>(initialBudgetTimeline);

  const resetWizard = () => {
    setCurrentStep(1);
    setCampaignType(null);
    setProductDetails(initialProductDetails);
    setSmartBrief(initialSmartBrief);
    setScript(initialScript);
    setBudgetTimeline(initialBudgetTimeline);
  };

  return (
    <CampaignWizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        campaignType,
        setCampaignType,
        productDetails,
        setProductDetails,
        smartBrief,
        setSmartBrief,
        script,
        setScript,
        budgetTimeline,
        setBudgetTimeline,
        resetWizard
      }}>

      {children}
    </CampaignWizardContext.Provider>);

};

export const useCampaignWizard = () => {
  const context = useContext(CampaignWizardContext);
  if (!context) {
    throw new Error("useCampaignWizard must be used within CampaignWizardProvider");
  }
  return context;
};