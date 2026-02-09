import { Link, useNavigate } from "react-router-dom";
import {
  Zap, Hourglass, Folder, Box, Scale, Play, Check,
  ChevronRight, Search, BarChart3, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      {/* Navbar - Floating Glass */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-[#0B0F19]/90 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">GIGGO</span>
            </Link>

            {/* Center Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#solution" className="text-slate-300 hover:text-white transition-colors text-sm">Solusi</a>
              <a href="#case-study" className="text-slate-300 hover:text-white transition-colors text-sm">Studi Kasus</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors text-sm">Harga</a>
              <a href="#faq" className="text-slate-300 hover:text-white transition-colors text-sm">FAQ</a>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-white/5"
                onClick={() => navigate("/auth")}
              >
                Masuk
              </Button>
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-full px-6 shadow-lg shadow-cyan-500/30"
                onClick={() => navigate("/auth")}
              >
                Buat Campaign Kreator
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - The Glowing Dashboard */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Cyan Radial Gradient Background */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="space-y-8">
              {/* Live Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/5">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm text-cyan-400 font-medium">LIVE DATA: 1,250+ Active Creators</span>
              </div>

              {/* H1 */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Ubah Ratusan Pelanggan Menjadi Marketing Force Anda.
              </h1>

              {/* Subhead */}
              <p className="text-xl text-slate-400 leading-relaxed">
                Platform end-to-end untuk menjalankan UGC campaigns yang scalable. Tanpa spreadsheet, tanpa drama.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-full shadow-[0_0_30px_rgba(6,182,212,0.5)] group"
                  onClick={() => navigate("/auth")}
                >
                  Buat Campaign
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg rounded-full group"
                >
                  <Play className="mr-2 w-5 h-5" />
                  Buat Campaign Kreator
                </Button>
              </div>
            </div>

            {/* Right - Visual Dashboard */}
            <div className="relative">
              {/* Glow Behind */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl blur-3xl" />

              {/* Dashboard Mockup */}
              <div className="relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl transform perspective-1000 rotate-y-5">
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden">
                  {/* Mockup Content */}
                  <div className="p-6 space-y-4">
                    {/* Header Bar */}
                    <div className="flex items-center justify-between">
                      <div className="h-3 bg-cyan-400/50 rounded w-32" />
                      <div className="h-3 bg-slate-700 rounded w-20" />
                    </div>

                    {/* Graph Lines */}
                    <div className="space-y-3 pt-8">
                      <div className="h-2 bg-gradient-to-r from-cyan-400/80 to-transparent rounded w-3/4" />
                      <div className="h-2 bg-gradient-to-r from-cyan-400/60 to-transparent rounded w-1/2" />
                      <div className="h-2 bg-gradient-to-r from-cyan-400/40 to-transparent rounded w-2/3" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-8">
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-cyan-500/20">
                        <div className="h-2 bg-cyan-400 rounded w-12 mb-2" />
                        <div className="h-1 bg-slate-700 rounded w-full" />
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-cyan-500/20">
                        <div className="h-2 bg-cyan-400 rounded w-12 mb-2" />
                        <div className="h-1 bg-slate-700 rounded w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Trust Bar */}
      <section className="py-12 px-4 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-500 text-sm mb-8 uppercase tracking-wider">Dipercaya oleh brand terkemuka</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-40">
            {["Spotify", "Apple", "Nike", "Adidas", "Tesla"].map((brand, i) => (
              <div
                key={i}
                className="text-slate-400 hover:text-slate-300 transition-colors font-bold text-lg cursor-pointer"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section - The 3 Cards */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Sejujurnya: Influencer Marketing Manual Itu Tidak Skalabel.
            </h2>
            <p className="text-slate-400 text-lg">Kamu pasti familiar dengan masalah-masalah ini...</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Hourglass,
                title: "The Discovery Time-Sink",
                desc: "15+ jam per minggu habis untuk scroll Instagram, stalk profile, DM yang nggak dibales. Manual screening yang nggak scalable."
              },
              {
                icon: Folder,
                title: "The Operational Nightmare",
                desc: "Spreadsheet chaos, email threads panjang, file attachment hilang, brief yang nggak jelas, revisi tanpa end."
              },
              {
                icon: Box,
                title: "The ROI Blackbox",
                desc: "Budget habis tapi nggak tahu mana konten yang convert. Data scattered di berbagai platform, nggak ada single source of truth."
              }
            ].map((problem, i) => (
              <div
                key={i}
                className="group relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-pink-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 bg-pink-500/10 rounded-xl flex items-center justify-center ring-1 ring-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                    <problem.icon className="w-7 h-7 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{problem.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{problem.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section - Dark UI Preview */}
      <section id="solution" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Solution 1 - Smart Matching */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <Search className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300 font-medium">AI-POWERED</span>
              </div>
              <h3 className="text-4xl font-bold text-white">
                GIGGO: Sistem Operasi untuk UGC Campaigns
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Smart Matching Engine yang filter 50,000+ database creator berdasarkan niche, audience demografi, engagement rate, & past performance.
                Temukan perfect fit dalam hitungan detik.
              </p>
              <div className="space-y-3 pt-4">
                {["AI-powered recommendations", "Real-time verification", "Historical performance data"].map((feat, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* UI Preview Card - Smart Matching */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Smart Matching Engine</h4>
                  {/* Search Bar */}
                  <div className="bg-slate-800/50 rounded-lg p-3 border border-cyan-500/20">
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-cyan-400" />
                      <div className="h-2 bg-slate-700 rounded flex-1" />
                    </div>
                  </div>
                  {/* Progress Bars */}
                  <div className="space-y-3 pt-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Match Score</span>
                        <span className="text-cyan-400">95%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[95%]" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Engagement Rate</span>
                        <span className="text-cyan-400">8.2%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[82%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution 2 - Secure & Strategic */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* UI Preview Card - Content Approval */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Approval Konten</h4>
                  {/* Video Player Mockup */}
                  <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center border border-cyan-500/20">
                    <Play className="w-12 h-12 text-cyan-400" />
                  </div>
                  {/* Approve Button */}
                  <Button className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white">
                    <Check className="w-4 h-4 mr-2" />
                    Approve Content
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300 font-medium">PROTECTED</span>
              </div>
              <h3 className="text-4xl font-bold text-white">
                Secure & Strategic
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Escrow payment protection, NDA-compliant brief system, & optional Spark Ads whitelisting.
                Brand aman, creator happy, konten perform maksimal.
              </p>
              <div className="space-y-3 pt-4">
                {["Escrow payment system", "Contract automation", "Spark Ads integration"].map((feat, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study / Stats - The Big Numbers */}
      <section id="case-study" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 lg:p-12 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Case Study Image */}
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/50">
                      <Play className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-slate-400">Case Study Video</p>
                  </div>
                </div>
              </div>

              {/* Right - Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { num: "320", label: "Konten UGC", sub: "Per campaign" },
                  { num: "Rp 156", label: "CPE", sub: "Cost per engagement" },
                  { num: "5.2 Juta", label: "Views", sub: "Total reach" },
                  { num: "+25%", label: "Sales Uplift", sub: "Vs. control group" }
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-800/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 space-y-2">
                    <div className="text-4xl font-bold text-cyan-400">{stat.num}</div>
                    <div className="text-white font-semibold">{stat.label}</div>
                    <div className="text-slate-500 text-sm">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview - Center Focus */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Model Harga yang Masuk Akal & Transparan.
            </h2>
            <p className="text-slate-400 text-lg">No hidden fees. No surprises. Just results.</p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
            <div className="relative bg-slate-900/40 backdrop-blur-md border-2 border-cyan-500/30 rounded-3xl p-10 shadow-2xl">
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center ring-1 ring-cyan-500/30">
                    <Scale className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white">Pay-As-You-Go</h3>

                <div className="text-5xl font-bold text-white">
                  Gratis
                  <span className="text-lg text-slate-400 font-normal block mt-2">untuk posting campaign</span>
                </div>

                <div className="space-y-4 pt-6">
                  {[
                    "Posting campaign GRATIS, unlimited",
                    "Budget & budget fleksibel sesuai kebutuhan",
                    "Checklist performance tracking real-time",
                    "Competitive support & onboarding"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-left">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-6 text-lg mt-8 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] group"
                  onClick={() => navigate("/auth")}
                >
                  Mulai Sekarang - Gratis
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA - The Horizon Glow */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Bottom Glow Effect */}
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-blue-600/30 via-cyan-500/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-blue-500/40 to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Jangan Biarkan Kompetitor Anda<br />Memonopoli Feed.
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ribuan brand sudah scale UGC strategy mereka dengan GIGGO. Giliran kamu sekarang.
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-8 text-xl rounded-full shadow-[0_0_50px_rgba(6,182,212,0.6)] group"
            onClick={() => navigate("/auth")}
          >
            BUAT CAMPAIGN PERTAMA (GRATIS POSTING)
            <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>

          <p className="text-sm text-slate-500 pt-4">
            Setup dalam 5 menit • No credit card required
          </p>
        </div>
      </section>

      {/* Footer Link */}
      <footer id="faq" className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">GIGGO</span>
              </div>
              <p className="text-slate-400 text-sm">
                World-class creator marketplace for scaling UGC campaigns.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#solution" className="text-slate-400 hover:text-slate-300 transition-colors">Solusi</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-slate-300 transition-colors">Harga</a></li>
                <li><a href="#case-study" className="text-slate-400 hover:text-slate-300 transition-colors">Case Study</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">Agency Partners</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">API</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-slate-400 hover:text-slate-300 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-slate-400 hover:text-slate-300 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-slate-500 text-sm">
              © 2026 GIGGO. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">
                <BarChart3 className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">
                <Sparkles className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
