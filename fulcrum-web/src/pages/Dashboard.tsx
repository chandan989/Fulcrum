import { Link } from "react-router-dom";
import { TechnicalCard } from "@/components/ui/TechnicalCard";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import {
  Home,
  Settings2,
  Bot,
  Zap,
  Building2,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Check,
  AlertCircle,
  ChevronRight,
  Wallet,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CreateIntentDialog } from "@/components/dialogs/CreateIntentDialog";
import { DeployAvatarDialog } from "@/components/dialogs/DeployAvatarDialog";
import { AddFundsDialog } from "@/components/dialogs/AddFundsDialog";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createIntentOpen, setCreateIntentOpen] = useState(false);
  const [deployAvatarOpen, setDeployAvatarOpen] = useState(false);
  const [addFundsOpen, setAddFundsOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Overview", path: "/dashboard", active: true },
    { icon: Settings2, label: "Controller", path: "/controller" },
    { icon: Bot, label: "Avatars", path: "/avatars" },
    { icon: Zap, label: "Intents", path: "/intents" },
    { icon: Building2, label: "Governance", path: "/governance" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const stats = [
    {
      label: "Total Assets",
      value: "$2.4M",
      change: "+12.5%",
      positive: true,
      ref: "STAT-001",
    },
    {
      label: "Active Avatars",
      value: "4",
      subtext: "ETH, Base, ARB, BSC",
      ref: "STAT-002",
    },
    {
      label: "Pending Intents",
      value: "2",
      urgent: true,
      ref: "STAT-003",
    },
    {
      label: "Gas Vault",
      value: "450 CSPR",
      subtext: "~120 transactions",
      ref: "STAT-004",
    },
  ];

  const recentActivity = [
    {
      id: "0x7f3a...9d2c",
      chain: "Ethereum",
      action: "Transfer",
      amount: "1.5 ETH",
      status: "Confirmed",
      time: "2 min ago",
    },
    {
      id: "0x8b2d...4e1f",
      chain: "Base",
      action: "Swap",
      amount: "500 USDC",
      status: "Pending",
      time: "5 min ago",
    },
    {
      id: "0x3c9e...7a8b",
      chain: "Arbitrum",
      action: "Approve",
      amount: "∞ DAI",
      status: "Confirmed",
      time: "1 hour ago",
    },
    {
      id: "0x1d4f...6c3a",
      chain: "BSC",
      action: "Transfer",
      amount: "0.5 BNB",
      status: "Failed",
      time: "2 hours ago",
    },
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
          {/* Logo */}
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

          {/* Navigation */}
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

          {/* User Section */}
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

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b-2 border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-muted lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-display text-xl font-bold uppercase tracking-wide">
              Dashboard
            </h1>
            <TechnicalBadge variant="success">Mainnet</TechnicalBadge>
          </div>
          <div className="flex items-center gap-3">
            <TechnicalButton variant="secondary" size="sm" onClick={() => setCreateIntentOpen(true)}>
              <Plus className="w-4 h-4" />
              {sidebarOpen && "New Intent"}
            </TechnicalButton>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <TechnicalCard
                key={index}
                technicalRef={stat.ref}
                className="space-y-2"
              >
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold">
                    {stat.value}
                  </span>
                  {stat.change && (
                    <span
                      className={cn(
                        "font-mono text-xs font-bold",
                        stat.positive ? "text-success" : "text-error"
                      )}
                    >
                      {stat.change}
                    </span>
                  )}
                  {stat.urgent && (
                    <TechnicalBadge variant="warning">Urgent</TechnicalBadge>
                  )}
                </div>
                {stat.subtext && (
                  <div className="font-mono text-xs text-muted-foreground">
                    {stat.subtext}
                  </div>
                )}
              </TechnicalCard>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <TechnicalCard technicalRef="ACT-001" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide">
                    Recent Activity
                  </h2>
                  <Link
                    to="/analytics"
                    className="font-mono text-xs uppercase tracking-wider text-primary hover:underline flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-border">
                        <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          Intent
                        </th>
                        <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          Chain
                        </th>
                        <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          Action
                        </th>
                        <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          Amount
                        </th>
                        <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          Status
                        </th>
                        <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.map((activity, index) => (
                        <tr
                          key={index}
                          className="border-b border-border-secondary hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-3 font-mono text-sm">{activity.id}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary" />
                              <span className="font-mono text-sm">{activity.chain}</span>
                            </div>
                          </td>
                          <td className="py-3 font-mono text-sm">{activity.action}</td>
                          <td className="py-3 font-mono text-sm font-medium">
                            {activity.amount}
                          </td>
                          <td className="py-3">
                            <TechnicalBadge
                              variant={
                                activity.status === "Confirmed"
                                  ? "success"
                                  : activity.status === "Pending"
                                    ? "warning"
                                    : "error"
                              }
                              icon={
                                activity.status === "Confirmed" ? (
                                  <Check className="w-3 h-3" />
                                ) : activity.status === "Pending" ? (
                                  <Clock className="w-3 h-3" />
                                ) : (
                                  <AlertCircle className="w-3 h-3" />
                                )
                              }
                            >
                              {activity.status}
                            </TechnicalBadge>
                          </td>
                          <td className="py-3 font-mono text-xs text-muted-foreground">
                            {activity.time}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TechnicalCard>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <TechnicalCard technicalRef="QA-001" className="space-y-4">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <TechnicalButton variant="primary" size="sm" className="flex-col h-auto py-4" onClick={() => setCreateIntentOpen(true)}>
                    <Plus className="w-5 h-5 mb-1" />
                    <span className="text-xs">Create Intent</span>
                  </TechnicalButton>
                  <TechnicalButton variant="secondary" size="sm" className="flex-col h-auto py-4" onClick={() => setDeployAvatarOpen(true)}>
                    <Bot className="w-5 h-5 mb-1" />
                    <span className="text-xs">Deploy Avatar</span>
                  </TechnicalButton>
                  <Link to="/governance" className="contents">
                    <TechnicalButton variant="secondary" size="sm" className="flex-col h-auto py-4 w-full">
                      <Building2 className="w-5 h-5 mb-1" />
                      <span className="text-xs">Governance</span>
                    </TechnicalButton>
                  </Link>
                  <TechnicalButton variant="secondary" size="sm" className="flex-col h-auto py-4" onClick={() => setAddFundsOpen(true)}>
                    <Wallet className="w-5 h-5 mb-1" />
                    <span className="text-xs">Add Funds</span>
                  </TechnicalButton>
                </div>
              </TechnicalCard>

              <TechnicalCard technicalRef="NET-001" className="space-y-4">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide">
                  Network Status
                </h2>
                <div className="space-y-3">
                  {["Casper", "Ethereum", "Base", "Arbitrum"].map((network) => (
                    <div key={network} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="font-mono text-sm">{network}</span>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        Operational
                      </span>
                    </div>
                  ))}
                </div>
              </TechnicalCard>
            </div>
          </div>
        </main>
      </div>

      <CreateIntentDialog open={createIntentOpen} onOpenChange={setCreateIntentOpen} />
      <DeployAvatarDialog open={deployAvatarOpen} onOpenChange={setDeployAvatarOpen} deployedChains={[]} />
      <AddFundsDialog open={addFundsOpen} onOpenChange={setAddFundsOpen} />
    </div>
  );
};

export default Dashboard;