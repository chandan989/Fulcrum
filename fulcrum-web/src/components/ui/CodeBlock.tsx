import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "solidity",
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.trim().split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for Solidity
  const highlightLine = (line: string) => {
    return line
      .replace(/(function|require|return|external|calldata|bool)/g, '<span class="text-primary">$1</span>')
      .replace(/(\w+)(?=\()/g, '<span class="text-secondary">$1</span>')
      .replace(/(\/\/.*$)/gm, '<span class="text-muted-foreground">$1</span>')
      .replace(/(".*?")/g, '<span class="text-success">$1</span>');
  };

  return (
    <div className={cn("relative border-2 border-border bg-foreground", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b-2 border-border">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>
      
      {/* Code Content */}
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm leading-relaxed">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              {showLineNumbers && (
                <span className="select-none w-8 text-right pr-4 text-muted-foreground/50">
                  {index + 1}
                </span>
              )}
              <code
                className="text-background"
                dangerouslySetInnerHTML={{ __html: highlightLine(line) || "&nbsp;" }}
              />
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
