import { CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const SlabscanHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Glow - Radial gradient emerald */}
      <div className="absolute inset-0 bg-glow-emerald-lg opacity-40 pointer-events-none" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial-emerald-lg pointer-events-none"
        style={{ filter: "blur(80px)" }} />


      {/* Content */}
      <div className="container-slabscan relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Floating Badge */}
          <div className="flex justify-center animate-fade-in">
            <div className="floating-badge">
              <Sparkles className="w-4 h-4" />
              <span>500+ Kreator Dipercaya</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
              GIGGO
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Monetisasi Konten yang{" "}
              <span className="text-gradient">Kamu Cintai</span>
            </h2>
          </div>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-text-body max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}>

            Platform marketplace pertama di Indonesia yang menghubungkan kreator
            dengan brand untuk kolaborasi berbayar. Dapatkan penghasilan dari
            konten Anda hari ini.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}>

            <Link to="/auth" className="btn-slabscan-primary">
              Daftar Sekarang →
            </Link>
            <a href="#cara-kerja" className="btn-slabscan-secondary">
              Cara Kerja
            </a>
          </div>

          {/* Trust Row */}
          <div
            className="flex flex-wrap items-center justify-center gap-6 pt-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}>

            <div className="flex items-center gap-2 text-text-muted text-sm">
              <CheckCircle2 className="w-5 h-5 text-brand-emerald" />
              <span>Tanpa minimum followers</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <CheckCircle2 className="w-5 h-5 text-brand-emerald" />
              <span>100% aman & terpercaya</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <CheckCircle2 className="w-5 h-5 text-brand-emerald" />
              <span>Pencairan instan</span>
            </div>
          </div>

          {/* Visual Mockups */}
          <div
            className="relative pt-16 animate-fade-up"
            style={{ animationDelay: "0.5s" }}>

            <div className="relative mx-auto max-w-4xl">
              {/* Main Desktop Mockup */}
              <div className="relative z-10 glass-card p-4 glow-emerald animate-float">
                <div className="aspect-video bg-bg-secondary rounded-lg border border-white/5 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop"
                    alt="GIGGO Dashboard"
                    className="w-full h-full object-cover" />

                </div>
              </div>

              {/* Floating Mobile Mockups */}
              <div className="absolute -left-8 top-12 w-48 z-0 glass-card p-2 glow-white animate-float hidden md:block" style={{ animationDelay: "1s" }}>
                <div className="aspect-[9/19.5] bg-bg-secondary rounded-lg border border-white/5 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop"
                    alt="GIGGO Mobile"
                    className="w-full h-full object-cover" />

                </div>
              </div>

              <div className="absolute -right-8 top-24 w-48 z-0 glass-card p-2 glow-white animate-float hidden md:block" style={{ animationDelay: "1.5s" }}>
                <div className="aspect-[9/19.5] bg-bg-secondary rounded-lg border border-white/5 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=800&fit=crop"
                    alt="GIGGO Mobile 2"
                    className="w-full h-full object-cover" />

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default SlabscanHero;