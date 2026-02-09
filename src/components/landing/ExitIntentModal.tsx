import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ExitIntentModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="relative glass-morphism rounded-3xl p-8 border-2 border-[#00D9FF]/30 shadow-[0_0_60px_rgba(0,217,255,0.3)]">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Content */}
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-[#00D9FF]/10 rounded-2xl flex items-center justify-center ring-2 ring-[#00D9FF]/30 animate-pulse">
                    <Gift className="w-8 h-8 text-[#00D9FF]" />
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-3xl font-bold text-white">
                  Tunggu Dulu! 🎁
                </h3>

                <p className="text-lg text-[#94A3B8]">
                  Dapatkan <span className="text-white font-semibold">Campaign Review GRATIS</span> dari tim Giggo
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                  <Input
                    type="email"
                    placeholder="Email Anda"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-white/5 border-white/20 text-white placeholder:text-[#94A3B8] focus:border-[#00D9FF] rounded-xl"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] hover:from-[#00C8EE] hover:to-[#0D94D8] text-white py-6 text-lg rounded-full shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] transition-all font-bold"
                  >
                    Claim Free Review
                  </Button>
                </form>

                <p className="text-xs text-[#94A3B8]">
                  No spam. Kami respect privacy Anda.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;
