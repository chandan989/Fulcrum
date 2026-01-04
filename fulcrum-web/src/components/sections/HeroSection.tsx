import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { ArrowRight, Shield, Layers, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative bg-graph-paper overflow-hidden">
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-border hidden lg:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-border hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-border hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-border hidden lg:block" />

      <div className="container-wide py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 animate-fade-in">
            <TechnicalBadge variant="primary" icon={<Shield className="w-3 h-3" />}>
              Critical Infrastructure
            </TechnicalBadge>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight animate-slide-in-up">
            Critical Infrastructure
            <br />
            <span className="text-primary">For The Multi-Chain Future</span>
          </h1>

          {/* Subheading */}
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-in-up stagger-1" style={{ animationDelay: "0.1s" }}>
            The first Omni-Chain Security & Governance Layer. 
            Built on Casper. Secured by Zero-Knowledge proofs.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 font-mono text-sm">
              <div className="w-2 h-2 bg-success" />
              <span>One Source of Truth</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <div className="w-2 h-2 bg-primary" />
              <span>Infinite Chain Reach</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <div className="w-2 h-2 bg-secondary" />
              <span>3× Gas Reduction</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/dashboard">
              <TechnicalButton variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Launch App
              </TechnicalButton>
            </Link>
            <a href="#architecture">
              <TechnicalButton variant="secondary" size="lg">
                Read Documentation
              </TechnicalButton>
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 pt-16 border-t-2 border-border mt-16 animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">6+</div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-1">
                Chains Supported
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">50k</div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-1">
                Gas per Verification
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-primary">100%</div>
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-1">
                Open Source
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
}
