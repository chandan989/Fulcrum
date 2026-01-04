import { cn } from "@/lib/utils";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface TechnicalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  icon?: ReactNode;
}

export function TechnicalButton({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  disabled,
  ...props
}: TechnicalButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground border-primary hover:shadow-md",
    secondary: "bg-card text-foreground border-border hover:shadow-md",
    ghost: "bg-transparent text-foreground border-transparent hover:bg-muted",
    outline: "bg-transparent text-foreground border-border hover:bg-muted",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    icon: "h-9 w-9 p-0 flex items-center justify-center",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-mono font-semibold uppercase tracking-wider",
        "border-2 transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-active",
        variant !== "ghost" && "hover:translate-x-[-2px] hover:translate-y-[-2px]",
        variant !== "ghost" && "shadow-sm",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
