import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useEarningsData } from "@/hooks/useAnalytics";
import { TrendingUp, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    notation: "compact"
  }).format(amount);
};

const chartConfig = {
  earnings: {
    label: "Earnings",
    color: "hsl(var(--primary))"
  }
} satisfies ChartConfig;

type TimeRange = "week" | "month" | "year";

const EarningsChart = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const { data: rawData, isLoading } = useEarningsData();

  // Aggregate data based on time range
  const chartData = useMemo(() => {
    if (!rawData || rawData.length === 0) return [];

    const now = new Date();
    const filtered = rawData.filter((item) => {
      const itemDate = new Date(item.date);
      if (timeRange === "week") {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return itemDate >= weekAgo;
      } else if (timeRange === "month") {
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return itemDate >= monthAgo;
      } else {
        const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        return itemDate >= yearAgo;
      }
    });

    // Aggregate by period
    const aggregated = filtered.reduce((acc, item) => {
      const date = new Date(item.date);
      let key: string;

      if (timeRange === "week") {
        key = date.toLocaleDateString("id-ID", { weekday: "short" });
      } else if (timeRange === "month") {
        key = date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      } else {
        key = date.toLocaleDateString("id-ID", { month: "short", year: "numeric" });
      }

      if (!acc[key]) {
        acc[key] = { period: key, earnings: 0 };
      }
      acc[key].earnings += item.amount;
      return acc;
    }, {} as Record<string, { period: string; earnings: number }>);

    return Object.values(aggregated);
  }, [rawData, timeRange]);

  const totalEarnings = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.earnings, 0);
  }, [chartData]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[350px] w-full" />
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6">
          <TrendingUp className="w-10 h-10 text-primary" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          Welcome Aboard! 🚀
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Your earnings will appear here once you complete your first campaign. Start exploring opportunities now!
        </p>
        <Button variant="hero" onClick={() => window.location.href = "/campaigns"}>
          Browse Campaigns
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            {formatCurrency(totalEarnings)} earned
          </span>
        </div>
        <div className="flex gap-2">
          {(["week", "month", "year"] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className="capitalize"
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="period"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || payload.length === 0) return null;
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                    <p className="text-xs text-muted-foreground mb-1">{payload[0].payload.period}</p>
                    <p className="text-sm font-semibold text-foreground">
                      {formatCurrency(payload[0].value as number)}
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#earningsGradient)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default EarningsChart;
