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
import { Plus } from "lucide-react";

interface CreateIntentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateIntentDialog({ open, onOpenChange }: CreateIntentDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-card border-2 border-border">
                <DialogHeader>
                    <DialogTitle className="font-display uppercase tracking-wide">Create New Intent</DialogTitle>
                    <DialogDescription className="font-mono text-xs">
                        Define a new transaction intent for the solver network.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="target-chain" className="font-mono text-xs uppercase">Target Chain</Label>
                        <Input id="target-chain" placeholder="e.g. Ethereum, Base" className="font-mono" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="asset" className="font-mono text-xs uppercase">Asset</Label>
                        <Input id="asset" placeholder="e.g. ETH, USDC" className="font-mono" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="amount" className="font-mono text-xs uppercase">Amount</Label>
                        <Input id="amount" placeholder="0.00" className="font-mono" />
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
                    <TechnicalButton variant="primary" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Intent
                    </TechnicalButton>
                </div>
            </DialogContent>
        </Dialog>
    );
}
