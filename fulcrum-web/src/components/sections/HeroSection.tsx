import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Hero3DScene } from "./Hero3DScene";

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Background - Now sits on top of the graph paper but below content */}
      <Hero3DScene />


      {/* Graph Paper Pattern removed for better visibility of 3D elements */}
      {/* <div className="absolute inset-0 bg-graph-paper z-0 opacity-50 pointer-events-none" /> */}

      {/* Decorative Corners - Clean Technical Style */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary/20 corner-brackets hidden lg:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/20 corner-brackets hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/20 corner-brackets hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary/20 corner-brackets hidden lg:block" />

      <div className="container-wide relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 animate-fade-in">
            <TechnicalBadge variant="primary" icon={<Shield className="w-3 h-3" />}>
              Critical Infrastructure
            </TechnicalBadge>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-none animate-slide-in-up text-foreground">
            Secure Every Chain.
            <br />
            <span className="text-primary filter drop-shadow-sm">
              From One Place.
            </span>
          </h1>

          {/* Subheading */}
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-up stagger-1 leading-relaxed">
            The omni-chain security layer that eliminates key fragmentation, unifies governance, and slashes gas costs—<br className="hidden md:block" />
            powered by <span className="font-semibold text-foreground">Casper</span> and <span className="font-semibold text-foreground">zero-knowledge</span> proofs.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-6 pt-6 animate-slide-in-up">
            {[
              { label: "Unified Security Across All Chains", color: "bg-success" },
              { label: "Deploy Once, Control Everywhere", color: "bg-primary" },
              { label: "67% Lower Transaction Costs", color: "bg-secondary" }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 font-mono text-sm bg-surface-alt/80 border border-border-secondary px-3 py-1.5 backdrop-blur-sm">
                <div className={`w-2 h-2 ${feature.color}`} />
                <span className="text-muted-foreground font-semibold">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 animate-slide-in-up">
            <Link to="/dashboard">
              <TechnicalButton
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                className="shadow-lg hover:shadow-xl"
              >
                Launch App
              </TechnicalButton>
            </Link>
            <Link to="/docs">
              <TechnicalButton
                variant="secondary"
                size="lg"
                className="bg-card/50 hover:bg-card border-border shadow-sm hover:shadow-md"
              >
                Read Documentation
              </TechnicalButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle fade at the bottom to merge with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-1" />
    </section>
  );
}
