import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { SpecsSection } from "@/components/sections/SpecsSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <ArchitectureSection />
        <TechnologySection />
        <UseCasesSection />
        <SpecsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
