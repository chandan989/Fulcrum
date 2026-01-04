import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Plus, Send, RefreshCw, FileCode, X, Copy, Check,
  Clock, Zap, Shield, ExternalLink, ChevronRight, Loader2,
  ArrowRightLeft, Code, AlertTriangle, Layers, Wallet, Menu,
  Home, Settings2, Bot, Building2, BarChart3, Settings, BookOpen
} from 'lucide-react';
import { TechnicalCard } from '@/components/ui/TechnicalCard';
import { TechnicalButton } from '@/components/ui/TechnicalButton';
import { TechnicalBadge } from '@/components/ui/TechnicalBadge';
import { CreateIntentDialog } from '@/components/dialogs/CreateIntentDialog';

type ActionType = 'transfer' | 'swap' | 'contract' | 'batch';
type IntentStatus = 'pending' | 'proving' | 'executing' | 'confirmed' | 'failed';

interface Intent {
  id: string;
  name: string;
  chain: string;
  chainColor: string;
  action: ActionType;
  target: string;
  value: string;
  token: string;
  status: IntentStatus;
  createdAt: string;
  expiresAt: string;
  gasEstimate: string;
  proofProgress?: number;
}

const mockIntents: Intent[] = [
  {
    id: 'INT-4892',
    name: 'Treasury Rebalance',
    chain: 'Ethereum',
    chainColor: '#627EEA',
    action: 'transfer',
    target: '0x742d...3a1c',
    value: '50,000',
    token: 'USDC',
    status: 'confirmed',
    createdAt: '2024-01-15 14:32:00',
    expiresAt: '2024-01-17 14:32:00',
    gasEstimate: '51,203',
  },
  {
    id: 'INT-4893',
    name: 'Yield Harvest',
    chain: 'Base',
    chainColor: '#0052FF',
    action: 'contract',
    target: '0xAAVE...Pool',
    value: '10,000',
    token: 'ETH',
    status: 'executing',
    createdAt: '2024-01-15 15:10:00',
    expiresAt: '2024-01-17 15:10:00',
    gasEstimate: '78,500',
  },
  {
    id: 'INT-4894',
    name: 'DEX Swap',
    chain: 'Arbitrum',
    chainColor: '#28A0F0',
    action: 'swap',
    target: 'Uniswap V3',
    value: '5,000',
    token: 'USDC → ETH',
    status: 'proving',
    createdAt: '2024-01-15 16:45:00',
    expiresAt: '2024-01-17 16:45:00',
    gasEstimate: '125,000',
    proofProgress: 67,
  },
  {
    id: 'INT-4895',
    name: 'Bridge Transfer',
    chain: 'BSC',
    chainColor: '#F0B90B',
    action: 'transfer',
    target: '0x8f3d...9c2e',
    value: '25,000',
    token: 'USDT',
    status: 'pending',
    createdAt: '2024-01-15 17:20:00',
    expiresAt: '2024-01-17 17:20:00',
    gasEstimate: '45,000',
  },
  {
    id: 'INT-4896',
    name: 'Failed Approval',
    chain: 'Ethereum',
    chainColor: '#627EEA',
    action: 'contract',
    target: '0xComp...lend',
    value: '0',
    token: 'COMP',
    status: 'failed',
    createdAt: '2024-01-15 12:00:00',
    expiresAt: '2024-01-17 12:00:00',
    gasEstimate: '65,000',
  },
];

const tokens = ['ETH', 'USDC', 'USDT', 'DAI', 'WBTC', 'LINK'];

const Intents = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<Intent | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const navItems = [
    { icon: Home, label: "Overview", path: "/dashboard" },
    { icon: Settings2, label: "Controller", path: "/controller" },
    { icon: Bot, label: "Avatars", path: "/avatars" },
    { icon: Zap, label: "Intents", path: "/intents", active: true },
    { icon: Building2, label: "Governance", path: "/governance" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: BookOpen, label: "Docs", path: "/docs" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status: IntentStatus) => {
    const configs: Record<IntentStatus, { variant: 'success' | 'warning' | 'error' | 'default'; label: string }> = {
      pending: { variant: 'warning', label: 'Pending Signature' },
      proving: { variant: 'default', label: 'Generating Proof' },
      executing: { variant: 'warning', label: 'Executing' },
      confirmed: { variant: 'success', label: 'Confirmed' },
      failed: { variant: 'error', label: 'Failed' },
    };
    return configs[status];
  };

  const getActionIcon = (action: ActionType) => {
    switch (action) {
      case 'transfer': return <Send size={14} />;
      case 'swap': return <ArrowRightLeft size={14} />;
      case 'contract': return <Code size={14} />;
      case 'batch': return <Layers size={14} />;
    }
  };

  const filteredIntents = filterStatus === 'all'
    ? mockIntents
    : mockIntents.filter(i => i.status === filterStatus);

  const openDetails = (intent: Intent) => {
    setSelectedIntent(intent);
    setShowDetailsModal(true);
  };

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
              Intent Management
            </h1>
            <p className="hidden md:block text-sm text-secondary font-mono">
              Cross-chain transaction queue
            </p>
          </div>
          <TechnicalButton onClick={() => setShowCreateModal(true)}>
            <Plus size={16} />
            Create Intent
          </TechnicalButton>
        </header>

        <main className="flex-1 p-6 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <TechnicalCard technicalRef="QUEUE">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 flex items-center justify-center">
                  <Clock size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-xs text-secondary font-mono uppercase">Pending</p>
                  <p className="text-2xl font-display font-bold">3</p>
                </div>
              </div>
            </TechnicalCard>

            <TechnicalCard technicalRef="ZK">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center">
                  <Zap size={20} className="text-accent" />
                </div>
                <div>
                  <p className="text-xs text-secondary font-mono uppercase">Proving</p>
                  <p className="text-2xl font-display font-bold">1</p>
                </div>
              </div>
            </TechnicalCard>

            <TechnicalCard technicalRef="EXEC">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 flex items-center justify-center">
                  <Shield size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-xs text-secondary font-mono uppercase">Confirmed (24h)</p>
                  <p className="text-2xl font-display font-bold">12</p>
                </div>
              </div>
            </TechnicalCard>

            <TechnicalCard technicalRef="GAS">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted flex items-center justify-center">
                  <RefreshCw size={20} />
                </div>
                <div>
                  <p className="text-xs text-secondary font-mono uppercase">Gas Saved</p>
                  <p className="text-2xl font-display font-bold">$2,450</p>
                </div>
              </div>
            </TechnicalCard>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
            <span className="text-sm font-mono text-secondary shrink-0">FILTER:</span>
            {['all', 'pending', 'proving', 'executing', 'confirmed', 'failed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 text-xs font-mono uppercase border-2 transition-all shrink-0 ${filterStatus === status
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card hover:border-primary'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Intents Table */}
          <TechnicalCard technicalRef="INT-LIST">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-primary">
                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider">Intent ID</th>
                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider">Chain</th>
                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider">Action</th>
                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider">Target</th>
                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider">Value</th>
                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 px-4 font-mono text-xs uppercase tracking-wider">Expires</th>
                    <th className="text-right py-3 px-4 font-mono text-xs uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIntents.map((intent, idx) => {
                    const statusConfig = getStatusBadge(intent.status);
                    return (
                      <tr
                        key={intent.id}
                        className={`border-b border-border hover:bg-accent/5 cursor-pointer transition-colors ${idx % 2 === 0 ? 'bg-card' : 'bg-muted/30'
                          }`}
                        onClick={() => openDetails(intent)}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-medium">{intent.id}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(intent.id, intent.id);
                              }}
                              className="p-1 hover:bg-muted transition-colors"
                            >
                              {copiedId === intent.id ? <Check size={12} className="text-success" /> : <Copy size={12} />}
                            </button>
                          </div>
                          <p className="text-xs text-secondary">{intent.name}</p>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: intent.chainColor }}
                            />
                            <span className="text-sm">{intent.chain}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {getActionIcon(intent.action)}
                            <span className="text-sm capitalize">{intent.action}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <span className="font-mono text-sm">{intent.target}</span>
                            {/* Verified Badge Logic Check */}
                            {intent.target.startsWith("0xAAVE") && <Check size={12} className="text-primary ml-1" />}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm font-medium">{intent.value} {intent.token}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-1">
                            <TechnicalBadge variant={statusConfig.variant}>
                              {intent.status === 'proving' && <Loader2 size={12} className="animate-spin" />}
                              {statusConfig.label}
                            </TechnicalBadge>
                            {intent.status === 'proving' && intent.proofProgress && (
                              <div className="w-full h-1 bg-muted overflow-hidden">
                                <div
                                  className="h-full bg-accent transition-all"
                                  style={{ width: `${intent.proofProgress}%` }}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-secondary">{intent.expiresAt.split(' ')[0]}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetails(intent);
                            }}
                            className="p-2 hover:bg-muted transition-colors"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TechnicalCard>
        </main>
      </div>

      {/* Create Intent Modal */}
      <CreateIntentDialog open={showCreateModal} onOpenChange={setShowCreateModal} />

      {/* Intent Details Modal */}
      {showDetailsModal && selectedIntent && (
        <div className="fixed inset-0 bg-primary/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border-2 border-primary shadow-brutal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b-2 border-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedIntent.chainColor }}
                />
                <div>
                  <h2 className="font-display text-xl font-bold uppercase tracking-wider">{selectedIntent.id}</h2>
                  <p className="text-sm text-secondary">{selectedIntent.name}</p>
                </div>
              </div>
              <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-muted transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono uppercase text-secondary">Status</span>
                <TechnicalBadge variant={getStatusBadge(selectedIntent.status).variant}>
                  {selectedIntent.status === 'proving' && <Loader2 size={12} className="animate-spin" />}
                  {getStatusBadge(selectedIntent.status).label}
                </TechnicalBadge>
              </div>

              {/* ZK Proof Progress */}
              {selectedIntent.status === 'proving' && (
                <TechnicalCard technicalRef="ZK-PROOF">
                  <h3 className="font-mono text-sm uppercase tracking-wider mb-3">ZK Proof Generation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary">Progress</span>
                      <span className="font-mono">{selectedIntent.proofProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-muted border-2 border-border overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all"
                        style={{ width: `${selectedIntent.proofProgress}%` }}
                      />
                    </div>
                    <p className="text-xs text-secondary font-mono">
                      Cryptographically verifying Ed25519 signature for {selectedIntent.chain}...
                    </p>
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div>
                        <p className="text-xs text-secondary">Witness Gen</p>
                        <p className="font-mono text-sm text-success">✓ Complete</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary">Proving</p>
                        <p className="font-mono text-sm text-warning">In Progress</p>
                      </div>
                      <div>
                        <p className="text-xs text-secondary">Verification</p>
                        <p className="font-mono text-sm text-secondary">Pending</p>
                      </div>
                    </div>
                  </div>
                </TechnicalCard>
              )}

              {/* Intent Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-mono uppercase text-secondary mb-1">Chain</p>
                  <p className="font-medium">{selectedIntent.chain}</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-secondary mb-1">Action</p>
                  <p className="font-medium capitalize">{selectedIntent.action}</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-secondary mb-1">Target</p>
                  <div className="flex items-center gap-1">
                    <p className="font-mono text-sm">{selectedIntent.target}</p>
                    {/* Simplified Verified Check - just checking if it is a contract interaction in mock data */}
                    {selectedIntent.action === "contract" && <Check size={12} className="text-primary" />}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-secondary mb-1">Value</p>
                  <p className="font-mono font-medium">{selectedIntent.value} {selectedIntent.token}</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-secondary mb-1">Created</p>
                  <p className="text-sm">{selectedIntent.createdAt}</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-secondary mb-1">Expires</p>
                  <p className="text-sm">{selectedIntent.expiresAt}</p>
                </div>
              </div>

              {/* Gas Metrics */}
              <TechnicalCard technicalRef="GAS-001">
                <h3 className="font-mono text-sm uppercase tracking-wider mb-3">Gas Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-secondary">Estimated Gas</p>
                    <p className="font-mono font-medium">{selectedIntent.gasEstimate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary">Gas Price</p>
                    <p className="font-mono font-medium">25 gwei</p>
                  </div>
                  <div>
                    <p className="text-xs text-secondary">Est. Cost</p>
                    <p className="font-mono font-medium text-success">~$2.50</p>
                  </div>
                </div>
              </TechnicalCard>

              {/* Raw Intent JSON */}
              <details className="border-2 border-border">
                <summary className="px-4 py-3 cursor-pointer font-mono text-sm uppercase tracking-wider hover:bg-muted">
                  Raw Intent Object
                </summary>
                <div className="p-4 border-t-2 border-border bg-muted">
                  <pre className="font-mono text-xs overflow-x-auto">
                    {JSON.stringify({
                      id: selectedIntent.id,
                      chain: selectedIntent.chain,
                      action: selectedIntent.action,
                      target: selectedIntent.target,
                      value: selectedIntent.value,
                      token: selectedIntent.token,
                      nonce: 42,
                      expiry: selectedIntent.expiresAt,
                      signature: "0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
                    }, null, 2)}
                  </pre>
                </div>
              </details>
            </div>

            <div className="border-t-2 border-primary p-4 flex justify-between">
              <div className="flex gap-2">
                {selectedIntent.status === 'pending' && (
                  <TechnicalButton variant="secondary">
                    <X size={16} />
                    Cancel Intent
                  </TechnicalButton>
                )}
              </div>
              <div className="flex gap-2">
                <TechnicalButton variant="secondary">
                  <ExternalLink size={16} />
                  View on Explorer
                </TechnicalButton>
                <TechnicalButton onClick={() => setShowDetailsModal(false)}>
                  Close
                </TechnicalButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Intents;
