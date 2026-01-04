import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { Check } from "lucide-react";

export function SpecsSection() {
  const specs = [
    {
      chain: "Ethereum",
      status: "Live",
      verification: "ZK-SNARK Groth16",
      gasAvg: "~50,000",
      security: "Hardware + Social",
      governance: "Weighted Multi-sig",
    },
    {
      chain: "Base",
      status: "Live",
      verification: "ZK-SNARK Groth16",
      gasAvg: "~48,000",
      security: "Hardware + Social",
      governance: "Weighted Multi-sig",
    },
    {
      chain: "BSC",
      status: "Live",
      verification: "ZK-SNARK Groth16",
      gasAvg: "~52,000",
      security: "Hardware + Social",
      governance: "Weighted Multi-sig",
    },
    {
      chain: "Arbitrum",
      status: "Live",
      verification: "ZK-SNARK Groth16",
      gasAvg: "~45,000",
      security: "Hardware + Social",
      governance: "Weighted Multi-sig",
    },
    {
      chain: "Polygon",
      status: "Beta",
      verification: "ZK-SNARK Groth16",
      gasAvg: "~49,000",
      security: "Hardware + Social",
      governance: "Weighted Multi-sig",
    },
    {
      chain: "Optimism",
      status: "Beta",
      verification: "ZK-SNARK Groth16",
      gasAvg: "~47,000",
      security: "Hardware + Social",
      governance: "Weighted Multi-sig",
    },
  ];

  return (
    <section className="bg-card py-24 border-y-2 border-border">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Specifications
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
            Technical Specifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Detailed specifications for each supported chain. All chains use the same 
            Casper-based security model with ZK-verified signature verification.
          </p>
        </div>

        {/* Specifications Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Chain</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Avg Gas</th>
                <th>Security Model</th>
                <th>Governance</th>
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary" />
                      <span className="font-display font-bold">{spec.chain}</span>
                    </div>
                  </td>
                  <td>
                    <TechnicalBadge
                      variant={spec.status === "Live" ? "success" : "warning"}
                      icon={spec.status === "Live" ? <Check className="w-3 h-3" /> : undefined}
                    >
                      {spec.status}
                    </TechnicalBadge>
                  </td>
                  <td className="font-mono text-sm">{spec.verification}</td>
                  <td className="font-mono text-sm">{spec.gasAvg}</td>
                  <td className="font-mono text-sm">{spec.security}</td>
                  <td className="font-mono text-sm">{spec.governance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Notes */}
        <div className="mt-8 p-4 bg-muted border-2 border-border">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0" />
            <p className="text-sm text-muted-foreground font-body">
              <span className="font-semibold text-foreground">Note:</span> All gas estimates are 
              based on current network conditions. Actual costs may vary. Beta chains are fully 
              functional but undergoing additional security audits before mainnet deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
