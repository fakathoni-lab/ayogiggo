import { Search, DollarSign, Shield, CheckCircle2 } from "lucide-react";

const SlabscanFeatures = () => {
  const features = [
    {
      eyebrow: "DISCOVER",
      title: "Temukan Kampanye yang Cocok",
      description:
        "Browse ribuan kampanye dari brand terpercaya yang sesuai dengan niche dan style konten Anda. Filter berdasarkan kategori, budget, dan deadline.",
      points: [
        "100+ brand verified setiap bulan",
        "Filter pencarian yang powerful",
        "Notifikasi kampanye baru real-time",
      ],
      icon: Search,
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      position: "left",
    },
    {
      eyebrow: "EARN",
      title: "Dapatkan Bayaran yang Pantas",
      description:
        "Sistem escrow payment memastikan Anda mendapat bayaran setelah konten disetujui. Tidak ada lagi pembayaran tertunda atau tidak jelas.",
      points: [
        "Escrow payment 100% aman",
        "Pencairan dalam 24 jam",
        "Dashboard earnings yang transparan",
      ],
      icon: DollarSign,
      image:
        "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=600&fit=crop",
      position: "right",
    },
    {
      eyebrow: "PROTECTED",
      title: "Terlindungi di Setiap Transaksi",
      description:
        "GIGGO bertindak sebagai mediator terpercaya. Brief yang jelas, kontrak digital, dan sistem dispute resolution untuk melindungi hak Anda.",
      points: [
        "Kontrak digital yang binding",
        "Sistem review & approval yang jelas",
        "Support team 24/7",
      ],
      icon: Shield,
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      position: "left",
    },
  ];

  return (
    <section id="fitur" className="py-24 bg-bg-primary">
      <div className="container-slabscan">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Fitur yang Mengubah{" "}
            <span className="text-gradient">Cara Kerja Kreator</span>
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Platform all-in-one untuk kreator yang serius tentang monetisasi
            konten mereka
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-32">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  feature.position === "right" ? "md:grid-flow-dense" : ""
                }`}
              >
                {/* Text Content */}
                <div
                  className={`space-y-6 ${
                    feature.position === "right" ? "md:col-start-2" : ""
                  }`}
                >
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 text-brand-emerald text-sm font-semibold uppercase tracking-wider">
                      <Icon className="w-5 h-5" />
                      {feature.eyebrow}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-text-body leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <ul className="space-y-3">
                    {feature.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-brand-emerald mt-2 shadow-glow-emerald" />
                        <span className="text-text-body">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual Mockup */}
                <div
                  className={`relative ${
                    feature.position === "right" ? "md:col-start-1 md:row-start-1" : ""
                  }`}
                >
                  <div className="relative glass-card p-4 animate-float">
                    <div className="aspect-[4/3] bg-bg-secondary rounded-lg overflow-hidden border border-white/5">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Glow effect behind */}
                    <div className="absolute inset-0 bg-gradient-radial-emerald opacity-50 -z-10" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SlabscanFeatures;
