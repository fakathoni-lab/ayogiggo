import { X, CheckCircle2 } from "lucide-react";

const SlabscanComparison = () => {
  const painPoints = [
  "Sulit menemukan brand yang tepat",
  "Proses negosiasi yang ribet",
  "Pembayaran tidak jelas",
  "Tidak ada jaminan keamanan"];


  const solutions = [
  "Marketplace dengan 100+ brand verified",
  "Brief yang jelas & terstruktur",
  "Escrow payment yang aman",
  "Platform terpercaya & transparan"];


  return (
    <section className="py-24 bg-bg-secondary">
      <div className="container-slabscan">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Kenapa Harus GIGGO?
            </h2>
            <p className="text-lg text-text-body max-w-2xl mx-auto">
              Kami memahami tantangan kreator. GIGGO hadir sebagai solusi untuk
              semua masalah Anda.
            </p>
          </div>

          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pain Points - Left Side */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-text-muted mb-6">
                Tanpa GIGGO
              </h3>
              {painPoints.map((point, index) =>
              <div
                key={index}
                className="bg-bg-primary border border-red-500/20 rounded-xl p-6 space-y-3 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}>

                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-text-muted">{point}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions - Right Side */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-brand-emerald mb-6">
                Dengan GIGGO
              </h3>
              {solutions.map((solution, index) =>
              <div
                key={index}
                className="glass-card p-6 space-y-3 border-brand-emerald/20 shadow-glow-emerald animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}>

                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-brand-emerald/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                    </div>
                    <p className="text-text-body font-medium">{solution}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default SlabscanComparison;