import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { TechnicalCard } from "@/components/ui/TechnicalCard";

const chartData = [
    { metric: "Proof Gen", time: 450 },
    { metric: "Verification", time: 80 },
    { metric: "Recursion", time: 200 },
    { metric: "Batching", time: 320 },
];

const chartConfig = {
    time: {
        label: "Time (ms)",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

export function ZKStatsChart() {
    return (
        <TechnicalCard technicalRef="ANA-ZK">
            <div className="mb-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide">ZK Performance</h3>
                <p className="font-mono text-xs text-muted-foreground">Average execution times (ms)</p>
            </div>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis
                        dataKey="metric"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        className="font-mono text-xs text-muted-foreground"
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="time" fill="var(--color-time)" radius={4} />
                </BarChart>
            </ChartContainer>
        </TechnicalCard>
    );
}
