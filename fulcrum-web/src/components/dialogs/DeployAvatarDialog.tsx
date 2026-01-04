import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { Bot, X, Check, AlertCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

// Chain configuration with colors - Duplicate from Avatars.tsx for self-containment
const CHAINS = {
    ethereum: { name: "Ethereum", symbol: "ETH", color: "#627EEA", gasToken: "ETH" },
    base: { name: "Base", symbol: "BASE", color: "#0052FF", gasToken: "ETH" },
    arbitrum: { name: "Arbitrum", symbol: "ARB", color: "#28A0F0", gasToken: "ETH" },
    bsc: { name: "BSC", symbol: "BNB", color: "#F0B90B", gasToken: "BNB" },
    polygon: { name: "Polygon", symbol: "MATIC", color: "#8247E5", gasToken: "MATIC" },
    optimism: { name: "Optimism", symbol: "OP", color: "#FF0420", gasToken: "ETH" },
};

type ChainId = keyof typeof CHAINS;

interface DeployAvatarDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    deployedChains?: string[]; // Array of chain IDs that are already active
}

export function DeployAvatarDialog({ open, onOpenChange, deployedChains = [] }: DeployAvatarDialogProps) {
    const [selectedChain, setSelectedChain] = useState<ChainId | null>(null);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-foreground/50" onClick={() => onOpenChange(false)} />

            <div className="relative bg-card border-2 border-border w-full max-w-lg z-50" style={{ boxShadow: "12px 12px 0px hsl(214 20% 88%)" }}>
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary flex items-center justify-center">
                            <Bot className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h2 className="font-display text-lg font-bold uppercase tracking-wide">Deploy Avatar</h2>
                            <p className="font-mono text-xs text-muted-foreground">Create a new cross-chain account</p>
                        </div>
                    </div>
                    <button onClick={() => onOpenChange(false)} className="p-2 hover:bg-muted">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                    {/* Chain Selection */}
                    <div className="space-y-3">
                        <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Select Chain</label>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(CHAINS).map(([chainId, chain]) => {
                                const isDeployed = deployedChains.includes(chainId);
                                return (
                                    <button
                                        key={chainId}
                                        disabled={isDeployed}
                                        onClick={() => setSelectedChain(chainId as ChainId)}
                                        className={cn(
                                            "flex items-center gap-3 p-3 border-2 transition-all",
                                            isDeployed && "opacity-50 cursor-not-allowed",
                                            selectedChain === chainId
                                                ? "border-primary bg-primary/10"
                                                : "border-border hover:border-primary/50"
                                        )}
                                    >
                                        <div
                                            className="w-10 h-10 flex items-center justify-center border-2"
                                            style={{ backgroundColor: chain.color, borderColor: chain.color }}
                                        >
                                            <span className="font-display font-bold text-white">{chain.symbol.charAt(0)}</span>
                                        </div>
                                        <div className="text-left">
                                            <div className="font-display text-sm font-bold uppercase">{chain.name}</div>
                                            <div className="font-mono text-xs text-muted-foreground">
                                                {isDeployed ? "Deployed" : `Gas: ${chain.gasToken}`}
                                            </div>
                                        </div>
                                        {isDeployed && (
                                            <Check className="w-4 h-4 text-success ml-auto" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Initial Funding */}
                    <div className="space-y-3">
                        <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                            Initial Funding (Optional)
                        </label>
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 bg-card border-2 border-border font-mono text-sm focus:outline-none focus:border-primary"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">
                                    {selectedChain ? CHAINS[selectedChain].gasToken : "ETH"}
                                </span>
                            </div>
                        </div>
                        <p className="font-mono text-xs text-muted-foreground">
                            Funds will be transferred from your Casper Gas Vault
                        </p>
                    </div>

                    {/* Cost Estimate */}
                    {selectedChain && (
                        <div className="bg-muted border-2 border-border p-4 space-y-2">
                            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Deployment Cost</div>
                            <div className="flex justify-between items-baseline">
                                <span className="font-mono text-sm">Contract Deployment</span>
                                <span className="font-mono text-sm font-bold">~0.015 {CHAINS[selectedChain].gasToken}</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="font-mono text-sm">ZK Verification Setup</span>
                                <span className="font-mono text-sm font-bold">~0.005 {CHAINS[selectedChain].gasToken}</span>
                            </div>
                            <div className="pt-2 border-t border-border-secondary flex justify-between items-baseline">
                                <span className="font-mono text-sm font-bold">Estimated Total</span>
                                <span className="font-display text-lg font-bold text-primary">~$45.00</span>
                            </div>
                        </div>
                    )}

                    {/* Warning */}
                    <div className="flex items-start gap-3 p-3 bg-warning/10 border-2 border-warning">
                        <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                        <p className="font-mono text-xs text-warning">
                            This action requires signing on your Casper wallet. The Avatar will be linked to your Controller.
                        </p>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t-2 border-border bg-muted">
                    <TechnicalButton variant="secondary" onClick={() => onOpenChange(false)}>
                        Cancel
                    </TechnicalButton>
                    <TechnicalButton variant="primary" disabled={!selectedChain} icon={<Zap className="w-4 h-4" />}>
                        Deploy to {selectedChain ? CHAINS[selectedChain].name : "Chain"}
                    </TechnicalButton>
                </div>
            </div>
        </div>
    );
}
