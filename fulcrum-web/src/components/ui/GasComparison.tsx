import { cn } from "@/lib/utils";
import { Check, X, Zap } from "lucide-react";

interface GasComparisonProps {
  className?: string;
}

export function GasComparison({ className }: GasComparisonProps) {
  const comparisons = [
    {
      label: "Naive Ed25519 Verification",
      gas: 150000,
      cost: "$7.50",
      percentage: 100,
      status: "inefficient",
      badge: "CURRENT STANDARD",
    },
    {
      label: "Fulcrum ZK-SNARK",
      gas: 50000,
      cost: "$2.50",
      percentage: 33,
      status: "optimal",
      badge: "3× CHEAPER",
    },
    {
      label: "Future (EIP-7212)",
      gas: 3000,
      cost: "$0.15",
      percentage: 2,
      status: "future",
      badge: "COMING SOON",
    },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {comparisons.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-medium">
                {item.label}
              </span>
              <span
                className={cn(
                  "px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider border-2",
                  item.status === "inefficient" && "text-error border-error bg-error/10",
                  item.status === "optimal" && "text-success border-success bg-success/10",
                  item.status === "future" && "text-info border-info bg-info/10"
                )}
              >
                {item.badge}
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-sm">
              <span className="text-muted-foreground">
                ~{item.gas.toLocaleString()} gas
              </span>
              <span className="font-bold">{item.cost}</span>
            </div>
          </div>
          
          <div className="relative h-8 bg-muted border-2 border-border">
            <div
              className={cn(
                "absolute inset-y-0 left-0 flex items-center px-3 font-mono text-xs font-bold transition-all duration-700",
                item.status === "inefficient" && "bg-error/20 text-error",
                item.status === "optimal" && "bg-success text-success-foreground",
                item.status === "future" && "bg-info/20 text-info"
              )}
              style={{ width: `${item.percentage}%` }}
            >
              {item.percentage > 10 && (
                <span className="flex items-center gap-1">
                  {Array.from({ length: Math.ceil(item.percentage / 10) }).map((_, i) => (
                    <span key={i} className="w-2 h-4 bg-current opacity-60" />
                  ))}
                </span>
              )}
            </div>
            
            {/* Status indicator */}
            <div className="absolute right-2 inset-y-0 flex items-center">
              {item.status === "inefficient" && <X className="w-5 h-5 text-error" />}
              {item.status === "optimal" && <Check className="w-5 h-5 text-success" />}
              {item.status === "future" && <Zap className="w-5 h-5 text-info" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
