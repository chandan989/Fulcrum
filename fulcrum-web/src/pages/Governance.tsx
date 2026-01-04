import { useState } from "react";
import { TechnicalCard } from "@/components/ui/TechnicalCard";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Menu,
    Building2,
    Users,
    Vote,
    Coins,
    FileText,
    History,
    AlertCircle,
    Check,
    Plus,
    ArrowRight,
    Home,
    Settings2,
    Bot,
    Zap,
    BarChart3,
    Settings,
    Wallet,
    X,
    BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Governance = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const navItems = [
        { icon: Home, label: "Overview", path: "/dashboard" },
        { icon: Settings2, label: "Controller", path: "/controller" },
        { icon: Bot, label: "Avatars", path: "/avatars" },
        { icon: Zap, label: "Intents", path: "/intents" },
        { icon: Building2, label: "Governance", path: "/governance", active: true },
        { icon: BarChart3, label: "Analytics", path: "/analytics" },
        { icon: BookOpen, label: "Docs", path: "/docs" },
        { icon: Settings, label: "Settings", path: "/settings" },
    ];

    return (
        <div className="min-h-screen bg-graph-paper flex">
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
                        <h1 className="font-display text-xl font-bold uppercase tracking-wide">Governance</h1>
                    </div>
                    <TechnicalButton variant="primary" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        New Proposal
                    </TechnicalButton>
                </header>

                <main className="flex-1 p-6 space-y-6">
                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="bg-card border-2 border-border p-1 gap-1">
                            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono uppercase text-xs tracking-wider">Overview</TabsTrigger>
                            <TabsTrigger value="voting" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono uppercase text-xs tracking-wider">Voting System</TabsTrigger>
                            <TabsTrigger value="spending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono uppercase text-xs tracking-wider">Spending Rules</TabsTrigger>
                            <TabsTrigger value="proposals" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono uppercase text-xs tracking-wider">Proposals</TabsTrigger>
                            <TabsTrigger value="audit" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono uppercase text-xs tracking-wider">Audit Logs</TabsTrigger>
                        </TabsList>

                        {/* OVERVIEW TAB */}
                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <TechnicalCard technicalRef="GOV-STATS" className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Treasury Balance</h3>
                                        <Coins className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="text-2xl font-display font-bold">$1,250,000</div>
                                    <div className="text-xs font-mono text-success">+5.2% last 30 days</div>
                                </TechnicalCard>
                                <TechnicalCard technicalRef="GOV-VOTES" className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Active Proposals</h3>
                                        <FileText className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="text-2xl font-display font-bold">3</div>
                                    <div className="text-xs font-mono text-muted-foreground">2 expiring soon</div>
                                </TechnicalCard>
                                <TechnicalCard technicalRef="GOV-PARTICIPATION" className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Participation Rate</h3>
                                        <Users className="w-4 h-4 text-primary" />
                                    </div>
                                    <div className="text-2xl font-display font-bold">78%</div>
                                    <div className="text-xs font-mono text-success">+12% vs last month</div>
                                </TechnicalCard>
                            </div>

                            <TechnicalCard technicalRef="LATEST-PROPOSALS">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-display text-lg font-bold uppercase tracking-wide">Active Proposals</h2>
                                    <TechnicalButton variant="secondary" size="sm">View All</TechnicalButton>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="border border-border p-4 hover:bg-muted/50 transition-colors cursor-pointer group">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <TechnicalBadge variant="warning">Voting</TechnicalBadge>
                                                        <span className="font-mono text-xs text-muted-foreground">FIP-{100 + i}</span>
                                                    </div>
                                                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">Update Treasury Multi-Sig Threshold</h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2">Proposal to increase the required signatures for treasury transactions from 3/5 to 4/7 to improve security...</p>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <div className="font-mono text-xs text-muted-foreground">Ends in 2 days</div>
                                                    <div className="font-bold">85% For</div>
                                                </div>
                                            </div>
                                            <div className="mt-3 w-full bg-secondary h-1">
                                                <div className="bg-primary h-full w-[85%]"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TechnicalCard>
                        </TabsContent>

                        {/* VOTING SYSTEM TAB */}
                        <TabsContent value="voting" className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <TechnicalCard technicalRef="VOTE-CONFIG" className="space-y-6">
                                    <h2 className="font-display text-lg font-bold uppercase tracking-wide mb-4">Configuration</h2>
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4 items-center border-b border-border/50 pb-4">
                                            <div>
                                                <label className="font-bold text-sm">Voting Delay</label>
                                                <p className="text-xs text-muted-foreground">Time before voting starts</p>
                                            </div>
                                            <div className="font-mono text-right">2 Days</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 items-center border-b border-border/50 pb-4">
                                            <div>
                                                <label className="font-bold text-sm">Voting Period</label>
                                                <p className="text-xs text-muted-foreground">Duration of voting window</p>
                                            </div>
                                            <div className="font-mono text-right">5 Days</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 items-center border-b border-border/50 pb-4">
                                            <div>
                                                <label className="font-bold text-sm">Proposal Threshold</label>
                                                <p className="text-xs text-muted-foreground">Min tokens to create proposal</p>
                                            </div>
                                            <div className="font-mono text-right">100,000 FUL</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 items-center">
                                            <div>
                                                <label className="font-bold text-sm">Quorum Requirement</label>
                                                <p className="text-xs text-muted-foreground">Min participation needed</p>
                                            </div>
                                            <div className="font-mono text-right">4%</div>
                                        </div>
                                    </div>
                                    <TechnicalButton variant="secondary" className="w-full mt-4">Edit Parameters</TechnicalButton>
                                </TechnicalCard>
                                <TechnicalCard technicalRef="VOTE-POWER">
                                    <h2 className="font-display text-lg font-bold uppercase tracking-wide mb-4">My Voting Power</h2>
                                    <div className="text-4xl font-display font-bold mb-2">12,450 FUL</div>
                                    <div className="flex gap-2 mb-6">
                                        <TechnicalBadge variant="success">Delegated: Self</TechnicalBadge>
                                        <TechnicalBadge variant="default">0.45% of Total</TechnicalBadge>
                                    </div>
                                    <TechnicalButton className="w-full">Delegate Votes</TechnicalButton>
                                </TechnicalCard>
                            </div>
                        </TabsContent>

                        {/* SPENDING POLICIES TAB */}
                        <TabsContent value="spending" className="space-y-6">
                            <TechnicalCard technicalRef="SPEND-RULES">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-display text-lg font-bold uppercase tracking-wide">Active Policies</h2>
                                    <TechnicalButton variant="secondary" size="sm">
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Policy
                                    </TechnicalButton>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        { name: "Operational Expenses", limit: "50,000 USDC / Month", status: "Active" },
                                        { name: "Grants Program", limit: "100,000 FUL / Quarter", status: "Active" },
                                        { name: "Emergency Fund", limit: "500,000 USDC", status: "Locked" }
                                    ].map((policy, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border border-border bg-card/50">
                                            <div>
                                                <div className="font-bold">{policy.name}</div>
                                                <div className="font-mono text-sm text-muted-foreground">Limit: {policy.limit}</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <TechnicalBadge variant={policy.status === "Active" ? "success" : "warning"}>
                                                    {policy.status}
                                                </TechnicalBadge>
                                                <TechnicalButton variant="ghost" size="sm">Edit</TechnicalButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TechnicalCard>
                        </TabsContent>

                        {/* PROPOSALS TAB */}
                        <TabsContent value="proposals" className="space-y-6">
                            <TechnicalCard technicalRef="ALL-PROPOSALS">
                                <div className="flex gap-4 mb-6">
                                    <div className="relative flex-1">
                                        <input
                                            className="w-full bg-background border border-border px-3 py-2 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="Search proposals..."
                                        />
                                    </div>
                                    <select className="bg-background border border-border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-primary">
                                        <option>All Statuses</option>
                                        <option>Active</option>
                                        <option>Passed</option>
                                        <option>Rejected</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="grid grid-cols-12 gap-4 p-4 border border-border hover:bg-muted/30 items-center">
                                            <div className="col-span-1 font-mono text-sm text-muted-foreground">#10{i}</div>
                                            <div className="col-span-7">
                                                <div className="font-bold hover:text-primary cursor-pointer">Protocol Upgrade v2.{i}</div>
                                                <div className="text-xs text-muted-foreground">Proposed by 0x12...456 • 2 days ago</div>
                                            </div>
                                            <div className="col-span-2">
                                                <TechnicalBadge variant={i === 1 ? "warning" : i === 2 ? "success" : "error"}>
                                                    {i === 1 ? "Active" : i === 2 ? "Passed" : "Rejected"}
                                                </TechnicalBadge>
                                            </div>
                                            <div className="col-span-2 text-right">
                                                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TechnicalCard>
                        </TabsContent>

                        {/* AUDIT LOGS TAB */}
                        <TabsContent value="audit" className="space-y-6">
                            <TechnicalCard technicalRef="AUDIT-LOG">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-border">
                                        <tr>
                                            <th className="text-left py-3 font-mono uppercase text-xs text-muted-foreground">Time</th>
                                            <th className="text-left py-3 font-mono uppercase text-xs text-muted-foreground">Action</th>
                                            <th className="text-left py-3 font-mono uppercase text-xs text-muted-foreground">Actor</th>
                                            <th className="text-left py-3 font-mono uppercase text-xs text-muted-foreground">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                                                <td className="py-3 font-mono text-muted-foreground">2024-03-1{i} 14:30</td>
                                                <td className="py-3 font-bold">Vote Cast</td>
                                                <td className="py-3 font-mono text-primary">0x7f...3a2b</td>
                                                <td className="py-3 text-muted-foreground">Voted FOR Proposal #101 with 12k power</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </TechnicalCard>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
};

export default Governance;
