import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { RoleProvider } from "@/contexts/RoleContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { Suspense, lazy, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { ensureTablesExist } from "@/lib/db/init";

// Layouts
import IndexLayout from "@/components/layouts/IndexLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Eager-loaded pages (critical path)
import Index from "@/pages/Index";
import SlabscanIndex from "@/pages/SlabscanIndex";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import OnAuthSuccess from "@/pages/auth/OnAuthSuccess";
import ResetPassword from "@/pages/auth/ResetPassword";

// Lazy-loaded pages (non-critical)
const BrowseCampaigns = lazy(() => import("@/pages/campaigns/BrowseCampaigns"));
const CampaignDetail = lazy(() => import("@/pages/campaigns/CampaignDetail"));
const BrandDashboard = lazy(() => import("@/pages/dashboard/BrandDashboard"));
const CreatorDashboard = lazy(() => import("@/pages/dashboard/CreatorDashboard"));
const CreatorWallet = lazy(() => import("@/pages/dashboard/CreatorWallet"));
const CreatorAnalytics = lazy(() => import("@/pages/dashboard/CreatorAnalytics"));
const CreatorSettings = lazy(() => import("@/pages/dashboard/CreatorSettings"));
const CreateCampaign = lazy(() => import("@/pages/dashboard/CreateCampaignWizard"));
const BrandsLandingPage = lazy(() => import("@/pages/brands/Index"));
const BrandLandingV2 = lazy(() => import("@/pages/brands/BrandLandingV2"));
const CreatorsLandingPage = lazy(() => import("@/pages/creators/Index"));
const PublicProfile = lazy(() => import("@/pages/creator/PublicProfile"));
const BrandOnboarding = lazy(() => import("@/pages/onboarding/BrandOnboarding"));
const CreatorOnboarding = lazy(() => import("@/pages/onboarding/CreatorOnboarding"));
const Welcome = lazy(() => import("@/pages/onboarding/Welcome"));
const Privacy = lazy(() => import("@/pages/legal/Privacy"));
const Terms = lazy(() => import("@/pages/legal/Terms"));
const PaymentStatus = lazy(() => import("@/pages/payment/PaymentStatus"));

// Loading Fallback Component
const LoadingFallback = () =>
<div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center space-y-4">
      <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>;


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => {
  // Initialize database tables on app load
  useEffect(() => {
    ensureTablesExist();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <RoleProvider>
                <NotificationProvider>
                  <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                  {/* Slabscan Landing Page - Standalone */}
                  <Route path="/slabscan" element={<SlabscanIndex />} />

                  {/* Public Routes (with Navbar & Footer) */}
                  <Route element={<IndexLayout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/brands" element={<BrandsLandingPage />} />
                    <Route path="/brands-v2" element={<BrandLandingV2 />} />
                    <Route path="/creators" element={<CreatorsLandingPage />} />
                    <Route path="/campaigns" element={<BrowseCampaigns />} />
                    <Route path="/campaigns/:id" element={<CampaignDetail />} />
                  </Route>

                  {/* Auth Routes (plain) */}
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/onauthsuccess" element={<OnAuthSuccess />} />
                  <Route path="/resetpassword" element={<ResetPassword />} />
                  
                  {/* Legal Pages */}
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  
                  {/* Onboarding Routes - Protected but accessible for incomplete profiles */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/onboarding" element={<Welcome />} />
                    <Route path="/onboarding/brand" element={<BrandOnboarding />} />
                    <Route path="/onboarding/creator" element={<CreatorOnboarding />} />
                  </Route>

                  {/* Brand Dashboard Routes - Only for Brands */}
                  <Route element={<ProtectedRoute allowedRoles={['brand']} />}>
                    <Route path="/dashboard/brand" element={<BrandDashboard />} />
                    <Route path="/dashboard/brand/campaigns/new" element={<CreateCampaign />} />
                    <Route path="/payment/status" element={<PaymentStatus />} />
                  </Route>

                  {/* Creator Dashboard Routes - Only for Creators */}
                  <Route element={<ProtectedRoute allowedRoles={['creator']} />}>
                    <Route path="/dashboard/creator" element={<CreatorDashboard />} />
                    <Route path="/dashboard/creator/wallet" element={<CreatorWallet />} />
                    <Route path="/dashboard/creator/analytics" element={<CreatorAnalytics />} />
                    <Route path="/dashboard/creator/settings" element={<CreatorSettings />} />
                  </Route>

                  {/* Public Creator Profile */}
                  <Route path="/creator/:userId" element={<PublicProfile />} />

                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                </NotificationProvider>
              </RoleProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};


export default App;