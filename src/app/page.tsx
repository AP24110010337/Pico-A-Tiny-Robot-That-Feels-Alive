import HeroSection from "@/components/sections/HeroSection";
import ScrollStory from "@/components/sections/ScrollStory";
import ProductShowcase from "@/components/sections/ProductShowcase";
import FeaturesSection from "@/components/sections/FeaturesSection";
import UseCasesSection from "@/components/sections/UseCasesSection";
import PricingSection from "@/components/sections/PricingSection";
import Footer from "@/components/sections/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ScrollStory />
      <ProductShowcase />
      <FeaturesSection />
      <UseCasesSection />
      <PricingSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
