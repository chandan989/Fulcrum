import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TechnicalBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info";
  icon?: ReactNode;
}

export function TechnicalBadge({
  children,
  className,
  variant = "default",
  icon,
}: TechnicalBadgeProps) {
  const variants = {
    default: "text-foreground border-border bg-muted",
    primary: "text-primary border-primary bg-primary/10",
    secondary: "text-secondary border-secondary bg-secondary/10",
    success: "text-success border-success bg-success/10",
    warning: "text-warning border-warning bg-warning/10",
    error: "text-error border-error bg-error/10",
    info: "text-info border-info bg-info/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wide border-2",
        variants[variant],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
