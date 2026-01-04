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
import { Wallet, Copy, MoveDown } from "lucide-react";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";

interface AddFundsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddFundsDialog({ open, onOpenChange }: AddFundsDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-card border-2 border-border">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <TechnicalBadge variant="success" icon={<Wallet className="w-3 h-3" />}>
                            Gas Vault: Active
                        </TechnicalBadge>
                    </div>
                    <DialogTitle className="font-display uppercase tracking-wide">Add Funds</DialogTitle>
                    <DialogDescription className="font-mono text-xs">
                        Top up your Gas Vault for cross-chain transactions.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="space-y-4">
                        <div className="p-4 border-2 border-border bg-muted/20 text-center space-y-2">
                            <span className="font-mono text-xs uppercase text-muted-foreground block">Current Balance</span>
                            <span className="font-display text-3xl font-bold block">450 CSPR</span>
                        </div>

                        <div className="flex justify-center">
                            <MoveDown className="w-5 h-5 text-muted-foreground animate-bounce" />
                        </div>

                        <div className="grid gap-2">
                            <Label className="font-mono text-xs uppercase">Deposit Address (CSPR)</Label>
                            <div className="flex gap-2">
                                <div className="flex-1 bg-muted p-2 border border-border font-mono text-xs truncate">
                                    0x7f3a...9d2c
                                </div>
                                <TechnicalButton variant="ghost" size="icon" className="h-full w-9">
                                    <Copy className="w-4 h-4" />
                                </TechnicalButton>
                            </div>
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                                Only send CSPR to this address.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <TechnicalButton
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenChange(false)}
                    >
                        Close
                    </TechnicalButton>
                </div>
            </DialogContent>
        </Dialog>
    );
}
