import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Banknote, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { useAnalyticsStats } from "@/hooks/useAnalytics";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Animated counter component
const AnimatedCounter = ({ value, format }: { value: number; format?: (v: number) => string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000; // 2 seconds animation
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = startValue + (endValue - startValue) * easeOut;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{format ? format(Math.floor(count)) : Math.floor(count)}</>;
};

const StatsCards = () => {
  const { data: stats, isLoading } = useAnalyticsStats();

  const cards = [
    {
      id: "total_earned",
      title: "Total Earned",
      value: stats?.totalEarned || 0,
      format: formatCurrency,
      icon: Banknote,
      iconBg: "bg-success/10",
      iconColor: "text-success",
      trendIcon: TrendingUp,
      trendColor: "text-success"
    },
    {
      id: "pending_escrow",
      title: "Pending Escrow",
      value: stats?.pendingEscrow || 0,
      format: formatCurrency,
      icon: Clock,
      iconBg: "bg-warning/10",
      iconColor: "text-warning"
    },
    {
      id: "completed_jobs",
      title: "Completed Jobs",
      value: stats?.completedJobs || 0,
      icon: CheckCircle,
      iconBg: "bg-primary/10",
      iconColor: "text-primary"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-36 rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const TrendIcon = card.trendIcon;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-card rounded-2xl p-6 border border-border hover:border-primary/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${card.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              {TrendIcon && (
                <TrendIcon className={`w-5 h-5 ${card.trendColor}`} />
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{card.title}</p>
            <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
              <AnimatedCounter value={card.value} format={card.format} />
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
