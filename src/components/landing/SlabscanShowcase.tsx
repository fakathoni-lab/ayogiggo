const SlabscanShowcase = () => {
  return (
    <section className="relative py-32 bg-bg-secondary overflow-hidden">
      {/* Maximum Glow Effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="container-slabscan relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Platform yang{" "}
            <span className="text-gradient">Intuitif & Modern</span>
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Desain yang premium, performa yang cepat, pengalaman yang mulus
          </p>
        </div>

        {/* Main Showcase */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Desktop Display */}
          <div className="relative z-10 glass-card p-6 glow-emerald-lg animate-float">
            <div className="aspect-video bg-bg-primary rounded-xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1400&h=800&fit=crop"
                alt="GIGGO Platform Showcase"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Floating Mobile Mockup 1 - Left */}
          <div
            className="absolute -left-12 top-24 w-56 z-20 glass-card p-3 glow-white animate-float hidden lg:block"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="aspect-[9/19.5] bg-bg-primary rounded-xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400&h=900&fit=crop"
                alt="GIGGO Mobile App"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Floating Mobile Mockup 2 - Right */}
          <div
            className="absolute -right-12 top-32 w-56 z-20 glass-card p-3 glow-white animate-float hidden lg:block"
            style={{ animationDelay: "1s" }}
          >
            <div className="aspect-[9/19.5] bg-bg-primary rounded-xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=900&fit=crop"
                alt="GIGGO Mobile Wallet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Floating Mobile Mockup 3 - Bottom Left */}
          <div
            className="absolute left-8 -bottom-16 w-48 z-20 glass-card p-2 glow-cyan animate-float hidden lg:block"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="aspect-[9/19.5] bg-bg-primary rounded-xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=900&fit=crop"
                alt="GIGGO Campaign Browser"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-32">
          {[
            "⚡ Lightning Fast",
            "🔒 Bank-Grade Security",
            "📱 Mobile First",
            "🎨 Beautiful UI/UX",
          ].map((feature, index) => (
            <div
              key={index}
              className="glass-pill animate-fade-up"
              style={{ animationDelay: `${index * 0.1 + 0.5}s` }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlabscanShowcase;
