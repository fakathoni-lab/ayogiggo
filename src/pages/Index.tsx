import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Zap, Play, Users, TrendingUp, ChevronRight, ArrowRight,
  Clock, FileX, HelpCircle, Sparkles, Target, Shield,
  Check, BarChart3, Facebook, Twitter, Instagram, Linkedin } from
"lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Brand logos for ticker
  const brands = ["Spotify", "Tokopedia", "Gojek", "Bukalapak", "Shopee", "Blibli", "Traveloka", "Dana"];

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      {/* === GLOBAL ATMOSPHERE === */}
      {/* Grid Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} />


      {/* Giant Glowing Orb - Top Center */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Secondary Orb - Bottom Right */}
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* === NAVIGATION === */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ?
      "backdrop-blur-xl bg-black/80 border-b border-white/10" :
      "bg-transparent"}`
      }>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => navigate("/")}>

              <div className="w-10 h-10 bg-gradient-to-br from-white to-white/80 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all">
                <Zap className="w-5 h-5 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">GIGGO</span>
            </div>

            {/* Center Links */}
            <div className="hidden md:flex items-center space-x-10">
              {["Produk", "Fitur", "Harga", "Blog"].map((item) =>
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-white transition-colors duration-300 tracking-wide">

                  {item}
                </a>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="hidden sm:flex text-white/80 hover:text-white hover:bg-white/5 rounded-full px-6 font-medium transition-all"
                onClick={() => navigate("/login")}>

                Masuk
              </Button>
              <Button
                className="bg-white text-black hover:bg-slate-200 rounded-full px-6 font-semibold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all"
                onClick={() => navigate("/register")}>

                Mulai Gratis
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* === HERO SECTION === */}
      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero Content */}
          <div className="text-center space-y-8 mb-16">
            {/* Live Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-white/80 font-medium tracking-wide">
                2,450+ Creators Active
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 leading-[1.1]">
              Ubah Pelanggan Menjadi
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                Marketing Force Anda.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              Platform all-in-one untuk menjalankan campaign creator marketing dengan skala besar.
              Otomatis, terukur, dan transparan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-slate-200 px-10 py-7 text-lg rounded-full font-semibold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all group"
                onClick={() => navigate("/register")}>

                Buat Campaign Pertama
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border border-white/20 text-white hover:bg-white/5 hover:border-white/30 px-10 py-7 text-lg rounded-full font-medium backdrop-blur-sm transition-all"
                onClick={() => navigate("/login")}>

                Lihat Demo
              </Button>
            </div>
          </div>

          {/* === BENTO DASHBOARD GRID === */}
          <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[400px] lg:h-[450px] w-full max-w-4xl mx-auto p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">

            {/* Box 1: Video Preview (Large - Left) */}
            <div className="col-span-2 row-span-2 bg-slate-900/50 rounded-xl border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
              {/* Video Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Video Label */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                  <span className="text-xs text-white/80 font-medium">Campaign Preview</span>
                </div>
              </div>

              {/* Decorative Grid Lines */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
                <div className="absolute left-1/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
                <div className="absolute left-2/3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
              </div>
            </div>

            {/* Box 2: Active Creators (Top Right) */}
            <div className="col-span-1 bg-slate-900/50 rounded-xl border border-white/5 p-4 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/50 uppercase tracking-wider font-medium">Active Creators</span>
                <Users className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
              </div>

              {/* Avatar Stack */}
              <div className="flex -space-x-3 mb-3">
                {[
                "bg-gradient-to-br from-pink-400 to-rose-500",
                "bg-gradient-to-br from-blue-400 to-cyan-500",
                "bg-gradient-to-br from-purple-400 to-violet-500",
                "bg-gradient-to-br from-amber-400 to-orange-500",
                "bg-gradient-to-br from-emerald-400 to-teal-500"].
                map((gradient, i) =>
                <div
                  key={i}
                  className={`w-9 h-9 ${gradient} rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-white`}>

                    {["AR", "BK", "CL", "DM", "EV"][i]}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">1,247</span>
                <span className="text-xs text-emerald-400 font-medium">+12%</span>
              </div>
            </div>

            {/* Box 3: Revenue Graph (Bottom Right) */}
            <div className="col-span-1 bg-slate-900/50 rounded-xl border border-white/5 p-4 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-white/50 uppercase tracking-wider font-medium">Revenue</span>
                <TrendingUp className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
              </div>

              {/* Bar Graph */}
              <div className="flex items-end justify-between h-16 px-1">
                {[40, 65, 45, 80, 60].map((height, i) =>
                <div
                  key={i}
                  className="w-4 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-sm hover:from-cyan-400 hover:to-blue-300 transition-all cursor-pointer"
                  style={{
                    height: `${height}%`,
                    boxShadow: '0 0 10px rgba(6, 182, 212, 0.4)'
                  }} />

                )}
              </div>

              <div className="flex items-center space-x-2 mt-3">
                <span className="text-lg font-bold text-white">Rp 24.5M</span>
                <span className="text-xs text-emerald-400 font-medium">+28%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === LOGO TICKER (Infinite Scroll) === */}
      <section className="relative z-10 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm text-white/40 uppercase tracking-[0.2em] mb-10 font-medium">
            Dipercaya oleh brand-brand terkemuka
          </p>

          {/* Infinite Scroll Container */}
          <div className="relative overflow-hidden">
            {/* Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

            {/* Scrolling Content */}
            <div className="flex animate-logo-scroll">
              {[...brands, ...brands, ...brands].map((brand, i) =>
              <div
                key={i}
                className="flex-shrink-0 mx-12 text-2xl font-bold text-white/30 hover:text-white/80 transition-all duration-300 cursor-pointer tracking-wide">

                  {brand}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* === PROBLEM SECTION (Spotlight Cards) === */}
      <section className="relative z-10 py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">
              Marketing Creator Manual
              <br />
              Sudah Tidak Skalabel.
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Tiga masalah klasik yang menghambat pertumbuhan campaign creator Anda.
            </p>
          </div>

          {/* Problem Cards - Spotlight Effect */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
            {
              icon: Clock,
              title: "Time-Sink Manual",
              desc: "Planning, negosiasi, dan approval untuk satu campaign bisa memakan 2-4 minggu. Tidak scalable.",
              gradient: "from-red-500/20 to-orange-500/10"
            },
            {
              icon: FileX,
              title: "Operational Chaos",
              desc: "Managing 20+ creators = 20+ kontrak berbeda, payment schedules, dan tracking spreadsheets.",
              gradient: "from-amber-500/20 to-yellow-500/10"
            },
            {
              icon: HelpCircle,
              title: "ROI Blackbox",
              desc: "Tidak ada visibility data real-time. Budget habis tapi impact tidak terukur jelas.",
              gradient: "from-purple-500/20 to-pink-500/10"
            }].
            map((problem, i) =>
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 p-8 hover:border-white/20 hover:bg-white/5 transition-all duration-300">

                {/* Hover Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${problem.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative space-y-6">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
                    <problem.icon className="w-7 h-7 text-white/60 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-semibold text-white group-hover:text-white/90 transition-colors">
                    {problem.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed group-hover:text-white/60 transition-colors">
                    {problem.desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* === SOLUTION SECTION === */}
      <section id="fitur" className="relative z-10 py-32 px-6 lg:px-8">
        {/* Accent Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" strokeWidth={1.5} />
              <span className="text-sm text-cyan-400 font-medium tracking-wide">Solusi GIGGO</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">
              Satu Platform,
              <br />
              Semua Solusi.
            </h2>
          </div>

          {/* Solution Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            {[
            {
              icon: Target,
              title: "Smart Matching",
              desc: "AI-powered creator discovery. Temukan creators dengan audience yang tepat dalam hitungan detik.",
              accentColor: "cyan"
            },
            {
              icon: BarChart3,
              title: "Real-time Analytics",
              desc: "Dashboard lengkap dengan metrics yang actionable. Track ROI setiap rupiah yang dikeluarkan.",
              accentColor: "blue"
            },
            {
              icon: Shield,
              title: "Secure Workflow",
              desc: "Escrow payment, content approval, dan contract automation. Semua aman dan terdokumentasi.",
              accentColor: "purple"
            }].
            map((solution, i) =>
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 p-8 hover:border-white/20 hover:bg-white/5 transition-all duration-300">

                <div className="space-y-6">
                  {/* Icon with glow */}
                  <div className={`w-14 h-14 bg-${solution.accentColor}-500/10 rounded-xl flex items-center justify-center border border-${solution.accentColor}-500/20 shadow-[0_0_30px_rgba(6,182,212,0.2)]`}>
                    <solution.icon className={`w-7 h-7 text-${solution.accentColor}-400`} strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-semibold text-white">
                    {solution.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {solution.desc}
                  </p>

                  {/* Learn More Link */}
                  <a
                  href="#"
                  className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors group/link">

                    Pelajari lebih lanjut
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* === STATS SECTION === */}
      <section className="relative z-10 py-24 px-6 lg:px-8 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
            { value: "340%", label: "Avg. ROI" },
            { value: "2.4M+", label: "Creator Reach" },
            { value: "500+", label: "Brands Active" },
            { value: "Rp 8.2B", label: "GMV Processed" }].
            map((stat, i) =>
            <div key={i} className="text-center space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* === PRICING SECTION === */}
      <section id="harga" className="relative z-10 py-32 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60">
              Harga Transparan.
              <br />
              Tanpa Hidden Fees.
            </h2>
            <p className="text-lg text-white/50">
              Bayar hanya untuk campaign yang berjalan. Tidak ada subscription bulanan.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />

            <div className="relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-10 hover:border-white/20 transition-all">
              <div className="text-center space-y-8">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  <span className="text-sm text-cyan-400 font-medium">Pay-As-You-Go</span>
                </div>

                <div className="space-y-6">
                  {[
                  "Balance top-up fleksibel",
                  "Dashboard analytics lengkap",
                  "Priority support 24/7",
                  "Content approval workflow"].
                  map((feature, i) =>
                  <div key={i} className="flex items-center space-x-4">
                      <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-cyan-400" />
                      </div>
                      <span className="text-white/80 text-lg">{feature}</span>
                    </div>
                  )}
                </div>

                <Button
                  size="lg"
                  className="w-full bg-white text-black hover:bg-slate-200 py-7 text-lg rounded-full font-semibold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all group"
                  onClick={() => navigate("/register")}>

                  Mulai Sekarang — Gratis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-sm text-white/40">
                  *Tidak perlu kartu kredit. Setup dalam 5 menit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FINAL CTA === */}
      <section className="relative z-10 py-32 px-6 lg:px-8">
        {/* Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/60 leading-[1.1]">
            Siap Dominasi
            <br />
            Feed Kompetitor Anda?
          </h2>

          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Join 500+ brand yang sudah menggunakan GIGGO untuk scaling creator campaigns mereka.
          </p>

          <Button
            size="lg"
            className="bg-white text-black hover:bg-slate-200 px-12 py-8 text-xl rounded-full font-semibold shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] transition-all group"
            onClick={() => navigate("/register")}>

            BUAT CAMPAIGN PERTAMA
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="relative z-10 border-t border-white/5 overflow-hidden">
        {/* Giant GIGGO Text (Artistic Background) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          <span className="text-[10rem] sm:text-[14rem] lg:text-[18rem] font-bold text-white/[0.03] tracking-tighter whitespace-nowrap">
            GIGGO
          </span>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-white to-white/80 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-black" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">GIGGO</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                Platform all-in-one untuk scaling creator marketing campaigns dengan otomasi dan transparansi.
              </p>
            </div>

            {/* Links */}
            {[
            { title: "Produk", links: ["Features", "Pricing", "API"] },
            { title: "Resources", links: ["Documentation", "Blog", "Case Studies"] },
            { title: "Company", links: ["About", "Careers", "Contact"] }].
            map((col, i) =>
            <div key={i}>
                <h4 className="font-semibold text-white mb-6 text-sm uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-4">
                  {col.links.map((link) =>
                <li key={link}>
                      <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-white/30">
              © 2025 GIGGO. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) =>
              <a
                key={i}
                href="#"
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110">

                  <Icon className="w-4 h-4 text-white/40 hover:text-white transition-colors" strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* === CUSTOM STYLES === */}
      <style>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        .animate-logo-scroll {
          animation: logo-scroll 30s linear infinite;
        }

        .animate-logo-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>);

};

export default Index;