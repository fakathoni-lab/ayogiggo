import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const notifications = [
  { name: "Rina S.", action: "membuat campaign baru" },
  { name: "Budi P.", action: "mendapatkan 50+ aplikasi kreator" },
  { name: "Maya K.", action: "membuat campaign baru" },
  { name: "Andi W.", action: "mendapatkan 30+ aplikasi kreator" },
  { name: "Lisa T.", action: "membuat campaign baru" }
];

const SocialProofToast = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showToast = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % notifications.length);
        }, 500);
      }, 4000);
    };

    // First notification after 5 seconds
    const firstTimer = setTimeout(showToast, 5000);

    // Subsequent notifications every 15-30 seconds
    const interval = setInterval(() => {
      showToast();
    }, Math.random() * 15000 + 15000);

    return () => {
      clearTimeout(firstTimer);
      clearInterval(interval);
    };
  }, []);

  const notification = notifications[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.8 }}
          className="fixed bottom-8 left-8 z-40 hidden lg:block"
        >
          <div className="glass-morphism rounded-2xl p-4 border border-white/10 shadow-2xl max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#00D9FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-[#00D9FF]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">
                  {notification.name}
                </p>
                <p className="text-[#94A3B8] text-xs truncate">
                  {notification.action}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SocialProofToast;
