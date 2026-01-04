import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { TechnicalCard } from "@/components/ui/TechnicalCard";

const chartData = [
    { date: "2024-04-01", transactions: 150 },
    { date: "2024-04-02", transactions: 230 },
    { date: "2024-04-03", transactions: 180 },
    { date: "2024-04-04", transactions: 290 },
    { date: "2024-04-05", transactions: 200 },
    { date: "2024-04-06", transactions: 340 },
    { date: "2024-04-07", transactions: 380 },
    { date: "2024-04-08", transactions: 320 },
    { date: "2024-04-09", transactions: 450 },
    { date: "2024-04-10", transactions: 410 },
    { date: "2024-04-11", transactions: 520 },
    { date: "2024-04-12", transactions: 480 },
    { date: "2024-04-13", transactions: 550 },
    { date: "2024-04-14", transactions: 600 },
];

const chartConfig = {
    transactions: {
        label: "Transactions",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

export function TransactionChart() {
    return (
        <TechnicalCard technicalRef="ANA-TX">
            <div className="mb-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide">Transaction Volume</h3>
                <p className="font-mono text-xs text-muted-foreground">Daily transactions over last 2 weeks</p>
            </div>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border/50" />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(5)}
                        className="font-mono text-xs text-muted-foreground"
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Area
                        dataKey="transactions"
                        type="natural"
                        fill="var(--color-transactions)"
                        fillOpacity={0.4}
                        stroke="var(--color-transactions)"
                    />
                </AreaChart>
            </ChartContainer>
        </TechnicalCard>
    );
}
