import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowUpRight } from "lucide-react";
import LogoMonogram from "@/components/shared/LogoMonogram";
import Footer from "@/components/landing/Footer";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State untuk Toggle Peran (Brand vs Creator)
  const [activeRole, setActiveRole] = useState<'brand' | 'creator'>('brand');
  const location = useLocation();
  const navigate = useNavigate();

  // Sinkronisasi state dengan URL saat ini
  useEffect(() => {
    if (location.pathname.includes('/creators')) {
      setActiveRole('creator');
    } else {
      setActiveRole('brand');
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi navigasi saat toggle diklik
  const handleRoleChange = (role: 'brand' | 'creator') => {
    setActiveRole(role);
    if (role === 'creator') {
      navigate('/creators');
    } else {
      navigate('/'); // Atau '/brands' jika Anda memiliki route terpisah
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // PostedApp Style: Vibrant Gradient Header
        isScrolled ?
        "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-md py-2" :
        "bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 py-3"
      )}>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
          {/* 1. KIRI: Branding Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <LogoMonogram size="md" variant="light" />
            </Link>
          </div>

          {/* 2. TENGAH: Segmented Toggle (Pengganti Link Teks) */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center p-1 rounded-full bg-black/10 backdrop-blur-sm border border-white/20">
              <button
                onClick={() => handleRoleChange('brand')}
                className={cn(
                  "px-6 py-1.5 rounded-full text-sm font-bold transition-all duration-300",
                  activeRole === 'brand' ?
                  "bg-white text-slate-900 shadow-sm" :
                  "text-white/90 hover:text-white"
                )}>

                For Brands
              </button>
              <button
                onClick={() => handleRoleChange('creator')}
                className={cn(
                  "px-6 py-1.5 rounded-full text-sm font-bold transition-all duration-300",
                  activeRole === 'creator' ?
                  "bg-white text-slate-900 shadow-sm" :
                  "text-white/90 hover:text-white"
                )}>

                For Creators
              </button>
            </div>
          </div>

          {/* 3. KANAN: Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/campaigns"
              className="text-sm font-bold text-white/90 hover:text-white transition-colors mr-2">

              Gigs
            </Link>

            {/* Login dengan Icon Panah (PostedApp Style - Black Button) */}
            <Button
              asChild
              className="rounded-lg bg-slate-950 text-white hover:bg-slate-800 font-bold px-5 h-10 shadow-lg border border-white/10 transition-all hover:scale-105">

              <Link to="/auth?mode=login" className="flex items-center gap-1">
                Login <ArrowUpRight className="w-4 h-4 ml-0.5" />
              </Link>
            </Button>
          </div>

          {/* Tombol Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">

              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {isMobileMenuOpen &&
      <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-border p-6 flex flex-col gap-6 shadow-xl animate-in slide-in-from-top-5 z-50">
          
          {/* Mobile Toggle Peran */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">I am a...</span>
            <div className="flex w-full p-1.5 rounded-xl bg-muted border border-border">
              <button
              onClick={() => handleRoleChange('brand')}
              className={cn(
                "flex-1 py-3 rounded-lg text-sm font-bold transition-all",
                activeRole === 'brand' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}>

                Brand
              </button>
              <button
              onClick={() => handleRoleChange('creator')}
              className={cn(
                "flex-1 py-3 rounded-lg text-sm font-bold transition-all",
                activeRole === 'creator' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              )}>

                Creator
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
            to="/campaigns"
            className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}>

              Browse Gigs
            </Link>
            <Link
            to="/auth?mode=login"
            className="px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}>

              Login
            </Link>
          </div>
          
          <Button asChild className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
            <Link to="/auth?mode=register" onClick={() => setIsMobileMenuOpen(false)}>
              Get Started Now
            </Link>
          </Button>
        </div>
      }
    </nav>);

};

/**
 * IndexLayout - Layout wrapper untuk public pages
 * Menyertakan Navbar dan Footer, dengan Outlet untuk render child routes
 */
const IndexLayout = () => {
  const mainContentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        onClick={(e) => {
          e.preventDefault();
          mainContentRef.current?.focus();
        }}>

        Skip to content
      </a>

      {/* Navbar */}
      <Navbar />

      {/* Main Content - CRITICAL: This renders child routes */}
      <div
        id="main-content"
        ref={mainContentRef}
        tabIndex={-1}
        className="flex-1 pt-16 focus:outline-none">

        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>);

};

export default IndexLayout;