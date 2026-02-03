import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EarningsChart from "@/components/analytics/EarningsChart";
import StatsCards from "@/components/analytics/StatsCards";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LayoutDashboard,
  Compass,
  Video,
  Trophy,
  Wallet,
  Settings,
  TrendingUp
} from "lucide-react";

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/creator" },
  { id: "discover", icon: Compass, label: "Discover Gigs" },
  { id: "entries", icon: Video, label: "My Entries" },
  { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
  { id: "wallet", icon: Wallet, label: "My Wallet", path: "/dashboard/creator/wallet" },
  { id: "analytics", icon: TrendingUp, label: "Analytics", path: "/dashboard/creator/analytics" },
  { id: "settings", icon: Settings, label: "Settings" }
];

const CreatorAnalytics = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <div className="min-h-screen bg-muted flex">
      <DashboardSidebar
        variant="creator"
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName="Creator"
        userInitial="C"
      />

      <main className="flex-1 overflow-auto">
        <DashboardHeader
          title="Creator Command Center 📊"
          subtitle="Track your earnings, performance, and growth"
        />

        <div className="p-4 md:p-8 space-y-8">
          {/* Stats Cards */}
          <StatsCards />

          {/* Earnings Chart */}
          <div className="bg-card rounded-2xl border border-border p-4 md:p-6">
            <div className="mb-6">
              <h2 className="font-display text-lg md:text-xl font-semibold text-foreground mb-2">
                Earnings Over Time
              </h2>
              <p className="text-sm text-muted-foreground">
                Your monthly earnings performance
              </p>
            </div>
            <EarningsChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorAnalytics;
