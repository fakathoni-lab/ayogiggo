import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  Sparkles,
  Shield,
  Wallet,
  TrendingUp,
  ChevronDown,
  Star,
  Instagram,
  Youtube,
  Twitter,
  X,
  Menu,
  DollarSign,
  Zap,
  Clock,
  CheckCircle } from
"lucide-react";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Social proof ticker data
const tickerItems = [
{ icon: "🎉", text: "Nisa A. dapat Rp 2.500.000 dari Challenge Skincare" },
{ icon: "💰", text: "Raka P. withdraw Rp 1.200.000 ke GoPay" },
{ icon: "✨", text: "52 gig aktif minggu ini" },
{ icon: "🔥", text: "Maya S. menang kontes Fashion OOTD" },
{ icon: "💸", text: "Total Rp 150jt+ sudah dibayarkan" }];


// Stats data
const stats = [
{ value: "Rp 250jt+", label: "Total Dibayarkan" },
{ value: "500+", label: "Kreator Aktif" },
{ value: "50+", label: "Brand Partner" },
{ value: "1200+", label: "Gig Selesai" }];


// Pain points vs solution
const painPoints = [
{ before: "DM brand satu-satu", after: "Browse 50+ gig aktif" },
{ before: "Nego rate yang melelahkan", after: "Harga sudah fixed & fair" },
{ before: "Sering di-ghosting", after: "Escrow 100% aman" },
{ before: "Payment nunggak berminggu", after: "Withdraw instan" },
{ before: "Butuh 10K+ followers", after: "Mulai dari 1K followers" }];


// Features
const features = [
{
  eyebrow: "DISCOVER",
  title: "Temukan Gig yang Cocok dengan Niche-mu",
  description:
  "Browse ratusan campaign dari brand ternama. Filter by kategori, platform, dan budget. Apply sekali klik.",
  benefits: [
  "Fashion & Beauty",
  "Tech & Gaming",
  "Food & Lifestyle",
  "Dan banyak lagi"]

},
{
  eyebrow: "PROTECTED",
  title: "Pembayaran 100% Dijamin",
  description:
  "Dana brand sudah di-hold sebelum kamu mulai. Tidak ada ghosting. Tidak ada drama payment.",
  benefits: [
  "Brand deposit dulu",
  "Kamu submit konten",
  "Approved = uang masuk"]

},
{
  eyebrow: "FREEDOM",
  title: "Tarik Kapan Saja, Kemana Saja",
  description:
  "Saldo langsung masuk setelah approved. Withdraw ke 10+ bank dan e-wallet. Tanpa minimum, tanpa ribet.",
  benefits: [
  "Proses 1-3 hari kerja",
  "E-wallet instan",
  "Tanpa minimum withdraw"]

}];


// How it works steps
const workflowSteps = [
{
  number: "1",
  title: "DAFTAR",
  description: "Buat akun gratis dalam 2 menit. Connect sosmed.",
  time: "~2 menit"
},
{
  number: "2",
  title: "BROWSE",
  description: "Temukan gig yang cocok dengan niche kontenmu.",
  time: "Unlimited"
},
{
  number: "3",
  title: "SUBMIT",
  description: "Upload konten ke platformmu, submit link ke GIGGO.",
  time: "~5 menit"
},
{
  number: "4",
  title: "CUAN!",
  description: "Approved = saldo masuk. Withdraw kapan saja!",
  time: "Instan"
}];


// Testimonials
const testimonials = [
{
  quote:
  "Dari cuma 3K followers, sekarang udah dapat 5 brand deal di GIGGO. Totalnya udah Rp 8 juta lebih!",
  name: "Nisa Amelia",
  handle: "@nisaamelia",
  category: "Beauty",
  followers: "12K",
  earned: "Rp 8.500.000",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
},
{
  quote:
  "Yang bikin tenang itu escrow-nya. Gak perlu takut gak dibayar.",
  name: "Raka Pratama",
  handle: "@rakatech",
  category: "Tech",
  followers: "45K",
  earned: "Rp 15.200.000",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
},
{
  quote:
  "Paling suka karena bisa withdraw ke GoPay langsung. Gak pake ribet.",
  name: "Maya Sari",
  handle: "@mayacooks",
  category: "Food",
  followers: "8K",
  earned: "Rp 4.800.000",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop"
}];


// FAQ data
const faqItems = [
{
  question: "Apakah benar-benar gratis untuk kreator?",
  answer:
  "100% gratis, selamanya. Tidak ada biaya pendaftaran, biaya per submission, atau potongan dari penghasilan kamu. GIGGO menghasilkan dari fee yang dibayar brand, bukan dari kreator."
},
{
  question: "Minimum followers berapa untuk bisa ikut?",
  answer:
  "Tidak ada minimum followers! Kami percaya kreativitas lebih penting daripada jumlah followers. Bahkan kreator dengan 1.000 followers pun sudah bisa ikut dan mendapat brand deal di GIGGO."
},
{
  question: "Bagaimana sistem pembayarannya?",
  answer:
  "Escrow system. Brand deposit dana ke GIGGO sebelum gig dimulai. Setelah kontenmu di-approve, uang langsung masuk ke saldo GIGGO-mu. Tidak ada risiko ghosting atau payment nunggak."
},
{
  question: "Platform apa saja yang didukung?",
  answer:
  "TikTok, Instagram (Feed, Reels, Story), YouTube (Video & Shorts), dan Twitter/X. Platform lain akan segera ditambahkan."
},
{
  question: "Berapa lama proses withdraw?",
  answer:
  "1-3 hari kerja untuk transfer ke rekening bank. Untuk e-wallet (GoPay, OVO, DANA, ShopeePay), prosesnya instan atau maksimal 24 jam."
},
{
  question: "Apa yang terjadi jika konten saya ditolak?",
  answer:
  "Jika ditolak, kamu akan dapat feedback dari brand. Untuk beberapa gig, kamu bisa submit ulang dengan perbaikan. Dana tetap aman di escrow sampai ada keputusan final."
}];


const CreatorsLandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(1);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* ==================== NAVBAR ==================== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        navbarScrolled ?
        "bg-background/80 backdrop-blur-xl border-b border-white/5" :
        "bg-transparent"}`
        }>

        <div className="container-custom">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">GIGGO</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#fitur"
                className="text-sm text-muted hover:text-primary transition-colors">

                Fitur
              </a>
              <a
                href="#cara-kerja"
                className="text-sm text-muted hover:text-primary transition-colors">

                Cara Kerja
              </a>
              <a
                href="#testimoni"
                className="text-sm text-muted hover:text-primary transition-colors">

                Testimoni
              </a>
              <a
                href="#faq"
                className="text-sm text-muted hover:text-primary transition-colors">

                FAQ
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/auth?mode=login">
                <button className="px-5 py-2.5 text-sm font-medium text-secondary hover:text-white transition-colors">
                  Masuk
                </button>
              </Link>
              <Link to="/auth?mode=register&role=creator">
                <button className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm">
                  Daftar Gratis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>

              {mobileMenuOpen ?
              <X className="w-6 h-6" /> :

              <Menu className="w-6 h-6" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen &&
        <div className="md:hidden bg-surface-2 border-t border-white/5">
            <div className="container-custom py-6 space-y-4">
              <a
              href="#fitur"
              className="block text-muted hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}>

                Fitur
              </a>
              <a
              href="#cara-kerja"
              className="block text-muted hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}>

                Cara Kerja
              </a>
              <a
              href="#testimoni"
              className="block text-muted hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}>

                Testimoni
              </a>
              <a
              href="#faq"
              className="block text-muted hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}>

                FAQ
              </a>
              <div className="pt-4 space-y-3">
                <Link to="/auth?mode=login" className="block">
                  <button className="w-full px-5 py-3 text-sm font-medium text-secondary border border-white/10 rounded-lg">
                    Masuk
                  </button>
                </Link>
                <Link to="/auth?mode=register&role=creator" className="block">
                  <button className="btn-primary w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm">
                    Daftar Gratis
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        }
      </nav>

      {/* ==================== SECTION 1: HERO ==================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Background Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 100%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)`
          }} />


        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-pill rounded-full text-sm text-brand-emerald mb-8">

              <Sparkles className="w-4 h-4" />
              500+ Kreator Sudah Bergabung
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6">

              GIGGO
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">

              Dapat Bayaran dari
              <br />
              Konten yang <span className="text-gradient">Kamu Cintai</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">

              Platform gig berbayar untuk content creator Indonesia.
              <br />
              Temukan brand deal, submit konten, dapat cuan. Gratis selamanya.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">

              <Link to="/auth?mode=register&role=creator">
                <button className="btn-primary glow-emerald inline-flex items-center gap-2 px-8 py-4 text-lg">
                  Daftar Sekarang — Gratis
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <a href="#cara-kerja">
                <button className="btn-secondary inline-flex items-center gap-2 px-8 py-4 text-lg">
                  Lihat Cara Kerja
                </button>
              </a>
            </motion.div>

            {/* Trust Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted">

              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-emerald" />
                Tanpa minimum followers
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-emerald" />
                Pembayaran dijamin
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-emerald" />
                Withdraw instan
              </span>
            </motion.div>

            {/* Mockup Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 relative">

              <div className="glass-card rounded-3xl p-8 max-w-3xl mx-auto glow-emerald">
                <div className="bg-surface-2 rounded-2xl h-96 flex items-center justify-center">
                  <p className="text-muted">Dashboard Mockup</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: SOCIAL PROOF TICKER ==================== */}
      <section className="relative overflow-hidden border-y border-white/5 bg-surface-1 py-4">
        <div className="flex animate-ticker">
          {[...tickerItems, ...tickerItems].map((item, index) =>
          <div
            key={index}
            className="flex-shrink-0 mx-4 px-4 py-2 glass-pill rounded-full text-sm text-secondary inline-flex items-center gap-2">

              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          )}
        </div>
      </section>

      {/* ==================== SECTION 3: STATS COUNTER ==================== */}
      <section className="py-16 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) =>
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center">

                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 4: PAIN POINTS VS SOLUTION ==================== */}
      <section className="py-24 bg-surface-1">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16">

            <p className="text-sm uppercase tracking-widest text-brand-emerald mb-4">
              KENAPA KREATOR PILIH GIGGO
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Capek Hunting Brand Deal?
              <br />
              Kami Paham Rasanya.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Before */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card rounded-2xl p-8 border-red-500/20">

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                😫 TANPA GIGGO
              </h3>
              <div className="space-y-4">
                {painPoints.map((point, index) =>
                <div key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted">{point.before}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card rounded-2xl p-8 border-brand-emerald/30 glow-emerald">

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                😊 DENGAN GIGGO
              </h3>
              <div className="space-y-4">
                {painPoints.map((point, index) =>
                <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-emerald flex-shrink-0 mt-0.5" />
                    <span className="text-secondary">{point.after}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 5: FEATURES ==================== */}
      <section id="fitur" className="py-24 bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16">

            <p className="text-sm uppercase tracking-widest text-brand-emerald mb-4">
              FITUR UTAMA
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Semua yang Kamu Butuhkan
              <br />
              untuk Dapat Cuan dari Konten
            </h2>
          </motion.div>

          <div className="space-y-24">
            {features.map((feature, index) =>
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className={`grid md:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""}`
              }>

                {/* Visual */}
                <div
                className={`${
                index % 2 === 1 ? "md:order-2" : ""}`
                }>

                  <div className="glass-card rounded-2xl p-8 glow-emerald">
                    <div className="bg-surface-2 rounded-xl h-80 flex items-center justify-center">
                      <p className="text-muted">Feature Visual</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <p className="text-xs uppercase tracking-widest text-brand-emerald mb-4">
                    {feature.eyebrow}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, i) =>
                  <li key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
                        <span className="text-secondary">{benefit}</span>
                      </li>
                  )}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 6: HOW IT WORKS ==================== */}
      <section id="cara-kerja" className="py-24 bg-surface-1">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16">

            <p className="text-sm uppercase tracking-widest text-brand-emerald mb-4">
              CARA KERJA
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              4 Langkah Menuju Cuan
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) =>
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerItem}
              className="text-center">

                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-brand-emerald/10 flex items-center justify-center mx-auto">
                    <span className="text-3xl font-bold text-gradient">
                      {step.number}
                    </span>
                  </div>
                  {index < workflowSteps.length - 1 &&
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-brand-emerald/50 to-transparent" />
                }
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-muted mb-3">{step.description}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-brand-emerald/10 text-xs text-brand-emerald">
                  {step.time}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 7: TESTIMONIALS ==================== */}
      <section id="testimoni" className="py-24 bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16">

            <p className="text-sm uppercase tracking-widest text-brand-emerald mb-4">
              KATA MEREKA
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Kreator yang Sudah Buktiin
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) =>
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerItem}
              className="glass-card rounded-2xl p-6">

                <div className="aspect-square rounded-xl mb-6 overflow-hidden">
                  <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-full h-full object-cover" />

                </div>

                <p className="text-lg text-white italic mb-6">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover" />

                  </div>
                  <div>
                    <div className="font-bold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted">
                      {testimonial.handle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div>
                    <div className="text-sm text-muted">
                      {testimonial.category} • {testimonial.followers}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-brand-emerald">
                      {testimonial.earned}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 8: FAQ ==================== */}
      <section id="faq" className="py-24 bg-surface-1">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16">

            <p className="text-sm uppercase tracking-widest text-brand-emerald mb-4">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Pertanyaan yang Sering Muncul
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) =>
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerItem}
              className="glass-card rounded-xl overflow-hidden">

                <button
                onClick={() =>
                setOpenFaqIndex(openFaqIndex === index ? null : index)
                }
                className="w-full px-6 py-5 flex items-center justify-between text-left">

                  <span className="text-lg font-semibold text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                  className={`w-5 h-5 text-brand-emerald transition-transform ${
                  openFaqIndex === index ? "rotate-180" : ""}`
                  } />

                </button>
                {openFaqIndex === index &&
              <div className="px-6 pb-5">
                    <p className="text-muted leading-relaxed">{item.answer}</p>
                  </div>
              }
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 9: FINAL CTA ==================== */}
      <section className="py-24 bg-background">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
            style={{
              background: `radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)`
            }}>

            <div className="glass-card rounded-3xl p-12 md:p-16 glow-emerald">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                SIAP DAPAT GIG PERTAMAMU?
              </h2>
              <p className="text-lg md:text-xl text-secondary mb-10 max-w-2xl mx-auto">
                Join 500+ kreator yang sudah
                <br />
                menghasilkan di GIGGO
              </p>

              <Link to="/auth?mode=register&role=creator">
                <button className="btn-primary glow-emerald inline-flex items-center gap-2 px-10 py-4 text-lg mb-8">
                  Daftar Sekarang — Gratis
                </button>
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted mb-6">
                <span className="flex items-center gap-2">
                  🔒 Data Aman
                </span>
                <span className="flex items-center gap-2">
                  💰 Escrow Protected
                </span>
                <span className="flex items-center gap-2">⭐ 4.9 Rating</span>
              </div>

              <p className="text-muted">
                Sudah punya akun?{" "}
                <Link
                  to="/auth?mode=login"
                  className="text-brand-emerald hover:underline">

                  Masuk di sini
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-surface-2 border-t border-white/5 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-3">GIGGO</h3>
              <p className="text-muted text-sm max-w-xs">
                Platform gig untuk
                <br />
                kreator Indonesia
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="text-muted hover:text-brand-emerald transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted hover:text-brand-emerald transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted hover:text-brand-emerald transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs uppercase tracking-wide text-white font-semibold mb-4">
                Platform
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/campaigns" className="text-muted hover:text-white transition-colors">
                    Cari Gig
                  </Link>
                </li>
                <li>
                  <a href="#cara-kerja" className="text-muted hover:text-white transition-colors">
                    Cara Kerja
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-muted hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wide text-white font-semibold mb-4">
                Company
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/brands" className="text-muted hover:text-white transition-colors">
                    Untuk Brand
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-muted hover:text-white transition-colors">
                    Tentang
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted hover:text-white transition-colors">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wide text-white font-semibold mb-4">
                Legal
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/terms" className="text-muted hover:text-white transition-colors">
                    Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-muted hover:text-white transition-colors">
                    Kebijakan Privasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted">
              © 2025 GIGGO. All rights reserved.
            </p>
            <p className="text-sm text-muted">Jakarta, Indonesia 🇮🇩</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default CreatorsLandingPage;