import { Github, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background border-t-2 border-border">
      <div className="container-wide py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="font-display text-lg font-bold text-primary-foreground">F</span>
              </div>
              <span className="font-display text-xl font-bold uppercase tracking-wider">
                Fulcrum
              </span>
            </div>
            <p className="text-sm text-background/70 font-body">
              Critical infrastructure for the multi-chain future. Security and governance, 
              guaranteed across every chain.
            </p>
          </div>

          {/* Protocol */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Protocol
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors font-body">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors font-body">
                  Technical Specs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors font-body">
                  Security Audits
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors font-body">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors font-body">
                  User Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors font-body">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors font-body">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-background/70 hover:text-background transition-colors font-body">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
              Community
            </h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border-2 border-background/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border-2 border-background/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border-2 border-background/30 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50 font-mono uppercase tracking-wider">
            © 2024 Fulcrum Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-background/50 hover:text-background font-mono uppercase tracking-wider transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-background/50 hover:text-background font-mono uppercase tracking-wider transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
