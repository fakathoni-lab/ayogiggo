import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Package,
  Video,
  Rocket,
  CheckCircle,
  Truck,
  DollarSign,
  Users,
  Play,
  Search,
  AlertCircle,
  CreditCard,
  Zap,
  Target,
  Clock } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// Dashboard mockup data
const dashboardMetrics = [
{ label: "Active Campaigns", value: "147", trend: "+23%", color: "text-blue-400" },
{ label: "Content Pieces", value: "8.2K", trend: "+156%", color: "text-green-400" },
{ label: "Avg. Match Score", value: "94%", trend: "+12%", color: "text-purple-400" }];


const recentApplications = [
{ creator: "Sarah Chen", followers: "245K", matchScore: 96, niche: "Fashion" },
{ creator: "Mike Torres", followers: "180K", matchScore: 94, niche: "Tech" },
{ creator: "Aisha Patel", followers: "320K", matchScore: 92, niche: "Beauty" }];



const BrandsLandingPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* ==================== SECTION 1: HERO - "Marketing Force" ==================== */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden pt-20 pb-16">
        {/* Electric Blue Aurora */}
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '4s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-left">

              <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-blue-500/10 text-blue-400 border-blue-500/30 rounded-full">
                <Zap className="w-3 h-3 mr-2 inline" />
                New: AI-Powered Creator Matching 🚀
              </Badge>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1] text-white">
                Ubah Pelanggan Menjadi{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                  Marketing Force
                </span>{' '}
                Anda. Secara Massal.
              </h1>

              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
                Platform end-to-end untuk menjalankan campaign UGC berskala besar. Dapatkan ratusan konten otentik dalam hitungan hari. Tanpa spreadsheet, tanpa drama.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/auth?mode=register&role=brand">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-base rounded-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-lg shadow-orange-500/40 transition-all">
                    MULAI SKALAKAN CAMPAIGN ANDA →
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base rounded-lg border-2 border-white/20 text-white hover:bg-white/10">
                  <Play className="mr-2 w-5 h-5" />
                  Lihat Demo 2 Menit
                </Button>
              </div>
            </motion.div>

            {/* Right: Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative">

              {/* Main Dashboard Card */}
              <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">Campaign Control</p>
                      <p className="text-slate-400 text-xs">Real-time Analytics</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400"></span>
                    <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                    <span className="h-3 w-3 rounded-full bg-green-400"></span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {dashboardMetrics.map((metric, i) =>
                  <div key={i} className="bg-slate-800/50 border border-white/5 rounded-xl p-3">
                      <p className="text-slate-400 text-xs mb-1">{metric.label}</p>
                      <p className={`text-2xl font-bold font-display ${metric.color}`}>{metric.value}</p>
                      <p className="text-green-400 text-xs mt-1">{metric.trend}</p>
                    </div>
                  )}
                </div>

                {/* Applications List */}
                <div className="space-y-2">
                  <p className="text-slate-400 text-xs font-medium mb-3">Recent Applications</p>
                  {recentApplications.map((app, i) =>
                  <div key={i} className="bg-slate-800/30 border border-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
                        <div>
                          <p className="text-white text-sm font-medium">{app.creator}</p>
                          <p className="text-slate-400 text-xs">{app.followers} • {app.niche}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-green-400 text-xs font-bold">{app.matchScore}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating stat card */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 shadow-xl border border-orange-400/20">
                  <p className="text-orange-100 text-xs mb-1">Platform Savings</p>
                  <p className="text-white text-2xl font-bold">$124K</p>
                  <p className="text-orange-200 text-xs">vs. traditional agencies</p>
                </div>
              </div>

              {/* Decorative Blobs */}
              <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -z-10 bottom-[-30px] left-[-30px] w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: THE PROBLEM - "Manual Trap" ==================== */}
      <section className="py-24 bg-slate-950/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16">

            <h2 className="font-display text-4xl md:text-5xl mb-4 text-white">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">Manual Trap</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Menjalankan campaign UGC dengan cara tradisional = mengundang chaos
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Card 1: Discovery Bottleneck */}
            <motion.div
              variants={staggerItem}
              className="group relative bg-slate-900/40 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 hover:border-red-500/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Search className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Discovery Bottleneck</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Habiskan 20 jam/minggu scrolling TikTok mencari kreator, hanya untuk di-ghosting.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Operation Nightmare */}
            <motion.div
              variants={staggerItem}
              className="group relative bg-slate-900/40 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <AlertCircle className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Operation Nightmare</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Melacak brief, produk, dan revisi di 50 tab spreadsheet yang berbeda. Error rentan terjadi.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Payment Risk */}
            <motion.div
              variants={staggerItem}
              className="group relative bg-slate-900/40 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 hover:border-red-500/50 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Payment Risk</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Transfer di muka tanpa jaminan hasil, atau pusing urus invoice ratusan kreator.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 3: AUTOMATED WORKFLOW - "Efficiency Engine" ==================== */}
      <section className="py-24 bg-[#020617]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16">

            <Badge className="mb-4 px-4 py-2 text-sm font-medium bg-green-500/10 text-green-400 border-green-500/30 rounded-full">
              <Zap className="w-3 h-3 mr-2 inline" />
              Automation-First Platform
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-white">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Efficiency Engine</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Automasi cerdas yang menghemat ratusan jam kerja manual Anda
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Feature 1: One Brief, Hundreds of Creators */}
            <motion.div
              variants={staggerItem}
              className="relative bg-slate-900/40 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/50 transition-all group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">One Brief, Hundreds of Creators</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Posting sekali, sistem kami mencarikan kreator yang relevan berdasarkan <span className="text-blue-400 font-semibold">Match Score</span>.
                </p>

                {/* Visual indicator */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-slate-400">Auto-matching aktif</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-slate-400">247 kreator terfilter</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Auto-Deadline Trigger */}
            <motion.div
              variants={staggerItem}
              className="relative bg-slate-900/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition-all group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Auto-Deadline Trigger</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Berdasarkan integrasi <span className="text-purple-400 font-semibold">Biteship</span>, deadline 3 hari dimulai otomatis saat paket status "DELIVERED".
                </p>

                {/* Timeline visualization */}
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Package className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1 h-0.5 bg-purple-500/30"></div>
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-500">
                    <span>Delivered</span>
                    <span>3 days</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Timestamped Review */}
            <motion.div
              variants={staggerItem}
              className="relative bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Video className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Timestamped Review</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Berikan feedback langsung pada detik tertentu di video untuk akurasi revisi <span className="text-cyan-400 font-semibold">100%</span>.
                </p>

                {/* Sample comment */}
                <div className="bg-slate-800/50 border border-cyan-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-cyan-400 font-mono text-xs">00:23</div>
                    <div className="flex-1 h-px bg-cyan-500/30"></div>
                  </div>
                  <p className="text-xs text-slate-400 italic">"Tambahkan logo brand di sini"</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 4: PRICING - "Pay As You Go" ==================== */}
      <section className="py-24 bg-slate-950/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16">

            <h2 className="font-display text-4xl md:text-5xl mb-4 text-white">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Zero Subscription.</span>{' '}
              Zero Setup Fee.
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Model harga yang transparan. Hanya bayar untuk hasil yang Anda terima.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Free: Post Brief */}
            <motion.div
              variants={staggerItem}
              className="relative bg-slate-900/40 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 group hover:border-green-500/60 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <Badge className="mb-4 px-3 py-1 text-xs font-bold bg-green-500/20 text-green-400 border-green-500/40 rounded-full">
                  FREE
                </Badge>
                <h3 className="text-2xl font-bold mb-2 text-white">Gratis Posting Brief</h3>
                <p className="text-slate-300 mb-6">
                  Lihat siapa yang melamar tanpa bayar sepeserpun.
                </p>

                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Unlimited campaign posts</span>
                </div>
              </div>
            </motion.div>

            {/* Escrow Security */}
            <motion.div
              variants={staggerItem}
              className="relative bg-slate-900/40 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 group hover:border-blue-500/60 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <Badge className="mb-4 px-3 py-1 text-xs font-bold bg-blue-500/20 text-blue-400 border-blue-500/40 rounded-full">
                  SECURE
                </Badge>
                <h3 className="text-2xl font-bold mb-2 text-white">Escrow Security</h3>
                <p className="text-slate-300 mb-6">
                  Dana ditahan sistem, hanya cair jika video di-approve.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">100% protection guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm">Auto-refund on rejection</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Platform Fee */}
            <motion.div
              variants={staggerItem}
              className="relative bg-gradient-to-br from-orange-600/20 to-orange-500/10 backdrop-blur-xl border border-orange-500/50 rounded-2xl p-8 group hover:border-orange-500/70 transition-all">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl" />

              <div className="relative">
                <Badge className="mb-4 px-3 py-1 text-xs font-bold bg-orange-500/30 text-orange-300 border-orange-500/60 rounded-full">
                  TRANSPARENT
                </Badge>
                <h3 className="text-2xl font-bold mb-2 text-white">Platform Fee 15%</h3>
                <p className="text-slate-300 mb-6">
                  Hanya dikenakan pada transaksi yang berhasil.
                </p>

                <div className="bg-slate-900/60 border border-orange-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">Creator Payment</span>
                    <span className="text-white font-bold">$100</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">Platform Fee (15%)</span>
                    <span className="text-orange-400 font-bold">$15</span>
                  </div>
                  <div className="border-t border-slate-700 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-white font-bold text-lg">$115</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center">
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              <span className="text-green-400 font-semibold">Hemat rata-rata $12,400</span> per campaign dibanding agency tradisional. No contracts, cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ==================== SECTION 5: FINAL CTA - "No-Brainer Offer" ==================== */}
      <section className="py-32 bg-[#020617] relative overflow-hidden">
        {/* Dramatic Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute bottom-[-30%] left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-4xl mx-auto">

            <div className="text-center mb-12">
              <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-orange-500/20 text-orange-300 border-orange-500/40 rounded-full inline-flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                Launch Your First Campaign Free
              </Badge>

              <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1]">
                Siap Skalakan{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                  UGC Marketing
                </span>{' '}
                Anda?
              </h2>

              <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Bergabung dengan 500+ brand yang sudah menghemat waktu dan biaya dengan Giggo. Setup dalam 5 menit.
              </p>

              <Link to="/auth?mode=register&role=brand">
                <Button
                  size="lg"
                  className="h-16 px-12 text-lg font-bold rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white shadow-[0_4px_20px_rgba(255,107,0,0.4)] hover:shadow-[0_6px_30px_rgba(255,107,0,0.6)] transition-all transform hover:scale-105">
                  BUAT CAMPAIGN PERTAMA (GRATIS) →
                </Button>
              </Link>

              <p className="text-slate-500 text-sm mt-6">
                No credit card required • Setup in 5 minutes • Cancel anytime
              </p>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-slate-400 text-sm">Active Brands</div>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">12K+</div>
                <div className="text-slate-400 text-sm">Verified Creators</div>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-slate-400 text-sm">Satisfaction Rate</div>
              </div>
            </motion.div>

            {/* Social Proof Quotes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://i.pravatar.cc/80?img=32"
                    alt="Sarah"
                    className="w-12 h-12 rounded-full" />

                  <div>
                    <p className="text-white font-semibold text-sm">Sarah Mitchell</p>
                    <p className="text-slate-400 text-xs">CMO, FashionTech Co</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm italic">
                  "Giggo menghemat 80% waktu kami dalam mengelola campaign UGC. ROI naik 3x lipat!"
                </p>
              </div>

              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://i.pravatar.cc/80?img=33"
                    alt="James"
                    className="w-12 h-12 rounded-full" />

                  <div>
                    <p className="text-white font-semibold text-sm">James Chen</p>
                    <p className="text-slate-400 text-xs">Founder, HealthPlus</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm italic">
                  "From zero to 200 content pieces in 2 weeks. Game changer untuk startup kami."
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>);

};

export default BrandsLandingPage;