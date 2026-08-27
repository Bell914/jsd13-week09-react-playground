import React from 'react';
import { Terminal, Copy, Check, Sparkles, X } from 'lucide-react';

export default function StateInspector({
  stateData,
  isOpen,
  onClose,
  moduleName,
}) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(stateData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-slate-900/95 border border-cyan-500/30 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-200 ring-1 ring-cyan-500/20">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-300 font-mono">Live State Inspector</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            title="Copy State JSON"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            title="Close Inspector"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Target Module Name */}
      <div className="px-4 py-1.5 bg-slate-900/90 border-b border-slate-800/50 flex items-center justify-between text-[11px] text-slate-400">
        <span>Target: <strong className="text-slate-200">{moduleName || 'Active Module'}</strong></span>
        <span className="text-[10px] text-slate-500 font-mono">auto-syncing</span>
      </div>

      {/* JSON Viewer Area */}
      <div className="p-4 max-h-64 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950/60">
        {stateData !== undefined && stateData !== null ? (
          <pre className="whitespace-pre-wrap break-all text-cyan-200">
            {JSON.stringify(stateData, null, 2)}
          </pre>
        ) : (
          <div className="text-slate-500 italic text-center py-4">
            ไม่มี State ถูกส่งมาจากโมดูลนี้
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/50 text-[10px] text-slate-500 flex items-center justify-between">
        <span>React Component State Snapshot</span>
        <span className="text-cyan-400/80 font-medium">JSON Ready</span>
      </div>
    </div>
  );
}
