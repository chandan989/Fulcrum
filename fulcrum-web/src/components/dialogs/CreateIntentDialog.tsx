import { useState } from 'react';
import {
    X, Send, ArrowRightLeft, FileCode, Layers,
    AlertTriangle, Shield
} from 'lucide-react';
import { TechnicalButton } from '@/components/ui/TechnicalButton';
import { cn } from "@/lib/utils";
import { useCasper } from '@/hooks/useCasper';
import { CasperService } from '@/lib/casper';
import { toast } from 'sonner';

type ActionType = 'transfer' | 'swap' | 'contract' | 'batch';

const chains = [
    { name: 'Ethereum', color: '#627EEA' },
    { name: 'Base', color: '#0052FF' },
    { name: 'Arbitrum', color: '#28A0F0' },
    { name: 'BSC', color: '#F0B90B' },
    { name: 'Polygon', color: '#8247E5' },
    { name: 'Optimism', color: '#FF0420' },
];

const tokens = ['ETH', 'USDC', 'USDT', 'DAI', 'WBTC', 'LINK'];

interface CreateIntentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateIntentDialog({ open, onOpenChange }: CreateIntentDialogProps) {
    const [actionType, setActionType] = useState<ActionType>('transfer');
    const [selectedChain, setSelectedChain] = useState('');
    const { isConnected, connect, publicKey } = useCasper();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSignAndSubmit = async () => {
        if (!isConnected || !publicKey) {
            toast.error("Please connect your Casper Wallet first!");
            connect();
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Preparing transaction...");

        try {
            // 1. Create Deploy
            toast.loading("Please sign the request in your wallet...", { id: toastId });

            const deploy = await CasperService.createIntentDeploy(publicKey, {
                targetChain: 1, // Ethereum
                targetAddress: "0x1234567890123456789012345678901234567890", // Mock
                data: "0x",
                amount: "100"
            });

            // 2. Sign and Send
            const deployHash = await CasperService.signAndSendDeploy(deploy, publicKey);

            toast.success("Intent Submitted to Casper Network!", {
                id: toastId,
                description: `Deploy Hash: ${deployHash.slice(0, 10)}...`
            });

            // Close dialog after short delay
            setTimeout(() => onOpenChange(false), 2000);

        } catch (error) {
            console.error(error);
            toast.error("Transaction Failed", {
                id: toastId,
                description: error instanceof Error ? error.message : "Unknown error"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-primary/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card border-2 border-primary shadow-brutal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="border-b-2 border-primary p-4 flex items-center justify-between sticky top-0 bg-card z-10">
                    <div>
                        <h2 className="font-display text-xl font-bold uppercase tracking-wider">Create New Intent</h2>
                        <p className="text-sm text-secondary font-mono">Configure cross-chain transaction</p>
                    </div>
                    <button onClick={() => onOpenChange(false)} className="p-2 hover:bg-muted transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Intent Name */}
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-2">Intent Name (Optional)</label>
                        <input
                            type="text"
                            placeholder="e.g., Treasury Rebalance"
                            className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                        />
                    </div>

                    {/* Action Type */}
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-3">Action Type</label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {[
                                { type: 'transfer' as ActionType, label: 'Transfer', icon: Send, desc: 'Send tokens' },
                                { type: 'swap' as ActionType, label: 'Swap', icon: ArrowRightLeft, desc: 'Exchange tokens' },
                                { type: 'contract' as ActionType, label: 'Contract', icon: FileCode, desc: 'Execute code' },
                                { type: 'batch' as ActionType, label: 'Batch', icon: Layers, desc: 'Multiple transfers' },
                            ].map(({ type, label, icon: Icon, desc }) => (
                                <button
                                    key={type}
                                    onClick={() => setActionType(type)}
                                    className={cn(
                                        "p-4 border-2 text-left transition-all",
                                        actionType === type
                                            ? 'border-accent bg-accent/5 shadow-brutal-sm'
                                            : 'border-border hover:border-primary'
                                    )}
                                >
                                    <Icon size={20} className={actionType === type ? 'text-accent' : ''} />
                                    <p className="font-mono text-sm font-medium mt-2">{label}</p>
                                    <p className="text-xs text-secondary mt-1">{desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Target Chain */}
                    <div>
                        <label className="block text-xs font-mono uppercase tracking-wider mb-3">Target Chain</label>
                        <div className="grid grid-cols-3 gap-3">
                            {chains.map((chain) => (
                                <button
                                    key={chain.name}
                                    onClick={() => setSelectedChain(chain.name)}
                                    className={cn(
                                        "p-3 border-2 flex items-center gap-3 transition-all",
                                        selectedChain === chain.name
                                            ? 'border-accent bg-accent/5'
                                            : 'border-border hover:border-primary'
                                    )}
                                >
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: chain.color }}
                                    />
                                    <span className="font-mono text-sm">{chain.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Transfer Fields */}
                    {actionType === 'transfer' && (
                        <>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2">Recipient Address</label>
                                <input
                                    type="text"
                                    placeholder="0x..."
                                    className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider mb-2">Token</label>
                                    <select className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none">
                                        {tokens.map(token => (
                                            <option key={token} value={token}>{token}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider mb-2">Amount</label>
                                    <input
                                        type="text"
                                        placeholder="0.00"
                                        className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Batch Transfer Fields */}
                    {actionType === 'batch' && (
                        <>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2">Upload CSV</label>
                                <div className="border-2 border-dashed border-border p-6 flex flex-col items-center justify-center bg-muted/20">
                                    <FileCode className="w-8 h-8 text-secondary mb-2" />
                                    <p className="text-sm text-secondary font-mono">Drag & drop or click to upload</p>
                                    <p className="text-xs text-muted-foreground mt-1">Format: address, amount</p>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2">Or Paste Data</label>
                                <textarea
                                    placeholder="0x123...abc, 100.5&#10;0x456...def, 50.0"
                                    rows={5}
                                    className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2">Token</label>
                                <select className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none">
                                    {tokens.map(token => (
                                        <option key={token} value={token}>{token}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    {/* Swap Fields */}
                    {actionType === 'swap' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider mb-2">From Token</label>
                                    <select className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none">
                                        {tokens.map(token => (
                                            <option key={token} value={token}>{token}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider mb-2">To Token</label>
                                    <select className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none">
                                        {tokens.map(token => (
                                            <option key={token} value={token}>{token}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2">Amount</label>
                                <input
                                    type="text"
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2">Slippage Tolerance</label>
                                <div className="flex gap-2">
                                    {['0.5%', '1%', '2%', '5%'].map(slippage => (
                                        <button
                                            key={slippage}
                                            className="px-4 py-2 border-2 border-border hover:border-primary font-mono text-sm transition-colors"
                                        >
                                            {slippage}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Contract Call Fields */}
                    {actionType === 'contract' && (
                        <>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2">Contract Address</label>
                                <input
                                    type="text"
                                    placeholder="0x..."
                                    className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2">Function Selector</label>
                                <input
                                    type="text"
                                    placeholder="e.g., transfer(address,uint256)"
                                    className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2">Calldata (Hex)</label>
                                <textarea
                                    placeholder="0x..."
                                    rows={3}
                                    className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-wider mb-2">Value (Native Token)</label>
                                <input
                                    type="text"
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 border-2 border-primary bg-card font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                        </>
                    )}

                    {/* Advanced Options */}
                    <details className="border-2 border-border">
                        <summary className="px-4 py-3 cursor-pointer font-mono text-sm uppercase tracking-wider hover:bg-muted">
                            Advanced Options
                        </summary>
                        <div className="p-4 border-t-2 border-border space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider mb-2">Gas Limit</label>
                                    <input
                                        type="text"
                                        placeholder="Auto"
                                        className="w-full px-4 py-3 border-2 border-border bg-card font-mono text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono uppercase tracking-wider mb-2">Expiry (Hours)</label>
                                    <input
                                        type="number"
                                        defaultValue={48}
                                        className="w-full px-4 py-3 border-2 border-border bg-card font-mono text-sm focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </details>

                    {/* Estimate */}
                    <div className="bg-muted p-4 border-2 border-border">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-secondary">Estimated Gas</span>
                            <span className="font-mono font-medium">~50,000 gas</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-secondary">Gas Cost (USD)</span>
                            <span className="font-mono font-medium">~$2.50</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-secondary">ZK Savings vs Naive</span>
                            <span className="font-mono font-medium text-success">~$5.00 saved</span>
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="flex items-start gap-3 p-4 bg-warning/10 border-2 border-warning">
                        <AlertTriangle size={20} className="text-warning shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium">Signature Required</p>
                            <p className="text-xs text-secondary mt-1">
                                You will need to sign this intent with your Casper wallet. The ZK proof will be generated automatically.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t-2 border-primary p-4 flex justify-end gap-3 sticky bottom-0 bg-card z-10">
                    <TechnicalButton variant="secondary" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                        Cancel
                    </TechnicalButton>
                    <TechnicalButton onClick={handleSignAndSubmit} disabled={isSubmitting}>
                        <Shield size={16} />
                        {isSubmitting ? 'Signing...' : 'Sign & Submit'}
                    </TechnicalButton>
                </div>
            </div>
        </div>
    );
}
