import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TechnicalCard } from "@/components/ui/TechnicalCard";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import {
    Layout,
    Cpu,
    FileText,
    Workflow
} from "lucide-react";

const Documentation = () => {
    return (
        <div className="min-h-screen bg-graph-paper flex flex-col">
            <Header />

            {/* Main Content */}
            <main className="flex-1 container-wide py-12 space-y-12">
                <div className="flex items-center justify-between border-b-2 border-border pb-6">
                    <div>
                        <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground">
                            Documentation
                        </h1>
                        <p className="font-mono text-muted-foreground mt-2">
                            Technical specifications and interface protocols.
                        </p>
                    </div>
                    <TechnicalBadge variant="success" className="text-lg px-4 py-1">v.1.0.0</TechnicalBadge>
                </div>

                {/* Section 1: System Overview */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-2">
                        <Layout className="w-6 h-6 text-primary" />
                        <h2 className="font-display text-2xl font-bold uppercase tracking-wide">System Overview</h2>
                    </div>

                    <TechnicalCard technicalRef="SYS-001" className="space-y-6">
                        <p className="font-mono text-sm leading-relaxed text-muted-foreground max-w-4xl">
                            The Fulcrum Dashboard serves as the central control interface for the platform, designed effectively as a "lit drafting table."
                            It provides high-contrast, precise telemetry for cross-chain operations, avoiding decorative elements in favor of raw data visibility,
                            structural clarity, and functional density.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-muted p-6 border-2 border-border">
                                <h3 className="font-display text-base font-bold uppercase mb-2">The Workbench</h3>
                                <p className="font-mono text-xs text-muted-foreground leading-relaxed">Sterile, illuminated surface (#F4F6F8) where tools are laid out with surgical organization.</p>
                            </div>
                            <div className="bg-muted p-6 border-2 border-border">
                                <h3 className="font-display text-base font-bold uppercase mb-2">The Blueprint</h3>
                                <p className="font-mono text-xs text-muted-foreground leading-relaxed">Interfaces resemble technical drawings with sharp borders, visible lines, and explicit labeling.</p>
                            </div>
                            <div className="bg-muted p-6 border-2 border-border">
                                <h3 className="font-display text-base font-bold uppercase mb-2">The Instrument</h3>
                                <p className="font-mono text-xs text-muted-foreground leading-relaxed">Controls are tactile, high-response mechanisms (switches, toggles) rather than abstract links.</p>
                            </div>
                        </div>
                    </TechnicalCard>
                </section>

                {/* Section 2: Interface Anatomy */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-2">
                        <Cpu className="w-6 h-6 text-primary" />
                        <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Interface Anatomy</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <TechnicalCard technicalRef="ANA-001" className="space-y-4">
                            <h3 className="font-display text-lg font-bold uppercase">Zone A: Navigation Array</h3>
                            <p className="font-mono text-sm text-muted-foreground">Left Vertical Axis. A sticky control strip containing routing to major subsystems.</p>
                            <ul className="list-disc pl-4 space-y-2 font-mono text-sm text-muted-foreground">
                                <li><strong className="text-foreground">Overview:</strong> Main telemetry aggregation.</li>
                                <li><strong className="text-foreground">Controller:</strong> Global configuration.</li>
                                <li><strong className="text-foreground">Avatars:</strong> Distributed identity proxies.</li>
                                <li><strong className="text-foreground">Intents:</strong> Cross-chain execution orders.</li>
                            </ul>
                        </TechnicalCard>

                        <TechnicalCard technicalRef="ANA-002" className="space-y-4">
                            <h3 className="font-display text-lg font-bold uppercase">Zone B & C: Control & Canvas</h3>
                            <div className="space-y-4">
                                <div>
                                    <strong className="font-display text-sm uppercase block mb-1">Control Deck (Header)</strong>
                                    <p className="font-mono text-sm text-muted-foreground">Dedicated to global state management. Contains Network Status and Quick Actions.</p>
                                </div>
                                <div className="h-px bg-border-secondary" />
                                <div>
                                    <strong className="font-display text-sm uppercase block mb-1">Canvas (Workspace)</strong>
                                    <p className="font-mono text-sm text-muted-foreground">The primary grid where data widgets and operational cards are mounted.</p>
                                </div>
                            </div>
                        </TechnicalCard>
                    </div>
                </section>

                {/* Section 3: Component Specs */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-2">
                        <FileText className="w-6 h-6 text-primary" />
                        <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Component Specifications</h2>
                    </div>

                    <TechnicalCard technicalRef="SPC-001" className="space-y-8">
                        <div>
                            <h3 className="font-display text-lg font-bold uppercase mb-4">Telemetry Modules</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border border-border p-4 bg-muted/30">
                                    <div className="font-mono text-xs uppercase text-muted-foreground mb-2">STAT-001</div>
                                    <div className="font-bold text-lg">Total Assets</div>
                                    <div className="text-sm text-muted-foreground mt-1">Aggregate value of monitored assets. Delta logic: Green (+) / Red (-).</div>
                                </div>
                                <div className="border border-border p-4 bg-muted/30">
                                    <div className="font-mono text-xs uppercase text-muted-foreground mb-2">STAT-002</div>
                                    <div className="font-bold text-lg">Active Avatars</div>
                                    <div className="text-sm text-muted-foreground mt-1">Total count of deployed proxies. Context lists active chains.</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-display text-lg font-bold uppercase mb-4">Activity Logger</h3>
                            <p className="font-mono text-sm text-muted-foreground mb-4">A tabular data view showing the latest entries in the immutable ledger.</p>
                            <div className="overflow-x-auto border border-border">
                                <table className="w-full text-left font-mono text-xs">
                                    <thead className="bg-muted border-b border-border">
                                        <tr>
                                            <th className="p-3 border-r border-border">ID (Mono)</th>
                                            <th className="p-3 border-r border-border">Action</th>
                                            <th className="p-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-border-secondary">
                                            <td className="p-3 border-r border-border-secondary">0x7f...</td>
                                            <td className="p-3 border-r border-border-secondary">Transfer</td>
                                            <td className="p-3 text-success">Confirmed</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border-r border-border-secondary">0x8b...</td>
                                            <td className="p-3 border-r border-border-secondary">Swap</td>
                                            <td className="p-3 text-warning">Pending</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TechnicalCard>
                </section>


                {/* Section 5: Network Topology */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-2">
                        <Layout className="w-6 h-6 text-primary" />
                        <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Network Topology</h2>
                    </div>

                    <TechnicalCard technicalRef="NET-001" className="overflow-hidden">
                        <div className="relative h-[450px] flex justify-center items-center">
                            {/* Central Node */}
                            <div className="absolute z-10 w-24 h-24 bg-card border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                                <div className="text-center">
                                    <div className="font-display font-bold text-primary">CASPER</div>
                                    <div className="text-[10px] font-mono text-muted-foreground">Controller</div>
                                </div>
                            </div>

                            {/* Orbiting Nodes */}
                            {[0, 1, 2, 3, 4].map((i) => {
                                const angle = (i * 72) * (Math.PI / 180);
                                const radius = 140;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius;
                                return (
                                    <div key={i} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
                                        {/* Connection Line */}
                                        <div
                                            className="absolute top-1/2 left-1/2 w-[140px] h-px bg-border originating-center origin-left"
                                            style={{
                                                transform: `rotate(${i * 72 + 180}deg)`,
                                                left: '50%',
                                                top: '50%'
                                            }}
                                        />
                                        <div className="relative z-10 w-16 h-16 bg-muted border border-border rounded-lg flex flex-col items-center justify-center hover:border-primary transition-colors cursor-crosshair">
                                            <div className="font-display font-bold text-xs">CHAIN {i + 1}</div>
                                            <div className="text-[10px] font-mono text-muted-foreground">EVM</div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Orbit Ring */}
                            <div className="w-[280px] h-[280px] border border-dashed border-border rounded-full opacity-50 absolute pointer-events-none" />
                        </div>
                        <div className="mt-8 pt-4 border-t border-border text-center">
                            <p className="font-mono text-sm text-muted-foreground">
                                Star topology architecture centered on Casper for security, radiating intent execution to peripheral EVM chains.
                            </p>
                        </div>
                    </TechnicalCard>
                </section>

                {/* Section 6: Data Structures */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-2">
                        <FileText className="w-6 h-6 text-primary" />
                        <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Data Schemas</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <TechnicalCard technicalRef="DAT-001">
                            <h3 className="font-display text-sm font-bold uppercase mb-4">Intent Structure</h3>
                            <pre className="bg-muted p-4 border border-border font-mono text-xs overflow-x-auto text-muted-foreground">
                                {`{
  "intent_id": "0x7f3a...9d2c",
  "source_chain": "ETH_MAINNET",
  "target_chain": "BASE_MAINNET",
  "asset": {
    "token": "USDC",
    "amount": "1000.00"
  },
  "constraints": {
    "min_output": "995.00",
    "deadline": 1735689600
  },
  "signature": "ed25519_sig_..."
}`}
                            </pre>
                        </TechnicalCard>

                        <TechnicalCard technicalRef="DAT-002">
                            <h3 className="font-display text-sm font-bold uppercase mb-4">Avatar Config</h3>
                            <pre className="bg-muted p-4 border border-border font-mono text-xs overflow-x-auto text-muted-foreground">
                                {`{
  "avatar_address": "0x123...abc",
  "controller": "0xCASPER_KEY",
  "permissions": [
    "EXECUTE_SWAP",
    "BRIDGE_ASSETS"
  ],
  "verification_mode": "ZK_GROTH16",
  "nonce": 42,
  "status": "ACTIVE"
}`}
                            </pre>
                        </TechnicalCard>
                    </div>
                </section>

                {/* Section 7: Intent Lifecycle */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-2">
                        <Workflow className="w-6 h-6 text-primary" />
                        <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Intent Lifecycle</h2>
                    </div>

                    <TechnicalCard technicalRef="LIF-001">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { step: "01", title: "Creation", desc: "User signs intent off-chain." },
                                { step: "02", title: "Aggregation", desc: "Solver bundles intents." },
                                { step: "03", title: "Validation", desc: "Casper validates signatures." },
                                { step: "04", title: "Execution", desc: "Avatars execute on EVM." }
                            ].map((item, i) => (
                                <div key={i} className="relative group">
                                    <div className="bg-card border-2 border-border p-4 h-full hover:border-primary transition-colors">
                                        <div className="font-display text-xs font-bold text-primary mb-2">STEP {item.step}</div>
                                        <h3 className="font-display text-sm font-bold uppercase mb-2">{item.title}</h3>
                                        <p className="font-mono text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                    {i < 3 && (
                                        <div className="hidden md:block absolute top-1/2 -right-3 w-4 h-[2px] bg-border transform -translate-y-1/2 z-10" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </TechnicalCard>
                </section>

                {/* Section 8: Protocols */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3 border-b border-border pb-2">
                        <Workflow className="w-6 h-6 text-primary" />
                        <h2 className="font-display text-2xl font-bold uppercase tracking-wide">User Protocols</h2>
                    </div>

                    <TechnicalCard technicalRef="PRO-001">
                        <div className="space-y-8">
                            <div className="flex gap-4 items-start">
                                <TechnicalBadge variant="primary" className="mt-1 px-3 py-1 text-sm">1</TechnicalBadge>
                                <div>
                                    <h3 className="font-display text-base font-bold uppercase">Intent Creation</h3>
                                    <p className="font-mono text-sm text-muted-foreground mt-2 leading-relaxed">
                                        Triggered via "New Intent". User defines Source, Destination, Asset, and Amount.
                                        "Sign & Execute" validates parameters off-chain before on-chain submission.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <TechnicalBadge variant="primary" className="mt-1 px-3 py-1 text-sm">2</TechnicalBadge>
                                <div>
                                    <h3 className="font-display text-base font-bold uppercase">Avatar Deployment</h3>
                                    <p className="font-mono text-sm text-muted-foreground mt-2 leading-relaxed">
                                        User selects target chains (e.g., Optimism, Polygon). Smart contract factory deploys proxy identity to selected networks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TechnicalCard>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Documentation;
