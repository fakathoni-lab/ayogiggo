import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MobileStickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 600px)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        >
          <div className="bg-[#0A1628]/95 backdrop-blur-xl border-t border-white/10 p-4 shadow-2xl">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] hover:from-[#00C8EE] hover:to-[#0D94D8] text-white py-6 text-lg rounded-full shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] transition-all font-bold group"
              onClick={() => navigate("/auth")}
            >
              Buat Campaign Sekarang
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyCTA;
