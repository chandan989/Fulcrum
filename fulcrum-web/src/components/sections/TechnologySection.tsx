import { GasComparison } from "@/components/ui/GasComparison";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { Zap, Check } from "lucide-react";

export function TechnologySection() {
  const solidityCode = `function executeIntent(
    Intent calldata intent,
    Groth16Proof calldata proof,
    uint256[2] calldata publicSignals
) external returns (bool) {
    // Verify ZK proof of Ed25519 signature
    require(
        zkVerifier.verifyProof(proof, publicSignals),
        "Invalid proof"
    );
    
    // Execute with confidence — 3× cheaper
    return _executeOperation(intent);
}`;

  return (
    <section id="technology" className="bg-card py-24 border-y-2 border-border">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Technology
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">
            Zero-Knowledge Cryptography
            <br />
            <span className="text-primary">At Scale</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            The key innovation: ZK-SNARKs make Ed25519 signature verification economically 
            viable on EVM chains. 3× gas reduction unlocks true cross-chain security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Gas Comparison */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide">
                Gas Cost Comparison
              </h3>
              <TechnicalBadge variant="success" icon={<Check className="w-3 h-3" />}>
                Economically Viable
              </TechnicalBadge>
            </div>
            
            <GasComparison />

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="border-2 border-border p-4 bg-card" style={{ boxShadow: "4px 4px 0px hsl(214 20% 88%)" }}>
                <div className="font-display text-2xl font-bold text-success mb-1">67%</div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Gas Reduction
                </div>
              </div>
              <div className="border-2 border-border p-4 bg-card" style={{ boxShadow: "4px 4px 0px hsl(214 20% 88%)" }}>
                <div className="font-display text-2xl font-bold text-success mb-1">$5.00</div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Saved Per TX
                </div>
              </div>
              <div className="border-2 border-border p-4 bg-card" style={{ boxShadow: "4px 4px 0px hsl(214 20% 88%)" }}>
                <div className="font-display text-2xl font-bold text-primary mb-1">~2s</div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Proof Generation
                </div>
              </div>
              <div className="border-2 border-border p-4 bg-card" style={{ boxShadow: "4px 4px 0px hsl(214 20% 88%)" }}>
                <div className="font-display text-2xl font-bold text-primary mb-1">Groth16</div>
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Proof System
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="font-display text-xl font-bold uppercase tracking-wide">
                Smart Contract Integration
              </h3>
            </div>
            
            <CodeBlock code={solidityCode} language="Solidity" />

            {/* Technical Notes */}
            <div className="bg-muted border-2 border-border p-4 space-y-3">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
                Technical Specifications
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                  <span className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0" />
                  <span>Groth16 proof system for constant-size proofs (~200 bytes)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                  <span className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0" />
                  <span>Ed25519 to secp256k1 signature conversion via Circom circuits</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                  <span className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0" />
                  <span>Powers of Tau ceremony for trusted setup (10k+ contributors)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground font-body">
                  <span className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0" />
                  <span>Future EIP-7212 integration for 95% further gas reduction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
