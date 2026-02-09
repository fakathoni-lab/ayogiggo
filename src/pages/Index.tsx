import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Zap, Hourglass, Folder, Box, Scale, Check,
  ChevronRight, Search, CheckCircle, ArrowRight,
  Facebook, Twitter, Instagram, Youtube, TrendingUp } from
"lucide-react";
import { Button } from "@/components/ui/button";
import ExitIntentModal from "@/components/landing/ExitIntentModal";
import SocialProofToast from "@/components/landing/SocialProofToast";
import MobileStickyCTA from "@/components/landing/MobileStickyCTA";

const Index = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section for navigation
      const sections = ["solusi", "studi-kasus", "harga"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || "");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1628] overflow-x-hidden">
      {/* Exit Intent Modal */}
      <ExitIntentModal />

      {/* Social Proof Notifications */}
      <SocialProofToast />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
      {/* 1. NAVIGATION BAR - Sticky with Blur */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ?
        "backdrop-blur-lg bg-[#0A1628]/90 border-b border-white/10 shadow-lg" :
        "bg-transparent"}`
        }>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[72px]">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-10 h-10 bg-gradient-to-br from-[#00D9FF] to-[#0EA5E9] rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">GIGGO</span>
            </div>

            {/* Center Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#solusi"
                className={`link-underline text-[1rem] font-medium transition-colors ${
                activeSection === "solusi" ? "text-white" : "text-[#94A3B8] hover:text-white"}`
                }>

                Solusi
              </a>
              <a
                href="#studi-kasus"
                className={`link-underline text-[1rem] font-medium transition-colors ${
                activeSection === "studi-kasus" ? "text-white" : "text-[#94A3B8] hover:text-white"}`
                }>

                Studi Kasus
              </a>
              <a
                href="#harga"
                className={`link-underline text-[1rem] font-medium transition-colors ${
                activeSection === "harga" ? "text-white" : "text-[#94A3B8] hover:text-white"}`
                }>

                Harga
              </a>
              <a
                href="#faq"
                className="link-underline text-[#94A3B8] hover:text-white transition-colors text-[1rem] font-medium">

                FAQ
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="hidden sm:flex text-white hover:bg-white/5 rounded-full px-6 font-semibold transition-all hover:scale-105"
                onClick={() => navigate("/login")}>

                Masuk
              </Button>
              <Button
                className="btn-ripple bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] hover:from-[#00C8EE] hover:to-[#0D94D8] text-white rounded-full px-4 sm:px-6 font-semibold shadow-lg shadow-cyan-500/30 transition-all hover:shadow-cyan-500/50 hover:scale-105"
                onClick={() => navigate("/register")}>

                Buat Campaign Kreator
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center">
        {/* Background Glow - Radial Gradient from Bottom Center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#00D9FF]/20 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />

        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00D9FF]/20 rounded-full blur-[120px] animate-rotate-gradient" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#0EA5E9]/20 rounded-full blur-[100px] animate-rotate-gradient" style={{ animationDelay: "10s" }} />
        </div>

        <div className="relative max-w-[1440px] mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-scroll-reveal">
              {/* Live Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[#00D9FF]/30 bg-[#00D9FF]/5 backdrop-blur-sm">
                <div className="w-2 h-2 bg-[#00D9FF] rounded-full animate-pulse-dot" />
                <span className="text-sm text-[#00D9FF] font-semibold tracking-wide">
                  LIVE DATA: 1,250+ Active Creators
                </span>
              </div>

              {/* Hero Title */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.2]">
                Ubah Ratusan<br />
                Pelanggan Menjadi<br />
                <span className="animate-gradient-text">Marketing Force Anda.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-[#94A3B8] leading-relaxed max-w-xl">
                Ubah dari konvensional ke arah yang lebih cerdas. Giggo Membantu marketing force untuk mem-scale kanal Anda atas konten di Tiktok.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="btn-ripple bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] hover:from-[#00C8EE] hover:to-[#0D94D8] text-white px-10 py-7 text-lg rounded-full shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] transition-all font-bold group hover:-translate-y-1"
                  onClick={() => navigate("/auth")}>

                  Buat Campaign
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-ripple border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/30 px-10 py-7 text-lg rounded-full backdrop-blur-sm transition-all font-bold hover:scale-105"
                  onClick={() => navigate("/auth")}>

                  Buat Campaign Kreator
                </Button>
              </div>
            </div>

            {/* Right - Dashboard Mockup */}
            <div className="relative animate-float" style={{ perspective: "1000px" }}>
              {/* Glow Effect Behind Dashboard */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/30 to-[#0EA5E9]/30 rounded-3xl blur-3xl glow-cyan" />

              {/* Dashboard Card */}
              <div className="bg-no-repeat bg-center bg-cover bg-[url(https://cdn.ezsite.ai/AutoDev/91934/477be035-0191-4f4d-adea-7487a914d30e.webp)] relative glass-morphism rounded-3xl p-8 shadow-2xl border-2 border-white/10 hover:border-[#00D9FF]/30 transition-all duration-500" style={{ transform: "rotateY(-5deg) rotateX(5deg)" }}>
                <div className="aspect-video bg-gradient-to-br from-[#1A2332] to-[#0F1621] rounded-2xl overflow-hidden shadow-inner relative">
                  {/* High-Quality Dashboard Mockup */}
                  <div className="absolute inset-0 p-6 flex flex-col">
                    {/* Dashboard Header with metrics */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="space-y-1">
                        <div className="text-xs text-[#94A3B8] uppercase tracking-wider font-semibold">Campaign Performance</div>
                        <div className="text-xl font-bold text-white">Active Creators</div>
                      </div>
                      <div className="flex items-center space-x-2 bg-[#00D9FF]/10 backdrop-blur-sm px-4 py-2 rounded-full border border-[#00D9FF]/30">
                        <div className="w-2 h-2 bg-[#00D9FF] rounded-full animate-pulse"></div>
                        <span className="text-xs text-[#00D9FF] font-semibold">LIVE</span>
                      </div>
                    </div>

                    {/* Chart Area with Realistic Graph */}
                    <div className="flex-1 relative mb-6">
                      <div className="absolute inset-0 flex items-end justify-between px-2 pb-2">
                        {[65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 68].map((height, i) =>
                        <div key={i} className="flex-1 mx-0.5 flex flex-col justify-end">
                            <div
                            className="w-full bg-gradient-to-t from-[#00D9FF] to-[#0EA5E9] rounded-t-sm opacity-80 hover:opacity-100 transition-all cursor-pointer hover:scale-105"
                            style={{
                              height: `${height}%`,
                              boxShadow: '0 -2px 10px rgba(0, 217, 255, 0.3)',
                              animation: `slide-up 0.6s ease-out ${i * 0.05}s both`
                            }} />

                          </div>
                        )}
                      </div>
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between opacity-10">
                        {[...Array(4)].map((_, i) =>
                        <div key={i} className="w-full h-px bg-white" />
                        )}
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                      { label: "Total Reach", value: "2.4M", trend: "+12%" },
                      { label: "Engagement", value: "8.2%", trend: "+3.1%" },
                      { label: "Conversions", value: "1,247", trend: "+25%" }].
                      map((stat, i) =>
                      <div
                        key={i}
                        className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-[#00D9FF]/20 hover:border-[#00D9FF]/40 transition-all">
                          <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider mb-1">{stat.label}</div>
                          <div className="flex items-end justify-between">
                            <div className="text-lg font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-[#10B981] font-semibold">{stat.trend}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF BAR */}
      <section className="py-16 px-4 bg-[#1A2332] border-y border-white/5">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-center text-[#94A3B8] text-sm mb-10 uppercase tracking-widest font-semibold">
            Dipercaya oleh Tim Marketing Berkapita Tinggi:
          </p>

          {/* Logo Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex items-center space-x-16 animate-logo-scroll">
              {["Spotify", "Apple", "Blibli", "Tokopedia", "Bukalapak", "Halodoc", "Spotify", "Apple", "Blibli", "Tokopedia"].map(
                (brand, i) =>
                <div
                  key={i}
                  className="text-white/40 hover:text-white/100 transition-all duration-300 font-bold text-2xl whitespace-nowrap cursor-pointer grayscale hover:grayscale-0 hover:scale-110"
                  style={{ minWidth: "200px", textAlign: "center" }}>

                    {brand}
                  </div>

              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROBLEM STATEMENT SECTION */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />

        <div className="relative max-w-[1440px] mx-auto">
          <div className="text-center mb-20 space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Sejujurnya: Influencer Marketing<br />
              Manual Itu Tidak Skalabel.
            </h2>
            <p className="text-xl text-[#94A3B8] max-w-3xl mx-auto">
              Tiga masalah utama yang pasti kamu alami saat scaling creator campaigns manually...
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
            {
              icon: Hourglass,
              title: "The Dino-Era Time-Sink",
              desc: "Planning, diskusi, dan persetujuan untuk satu Campaign bisa memakan waktu 2-4 minggu. Manual, lama, dan tidak scalable.",
              color: "#FF2FB3"
            },
            {
              icon: Folder,
              title: "The Operational Nightmare",
              desc: "Contract chaos and confusion. Managing 10+ creators = 10+ different terms, payments, dan tracking spreadsheets.",
              color: "#FF2FB3"
            },
            {
              icon: Box,
              title: "The ROI Blackbox",
              desc: "Sebagian besar brands tidak tahu data siapa spends bisa untuk hasil yang terpercaya. Hasilnya ya, ini tidak terukur lah..",
              color: "#FF2FB3"
            }].
            map((problem, i) =>
            <div
              key={i}
              className="group relative glass-morphism rounded-2xl p-8 hover:border-pink-500/30 transition-all duration-300 card-tilt">

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative space-y-6">
                  {/* Icon with Glow */}
                  <div
                  className="w-16 h-16 bg-pink-500/10 rounded-xl flex items-center justify-center ring-2 ring-pink-500/30 group-hover:ring-pink-500/50 transition-all"
                  style={{ boxShadow: `0 0 30px ${problem.color}40` }}>

                    <problem.icon className="w-8 h-8 text-pink-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white">{problem.title}</h3>
                  <p className="text-[#94A3B8] leading-relaxed text-lg">{problem.desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. SOLUTION SECTION */}
      <section id="solusi" className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A1628] via-[#162B4D] to-[#0A1628]">
        <div className="max-w-[1440px] mx-auto space-y-32">
          {/* Solution Intro */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30">
              <span className="text-sm text-[#00D9FF] font-bold tracking-widest">GIGGO:</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Sistem Operasi untuk<br />Creator Marketing Modern
            </h2>
            <p className="text-xl text-[#94A3B8] leading-relaxed">
              GIGGO adalah sistem operasi untuk pelaksanaan kampanye marketing berdasarkan aktivitas creator di social media. Get Started Campaign dengan Creators and Affiliate System.
            </p>
          </div>

          {/* Feature 1: Smart Matching */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30">
                <Search className="w-4 h-4 text-[#00D9FF]" />
                <span className="text-sm text-[#00D9FF] font-semibold">AI-POWERED</span>
              </div>

              <h3 className="text-4xl lg:text-5xl font-bold text-white">
                Smart Matching Engine
              </h3>

              <p className="text-xl text-[#94A3B8] leading-relaxed">
                Creator search dilengkapi dengan algoritma dan machine learning untuk menemukan creators yang tepat dengan audiens yang align dengan target pasar campaign.
              </p>

              <div className="space-y-4 pt-4">
                {[
                "AI-powered creator recommendations",
                "Real-time audience verification",
                "Historical performance analytics",
                "Automated matching score"].
                map((feat, i) =>
                <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#00D9FF] flex-shrink-0" />
                    <span className="text-white text-lg">{feat}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Mockup - Smart Matching */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/20 to-[#0EA5E9]/20 rounded-3xl blur-3xl group-hover:blur-[120px] transition-all duration-500" />
              <div className="relative glass-morphism rounded-3xl p-8 shadow-2xl group-hover:border-[#00D9FF]/30 transition-all duration-500">
                <div className="space-y-6">
                  <h4 className="text-white font-bold text-xl">Creator Discovery Dashboard</h4>

                  {/* Search Bar */}
                  <div className="bg-[#1A2332] rounded-xl p-4 border border-[#00D9FF]/20">
                    <div className="flex items-center space-x-3">
                      <Search className="w-5 h-5 text-[#00D9FF]" />
                      <div className="h-3 bg-white/10 rounded-full flex-1" />
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4">
                    {[
                    { label: "Match Score", value: "95%" },
                    { label: "Engagement Rate", value: "8.2%" }].
                    map((stat, i) =>
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#94A3B8]">{stat.label}</span>
                          <span className="text-[#00D9FF] font-bold">{stat.value}</span>
                        </div>
                        <div className="h-3 bg-[#1A2332] rounded-full overflow-hidden">
                          <div
                          className="h-full bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9]"
                          style={{ width: stat.value }} />

                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Approval System */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mockup - Content Approval */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-[#10B981]/20 to-[#00D9FF]/20 rounded-3xl blur-3xl group-hover:blur-[120px] transition-all duration-500" />
              <div className="relative glass-morphism rounded-3xl p-8 shadow-2xl group-hover:border-[#10B981]/30 transition-all duration-500">
                <div className="space-y-6">
                  <h4 className="text-white font-bold text-xl">Content Approval System</h4>

                  {/* Video Preview */}
                  <div className="aspect-video bg-gradient-to-br from-[#1A2332] to-[#0F1621] rounded-2xl flex items-center justify-center border border-[#00D9FF]/20">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 bg-[#00D9FF]/20 rounded-full flex items-center justify-center mx-auto">
                        <div className="w-0 h-0 border-l-[12px] border-l-[#00D9FF] border-y-[8px] border-y-transparent ml-1" />
                      </div>
                      <p className="text-[#94A3B8] text-sm">Video Preview</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/5">

                      Request Revision
                    </Button>
                    <Button className="bg-gradient-to-r from-[#10B981] to-[#00D9FF] hover:from-[#0F9A73] hover:to-[#00C8EE] text-white">
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#10B981]/10 border border-[#10B981]/30">
                <CheckCircle className="w-4 h-4 text-[#10B981]" />
                <span className="text-sm text-[#10B981] font-semibold">PROTECTED</span>
              </div>

              <h3 className="text-4xl lg:text-5xl font-bold text-white">
                Secure & Strategic
              </h3>

              <p className="text-xl text-[#94A3B8] leading-relaxed">
                GIGGO Built-in approval system untuk konten creators sebelum publishing, dan review performance real time disertakan juga.
              </p>

              <div className="space-y-4 pt-4">
                {[
                "Content preview before publish",
                "Approval workflow dengan timeline",
                "Revision tracking & history",
                "Real-time collaboration tools"].
                map((feat, i) =>
                <div key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-[#10B981] flex-shrink-0" />
                    <span className="text-white text-lg">{feat}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROOF SECTION (Stats + Testimonial) */}
      <section id="studi-kasus" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="relative glass-morphism rounded-3xl p-12 lg:p-16 overflow-hidden border-2 border-white/10">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00D9FF]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-16">
              {/* Header */}
              <div className="text-center space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Bukti Nyata: Dari Brief Menjadi Pertumbuhan Bisnis
                </h2>
                <p className="text-xl text-[#94A3B8]">
                  Campaign performance metrics dari salah satu brand yang menggunakan GIGGO
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                { num: "320", label: "Konten UGC", icon: TrendingUp },
                { num: "Rp 156", label: "CPE", icon: TrendingUp },
                { num: "5.2 Juta", label: "Views", icon: TrendingUp },
                { num: "+25%", label: "Sales Uplift", icon: TrendingUp }].
                map((stat, i) =>
                <div
                  key={i}
                  className="bg-[#1A2332]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-3 hover:border-[#00D9FF]/30 transition-all animate-count-up hover:scale-105"
                  style={{ animationDelay: `${i * 0.1}s` }}>

                    <stat.icon className="w-8 h-8 text-[#00D9FF]" />
                    <div className="text-5xl font-bold animate-gradient-text">{stat.num}</div>
                    <div className="text-white font-semibold text-lg">{stat.label}</div>
                  </div>
                )}
              </div>

              {/* Testimonial */}
              <div className="bg-[#1A2332]/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#00D9FF] to-[#0EA5E9] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/30">
                      AR
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="space-y-4 flex-1">
                    <div className="text-6xl text-[#00D9FF]/20 font-serif leading-none">"</div>
                    <blockquote className="text-xl text-white leading-relaxed">
                      GIGGO memberi kami akses ke ratusan nano-creators yang sangat terjangkau dan berhasil menurunkan Customer Acquisition Cost kami sebesar 40%. Sebelum GIGGO, kami hanya bisa mengelola max. 5 creator per campaign.
                    </blockquote>
                    <cite className="text-[#94A3B8] not-italic">
                      <div className="font-semibold text-white">— Aisyah Rahmadita</div>
                      <div>Marketing Manager, BRAND X</div>
                    </cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING MODEL SECTION */}
      <section id="harga" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Model Harga yang Masuk Akal<br />& Transparan.
            </h2>
            <p className="text-xl text-[#94A3B8]">
              No subscription fees. No hidden costs. Bayar hanya untuk campaign yang aktif.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00D9FF]/20 to-[#0EA5E9]/20 rounded-3xl blur-3xl group-hover:blur-[120px] transition-all duration-500" />

            <div className="relative glass-morphism rounded-3xl p-12 border-2 border-[#00D9FF]/30 shadow-2xl hover:shadow-[0_0_80px_rgba(0,217,255,0.4)] transition-all duration-500">
              <div className="text-center space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                  <div
                    className="w-20 h-20 bg-[#00D9FF]/10 rounded-2xl flex items-center justify-center ring-2 ring-[#00D9FF]/30"
                    style={{ boxShadow: "0 0 40px rgba(0, 217, 255, 0.3)" }}>

                    <Scale className="w-10 h-10 text-[#00D9FF]" />
                  </div>
                </div>

                <h3 className="text-4xl font-bold text-white">Pay-As-You-Go</h3>

                <div className="space-y-6 pt-4">
                  {[
                  "Balance di dashboard",
                  "Checklist campaign brief",
                  "Competitive support"].
                  map((feature, i) =>
                  <div key={i} className="flex items-center space-x-4">
                      <div className="w-6 h-6 bg-[#00D9FF] rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-lg text-left">{feature}</span>
                    </div>
                  )}
                </div>

                <p className="text-[#94A3B8] text-lg pt-4 border-t border-white/10">
                  No subscription fees. No hidden costs. Bayar hanya untuk campaign yang aktif.
                </p>

                <Button
                  size="lg"
                  className="btn-ripple w-full bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] hover:from-[#00C8EE] hover:to-[#0D94D8] text-white py-7 text-lg mt-8 rounded-full shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] transition-all font-bold group hover:-translate-y-1"
                  onClick={() => navigate("/auth")}>

                  Mulai Sekarang - Gratis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA SECTION */}
      <section className="py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Gradient Waves Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0EA5E9]/40 via-[#00D9FF]/20 to-transparent animate-wave" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0EA5E9]/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Jangan Biarkan Kompetitor Anda<br />Memonopoli Feed.
          </h2>

          <p className="text-2xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
            Dengan Gigtech setiap transaksi present, memimpin secara mudah pula.
          </p>

          <Button
            size="lg"
            className="btn-ripple bg-gradient-to-r from-[#00D9FF] to-[#0EA5E9] hover:from-[#00C8EE] hover:to-[#0D94D8] text-white px-12 py-8 text-2xl rounded-full shadow-[0_0_60px_rgba(0,217,255,0.6)] animate-pulse-glow font-bold group hover:scale-105"
            onClick={() => navigate("/auth")}>

            BUAT CAMPAIGN PERTAMA (GRATIS POSTING)
            <ArrowRight className="ml-3 w-7 h-7 group-hover:translate-x-2 transition-transform" />
          </Button>

          <p className="text-sm text-[#94A3B8] pt-6">
            *No credit card required. Campaign review gratis dari tim kami.
          </p>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer id="faq" className="border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 bg-[#0F1621]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-[#00D9FF] to-[#0EA5E9] rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">GIGGO</span>
              </div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                World-class creator marketplace untuk scaling UGC campaigns dengan smart automation.
              </p>
            </div>

            {/* Agency Partners */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">Agency Partners</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors">
                    Partnership Program
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            {/* API Documentation */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">API Documentation</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors">
                    Developer Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>

            {/* Brand Guidelines */}
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">Brand Guidelines</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors">
                    Media Kit
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#94A3B8] hover:text-white transition-colors">
                    Brand Assets
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-[#94A3B8] text-sm">
              Copyright © 2025 GIGGO. All Rights Reserved
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-6">
              {[
              { icon: Facebook, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Youtube, href: "#" }].
              map((social, i) =>
              <a
                key={i}
                href={social.href}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-all hover:scale-110">

                  <social.icon className="w-5 h-5 text-[#94A3B8] hover:text-white transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default Index;