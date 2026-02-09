import { UserPlus, Search, Video, Wallet } from "lucide-react";

const SlabscanHowItWorks = () => {
  const steps = [
  {
    number: 1,
    title: "Daftar & Verifikasi",
    description: "Buat akun dan lengkapi profil kreator Anda dalam 5 menit",
    icon: UserPlus
  },
  {
    number: 2,
    title: "Pilih Kampanye",
    description: "Browse dan apply ke kampanye yang sesuai dengan niche Anda",
    icon: Search
  },
  {
    number: 3,
    title: "Buat Konten",
    description: "Upload konten sesuai brief dan tunggu approval dari brand",
    icon: Video
  },
  {
    number: 4,
    title: "Terima Pembayaran",
    description: "Dapatkan bayaran langsung ke rekening Anda dalam 24 jam",
    icon: Wallet
  }];


  return (
    <section id="cara-kerja" className="py-24 bg-bg-secondary">
      <div className="container-slabscan">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Cara Kerja yang{" "}
            <span className="text-gradient">Super Simpel</span>
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Mulai hasilkan uang dari konten Anda dalam 4 langkah mudah
          </p>
        </div>

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          {/* Connection Line */}
          <div className="relative mb-16">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-emerald opacity-30" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-emerald via-brand-cyan to-brand-emerald animate-glow-pulse" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative animate-fade-up"
                  style={{ animationDelay: `${index * 0.15}s` }}>

                  {/* Icon Circle */}
                  <div className="flex justify-center mb-6 -mt-20">
                    <div className="relative">
                      <div className="glass-card w-24 h-24 rounded-full flex items-center justify-center border-brand-emerald/30 shadow-glow-emerald">
                        <Icon className="w-10 h-10 text-brand-emerald" />
                      </div>
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-emerald text-white rounded-full flex items-center justify-center text-sm font-bold shadow-glow-emerald">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>);

            })}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex gap-6 animate-fade-up"
                style={{ animationDelay: `${index * 0.15}s` }}>

                {/* Vertical Line */}
                {index < steps.length - 1 &&
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-brand-emerald to-brand-cyan opacity-30" />
                }

                {/* Icon Circle */}
                <div className="relative shrink-0">
                  <div className="glass-card w-12 h-12 rounded-full flex items-center justify-center border-brand-emerald/30 shadow-glow-emerald">
                    <Icon className="w-6 h-6 text-brand-emerald" />
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-brand-emerald text-white rounded-full flex items-center justify-center text-xs font-bold shadow-glow-emerald">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2 pt-1">
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>);

          })}
        </div>
      </div>
    </section>);

};

export default SlabscanHowItWorks;