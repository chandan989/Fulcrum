import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { ArrowRight, Github, FileText, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="bg-graph-paper py-24 relative overflow-hidden">
      {/* Grid overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-primary hidden lg:block" />
      <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-primary hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-primary hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-primary hidden lg:block" />

      <div className="container-wide relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Quote */}
          <blockquote className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight italic">
            "Give me a place to stand, and I will move the world."
          </blockquote>
          <p className="font-mono text-sm text-muted-foreground">— Archimedes</p>

          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight pt-8">
            You're Building <span className="text-primary">That Place</span>
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto">
            Start securing your multi-chain assets with a single source of truth. 
            Deploy your first Controller in minutes.
          </p>

          {/* Primary CTA */}
          <div className="pt-8">
            <Link to="/dashboard">
              <TechnicalButton
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                className="animate-pulse-glow"
              >
                Start Securing Assets
              </TechnicalButton>
            </Link>
          </div>

          {/* Secondary Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
            <a
              href="#"
              className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="#"
              className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText className="w-4 h-4" />
              Documentation
            </a>
            <a
              href="#"
              className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
