import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Rocket,
  Zap,
  Clock,
  FolderX,
  HelpCircle,
  Target,
  Workflow,
  Shield,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Play,
  Users,
  BarChart3,
  Package,
  Video,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BrandLandingV2() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* ===== SECTION 1: HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-4">
        {/* Radial Gradient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/30 rounded-full blur-[150px]" />
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Live Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-200">
                LIVE DATA: 1,250+ Active Creators Ready
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Ubah Ratusan Pelanggan Menjadi{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-transparent bg-clip-text">
                Marketing Force
              </span>{" "}
              Anda.
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Platform end-to-end untuk campaign UGC & mikro-influencer
              berskala besar. Tanpa spreadsheet, tanpa drama, kendali penuh.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/auth?mode=register&role=brand">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_rgba(59,130,246,0.7)] transition-all"
                >
                  Mulai Skalakan Campaign →
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-semibold rounded-lg border-2 border-white/20 text-white hover:bg-white/5 backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                Lihat Cara Kerjanya
              </Button>
            </div>

            {/* Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative max-w-6xl mx-auto"
            >
              {/* Main Dashboard Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_100px_rgba(59,130,246,0.3)]">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-white font-bold text-sm">
                        Campaign Dashboard
                      </p>
                      <p className="text-slate-400 text-xs">Real-time ROI</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400"></span>
                    <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                    <span className="h-3 w-3 rounded-full bg-green-400"></span>
                  </div>
                </div>

                {/* Creator Map Visualization */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <p className="text-slate-400 text-xs mb-1">
                      Active Creators
                    </p>
                    <p className="text-3xl font-bold text-blue-400">247</p>
                    <p className="text-green-400 text-xs mt-1">+18% this week</p>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <p className="text-slate-400 text-xs mb-1">Total Reach</p>
                    <p className="text-3xl font-bold text-cyan-400">5.2M</p>
                    <p className="text-green-400 text-xs mt-1">+45% growth</p>
                  </div>
                  <div className="bg-slate-800/50 border border-white/5 rounded-xl p-4">
                    <p className="text-slate-400 text-xs mb-1">Avg ROI</p>
                    <p className="text-3xl font-bold text-purple-400">320%</p>
                    <p className="text-green-400 text-xs mt-1">Above industry</p>
                  </div>
                </div>

                {/* ROI Chart Placeholder */}
                <div className="h-40 bg-slate-800/30 rounded-xl border border-white/5 flex items-end gap-2 p-4">
                  {[40, 65, 45, 80, 70, 90, 95, 100].map((height, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t opacity-80" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>

              {/* Floating Glow */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-blue-600/30 blur-3xl rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 2: SOCIAL PROOF (Logos) ===== */}
      <section className="py-16 border-y border-white/5 bg-slate-950/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-500 text-sm font-medium mb-8">
            Dipercaya oleh Tim Marketing Modern:
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:opacity-60 transition-all">
            {["TOKOPEDIA", "SHOPEE", "BLIBLI", "BUKALAPAK", "ZALORA"].map(
              (brand) => (
                <div
                  key={brand}
                  className="text-2xl font-bold text-white tracking-wider"
                >
                  {brand}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: PROBLEM (3 Columns) ===== */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Influencer Marketing Manual Itu Tidak Skalabel
            </h2>
            <p className="text-xl text-slate-400">
              Anda menghabiskan lebih banyak waktu untuk admin daripada
              strategi.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {/* Card 1 */}
            <motion.div
              variants={staggerItem}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Waktu Terbuang
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Habiskan 20+ jam/minggu scrolling medsos dan di-ghosting
                  kreator.
                </p>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={staggerItem}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-amber-500/50 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                  <FolderX className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Mimpi Buruk Operasional
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Melacak brief, pengiriman, dan revisi di 50 tab spreadsheet
                  berbeda.
                </p>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={staggerItem}
              className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-red-500/50 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                  <HelpCircle className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  ROI Tidak Jelas
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Bayar di muka tanpa jaminan hasil dan data performa yang
                  valid.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 4: SOLUTION (Zig-Zag) ===== */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Sistem Operasi untuk Creator Marketing Modern
            </h2>
          </motion.div>

          {/* Row 1: Smart Matching (Text Left, Image Right) */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-4">
                SMART MATCHING
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Temukan Ribuan Kreator yang Relevan.
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Algoritma kami memfilter 50.000+ database berdasarkan performa
                konten & audiens, bukan sekadar followers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-cyan-400" />
                <span className="text-white font-semibold">Creator Match Score</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Sarah Chen", score: 96, niche: "Fashion" },
                  { name: "Mike Torres", score: 94, niche: "Tech" },
                  { name: "Aisha Patel", score: 92, niche: "Beauty" },
                ].map((creator, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/50 border border-white/5 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                      <div>
                        <p className="text-white font-medium text-sm">
                          {creator.name}
                        </p>
                        <p className="text-slate-400 text-xs">
                          {creator.niche}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-cyan-400">
                        {creator.score}%
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Row 2: Automated Workflow (Image Left, Text Right) */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 order-2 lg:order-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <Workflow className="w-6 h-6 text-purple-400" />
                <span className="text-white font-semibold">
                  Campaign Timeline
                </span>
              </div>
              <div className="relative">
                {["Brief", "Ship", "Create", "Approve"].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 mb-4 last:mb-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        i < 3
                          ? "bg-green-500/20 text-green-400"
                          : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {i < 3 ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="font-bold text-sm">{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`h-2 rounded-full ${
                          i < 3 ? "bg-green-500/30" : "bg-slate-700"
                        }`}
                      />
                    </div>
                    <span className="text-white font-medium text-sm w-20">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-4">
                AUTOMATED WORKFLOW
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Satu Brief. Ratusan Hasil. Nol Kekacauan.
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Sistem menangani distribusi, deadline, dan revisi. Hemat 80%
                waktu admin Anda.
              </p>
            </motion.div>
          </div>

          {/* Row 3: Secure & Strategic (Text Left, Image Right) */}
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-semibold mb-4">
                SECURE & STRATEGIC
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Dana Aman, Aset Terkelola.
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed">
                Escrow payment melindungi budget Anda. Beli hak iklan (Spark
                Ads) dengan satu klik.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="aspect-video bg-slate-800/50 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <Video className="w-16 h-16 text-slate-600" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <Play className="absolute w-12 h-12 text-white" />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-green-600 hover:bg-green-500 text-white">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve & Release Payment
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  Revise
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: ROI / CASE STUDY ===== */}
      <section className="py-24 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-5xl mx-auto"
          >
            <div className="relative bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-3xl p-12 overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent" />

              <div className="relative">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Bukti Nyata: Dominasi Social Feed dalam 2 Minggu
                  </h2>
                  <p className="text-slate-400 text-lg">
                    Campaign UGC untuk brand fashion lokal
                  </p>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-2">
                      320
                    </div>
                    <p className="text-slate-300 text-lg font-medium">
                      Konten Dihasilkan
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-2">
                      5.2M
                    </div>
                    <p className="text-slate-300 text-lg font-medium">
                      Organic Views
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-2">
                      +25%
                    </div>
                    <p className="text-slate-300 text-lg font-medium">
                      Sales Uplift
                    </p>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-slate-800/50 border border-white/5 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="https://i.pravatar.cc/80?img=25"
                      alt="Testimonial"
                      className="w-14 h-14 rounded-full"
                    />
                    <div>
                      <p className="text-white font-semibold">
                        Jessica Hartono
                      </p>
                      <p className="text-slate-400 text-sm">
                        Marketing Director, LocalFashion
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 italic leading-relaxed">
                    "Giggo completely transformed our influencer strategy. We
                    went from managing 10 creators manually to scaling to 100+
                    in just 2 weeks. The ROI speaks for itself."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 6: PRICING ===== */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Model Harga Transparan
            </h2>
            <p className="text-xl text-slate-400">
              Bayar hanya untuk hasil yang Anda terima
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-xl mx-auto"
          >
            <div className="relative bg-white/5 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-10 shadow-[0_0_60px_rgba(59,130,246,0.2)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold shadow-lg">
                  MOST POPULAR
                </span>
              </div>

              <div className="text-center mb-8 pt-4">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Pay-As-You-Go
                </h3>
                <p className="text-slate-400">
                  Fleksibel untuk brand dengan berbagai ukuran
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Gratis Posting Brief Campaign",
                  "Anda Tentukan Budget Sendiri (Mulai Rp 50rb)",
                  "Service Fee Transparan (15%)",
                  "Jaminan Uang Kembali (Escrow)",
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/auth?mode=register&role=brand">
                <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg">
                  Mulai Gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 7: FINAL CTA ===== */}
      <section className="py-32 bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Jangan Biarkan Kompetitor Memonopoli Feed.
            </h2>
            <p className="text-2xl text-slate-300 mb-10">
              Setup campaign pertama hanya butuh 10 menit.
            </p>

            <Link to="/auth?mode=register&role=brand">
              <Button
                size="lg"
                className="h-16 px-12 text-lg font-bold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-[0_0_60px_rgba(59,130,246,0.6)] hover:shadow-[0_0_80px_rgba(59,130,246,0.8)] transition-all transform hover:scale-105"
              >
                BUAT CAMPAIGN PERTAMA (GRATIS) →
              </Button>
            </Link>

            <p className="text-slate-500 text-sm mt-6">
              🔒 Data Aman | 💳 Tanpa Kartu Kredit di Awal
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 8: FOOTER ===== */}
      <footer className="bg-slate-950 border-t border-white/5 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              © 2024 Giggo. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link to="/legal/terms" className="hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
              <Link to="/legal/privacy" className="hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
              <a href="mailto:support@giggo.com" className="hover:text-white transition-colors">
                Kontak
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
