import { TechnicalCard } from "@/components/ui/TechnicalCard";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { Building2, Users, Wallet, Shield, ArrowRight } from "lucide-react";

export function UseCasesSection() {
  const useCases = [
    {
      icon: Building2,
      title: "DAO Treasury Management",
      ref: "UC-001",
      badge: "GOVERNANCE",
      description: "Stop juggling multi-sigs across chains. One governance structure. One vote. Infinite execution. Your DAO operates with the same security and coordination whether you're on Ethereum or Arbitrum.",
      features: [
        "Weighted voting across chain treasuries",
        "Time-locked large transactions",
        "Role-based spending limits",
        "Automated rebalancing policies",
      ],
    },
    {
      icon: Users,
      title: "Family Office",
      ref: "UC-002",
      badge: "WEALTH",
      description: "Protect generational wealth with institutional-grade security. Trustee controls, social recovery, and inheritance automation—all managed from one place. Because your legacy deserves better than scattered private keys.",
      features: [
        "Multi-generational key hierarchy",
        "Trustee spending approvals",
        "Emergency recovery by guardians",
        "Inheritance automation",
      ],
    },
    {
      icon: Wallet,
      title: "Protocol-Owned Liquidity",
      ref: "UC-003",
      badge: "DEFI",
      description: "Manage LP positions across every DEX from a single control plane. Automated rebalancing, yield optimization, emergency circuits—all with 67% lower gas costs. Your protocol, everywhere.",
      features: [
        "Cross-chain LP rebalancing",
        "Yield optimization strategies",
        "Emergency withdraw circuits",
        "Gas-efficient batch operations",
      ],
    },
    {
      icon: Shield,
      title: "Corporate Treasury",
      ref: "UC-004",
      badge: "ENTERPRISE",
      description: "SOC2 and ISO27001 compliant controls for your digital assets. Separation of duties, audit logs, geographic restrictions, multi-party approvals. Board-level security for blockchain operations.",
      features: [
        "Separation of duties enforcement",
        "Compliance-ready audit logs",
        "Geographic access restrictions",
        "Multi-party approval workflows",
      ],
    },
  ];

  return (
    <section id="use-cases" className="bg-graph-paper py-24">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Use Cases
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
            Built For Those Who <span className="text-primary">Can't Afford Mistakes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Whether you're securing a DAO treasury, protecting generational wealth, or managing protocol-owned liquidity, Fulcrum gives you the infrastructure that matches the stakes.
          </p>
        </div>

        {/* Use Case Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <TechnicalCard
              key={index}
              technicalRef={useCase.ref}
              variant="elevated"
              className="space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center">
                    <useCase.icon className="w-6 h-6 text-primary-foreground" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide">
                      {useCase.title}
                    </h3>
                    <TechnicalBadge variant="secondary" className="mt-1">
                      {useCase.badge}
                    </TechnicalBadge>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground font-body">
                {useCase.description}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {useCase.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary flex-shrink-0" />
                    <span className="font-mono text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-primary hover:underline"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
            </TechnicalCard>
          ))}
        </div>
      </div>
    </section>
  );
}
