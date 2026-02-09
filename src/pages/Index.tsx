import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Zap, Users, Clock, FileX2, HelpCircle, TrendingUp,
  Shield, Sparkles, ChevronRight, Play, Check, ArrowRight,
  Search, Workflow, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-50">Giggo</span>
              </Link>
            </div>

            {/* Center Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-400 hover:text-slate-50 transition-colors text-sm">Features</a>
              <a href="#how-it-works" className="text-slate-400 hover:text-slate-50 transition-colors text-sm">How It Works</a>
              <a href="#pricing" className="text-slate-400 hover:text-slate-50 transition-colors text-sm">Pricing</a>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-slate-400 hover:text-slate-50 hover:bg-white/5"
                onClick={() => navigate("/auth")}
              >
                Masuk
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30"
                onClick={() => navigate("/auth")}
              >
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-slate-950 to-slate-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto text-center space-y-8">
          {/* Live Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-slate-300">LIVE DATA: 1,250+ Active Creators</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-50 leading-tight">
            Ubah Ratusan Pelanggan<br />
            Menjadi{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Marketing Force
            </span>{" "}
            Anda.
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto">
            Platform UGC marketplace end-to-end. Tanpa spreadsheet, tanpa drama.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg shadow-lg shadow-blue-600/30 group"
              onClick={() => navigate("/auth")}
            >
              Mulai Skalakan Campaign
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-slate-300 hover:bg-white/5 px-8 py-6 text-lg group"
            >
              <Play className="mr-2 w-5 h-5" />
              Tonton Demo
            </Button>
          </div>

          {/* Dashboard Mockup */}
          <div className="relative mt-16 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all" />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/50">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-slate-400 text-lg">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-500 text-sm mb-8">Dipercaya oleh brand terkemuka</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
            {["Brand A", "Brand B", "Brand C", "Brand D"].map((brand, i) => (
              <div
                key={i}
                className="text-slate-600 hover:text-slate-400 transition-colors font-bold text-xl cursor-pointer"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
              Familiar dengan Masalah Ini?
            </h2>
            <p className="text-slate-400 text-lg">Campaign UGC yang harusnya simple, tapi...</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Waktu Terbuang",
                desc: "15+ jam/minggu lost untuk email bolak-balik, hunting creator, & manual tracking"
              },
              {
                icon: FileX2,
                title: "Mimpi Buruk Operasional",
                desc: "Spreadsheet chaos, file attachment hilang, brief yang nggak jelas"
              },
              {
                icon: HelpCircle,
                title: "ROI Tidak Jelas",
                desc: "Budget habis tapi nggak tahu mana konten yang convert, mana yang flop"
              }
            ].map((problem, i) => (
              <div
                key={i}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-4">
                  <div className="w-14 h-14 bg-red-500/10 rounded-xl flex items-center justify-center">
                    <problem.icon className="w-7 h-7 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-50">{problem.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{problem.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="max-w-7xl mx-auto space-y-32">
          {/* Solution 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Search className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">Smart Matching</span>
              </div>
              <h3 className="text-4xl font-bold text-slate-50">
                Smart Matching Engine
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Filter 50,000+ database creator berdasarkan niche, audience demografi, engagement rate, & past performance.
                Temukan perfect fit dalam hitungan detik, bukan minggu.
              </p>
              <div className="space-y-3 pt-4">
                {["AI-powered recommendations", "Real-time analytics", "Verified portfolios"].map((feat, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 aspect-square flex items-center justify-center">
                <Search className="w-24 h-24 text-blue-400 opacity-50" />
              </div>
            </div>
          </div>

          {/* Solution 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 aspect-square flex items-center justify-center">
                <Workflow className="w-24 h-24 text-cyan-400 opacity-50" />
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <Workflow className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-300">Automation</span>
              </div>
              <h3 className="text-4xl font-bold text-slate-50">
                Automated Workflow
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                From brief creation to content approval, semua jalan otomatis. Built-in chat, file sharing, revision tracking,
                & payment release—semuanya dalam satu dashboard.
              </p>
              <div className="space-y-3 pt-4">
                {["One-click brief templates", "Automated notifications", "Integrated messaging"].map((feat, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">Security</span>
              </div>
              <h3 className="text-4xl font-bold text-slate-50">
                Secure & Strategic
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Escrow payment protection, NDA-compliant brief system, & optional Spark Ads whitelisting.
                Brand aman, creator happy, konten perform.
              </p>
              <div className="space-y-3 pt-4">
                {["Escrow protection", "Spark Ads ready", "Contract templates"].map((feat, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 aspect-square flex items-center justify-center">
                <Lock className="w-24 h-24 text-green-400 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { num: "320+", label: "Konten Dihasilkan", sub: "Per bulan" },
              { num: "5.2M", label: "Total Views", sub: "Campaign terakhir" },
              { num: "+25%", label: "Avg. Sales Lift", sub: "Client kami" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.num}
                </div>
                <div className="text-xl font-semibold text-slate-50">{stat.label}</div>
                <div className="text-slate-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-50 mb-4">
              Pricing Yang Masuk Akal
            </h2>
            <p className="text-slate-400 text-lg">Bayar sesuai yang kamu gunakan. No surprises.</p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
            <div className="relative bg-white/5 backdrop-blur-md border-2 border-blue-500/30 rounded-3xl p-10 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300 font-semibold">MOST POPULAR</span>
                </div>

                <h3 className="text-3xl font-bold text-slate-50">Pay-As-You-Go</h3>

                <div className="text-5xl font-bold text-slate-50">
                  Gratis
                  <span className="text-lg text-slate-400 font-normal ml-2">untuk posting campaign</span>
                </div>

                <div className="space-y-4 pt-6">
                  {[
                    "Posting campaign GRATIS, unlimited",
                    "Budget campaign 100% fleksibel",
                    "Fee transparan: 10% service fee",
                    "Akses database 50k+ creators",
                    "Escrow payment protection",
                    "Smart matching algorithm"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Check className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-left">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg mt-8 shadow-lg shadow-blue-600/30 group"
                  onClick={() => navigate("/auth")}
                >
                  Mulai Sekarang
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-950 to-cyan-900/30" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-50 leading-tight">
            Jangan Biarkan Kompetitor<br />
            Memonopoli Feed.
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ribuan brand sudah skalakan UGC strategy mereka. Giliran kamu.
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-8 text-xl shadow-2xl shadow-blue-600/40 group"
            onClick={() => navigate("/auth")}
          >
            BUAT CAMPAIGN PERTAMA SEKARANG
            <Sparkles className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Button>

          <p className="text-sm text-slate-500 pt-4">
            Setup dalam 5 menit. No credit card required.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-50">Giggo</span>
              </div>
              <p className="text-slate-400 text-sm">
                The world's #1 creator marketplace for brands.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-50 mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">Case Studies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-50 mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-50 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="text-slate-400 hover:text-slate-300 transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="text-slate-400 hover:text-slate-300 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-slate-500 text-sm">
              © 2026 Giggo. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">
                <Users className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-300 transition-colors">
                <TrendingUp className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
