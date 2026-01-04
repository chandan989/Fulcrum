import { TechnicalCard } from "@/components/ui/TechnicalCard";
import { Shield, Users, DollarSign, AlertTriangle } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: Shield,
      title: "Security Fragmentation",
      ref: "PROB-001",
      stats: [
        { value: "$3.8B", label: "Lost to key theft in 2024" },
        { value: "4.2", label: "Wallets per user across chains" },
      ],
      description: "Every new chain forces you to manage another private key. One slip, one phishing attack, one compromised device—and you lose everything on that chain. In 2024 alone, $3.8B vanished due to key theft.",
    },
    {
      icon: Users,
      title: "Governance Chaos",
      ref: "PROB-002",
      stats: [
        { value: "5", label: "Separate multi-sig setups" },
        { value: "∞", label: "Coordination overhead" },
      ],
      description: "Managing a DAO across 5 chains? You're juggling 5 separate multi-sigs, 5 different approval processes, and infinite coordination headaches. Security policies drift. Gaps emerge. Risk compounds.",
    },
    {
      icon: DollarSign,
      title: "Economic Cost",
      ref: "PROB-003",
      stats: [
        { value: "150k", label: "Gas for naive verification" },
        { value: "$7.50", label: "Per cross-chain operation" },
      ],
      description: "Want to verify an Ed25519 signature on-chain? That'll cost you 150,000 gas—about $7.50 per operation. This economic barrier keeps innovation locked in silos, preventing true cross-chain collaboration.",
    },
  ];

  return (
    <section className="bg-card py-24 border-y-2 border-border">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-warning">
              The Problem
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight">
            The <span className="text-error">Multi-Chain Nightmare</span>
          </h2>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <TechnicalCard
              key={index}
              technicalRef={problem.ref}
              className="space-y-6 animate-slide-in-up group hover:border-primary/50 transition-colors duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 border-2 border-border flex items-center justify-center bg-muted group-hover:bg-primary/10 group-hover:border-primary/50 transition-all duration-300">
                <problem.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" strokeWidth={2} />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold uppercase tracking-wide group-hover:text-primary transition-colors">
                {problem.title}
              </h3>

              {/* Stats */}
              <div className="space-y-3">
                {problem.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="flex items-baseline gap-3">
                    <span className="font-display text-2xl font-bold text-primary group-hover:text-foreground transition-colors">
                      {stat.value}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground font-body leading-relaxed group-hover:text-foreground transition-colors">
                {problem.description}
              </p>
            </TechnicalCard>
          ))}
        </div>
      </div>
    </section>
  );
}
