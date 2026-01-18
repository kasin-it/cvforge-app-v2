import { Hero } from "@/app/_components/hero/hero";
import { ProblemSection } from "@/app/_components/problem-section";
import { FeaturesGrid } from "@/app/_components/features-grid";
import { BenefitsSection } from "@/app/_components/benefits-section";
import { CTASection } from "@/app/_components/cta-section";
import { FooterSection } from "@/app/_components/footer-section";
import { HowItWorksSection } from "@/app/_components/how-it-works";
import { Suspense } from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col noise-overlay overflow-x-hidden">
      <Hero />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesGrid />  
      <BenefitsSection />
      <CTASection />
      <Suspense fallback={<div>Loading...</div>}>
      <FooterSection />
      </Suspense>
    </div>
  );
}
