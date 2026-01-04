import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties, MouseEventHandler } from "react";

interface TechnicalCardProps {
  children: ReactNode;
  className?: string;
  technicalRef?: string;
  variant?: "default" | "elevated" | "muted" | "accent";
  hover?: boolean;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function TechnicalCard({
  children,
  className,
  technicalRef,
  variant = "default",
  hover = true,
  style,
  onClick,
}: TechnicalCardProps) {
  const variants = {
    default: "bg-card border-2 border-border",
    elevated: "bg-card border-3 border-border",
    muted: "bg-muted border-2 border-border-secondary",
    accent: "bg-card border-2 border-primary",
  };

  return (
    <div
      className={cn(
        "relative p-6 transition-all duration-200",
        variants[variant],
        hover && "hover:translate-x-[-2px] hover:translate-y-[-2px]",
        variant === "elevated" ? "shadow-lg hover:shadow-hover" : "shadow-md hover:shadow-lg",
        onClick && "cursor-pointer",
        className
      )}
      data-ref={technicalRef}
      onClick={onClick}
      style={{
        ...style,
        boxShadow: variant === "elevated"
          ? "8px 8px 0px hsl(214 20% 88%)"
          : "6px 6px 0px hsl(214 20% 88%)",
      }}
    >
      {technicalRef && (
        <span className="absolute -top-3 right-4 bg-card px-3 font-mono text-xs font-bold uppercase tracking-wider text-primary border-x-2 border-border">
          {technicalRef}
        </span>
      )}
      {children}
    </div>
  );
}
