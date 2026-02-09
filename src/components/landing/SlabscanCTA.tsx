import { Link } from "react-router-dom";
import { Shield, Zap, Lock } from "lucide-react";

const SlabscanCTA = () => {
  return (
    <section className="relative py-32 bg-bg-primary overflow-hidden">
      {/* Maximum Impact Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.5) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="container-slabscan relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Main Headline */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Mulai Hasilkan Uang dari{" "}
              <span className="text-gradient">Konten Anda Hari Ini</span>
            </h2>
            <p className="text-xl md:text-2xl text-text-body max-w-2xl mx-auto">
              Bergabung dengan ribuan kreator yang telah mengubah passion mereka
              menjadi profit
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth"
              className="btn-slabscan-primary text-lg px-12 py-4 shadow-glow-emerald-lg"
            >
              Daftar Sekarang - Gratis! →
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-10 h-10 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-brand-emerald" />
              </div>
              <span className="text-sm font-medium">Data Aman</span>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-10 h-10 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-brand-emerald" />
              </div>
              <span className="text-sm font-medium">Escrow Protected</span>
            </div>
            <div className="flex items-center gap-3 text-text-muted">
              <div className="w-10 h-10 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-brand-emerald" />
              </div>
              <span className="text-sm font-medium">Pencairan Cepat</span>
            </div>
          </div>

          {/* Social Proof */}
          <div className="pt-8">
            <p className="text-text-muted text-sm mb-4">
              Dipercaya oleh 500+ kreator aktif
            </p>
            <div className="flex items-center justify-center -space-x-3">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
              ].map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Creator ${index + 1}`}
                  className="w-12 h-12 rounded-full border-2 border-bg-primary object-cover"
                />
              ))}
              <div className="w-12 h-12 rounded-full bg-brand-emerald/20 border-2 border-bg-primary flex items-center justify-center">
                <span className="text-brand-emerald text-xs font-bold">
                  +495
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlabscanCTA;
