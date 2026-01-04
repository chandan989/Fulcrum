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
  Plus,
  Copy,
  Check,
  ExternalLink,
  Pause,
  Play,
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Chain configuration with colors
const CHAINS = {
  ethereum: { name: "Ethereum", symbol: "ETH", color: "#627EEA", gasToken: "ETH" },
  base: { name: "Base", symbol: "BASE", color: "#0052FF", gasToken: "ETH" },
  arbitrum: { name: "Arbitrum", symbol: "ARB", color: "#28A0F0", gasToken: "ETH" },
  bsc: { name: "BSC", symbol: "BNB", color: "#F0B90B", gasToken: "BNB" },
  polygon: { name: "Polygon", symbol: "MATIC", color: "#8247E5", gasToken: "MATIC" },
  optimism: { name: "Optimism", symbol: "OP", color: "#FF0420", gasToken: "ETH" },
};

type ChainId = keyof typeof CHAINS;

interface Avatar {
  id: string;
  chain: ChainId;
  address: string;
  shortAddress: string;
  status: string;
  nativeBalance: string;
  usdValue: string;
  tokens: { symbol: string; balance: string; usdValue: string }[];
  lastActivity: string;
  transactions: number;
}

const Avatars = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [deployModalOpen, setDeployModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [receiveModalOpen, setReceiveModalOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState<ChainId | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [sendToken, setSendToken] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<string>("");
  const [sendRecipient, setSendRecipient] = useState<string>("");
  const [confirmStep, setConfirmStep] = useState(false);

  const navItems = [
    { icon: Home, label: "Overview", path: "/dashboard" },
    { icon: Settings2, label: "Controller", path: "/controller" },
    { icon: Bot, label: "Avatars", path: "/avatars", active: true },
    { icon: Zap, label: "Intents", path: "/intents" },
    { icon: Building2, label: "Governance", path: "/governance" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const avatars = [
    {
      id: "eth-avatar-1",
      chain: "ethereum" as ChainId,
      address: "0x7f3a8b2c9d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
      shortAddress: "0x7f3a...7f8a",
      status: "active",
      nativeBalance: "2.45",
      usdValue: "$8,234.50",
      tokens: [
        { symbol: "USDC", balance: "5,000.00", usdValue: "$5,000.00" },
        { symbol: "USDT", balance: "2,500.00", usdValue: "$2,500.00" },
      ],
      lastActivity: "2 hours ago",
      transactions: 156,
    },
    {
      id: "base-avatar-1",
      chain: "base" as ChainId,
      address: "0x8b2d4e1f6a7c9d0e2f3a4b5c6d7e8f9a0b1c2d3e",
      shortAddress: "0x8b2d...2d3e",
      status: "active",
      nativeBalance: "1.82",
      usdValue: "$6,123.40",
      tokens: [
        { symbol: "USDC", balance: "3,200.00", usdValue: "$3,200.00" },
      ],
      lastActivity: "5 min ago",
      transactions: 89,
    },
    {
      id: "arb-avatar-1",
      chain: "arbitrum" as ChainId,
      address: "0x3c9e7a8b1d2f4e5c6a7b8d9e0f1a2b3c4d5e6f7a",
      shortAddress: "0x3c9e...6f7a",
      status: "active",
      nativeBalance: "0.95",
      usdValue: "$3,192.75",
      tokens: [
        { symbol: "ARB", balance: "1,500.00", usdValue: "$1,275.00" },
        { symbol: "USDC", balance: "800.00", usdValue: "$800.00" },
      ],
      lastActivity: "1 day ago",
      transactions: 42,
    },
    {
      id: "bsc-avatar-1",
      chain: "bsc" as ChainId,
      address: "0x1d4f6c3a8b9e2d5f7a8c0e1b3d4f5a6c7b8e9d0a",
      shortAddress: "0x1d4f...9d0a",
      status: "paused",
      nativeBalance: "3.20",
      usdValue: "$1,952.00",
      tokens: [
        { symbol: "BUSD", balance: "1,200.00", usdValue: "$1,200.00" },
      ],
      lastActivity: "3 days ago",
      transactions: 28,
    },
  ];

  const availableChains = Object.entries(CHAINS).filter(
    ([chainId]) => !avatars.some(a => a.chain === chainId)
  );

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const totalValue = avatars.reduce((sum, a) => {
    const value = parseFloat(a.usdValue.replace(/[$,]/g, ""));
    return sum + value;
  }, 0);

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
                <span className="font-display text-lg font-bold uppercase tracking-wider">Fulcrum</span>
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
            <h1 className="font-display text-xl font-bold uppercase tracking-wide">Avatars</h1>
            <TechnicalBadge variant="primary">{avatars.length} Deployed</TechnicalBadge>
          </div>
          <TechnicalButton variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={() => setDeployModalOpen(true)}>
            Deploy Avatar
          </TechnicalButton>
        </header>

        <main className="flex-1 p-6 space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <TechnicalCard technicalRef="TOT-001" className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Total Value</div>
              <div className="font-display text-2xl font-bold text-primary">
                ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
              <div className="font-mono text-xs text-muted-foreground">Across {avatars.length} chains</div>
            </TechnicalCard>
            <TechnicalCard technicalRef="ACT-001" className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Active Avatars</div>
              <div className="font-display text-2xl font-bold">{avatars.filter(a => a.status === "active").length}</div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="font-mono text-xs text-success">Operational</span>
              </div>
            </TechnicalCard>
            <TechnicalCard technicalRef="TXN-001" className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Total Transactions</div>
              <div className="font-display text-2xl font-bold">{avatars.reduce((sum, a) => sum + a.transactions, 0)}</div>
              <div className="font-mono text-xs text-muted-foreground">All time</div>
            </TechnicalCard>
            <TechnicalCard technicalRef="AVL-001" className="space-y-2">
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Available Chains</div>
              <div className="font-display text-2xl font-bold">{availableChains.length}</div>
              <div className="font-mono text-xs text-muted-foreground">Ready to deploy</div>
            </TechnicalCard>
          </div>

          {/* Avatar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {avatars.map((avatar) => {
              const chain = CHAINS[avatar.chain];
              return (
                <TechnicalCard
                  key={avatar.id}
                  technicalRef={`AVT-${avatar.chain.toUpperCase().slice(0, 3)}`}
                  variant="elevated"
                  className="space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 flex items-center justify-center border-2"
                        style={{ backgroundColor: chain.color, borderColor: chain.color }}
                      >
                        <span className="font-display text-lg font-bold text-white">{chain.symbol.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold uppercase tracking-wide">{chain.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-muted-foreground">{avatar.shortAddress}</span>
                          <button onClick={() => copyAddress(avatar.address)} className="p-0.5 hover:bg-muted">
                            {copiedAddress === avatar.address ? (
                              <Check className="w-3 h-3 text-success" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                          <a href="#" className="p-0.5 hover:bg-muted">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <TechnicalBadge
                      variant={avatar.status === "active" ? "success" : "warning"}
                      icon={avatar.status === "active" ? <Check className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                    >
                      {avatar.status}
                    </TechnicalBadge>
                  </div>

                  {/* Balances */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted border-2 border-border p-3 space-y-1">
                      <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Native Balance</div>
                      <div className="font-display text-xl font-bold">
                        {avatar.nativeBalance} <span className="text-sm text-muted-foreground">{chain.gasToken}</span>
                      </div>
                    </div>
                    <div className="bg-muted border-2 border-border p-3 space-y-1">
                      <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">USD Value</div>
                      <div className="font-display text-xl font-bold text-primary">{avatar.usdValue}</div>
                    </div>
                  </div>

                  {/* Token Holdings */}
                  {avatar.tokens.length > 0 && (
                    <div className="space-y-2">
                      <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Token Holdings</div>
                      <div className="space-y-1">
                        {avatar.tokens.map((token, index) => (
                          <div key={index} className="flex items-center justify-between py-1.5 border-b border-border-secondary last:border-0">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-card border-2 border-border flex items-center justify-center">
                                <span className="font-mono text-xs font-bold">{token.symbol.charAt(0)}</span>
                              </div>
                              <span className="font-mono text-sm">{token.symbol}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-mono text-sm font-medium">{token.balance}</div>
                              <div className="font-mono text-xs text-muted-foreground">{token.usdValue}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border-secondary">
                    <div className="flex items-center gap-4">
                      <div className="font-mono text-xs text-muted-foreground">
                        <span className="font-bold text-foreground">{avatar.transactions}</span> transactions
                      </div>
                      <div className="font-mono text-xs text-muted-foreground">
                        Last: {avatar.lastActivity}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TechnicalButton 
                        variant="ghost" 
                        size="sm" 
                        icon={<ArrowUpRight className="w-4 h-4" />}
                        onClick={() => {
                          setSelectedAvatar(avatar);
                          setSendToken(chain.gasToken);
                          setSendAmount("");
                          setSendRecipient("");
                          setConfirmStep(false);
                          setSendModalOpen(true);
                        }}
                      >
                        Send
                      </TechnicalButton>
                      <TechnicalButton 
                        variant="ghost" 
                        size="sm" 
                        icon={<ArrowDownLeft className="w-4 h-4" />}
                        onClick={() => {
                          setSelectedAvatar(avatar);
                          setReceiveModalOpen(true);
                        }}
                      >
                        Receive
                      </TechnicalButton>
                      <TechnicalButton
                        variant="ghost"
                        size="sm"
                        icon={avatar.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      >
                        {avatar.status === "active" ? "Pause" : "Resume"}
                      </TechnicalButton>
                    </div>
                  </div>
                </TechnicalCard>
              );
            })}

            {/* Deploy New Avatar Card */}
            <TechnicalCard
              className="flex items-center justify-center border-dashed min-h-[300px] cursor-pointer hover:bg-muted/50 transition-colors"
              hover={false}
              onClick={() => setDeployModalOpen(true)}
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted flex items-center justify-center border-2 border-border">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold uppercase tracking-wide">Deploy New Avatar</p>
                  <p className="font-mono text-sm text-muted-foreground">Extend your reach to another chain</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {availableChains.slice(0, 3).map(([chainId, chain]) => (
                    <div
                      key={chainId}
                      className="w-8 h-8 flex items-center justify-center border-2"
                      style={{ backgroundColor: chain.color, borderColor: chain.color }}
                    >
                      <span className="font-display text-sm font-bold text-white">{chain.symbol.charAt(0)}</span>
                    </div>
                  ))}
                  {availableChains.length > 3 && (
                    <div className="w-8 h-8 flex items-center justify-center border-2 border-border bg-muted">
                      <span className="font-mono text-xs">+{availableChains.length - 3}</span>
                    </div>
                  )}
                </div>
              </div>
            </TechnicalCard>
          </div>
        </main>
      </div>

      {/* Deploy Modal */}
      {deployModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setDeployModalOpen(false)} />
          <div className="relative bg-card border-2 border-border w-full max-w-lg" style={{ boxShadow: "12px 12px 0px hsl(214 20% 88%)" }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide">Deploy Avatar</h2>
                  <p className="font-mono text-xs text-muted-foreground">Create a new cross-chain account</p>
                </div>
              </div>
              <button onClick={() => setDeployModalOpen(false)} className="p-2 hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Chain Selection */}
              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Select Chain</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(CHAINS).map(([chainId, chain]) => {
                    const isDeployed = avatars.some(a => a.chain === chainId);
                    return (
                      <button
                        key={chainId}
                        disabled={isDeployed}
                        onClick={() => setSelectedChain(chainId as ChainId)}
                        className={cn(
                          "flex items-center gap-3 p-3 border-2 transition-all",
                          isDeployed && "opacity-50 cursor-not-allowed",
                          selectedChain === chainId
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div
                          className="w-10 h-10 flex items-center justify-center border-2"
                          style={{ backgroundColor: chain.color, borderColor: chain.color }}
                        >
                          <span className="font-display font-bold text-white">{chain.symbol.charAt(0)}</span>
                        </div>
                        <div className="text-left">
                          <div className="font-display text-sm font-bold uppercase">{chain.name}</div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {isDeployed ? "Deployed" : `Gas: ${chain.gasToken}`}
                          </div>
                        </div>
                        {isDeployed && (
                          <Check className="w-4 h-4 text-success ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Initial Funding */}
              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Initial Funding (Optional)
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-card border-2 border-border font-mono text-sm focus:outline-none focus:border-primary"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">
                      {selectedChain ? CHAINS[selectedChain].gasToken : "ETH"}
                    </span>
                  </div>
                </div>
                <p className="font-mono text-xs text-muted-foreground">
                  Funds will be transferred from your Casper Gas Vault
                </p>
              </div>

              {/* Cost Estimate */}
              {selectedChain && (
                <div className="bg-muted border-2 border-border p-4 space-y-2">
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Deployment Cost</div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-sm">Contract Deployment</span>
                    <span className="font-mono text-sm font-bold">~0.015 {CHAINS[selectedChain].gasToken}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-mono text-sm">ZK Verification Setup</span>
                    <span className="font-mono text-sm font-bold">~0.005 {CHAINS[selectedChain].gasToken}</span>
                  </div>
                  <div className="pt-2 border-t border-border-secondary flex justify-between items-baseline">
                    <span className="font-mono text-sm font-bold">Estimated Total</span>
                    <span className="font-display text-lg font-bold text-primary">~$45.00</span>
                  </div>
                </div>
              )}

              {/* Warning */}
              <div className="flex items-start gap-3 p-3 bg-warning/10 border-2 border-warning">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="font-mono text-xs text-warning">
                  This action requires signing on your Casper wallet. The Avatar will be linked to your Controller.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t-2 border-border bg-muted">
              <TechnicalButton variant="secondary" onClick={() => setDeployModalOpen(false)}>
                Cancel
              </TechnicalButton>
              <TechnicalButton variant="primary" disabled={!selectedChain} icon={<Zap className="w-4 h-4" />}>
                Deploy to {selectedChain ? CHAINS[selectedChain].name : "Chain"}
              </TechnicalButton>
            </div>
          </div>
        </div>
      )}

      {/* Send Modal */}
      {sendModalOpen && selectedAvatar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSendModalOpen(false)} />
          <div className="relative bg-card border-2 border-border w-full max-w-lg" style={{ boxShadow: "12px 12px 0px hsl(214 20% 88%)" }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ backgroundColor: CHAINS[selectedAvatar.chain].color }}
                >
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide">Send Tokens</h2>
                  <p className="font-mono text-xs text-muted-foreground">From {CHAINS[selectedAvatar.chain].name} Avatar</p>
                </div>
              </div>
              <button onClick={() => setSendModalOpen(false)} className="p-2 hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {!confirmStep ? (
                <>
                  {/* Token Selection */}
                  <div className="space-y-3">
                    <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Select Token</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setSendToken(CHAINS[selectedAvatar.chain].gasToken)}
                        className={cn(
                          "flex items-center gap-2 p-3 border-2 transition-all",
                          sendToken === CHAINS[selectedAvatar.chain].gasToken
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="w-8 h-8 bg-muted border-2 border-border flex items-center justify-center">
                          <span className="font-mono text-xs font-bold">{CHAINS[selectedAvatar.chain].gasToken.charAt(0)}</span>
                        </div>
                        <div className="text-left">
                          <div className="font-mono text-sm font-bold">{CHAINS[selectedAvatar.chain].gasToken}</div>
                          <div className="font-mono text-xs text-muted-foreground">{selectedAvatar.nativeBalance}</div>
                        </div>
                      </button>
                      {selectedAvatar.tokens.map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => setSendToken(token.symbol)}
                          className={cn(
                            "flex items-center gap-2 p-3 border-2 transition-all",
                            sendToken === token.symbol
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className="w-8 h-8 bg-muted border-2 border-border flex items-center justify-center">
                            <span className="font-mono text-xs font-bold">{token.symbol.charAt(0)}</span>
                          </div>
                          <div className="text-left">
                            <div className="font-mono text-sm font-bold">{token.symbol}</div>
                            <div className="font-mono text-xs text-muted-foreground">{token.balance}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recipient Address */}
                  <div className="space-y-3">
                    <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Recipient Address</label>
                    <input
                      type="text"
                      value={sendRecipient}
                      onChange={(e) => setSendRecipient(e.target.value)}
                      placeholder="0x..."
                      className="w-full px-4 py-3 bg-card border-2 border-border font-mono text-sm focus:outline-none focus:border-primary"
                    />
                  </div>

                  {/* Amount */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Amount</label>
                      <button 
                        onClick={() => {
                          const balance = sendToken === CHAINS[selectedAvatar.chain].gasToken 
                            ? selectedAvatar.nativeBalance 
                            : selectedAvatar.tokens.find(t => t.symbol === sendToken)?.balance || "0";
                          setSendAmount(balance.replace(/,/g, ""));
                        }}
                        className="font-mono text-xs text-primary hover:underline"
                      >
                        MAX
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full px-4 py-3 bg-card border-2 border-border font-mono text-sm focus:outline-none focus:border-primary pr-20"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground">
                        {sendToken}
                      </span>
                    </div>
                  </div>

                  {/* Estimated Gas */}
                  <div className="bg-muted border-2 border-border p-4 space-y-2">
                    <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Transaction Estimate</div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-sm">Gas Fee</span>
                      <span className="font-mono text-sm font-bold">~0.002 {CHAINS[selectedAvatar.chain].gasToken}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-sm">ZK Proof Generation</span>
                      <span className="font-mono text-sm font-bold">~2-3 sec</span>
                    </div>
                  </div>
                </>
              ) : (
                /* Confirmation Step */
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 mx-auto bg-warning/10 flex items-center justify-center border-2 border-warning mb-4">
                      <AlertCircle className="w-8 h-8 text-warning" />
                    </div>
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide">Confirm Transaction</h3>
                    <p className="font-mono text-sm text-muted-foreground mt-2">Please review the details below</p>
                  </div>

                  <div className="bg-muted border-2 border-border p-4 space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border-secondary">
                      <span className="font-mono text-sm text-muted-foreground">From</span>
                      <span className="font-mono text-sm font-bold">{selectedAvatar.shortAddress}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border-secondary">
                      <span className="font-mono text-sm text-muted-foreground">To</span>
                      <span className="font-mono text-sm font-bold">{sendRecipient.slice(0, 6)}...{sendRecipient.slice(-4)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border-secondary">
                      <span className="font-mono text-sm text-muted-foreground">Amount</span>
                      <span className="font-mono text-sm font-bold">{sendAmount} {sendToken}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border-secondary">
                      <span className="font-mono text-sm text-muted-foreground">Network</span>
                      <span className="font-mono text-sm font-bold">{CHAINS[selectedAvatar.chain].name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-mono text-sm text-muted-foreground">Estimated Gas</span>
                      <span className="font-mono text-sm font-bold">~$1.50</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-warning/10 border-2 border-warning">
                    <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                    <p className="font-mono text-xs text-warning">
                      This transaction requires signing on your Casper wallet. A ZK proof will be generated automatically.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t-2 border-border bg-muted">
              {confirmStep ? (
                <>
                  <TechnicalButton variant="secondary" onClick={() => setConfirmStep(false)}>
                    Back
                  </TechnicalButton>
                  <TechnicalButton 
                    variant="primary" 
                    icon={<Zap className="w-4 h-4" />}
                    onClick={() => {
                      setSendModalOpen(false);
                      setConfirmStep(false);
                    }}
                  >
                    Sign & Send
                  </TechnicalButton>
                </>
              ) : (
                <>
                  <TechnicalButton variant="secondary" onClick={() => setSendModalOpen(false)}>
                    Cancel
                  </TechnicalButton>
                  <TechnicalButton 
                    variant="primary" 
                    disabled={!sendToken || !sendAmount || !sendRecipient}
                    icon={<ChevronRight className="w-4 h-4" />}
                    onClick={() => setConfirmStep(true)}
                  >
                    Continue
                  </TechnicalButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Receive Modal */}
      {receiveModalOpen && selectedAvatar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setReceiveModalOpen(false)} />
          <div className="relative bg-card border-2 border-border w-full max-w-md" style={{ boxShadow: "12px 12px 0px hsl(214 20% 88%)" }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-border">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ backgroundColor: CHAINS[selectedAvatar.chain].color }}
                >
                  <ArrowDownLeft className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide">Receive Tokens</h2>
                  <p className="font-mono text-xs text-muted-foreground">To {CHAINS[selectedAvatar.chain].name} Avatar</p>
                </div>
              </div>
              <button onClick={() => setReceiveModalOpen(false)} className="p-2 hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* QR Code Placeholder */}
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-muted border-2 border-border flex items-center justify-center">
                  <div className="grid grid-cols-8 gap-1 p-4">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "w-3 h-3",
                          Math.random() > 0.5 ? "bg-foreground" : "bg-transparent"
                        )} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Network Badge */}
              <div className="flex justify-center">
                <TechnicalBadge variant="primary">
                  <div 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: CHAINS[selectedAvatar.chain].color }}
                  />
                  {CHAINS[selectedAvatar.chain].name} Network
                </TechnicalBadge>
              </div>

              {/* Address */}
              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground text-center block">
                  Your Avatar Address
                </label>
                <div className="flex items-center gap-2 p-4 bg-muted border-2 border-border">
                  <span className="font-mono text-sm flex-1 break-all">{selectedAvatar.address}</span>
                  <button 
                    onClick={() => copyAddress(selectedAvatar.address)}
                    className="p-2 hover:bg-card border-2 border-border transition-colors"
                  >
                    {copiedAddress === selectedAvatar.address ? (
                      <Check className="w-4 h-4 text-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Supported Tokens */}
              <div className="space-y-3">
                <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Supported Tokens</label>
                <div className="flex flex-wrap gap-2">
                  <TechnicalBadge variant="default">{CHAINS[selectedAvatar.chain].gasToken}</TechnicalBadge>
                  <TechnicalBadge variant="default">USDC</TechnicalBadge>
                  <TechnicalBadge variant="default">USDT</TechnicalBadge>
                  <TechnicalBadge variant="default">DAI</TechnicalBadge>
                  <TechnicalBadge variant="default">WBTC</TechnicalBadge>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 p-3 bg-warning/10 border-2 border-warning">
                <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <p className="font-mono text-xs text-warning">
                  Only send {CHAINS[selectedAvatar.chain].name} network tokens to this address. Sending tokens from other networks may result in permanent loss.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-center gap-3 px-6 py-4 border-t-2 border-border bg-muted">
              <TechnicalButton 
                variant="secondary" 
                icon={<Copy className="w-4 h-4" />}
                onClick={() => copyAddress(selectedAvatar.address)}
              >
                {copiedAddress === selectedAvatar.address ? "Copied!" : "Copy Address"}
              </TechnicalButton>
              <TechnicalButton variant="primary" onClick={() => setReceiveModalOpen(false)}>
                Done
              </TechnicalButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatars;
