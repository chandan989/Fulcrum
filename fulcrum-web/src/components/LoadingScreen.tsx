import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const LoadingScreen = ({ onComplete }: { onComplete?: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("INITIALIZING");

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setStatus("COMPLETE");
                    if (onComplete) {
                        setTimeout(onComplete, 500); // Small delay for "COMPLETE" to be seen
                    }
                    return 100;
                }

                // Random increments for technical feel
                const increment = Math.random() * 15;
                const newProgress = Math.min(prev + increment, 100);

                if (newProgress > 30 && newProgress < 60) setStatus("VERIFYING INTEGRITY");
                if (newProgress >= 60 && newProgress < 90) setStatus("ESTABLISHING LINK");
                if (newProgress >= 90) setStatus("FINALIZING");

                return newProgress;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground font-mono">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-graph-paper" />

            <div className="z-10 w-full max-w-md p-8 space-y-8 relative">
                {/* Decorative corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50" />

                {/* Logo / Brand */}
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-primary animate-pulse-glow" />
                        <h1 className="font-display text-2xl tracking-widest font-bold text-primary">FULCRUM</h1>
                    </div>
                    <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">Security & Governance Layer</p>
                </div>

                {/* Central Loader Mechanic */}
                <div className="relative h-2 bg-muted border border-border w-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Status Text & Metrics */}
                <div className="flex justify-between items-end text-xs uppercase tracking-wider text-muted-foreground">
                    <div className="flex flex-col space-y-1">
                        <span>System Status:</span>
                        <span className={cn(
                            "font-bold transition-colors",
                            progress === 100 ? "text-success" : "text-foreground"
                        )}>
                            {status}
                        </span>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                        <span>Load</span>
                        <span className="font-bold text-primary">{Math.floor(progress)}%</span>
                    </div>
                </div>

                {/* Hex Data Stream Decoration */}
                <div className="text-[10px] text-border h-4 overflow-hidden whitespace-nowrap opacity-50 font-mono">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <span key={i} className="mx-1">0x{Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, '0')}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};
