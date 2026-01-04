import { Pie, PieChart } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import { TechnicalCard } from "@/components/ui/TechnicalCard";

const chartData = [
    { asset: "stablecoins", value: 450000, fill: "var(--color-stablecoins)" },
    { asset: "l1_tokens", value: 320000, fill: "var(--color-l1_tokens)" },
    { asset: "l2_tokens", value: 150000, fill: "var(--color-l2_tokens)" },
    { asset: "yield_farming", value: 80000, fill: "var(--color-yield_farming)" },
    { asset: "nft", value: 20000, fill: "var(--color-nft)" },
];

const chartConfig = {
    value: {
        label: "Value (USD)",
    },
    stablecoins: {
        label: "Stablecoins",
        color: "hsl(var(--primary))",
    },
    l1_tokens: {
        label: "L1 Tokens",
        color: "hsl(var(--success))",
    },
    l2_tokens: {
        label: "L2 Tokens",
        color: "hsl(var(--warning))",
    },
    yield_farming: {
        label: "Yield Strategies",
        color: "hsl(var(--secondary))",
    },
    nft: {
        label: "NFTs",
        color: "hsl(var(--destructive))",
    },
} satisfies ChartConfig;

export function PortfolioChart() {
    return (
        <TechnicalCard technicalRef="ANA-PORT">
            <div className="mb-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide">Portfolio Allocation</h3>
                <p className="font-mono text-xs text-muted-foreground">Current breakdown of treasury assets</p>
            </div>
            <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="asset"
                        innerRadius={60}
                        strokeWidth={5}
                    />
                    <ChartLegend
                        content={<ChartLegendContent nameKey="asset" />}
                        className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                    />
                </PieChart>
            </ChartContainer>
        </TechnicalCard>
    );
}
