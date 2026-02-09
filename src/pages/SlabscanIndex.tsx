import SlabscanNavbar from "@/components/landing/SlabscanNavbar";
import SlabscanHero from "@/components/landing/SlabscanHero";
import SlabscanTicker from "@/components/landing/SlabscanTicker";
import SlabscanStats from "@/components/landing/SlabscanStats";
import SlabscanComparison from "@/components/landing/SlabscanComparison";
import SlabscanFeatures from "@/components/landing/SlabscanFeatures";
import SlabscanHowItWorks from "@/components/landing/SlabscanHowItWorks";
import SlabscanTestimonials from "@/components/landing/SlabscanTestimonials";
import SlabscanShowcase from "@/components/landing/SlabscanShowcase";
import SlabscanFAQ from "@/components/landing/SlabscanFAQ";
import SlabscanCTA from "@/components/landing/SlabscanCTA";
import SlabscanFooter from "@/components/landing/SlabscanFooter";

const SlabscanIndex = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <SlabscanNavbar />

      <main>
        <SlabscanHero />
        <SlabscanTicker />
        <SlabscanStats />
        <SlabscanComparison />
        <SlabscanFeatures />
        <SlabscanHowItWorks />
        <SlabscanTestimonials />
        <SlabscanShowcase />
        <SlabscanFAQ />
        <SlabscanCTA />
      </main>

      <SlabscanFooter />
    </div>);

};

export default SlabscanIndex;