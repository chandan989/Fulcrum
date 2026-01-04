import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { TechnicalCard } from "@/components/ui/TechnicalCard";

const chartData = [
    { month: "January", eth: 186, casper: 80, base: 45 },
    { month: "February", eth: 305, casper: 200, base: 100 },
    { month: "March", eth: 237, casper: 120, base: 150 },
    { month: "April", eth: 73, casper: 190, base: 240 },
    { month: "May", eth: 209, casper: 130, base: 300 },
    { month: "June", eth: 214, casper: 140, base: 350 },
];

const chartConfig = {
    eth: {
        label: "Ethereum",
        color: "hsl(var(--primary))",
    },
    casper: {
        label: "Casper",
        color: "hsl(var(--success))",
    },
    base: {
        label: "Base",
        color: "hsl(var(--warning))",
    },
} satisfies ChartConfig;

export function GasChart() {
    return (
        <TechnicalCard technicalRef="ANA-GAS">
            <div className="mb-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide">Gas Usage</h3>
                <p className="font-mono text-xs text-muted-foreground">Gas consumption by chain (Unit: Gwei/USD eq)</p>
            </div>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                        className="font-mono text-xs text-muted-foreground"
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line
                        dataKey="eth"
                        type="monotone"
                        stroke="var(--color-eth)"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        dataKey="casper"
                        type="monotone"
                        stroke="var(--color-casper)"
                        strokeWidth={2}
                        dot={false}
                    />
                    <Line
                        dataKey="base"
                        type="monotone"
                        stroke="var(--color-base)"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ChartContainer>
        </TechnicalCard>
    );
}
