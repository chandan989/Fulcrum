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
  Wallet,
  Menu,
  X,
  Users,
  Shield,
  Clock,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  AlertTriangle,
  Lock,
  Unlock,
  UserPlus,
  Key,
  DollarSign,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Controller = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"signers" | "roles" | "limits" | "recovery">("signers");

  const navItems = [
    { icon: Home, label: "Overview", path: "/dashboard" },
    { icon: Settings2, label: "Controller", path: "/controller", active: true },
    { icon: Bot, label: "Avatars", path: "/avatars" },
    { icon: Zap, label: "Intents", path: "/intents" },
    { icon: Building2, label: "Governance", path: "/governance" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: BookOpen, label: "Docs", path: "/docs" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const signers = [
    { address: "0x7f3a...9d2c", name: "Primary Wallet", weight: 3, status: "active" },
    { address: "0x8b2d...4e1f", name: "Hardware Wallet", weight: 2, status: "active" },
    { address: "0x3c9e...7a8b", name: "Team Lead", weight: 2, status: "active" },
    { address: "0x1d4f...6c3a", name: "CFO Wallet", weight: 1, status: "pending" },
  ];

  const roles = [
    {
      name: "ADMIN",
      permissions: ["deploy_avatar", "add_signer", "update_policy", "execute_intent", "manage_guardians"],
      members: 1,
    },
    {
      name: "PROPOSER",
      permissions: ["create_intent", "view_analytics"],
      members: 2,
    },
    {
      name: "EXECUTOR",
      permissions: ["execute_intent", "view_analytics"],
      members: 2,
    },
    {
      name: "AUDITOR",
      permissions: ["view_all", "view_analytics", "export_logs"],
      members: 1,
    },
  ];

  const spendingLimits = [
    { tier: "Instant", range: "< $10,000", delay: "0 hours", approvals: 1 },
    { tier: "Standard", range: "$10,000 - $100,000", delay: "1 hour", approvals: 2 },
    { tier: "Large", range: "> $100,000", delay: "48 hours", approvals: 3 },
  ];

  const guardians = [
    { address: "0x9a1b...3e4f", name: "Family Member 1", status: "active", addedOn: "2024-01-15" },
    { address: "0x5c6d...7e8f", name: "Trusted Friend", status: "active", addedOn: "2024-01-15" },
    { address: "0x2f3g...8h9i", name: "Legal Counsel", status: "active", addedOn: "2024-02-01" },
    { address: "0x4j5k...1l2m", name: "Family Member 2", status: "pending", addedOn: "2024-03-10" },
    { address: "0x6n7o...3p4q", name: "Business Partner", status: "active", addedOn: "2024-03-15" },
  ];

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalWeight = signers.reduce((sum, s) => sum + s.weight, 0);
  const threshold = 5;

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
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1 hover:bg-muted">
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

      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-16 bg-card border-b-2 border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-muted lg:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-display text-xl font-bold uppercase tracking-wide">Controller</h1>
            <TechnicalBadge variant="success">Active</TechnicalBadge>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">
          {/* Controller Status Card */}
          <TechnicalCard technicalRef="CTRL-001" variant="elevated" className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold uppercase tracking-wide">Master Controller</h2>
                    <p className="font-mono text-xs text-muted-foreground">Casper Mainnet</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-right">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Controller Address</div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">01a7d3...8f2c9e</span>
                    <button onClick={() => copyAddress("01a7d38f2c9e...")} className="p-1 hover:bg-muted">
                      {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Created</div>
                  <div className="font-mono text-sm">Jan 15, 2024</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Avatars</div>
                  <div className="font-display text-xl font-bold text-primary">4</div>
                </div>
              </div>
            </div>
          </TechnicalCard>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b-2 border-border pb-2 overflow-x-auto">
            {[
              { id: "signers", label: "Multi-Sig", icon: Users },
              { id: "roles", label: "Access Control", icon: Key },
              { id: "limits", label: "Spending Limits", icon: DollarSign },
              { id: "recovery", label: "Social Recovery", icon: Shield },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 font-mono text-sm uppercase tracking-wider transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border-2 border-border text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Multi-Sig Configuration */}
          {activeTab === "signers" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <TechnicalCard technicalRef="SIG-001" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide">Authorized Signers</h3>
                    <TechnicalButton variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
                      Add Signer
                    </TechnicalButton>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-border">
                          <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">Signer</th>
                          <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">Address</th>
                          <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">Weight</th>
                          <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                          <th className="py-2 text-right font-mono text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {signers.map((signer, index) => (
                          <tr key={index} className="border-b border-border-secondary hover:bg-muted/50">
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-muted flex items-center justify-center border-2 border-border">
                                  <Users className="w-4 h-4" />
                                </div>
                                <span className="font-mono text-sm font-medium">{signer.name}</span>
                              </div>
                            </td>
                            <td className="py-3 font-mono text-sm">{signer.address}</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <div className="h-2 bg-primary" style={{ width: `${(signer.weight / totalWeight) * 100}px` }} />
                                <span className="font-mono text-sm font-bold">{signer.weight}</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <TechnicalBadge variant={signer.status === "active" ? "success" : "warning"}>
                                {signer.status}
                              </TechnicalBadge>
                            </td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button className="p-1.5 hover:bg-muted"><Edit2 className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-muted text-error"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TechnicalCard>
              </div>

              <div className="space-y-6">
                <TechnicalCard technicalRef="THR-001" className="space-y-4">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide">Threshold Config</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between font-mono text-sm">
                        <span className="text-muted-foreground">Required Weight</span>
                        <span className="font-bold">{threshold} / {totalWeight}</span>
                      </div>
                      <div className="h-4 bg-muted border-2 border-border relative">
                        <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${(threshold / totalWeight) * 100}%` }} />
                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
                          <span className="font-mono text-xs font-bold text-primary-foreground mix-blend-difference">
                            {Math.round((threshold / totalWeight) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border-secondary space-y-2">
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-muted-foreground">Total Signers</span>
                        <span>{signers.length}</span>
                      </div>
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-muted-foreground">Active Signers</span>
                        <span>{signers.filter(s => s.status === "active").length}</span>
                      </div>
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-muted-foreground">Total Weight</span>
                        <span>{totalWeight}</span>
                      </div>
                    </div>
                    <TechnicalButton variant="secondary" size="sm" className="w-full">
                      Update Threshold
                    </TechnicalButton>
                  </div>
                </TechnicalCard>

                <TechnicalCard technicalRef="WGT-001" className="space-y-4">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide">Weight Distribution</h3>
                  <div className="space-y-3">
                    {signers.map((signer, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="truncate">{signer.name}</span>
                          <span>{Math.round((signer.weight / totalWeight) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-muted border border-border">
                          <div
                            className={cn("h-full", signer.status === "active" ? "bg-primary" : "bg-warning")}
                            style={{ width: `${(signer.weight / totalWeight) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </TechnicalCard>
              </div>
            </div>
          )}

          {/* Access Control / Roles */}
          {activeTab === "roles" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {roles.map((role, index) => (
                <TechnicalCard key={index} technicalRef={`ROLE-${String(index + 1).padStart(3, "0")}`} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 flex items-center justify-center border-2",
                        role.name === "ADMIN" ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
                      )}>
                        <Key className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold uppercase tracking-wide">{role.name}</h3>
                        <p className="font-mono text-xs text-muted-foreground">{role.members} member(s)</p>
                      </div>
                    </div>
                    <TechnicalButton variant="ghost" size="sm" icon={<Edit2 className="w-4 h-4" />}>
                      Edit
                    </TechnicalButton>
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Permissions</div>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((perm, permIndex) => (
                        <TechnicalBadge key={permIndex} variant={role.name === "ADMIN" ? "primary" : "default"}>
                          {perm.replace(/_/g, " ")}
                        </TechnicalBadge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border-secondary">
                    <TechnicalButton variant="secondary" size="sm" icon={<UserPlus className="w-4 h-4" />}>
                      Assign Member
                    </TechnicalButton>
                  </div>
                </TechnicalCard>
              ))}

              <TechnicalCard className="flex items-center justify-center border-dashed min-h-[200px]">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-muted flex items-center justify-center border-2 border-border">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-wide">Create Custom Role</p>
                    <p className="font-mono text-xs text-muted-foreground">Define custom permissions</p>
                  </div>
                  <TechnicalButton variant="secondary" size="sm">Create Role</TechnicalButton>
                </div>
              </TechnicalCard>
            </div>
          )}

          {/* Spending Limits */}
          {activeTab === "limits" && (
            <div className="space-y-6">
              <TechnicalCard technicalRef="LIM-001" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide">Transaction Limits</h3>
                  <TechnicalButton variant="secondary" size="sm" icon={<Edit2 className="w-4 h-4" />}>
                    Edit Limits
                  </TechnicalButton>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {spendingLimits.map((limit, index) => (
                    <div key={index} className="bg-muted border-2 border-border p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        {limit.tier === "Instant" && <Zap className="w-5 h-5 text-success" />}
                        {limit.tier === "Standard" && <Clock className="w-5 h-5 text-warning" />}
                        {limit.tier === "Large" && <Lock className="w-5 h-5 text-error" />}
                        <span className="font-display text-lg font-bold uppercase">{limit.tier}</span>
                      </div>
                      <div className="font-display text-2xl font-bold text-primary">{limit.range}</div>
                      <div className="space-y-1 pt-2 border-t border-border-secondary">
                        <div className="flex justify-between font-mono text-xs">
                          <span className="text-muted-foreground">Time Delay</span>
                          <span>{limit.delay}</span>
                        </div>
                        <div className="flex justify-between font-mono text-xs">
                          <span className="text-muted-foreground">Approvals Required</span>
                          <span>{limit.approvals}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TechnicalCard>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TechnicalCard technicalRef="DAY-001" className="space-y-4">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide">Daily Limits</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between font-mono text-sm">
                        <span className="text-muted-foreground">Daily Limit</span>
                        <span className="font-bold">$500,000</span>
                      </div>
                      <div className="flex justify-between font-mono text-sm">
                        <span className="text-muted-foreground">Spent Today</span>
                        <span className="font-bold text-primary">$42,500</span>
                      </div>
                      <div className="h-4 bg-muted border-2 border-border">
                        <div className="h-full bg-primary" style={{ width: "8.5%" }} />
                      </div>
                      <div className="font-mono text-xs text-muted-foreground text-right">
                        $457,500 remaining
                      </div>
                    </div>
                    <TechnicalButton variant="secondary" size="sm" className="w-full">
                      Update Daily Limit
                    </TechnicalButton>
                  </div>
                </TechnicalCard>

                <TechnicalCard technicalRef="WL-001" className="space-y-4">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide">Whitelisted Contracts</h3>
                  <div className="space-y-2">
                    {[
                      { name: "Uniswap V3 Router", address: "0x68b3...a2f1" },
                      { name: "Aave V3 Pool", address: "0x87b1...c3d2" },
                      { name: "1inch Aggregator", address: "0x11f4...9e3a" },
                    ].map((contract, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-border-secondary last:border-0">
                        <div>
                          <div className="font-mono text-sm font-medium">{contract.name}</div>
                          <div className="font-mono text-xs text-muted-foreground">{contract.address}</div>
                        </div>
                        <TechnicalBadge variant="success" icon={<Check className="w-3 h-3" />}>
                          Verified
                        </TechnicalBadge>
                      </div>
                    ))}
                  </div>
                  <TechnicalButton variant="secondary" size="sm" icon={<Plus className="w-4 h-4" />} className="w-full">
                    Add Contract
                  </TechnicalButton>
                </TechnicalCard>
              </div>
            </div>
          )}

          {/* Social Recovery */}
          {activeTab === "recovery" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <TechnicalCard technicalRef="GRD-001" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg font-bold uppercase tracking-wide">Recovery Guardians</h3>
                      <TechnicalButton variant="primary" size="sm" icon={<UserPlus className="w-4 h-4" />}>
                        Add Guardian
                      </TechnicalButton>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-border">
                            <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">Guardian</th>
                            <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">Address</th>
                            <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                            <th className="py-2 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">Added</th>
                            <th className="py-2 text-right font-mono text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {guardians.map((guardian, index) => (
                            <tr key={index} className="border-b border-border-secondary hover:bg-muted/50">
                              <td className="py-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-muted flex items-center justify-center border-2 border-border">
                                    <Shield className="w-4 h-4" />
                                  </div>
                                  <span className="font-mono text-sm font-medium">{guardian.name}</span>
                                </div>
                              </td>
                              <td className="py-3 font-mono text-sm">{guardian.address}</td>
                              <td className="py-3">
                                <TechnicalBadge variant={guardian.status === "active" ? "success" : "warning"}>
                                  {guardian.status}
                                </TechnicalBadge>
                              </td>
                              <td className="py-3 font-mono text-xs text-muted-foreground">{guardian.addedOn}</td>
                              <td className="py-3 text-right">
                                <button className="p-1.5 hover:bg-muted text-error"><Trash2 className="w-4 h-4" /></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TechnicalCard>
                </div>

                <div className="space-y-6">
                  <TechnicalCard technicalRef="REC-001" className="space-y-4">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide">Recovery Threshold</h3>
                    <div className="flex items-center justify-center py-6">
                      <div className="text-center">
                        <div className="font-display text-4xl font-bold text-primary">3 / 5</div>
                        <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mt-1">
                          Guardians Required
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-center">
                      <p className="font-mono text-xs text-muted-foreground">
                        3 out of 5 guardians must approve to recover access to your Controller.
                      </p>
                      <TechnicalButton variant="secondary" size="sm" className="w-full">
                        Update Threshold
                      </TechnicalButton>
                    </div>
                  </TechnicalCard>

                  <TechnicalCard technicalRef="EMG-001" className="space-y-4 border-warning">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      <h3 className="font-display text-lg font-bold uppercase tracking-wide">Emergency Recovery</h3>
                    </div>
                    <p className="font-mono text-sm text-muted-foreground">
                      Lost access to your Controller? Initiate recovery with your guardians.
                    </p>
                    <TechnicalButton variant="secondary" size="sm" icon={<Unlock className="w-4 h-4" />} className="w-full">
                      Initiate Recovery
                    </TechnicalButton>
                  </TechnicalCard>
                </div>
              </div>

              <TechnicalCard technicalRef="LOG-001" className="space-y-4">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide">Recovery Activity Log</h3>
                <div className="bg-muted p-4 border-2 border-border text-center">
                  <Shield className="w-8 h-8 mx-auto text-success mb-2" />
                  <p className="font-mono text-sm text-muted-foreground">No recovery attempts on record</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">Your controller has never required recovery</p>
                </div>
              </TechnicalCard>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Controller;
