import { cn } from "@/lib/utils";

interface ArchitectureDiagramProps {
  className?: string;
}

export function ArchitectureDiagram({ className }: ArchitectureDiagramProps) {
  return (
    <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Grid */}
        <defs>
          <pattern
            id="grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="hsl(214 20% 88%)"
              strokeWidth="0.5"
            />
          </pattern>
          
          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="hsl(18 100% 50%)"
            />
          </marker>

          {/* Animated dash pattern */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(18 100% 50%)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(18 100% 50%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(18 100% 50%)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <rect width="800" height="400" fill="url(#grid)" />

        {/* Security Layer - Casper (Center) */}
        <g transform="translate(340, 140)">
          <rect
            x="0"
            y="0"
            width="120"
            height="120"
            fill="hsl(0 0% 100%)"
            stroke="hsl(220 20% 6%)"
            strokeWidth="3"
          />
          {/* Corner brackets */}
          <path d="M 0 0 L 0 15 M 0 0 L 15 0" stroke="hsl(18 100% 50%)" strokeWidth="2" fill="none" />
          <path d="M 120 0 L 120 15 M 120 0 L 105 0" stroke="hsl(18 100% 50%)" strokeWidth="2" fill="none" />
          <path d="M 0 120 L 0 105 M 0 120 L 15 120" stroke="hsl(18 100% 50%)" strokeWidth="2" fill="none" />
          <path d="M 120 120 L 120 105 M 120 120 L 105 120" stroke="hsl(18 100% 50%)" strokeWidth="2" fill="none" />
          
          <text x="60" y="50" textAnchor="middle" className="font-display text-sm font-bold uppercase tracking-wider" fill="hsl(220 20% 6%)">
            Casper
          </text>
          <text x="60" y="70" textAnchor="middle" className="font-mono text-xs uppercase tracking-wider" fill="hsl(215 16% 47%)">
            Security Layer
          </text>
          <text x="60" y="100" textAnchor="middle" className="font-mono text-xs font-bold" fill="hsl(18 100% 50%)">
            CTRL-001
          </text>
        </g>

        {/* ZK Prover */}
        <g transform="translate(340, 290)">
          <rect
            x="0"
            y="0"
            width="120"
            height="60"
            fill="hsl(18 100% 50%)"
            stroke="hsl(220 20% 6%)"
            strokeWidth="2"
          />
          <text x="60" y="25" textAnchor="middle" className="font-display text-xs font-bold uppercase tracking-wider" fill="white">
            ZK Prover
          </text>
          <text x="60" y="45" textAnchor="middle" className="font-mono text-xs" fill="hsl(0 0% 100% / 0.8)">
            Groth16
          </text>
        </g>

        {/* EVM Chains */}
        {/* Ethereum */}
        <g transform="translate(60, 60)">
          <rect
            x="0"
            y="0"
            width="100"
            height="80"
            fill="hsl(0 0% 100%)"
            stroke="hsl(220 20% 6%)"
            strokeWidth="2"
          />
          <text x="50" y="35" textAnchor="middle" className="font-display text-xs font-bold uppercase" fill="hsl(220 20% 6%)">
            Ethereum
          </text>
          <text x="50" y="55" textAnchor="middle" className="font-mono text-xs" fill="hsl(215 16% 47%)">
            Avatar
          </text>
          <circle cx="90" cy="10" r="4" fill="hsl(160 84% 39%)" />
        </g>

        {/* Base */}
        <g transform="translate(60, 170)">
          <rect
            x="0"
            y="0"
            width="100"
            height="80"
            fill="hsl(0 0% 100%)"
            stroke="hsl(220 20% 6%)"
            strokeWidth="2"
          />
          <text x="50" y="35" textAnchor="middle" className="font-display text-xs font-bold uppercase" fill="hsl(220 20% 6%)">
            Base
          </text>
          <text x="50" y="55" textAnchor="middle" className="font-mono text-xs" fill="hsl(215 16% 47%)">
            Avatar
          </text>
          <circle cx="90" cy="10" r="4" fill="hsl(160 84% 39%)" />
        </g>

        {/* Arbitrum */}
        <g transform="translate(60, 280)">
          <rect
            x="0"
            y="0"
            width="100"
            height="80"
            fill="hsl(0 0% 100%)"
            stroke="hsl(220 20% 6%)"
            strokeWidth="2"
          />
          <text x="50" y="35" textAnchor="middle" className="font-display text-xs font-bold uppercase" fill="hsl(220 20% 6%)">
            Arbitrum
          </text>
          <text x="50" y="55" textAnchor="middle" className="font-mono text-xs" fill="hsl(215 16% 47%)">
            Avatar
          </text>
          <circle cx="90" cy="10" r="4" fill="hsl(160 84% 39%)" />
        </g>

        {/* BSC */}
        <g transform="translate(640, 60)">
          <rect
            x="0"
            y="0"
            width="100"
            height="80"
            fill="hsl(0 0% 100%)"
            stroke="hsl(220 20% 6%)"
            strokeWidth="2"
          />
          <text x="50" y="35" textAnchor="middle" className="font-display text-xs font-bold uppercase" fill="hsl(220 20% 6%)">
            BSC
          </text>
          <text x="50" y="55" textAnchor="middle" className="font-mono text-xs" fill="hsl(215 16% 47%)">
            Avatar
          </text>
          <circle cx="90" cy="10" r="4" fill="hsl(160 84% 39%)" />
        </g>

        {/* Polygon */}
        <g transform="translate(640, 170)">
          <rect
            x="0"
            y="0"
            width="100"
            height="80"
            fill="hsl(0 0% 100%)"
            stroke="hsl(220 20% 6%)"
            strokeWidth="2"
          />
          <text x="50" y="35" textAnchor="middle" className="font-display text-xs font-bold uppercase" fill="hsl(220 20% 6%)">
            Polygon
          </text>
          <text x="50" y="55" textAnchor="middle" className="font-mono text-xs" fill="hsl(215 16% 47%)">
            Avatar
          </text>
          <circle cx="90" cy="10" r="4" fill="hsl(160 84% 39%)" />
        </g>

        {/* Optimism */}
        <g transform="translate(640, 280)">
          <rect
            x="0"
            y="0"
            width="100"
            height="80"
            fill="hsl(0 0% 100%)"
            stroke="hsl(220 20% 6%)"
            strokeWidth="2"
          />
          <text x="50" y="35" textAnchor="middle" className="font-display text-xs font-bold uppercase" fill="hsl(220 20% 6%)">
            Optimism
          </text>
          <text x="50" y="55" textAnchor="middle" className="font-mono text-xs" fill="hsl(215 16% 47%)">
            Avatar
          </text>
          <circle cx="90" cy="10" r="4" fill="hsl(160 84% 39%)" />
        </g>

        {/* Connection Lines */}
        {/* Left side connections */}
        <path
          d="M 160 100 Q 250 100 340 180"
          fill="none"
          stroke="hsl(18 100% 50%)"
          strokeWidth="2"
          strokeDasharray="6,4"
          markerEnd="url(#arrowhead)"
          className="animate-flow"
        />
        <path
          d="M 160 210 L 340 200"
          fill="none"
          stroke="hsl(18 100% 50%)"
          strokeWidth="2"
          strokeDasharray="6,4"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M 160 320 Q 250 320 340 220"
          fill="none"
          stroke="hsl(18 100% 50%)"
          strokeWidth="2"
          strokeDasharray="6,4"
          markerEnd="url(#arrowhead)"
        />

        {/* Right side connections */}
        <path
          d="M 460 180 Q 550 100 640 100"
          fill="none"
          stroke="hsl(18 100% 50%)"
          strokeWidth="2"
          strokeDasharray="6,4"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M 460 200 L 640 210"
          fill="none"
          stroke="hsl(18 100% 50%)"
          strokeWidth="2"
          strokeDasharray="6,4"
          markerEnd="url(#arrowhead)"
        />
        <path
          d="M 460 220 Q 550 320 640 320"
          fill="none"
          stroke="hsl(18 100% 50%)"
          strokeWidth="2"
          strokeDasharray="6,4"
          markerEnd="url(#arrowhead)"
        />

        {/* Casper to ZK Prover */}
        <path
          d="M 400 260 L 400 290"
          fill="none"
          stroke="hsl(220 20% 6%)"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />

        {/* Labels */}
        <text x="250" y="30" className="font-mono text-xs uppercase tracking-widest" fill="hsl(215 16% 47%)">
          Execution Layer
        </text>
        <text x="550" y="30" className="font-mono text-xs uppercase tracking-widest" fill="hsl(215 16% 47%)">
          Execution Layer
        </text>
      </svg>
    </div>
  );
}
