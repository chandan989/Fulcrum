import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { Layers, Lock, Cpu, Globe } from "lucide-react";

export function ArchitectureSection() {
  const layers = [
    {
      icon: Lock,
      name: "Security Layer",
      description: "Casper Network",
      details: "Your single source of truth. All keys, all policies, all governance—secured on Casper with Ed25519 signatures, weighted multi-sig, and social recovery. One place to protect. One place to control.",
      badge: "CONTROLLER",
    },
    {
      icon: Cpu,
      name: "Infrastructure Layer",
      description: "ZK Prover Network",
      details: "The invisible bridge. Our ZK Prover Network generates Groth16 proofs that make Ed25519 verification economically viable on EVM chains. You don't see it. You just benefit from it.",
      badge: "RELAYER",
    },
    {
      icon: Globe,
      name: "Execution Layer",
      description: "EVM Chains",
      details: "Your presence everywhere. Smart contract Avatars on every EVM chain—Ethereum, Base, BSC, Arbitrum, and beyond. They execute your intent, verified by zero-knowledge proofs, controlled from Casper.",
      badge: "AVATAR",
    },
  ];

  return (
    <section id="architecture" className="bg-graph-paper py-24">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Architecture
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
            Elegant Architecture, <span className="text-primary">Infinite Power</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Three layers working in perfect harmony: Casper anchors your security, ZK proofs bridge the cryptographic gap, and your Avatars execute everywhere. One decision, infinite reach.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-16">
          <ArchitectureDiagram />
        </div>

        {/* Layer Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {layers.map((layer, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border p-6 space-y-4 relative"
              style={{ boxShadow: "6px 6px 0px hsl(214 20% 88%)" }}
            >
              {/* Corner bracket */}
              <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-primary" />

              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 border-2 border-border flex items-center justify-center bg-muted">
                  <layer.icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <TechnicalBadge variant="primary">{layer.badge}</TechnicalBadge>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide mb-1">
                  {layer.name}
                </h3>
                <p className="font-mono text-sm text-primary mb-2">
                  {layer.description}
                </p>
                <p className="text-sm text-muted-foreground font-body">
                  {layer.details}
                </p>
              </div>

              {/* Number indicator */}
              <div className="absolute bottom-4 right-4 font-display text-4xl font-bold text-border-secondary">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
