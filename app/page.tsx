import HeroSection from "@/components/sections/hero-section"
import FeaturesSection from "@/components/sections/features-section"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import ExamplesSection from "@/components/sections/examples-section"
import PricingSection from "@/components/sections/pricing-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <ExamplesSection />
      <FeaturesSection />
      <PricingSection />
    </div>
  )
}
