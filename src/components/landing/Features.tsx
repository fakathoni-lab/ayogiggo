import { useTranslation } from "react-i18next";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Megaphone,
  Video,
  Trophy,
  DollarSign,
  BarChart3,
  ShieldCheck,
  LucideIcon } from
"lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

// --- Types ---
interface FeatureItem {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  gradient: string; // Gradient class for the icon background
  iconColor: string; // Tailwind class for icon color
  spotlightColor: string; // Hex or rgba color for the hover glow
}

const Features = () => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  // Data Feature with "Cosmic" styling and specific spotlight colors
  const features: FeatureItem[] = [
  {
    icon: Megaphone,
    titleKey: "features.launchGigs.title",
    descriptionKey: "features.launchGigs.description",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    spotlightColor: "rgba(34, 211, 238, 0.15)" // Cyan
  },
  {
    icon: Video,
    titleKey: "features.collectEntries.title",
    descriptionKey: "features.collectEntries.description",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    spotlightColor: "rgba(192, 132, 252, 0.15)" // Purple
  },
  {
    icon: Trophy,
    titleKey: "features.challengeSystem.title",
    descriptionKey: "features.challengeSystem.description",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    spotlightColor: "rgba(251, 191, 36, 0.15)" // Amber
  },
  {
    icon: DollarSign,
    titleKey: "features.easyPayouts.title",
    descriptionKey: "features.easyPayouts.description",
    gradient: "from-emerald-500/20 to-green-500/20",
    iconColor: "text-emerald-400",
    spotlightColor: "rgba(52, 211, 153, 0.15)" // Emerald
  },
  {
    icon: BarChart3,
    titleKey: "features.analyticsHub.title",
    descriptionKey: "features.analyticsHub.description",
    gradient: "from-blue-500/20 to-indigo-500/20",
    iconColor: "text-blue-400",
    spotlightColor: "rgba(96, 165, 250, 0.15)" // Blue
  },
  {
    icon: ShieldCheck,
    titleKey: "features.verifiedProfiles.title",
    descriptionKey: "features.verifiedProfiles.description",
    gradient: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-400",
    spotlightColor: "rgba(251, 113, 133, 0.15)" // Rose
  }];


  return (
    <section className="py-24 md:py-32 bg-[#0F172A] relative overflow-hidden">
      
      {/* Background Decor (Subtle Grid & Glows) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">

            {t("features.title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 animate-gradient-x">
              {t("features.titleHighlight")}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl leading-relaxed">

            {t("features.subtitle")}
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) =>
          <FeatureCard
            key={index}
            feature={feature}
            index={index}
            prefersReducedMotion={prefersReducedMotion} />

          )}
        </div>
      </div>
    </section>);

};

// --- Sub Component: Feature Card with Optimized Spotlight Effect ---
const FeatureCard = ({
  feature,
  index,
  prefersReducedMotion




}: {feature: FeatureItem;index: number;prefersReducedMotion: boolean;}) => {
  const { t } = useTranslation();
  // Using MotionValues for high-performance mouse tracking (no re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) opacity.set(1);
  };

  const handleMouseLeave = () => {
    if (!prefersReducedMotion) opacity.set(0);
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl border border-white/5 bg-[#1E293B]/40 backdrop-blur-sm overflow-hidden hover:border-white/10 transition-colors duration-300">

      {/* Dynamic Spotlight Gradient Overlay */}
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${feature.spotlightColor},
              transparent 40%
            )
          `
        }} />

      
      {/* Noise Texture for Premium Feel */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none" />

      <div className="relative h-full p-8 flex flex-col z-10">
        {/* Icon Container */}
        <div className={cn(
          "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] bg-gradient-to-br border border-white/5",
          feature.gradient
        )}>
          <feature.icon className={cn("w-7 h-7 transition-colors duration-300", feature.iconColor)} />
        </div>

        {/* Content */}
        <h3 className="font-display text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-50 transition-colors">
          {t(feature.titleKey)}
        </h3>
        
        <p className="text-slate-400 text-base leading-relaxed flex-grow group-hover:text-slate-300 transition-colors">
          {t(feature.descriptionKey)}
        </p>
      </div>
    </motion.div>);

};

export default Features;