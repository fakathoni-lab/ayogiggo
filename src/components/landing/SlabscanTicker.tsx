import { useEffect, useState } from "react";

interface PayoutNotification {
  id: number;
  creator: string;
  amount: string;
  icon: string;
}

const SlabscanTicker = () => {
  const notifications: PayoutNotification[] = [
    { id: 1, creator: "Nisa", amount: "Rp 2.5jt", icon: "🎉" },
    { id: 2, creator: "Budi", amount: "Rp 1.8jt", icon: "💰" },
    { id: 3, creator: "Rina", amount: "Rp 3.2jt", icon: "✨" },
    { id: 4, creator: "Andi", amount: "Rp 950rb", icon: "🚀" },
    { id: 5, creator: "Siti", amount: "Rp 4.1jt", icon: "🎊" },
    { id: 6, creator: "Dimas", amount: "Rp 1.5jt", icon: "💸" },
    { id: 7, creator: "Maya", amount: "Rp 2.8jt", icon: "🌟" },
    { id: 8, creator: "Fajar", amount: "Rp 1.2jt", icon: "🎯" },
  ];

  // Duplicate notifications for seamless loop
  const duplicatedNotifications = [...notifications, ...notifications];

  return (
    <section className="relative py-8 border-y border-white/5 bg-bg-secondary/50 overflow-hidden">
      {/* Animated ticker wrapper */}
      <div className="relative flex">
        <div className="flex gap-4 animate-ticker whitespace-nowrap">
          {duplicatedNotifications.map((notification, index) => (
            <div
              key={`${notification.id}-${index}`}
              className="glass-pill inline-flex items-center gap-2 text-sm shrink-0"
            >
              <span>{notification.icon}</span>
              <span className="text-white font-medium">{notification.creator}</span>
              <span className="text-text-muted">dapat</span>
              <span className="text-brand-emerald font-semibold">
                {notification.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlabscanTicker;
