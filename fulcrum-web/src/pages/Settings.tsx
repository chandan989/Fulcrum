import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { TechnicalCard } from "@/components/ui/TechnicalCard";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { TechnicalBadge } from "@/components/ui/TechnicalBadge";
import { Switch } from "@/components/ui/switch";
import {
    Menu,
    X,
    Home,
    Settings2,
    Bot,
    Zap,
    Building2,
    BarChart3,
    Settings as SettingsIcon,
    Wallet,
    Shield,
    AlertTriangle,
    Download,
    RefreshCw,
    Power,
    ChevronRight,
} from "lucide-react";

const Settings = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isAvatarPaused, setIsAvatarPaused] = useState(false);

    const navItems = [
        { icon: Home, label: "Overview", path: "/dashboard" },
        { icon: Settings2, label: "Controller", path: "/controller" },
        { icon: Bot, label: "Avatars", path: "/avatars" },
        { icon: Zap, label: "Intents", path: "/intents" },
        { icon: Building2, label: "Governance", path: "/governance" },
        { icon: BarChart3, label: "Analytics", path: "/analytics" },
        { icon: SettingsIcon, label: "Settings", path: "/settings", active: true },
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
                            <div className="w-8 h-8 bg-primary flex items-center justify-center flex-shrink-0">
                                <span className="font-display text-lg font-bold text-primary-foreground">F</span>
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
                            Settings
                        </h1>
                    </div>
                </header>

                <main className="flex-1 p-6 space-y-8">
                    {/* Avatar Controls */}
                    <section className="space-y-4">
                        <h2 className="font-display text-lg font-bold uppercase tracking-wide flex items-center gap-2">
                            <Bot className="w-5 h-5" />
                            Avatar Configuration
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <TechnicalCard technicalRef="SET-PAUSE" className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="font-bold">Pause Avatar</h3>
                                        <p className="text-sm text-muted-foreground">Temporarily halt all new intents from this avatar.</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={cn("text-xs font-mono font-bold", isAvatarPaused ? "text-warning" : "text-success")}>
                                            {isAvatarPaused ? "PAUSED" : "ACTIVE"}
                                        </span>
                                        <Switch
                                            checked={isAvatarPaused}
                                            onCheckedChange={setIsAvatarPaused}
                                        />
                                    </div>
                                </div>
                            </TechnicalCard>

                            <TechnicalCard technicalRef="SET-UPGRADE" className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="font-bold">Protocol Version</h3>
                                        <p className="text-sm text-muted-foreground">Current implementation version</p>
                                    </div>
                                    <TechnicalBadge variant="default">v1.2.4</TechnicalBadge>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <div className="text-xs text-muted-foreground">
                                        Latest: v1.3.0 available
                                    </div>
                                    <TechnicalButton variant="secondary" size="sm">
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Upgrade
                                    </TechnicalButton>
                                </div>
                            </TechnicalCard>
                        </div>
                    </section>

                    {/* Emergency Zone */}
                    <section className="space-y-4">
                        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-error flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Danger Zone
                        </h2>

                        <TechnicalCard technicalRef="SET-EMERGENCY" className="border-error/50 bg-error/5 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-error/10 flex items-center justify-center rounded-lg shrink-0 border border-error/50">
                                    <Shield className="w-6 h-6 text-error" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-error">Emergency Withdraw</h3>
                                    <p className="text-sm text-foreground/80 max-w-2xl mt-1">
                                        This action will immediately pause all operations and withdraw all funds to the Recovery Guardian keys.
                                        This process is irreversible via the UI and requires Guardian consensus to restore.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 border-t border-error/20 pt-4">
                                <TechnicalButton variant="secondary" className="border-error text-error hover:bg-error/10">
                                    <Power className="w-4 h-4 mr-2" />
                                    Initiate Emergency Withdraw
                                </TechnicalButton>
                                <TechnicalButton variant="secondary" className="border-error/20 hover:bg-error/10 text-error">
                                    View Recovery Guardians
                                </TechnicalButton>
                            </div>
                        </TechnicalCard>
                    </section>

                    {/* Other Settings (Placeholder) */}
                    <section className="space-y-4 opacity-50 pointer-events-none grayscale">
                        <h2 className="font-display text-lg font-bold uppercase tracking-wide flex items-center gap-2">
                            <SettingsIcon className="w-5 h-5" />
                            General (Coming Soon)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <TechnicalCard>Notifications</TechnicalCard>
                            <TechnicalCard>API Keys</TechnicalCard>
                            <TechnicalCard>Appearance</TechnicalCard>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Settings;
