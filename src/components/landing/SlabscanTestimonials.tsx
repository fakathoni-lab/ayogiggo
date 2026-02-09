import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  handle: string;
  avatar: string;
  quote: string;
  earned: string;
}

const SlabscanTestimonials = () => {
  const testimonials: Testimonial[] = [
  {
    name: "Nisa Rahma",
    handle: "@nisarahma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    quote: "GIGGO benar-benar game changer! Sekarang saya bisa fokus buat konten tanpa khawatir soal pembayaran. Escrow system-nya bikin tenang.",
    earned: "Rp 18.5jt"
  },
  {
    name: "Budi Santoso",
    handle: "@budisantoso",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    quote: "Dari yang awalnya cuma hobi bikin video, sekarang jadi penghasilan utama. Platform-nya user-friendly dan brandnya beneran legit!",
    earned: "Rp 24.2jt"
  },
  {
    name: "Rina Kusuma",
    handle: "@rinakusuma",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    quote: "Paling suka sama briefnya yang jelas. Nggak ada lagi miskomunikasi kayak dulu. Tim support-nya juga responsif banget!",
    earned: "Rp 31.7jt"
  }];


  return (
    <section id="testimonial" className="py-24 bg-bg-primary">
      <div className="container-slabscan">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Kreator Mempercayai{" "}
            <span className="text-gradient">GIGGO</span>
          </h2>
          <p className="text-lg text-text-body max-w-2xl mx-auto">
            Ribuan kreator telah mengubah passion mereka menjadi profit
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) =>
          <div
            key={index}
            className="glass-card p-8 space-y-6 hover:shadow-glow-emerald transition-all duration-300 animate-fade-up"
            style={{ animationDelay: `${index * 0.1}s` }}>

              {/* Quote Icon */}
              <div className="flex justify-between items-start">
                <Quote className="w-8 h-8 text-brand-emerald/40" />
                <div className="bg-brand-emerald/10 border border-brand-emerald/30 rounded-full px-3 py-1">
                  <span className="text-brand-emerald text-sm font-semibold">
                    {testimonial.earned}
                  </span>
                </div>
              </div>

              {/* Quote Text */}
              <p className="text-text-body leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Creator Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-emerald/30" />

                <div>
                  <div className="text-white font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-text-muted text-sm">
                    {testimonial.handle}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-text-muted mb-4">
            Ingin jadi bagian dari mereka?
          </p>
          <a
            href="/auth"
            className="inline-flex items-center gap-2 text-brand-emerald font-semibold hover:text-brand-cyan transition-colors">

            Mulai Sekarang →
          </a>
        </div>
      </div>
    </section>);

};

export default SlabscanTestimonials;