import { Link } from "react-router-dom";
import { TechnicalButton } from "@/components/ui/TechnicalButton";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b-2 border-border">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/Logo.svg" alt="Fulcrum Logo" className="w-full h-full" />
            </div>
            <span className="font-display text-xl font-bold uppercase tracking-wider">
              Fulcrum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#architecture"
              className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Architecture
            </a>
            <a
              href="#technology"
              className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Technology
            </a>
            <a
              href="#use-cases"
              className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Use Cases
            </a>
            <Link
              to="/docs"
              className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <TechnicalButton variant="ghost" size="sm">
              Connect Wallet
            </TechnicalButton>
            <Link to="/dashboard">
              <TechnicalButton variant="primary" size="sm">
                Launch App
              </TechnicalButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 border-t-2 border-border",
            mobileMenuOpen ? "max-h-96 pb-4" : "max-h-0"
          )}
        >
          <nav className="flex flex-col gap-4 pt-4">
            <a
              href="#architecture"
              className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Architecture
            </a>
            <a
              href="#technology"
              className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Technology
            </a>
            <a
              href="#use-cases"
              className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Use Cases
            </a>
            <Link
              to="/docs"
              className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Docs
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <TechnicalButton variant="secondary" size="sm">
                Connect Wallet
              </TechnicalButton>
              <Link to="/dashboard">
                <TechnicalButton variant="primary" size="sm" className="w-full">
                  Launch App
                </TechnicalButton>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
