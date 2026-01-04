import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import {
    Menu,
    X,
    Home,
    Settings2,
    Bot,
    Zap,
    Building2,
    BarChart3,
    Settings,
    Wallet,
    Download,
    Calendar,
    BookOpen,
} from "lucide-react";
import { TransactionChart } from "@/components/analytics/TransactionChart";
import { GasChart } from "@/components/analytics/GasChart";
import { PortfolioChart } from "@/components/analytics/PortfolioChart";
import { ZKStatsChart } from "@/components/analytics/ZKStatsChart";

const Analytics = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { icon: Home, label: "Overview", path: "/dashboard" },
        { icon: Settings2, label: "Controller", path: "/controller" },
        { icon: Bot, label: "Avatars", path: "/avatars" },
        { icon: Zap, label: "Intents", path: "/intents" },
        { icon: Building2, label: "Governance", path: "/governance" },
        { icon: BarChart3, label: "Analytics", path: "/analytics", active: true },
        { icon: BookOpen, label: "Docs", path: "/docs" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    return (
        <div className="min-h-screen bg-graph-paper flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r-2 border-border transition-transform duration-300",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-16"
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="h-16 flex items-center justify-between px-4 border-b-2 border-border">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <img src="/Logo.svg" alt="Fulcrum Logo" className="w-full h-full" />
                            </div>
                            {sidebarOpen && (
                                <span className="font-display text-lg font-bold uppercase tracking-wider">
                                    Fulcrum
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-1 hover:bg-muted"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="flex-1 py-4 px-2 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 font-mono text-sm uppercase tracking-wider transition-colors",
                                    item.active
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 border-t-2 border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-muted flex items-center justify-center border-2 border-border">
                                <Wallet className="w-4 h-4" />
                            </div>
                            {sidebarOpen && (
                                <div className="flex-1 min-w-0">
                                    <div className="font-mono text-xs truncate">0x7f3a...9d2c</div>
                                    <div className="font-mono text-xs text-muted-foreground">Casper</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="h-16 bg-card border-b-2 border-border flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 hover:bg-muted lg:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="font-display text-xl font-bold uppercase tracking-wide">
                            Analytics
                        </h1>
                        <TechnicalBadge variant="info">Real-time</TechnicalBadge>
                    </div>
                    <div className="flex items-center gap-3">
                        <TechnicalButton variant="secondary" size="sm">
                            <Calendar className="w-4 h-4 mr-2" />
                            Last 30 Days
                        </TechnicalButton>
                        <TechnicalButton variant="secondary" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </TechnicalButton>
                    </div>
                </header>

                <main className="flex-1 p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <TransactionChart />
                        <GasChart />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <ZKStatsChart />
                        </div>
                        <PortfolioChart />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Analytics;
