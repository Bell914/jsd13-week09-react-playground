import React from 'react';
import { Layers, Terminal, Code2, Eye, Menu, Sparkles } from 'lucide-react';

export default function Header({
  activeModule,
  activeView,
  setActiveView,
  isInspectorOpen,
  setIsInspectorOpen,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white tracking-tight text-base">React Playground</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hidden sm:inline-block">
                    Tailwind v4
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">JSD13 Week 9 Interactive Learning Lab</p>
              </div>
            </div>
          </div>

          {/* Center: View Switcher (Interactive Demo vs Code/Concepts) */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveView('demo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                activeView === 'demo'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Interactive Demo</span>
            </button>

            <button
              onClick={() => setActiveView('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                activeView === 'code'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Concepts & Code</span>
            </button>
          </div>

          {/* Right: State Inspector Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsInspectorOpen(!isInspectorOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                isInspectorOpen
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">State Inspector</span>
              <span className={`w-2 h-2 rounded-full ${isInspectorOpen ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
