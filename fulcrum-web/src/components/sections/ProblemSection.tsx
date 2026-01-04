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
      description: "Every chain means a new private key to secure. One compromised key = total asset loss on that chain.",
    },
    {
      icon: Users,
      title: "Governance Chaos",
      ref: "PROB-002",
      stats: [
        { value: "5", label: "Separate multi-sig setups" },
        { value: "∞", label: "Coordination overhead" },
      ],
      description: "DAOs managing assets on 5 chains need 5 separate governance structures. Policies drift, security gaps emerge.",
    },
    {
      icon: DollarSign,
      title: "Economic Cost",
      ref: "PROB-003",
      stats: [
        { value: "150k", label: "Gas for naive verification" },
        { value: "$7.50", label: "Per cross-chain operation" },
      ],
      description: "On-chain Ed25519 verification is prohibitively expensive. Innovation stays siloed to single chains.",
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
            Multi-Chain Reality is <span className="text-error">Broken</span>
          </h2>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <TechnicalCard
              key={index}
              technicalRef={problem.ref}
              className="space-y-6 animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 border-2 border-border flex items-center justify-center bg-muted">
                <problem.icon className="w-6 h-6 text-foreground" strokeWidth={2} />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-bold uppercase tracking-wide">
                {problem.title}
              </h3>

              {/* Stats */}
              <div className="space-y-3">
                {problem.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="flex items-baseline gap-3">
                    <span className="font-display text-2xl font-bold text-primary">
                      {stat.value}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {problem.description}
              </p>
            </TechnicalCard>
          ))}
        </div>
      </div>
    </section>
  );
}
