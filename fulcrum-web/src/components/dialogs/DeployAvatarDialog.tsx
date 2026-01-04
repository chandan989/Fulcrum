import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, RefreshCw } from "lucide-react";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";

interface DeployAvatarDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeployAvatarDialog({ open, onOpenChange }: DeployAvatarDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-card border-2 border-border">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <TechnicalBadge variant="primary" icon={<Bot className="w-3 h-3" />}>
                            Avatar Deployment
                        </TechnicalBadge>
                    </div>
                    <DialogTitle className="font-display uppercase tracking-wide">Deploy New Avatar</DialogTitle>
                    <DialogDescription className="font-mono text-xs">
                        Deploy a new account abstraction avatar to a target chain.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="chain-select" className="font-mono text-xs uppercase">Target Chain</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Ethereum', 'Base', 'Arbitrum', 'Optimism'].map((chain) => (
                                <div key={chain} className="border border-border p-3 flex items-center gap-2 hover:bg-muted/50 cursor-pointer transition-colors bg-muted/20">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="font-mono text-sm">{chain}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="avatar-name" className="font-mono text-xs uppercase">Avatar Alias (Optional)</Label>
                        <Input id="avatar-name" placeholder="e.g. Trading Bot 01" className="font-mono" />
                    </div>

                    <div className="bg-muted/30 p-3 border border-border">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-mono text-xs text-muted-foreground">Estimated Gas Fee</span>
                            <span className="font-mono text-xs font-bold">~0.002 ETH</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs text-muted-foreground">Deployment Time</span>
                            <span className="font-mono text-xs">~15 secs</span>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <TechnicalButton
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </TechnicalButton>
                    <TechnicalButton variant="secondary" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Deploy Now
                    </TechnicalButton>
                </div>
            </DialogContent>
        </Dialog>
    );
}
