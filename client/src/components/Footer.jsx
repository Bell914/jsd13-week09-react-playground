import React from 'react';
import { Layers, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Layers className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="text-sm font-semibold text-slate-300">Client Workspace</span>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span>Configured with</span>
            <span className="text-indigo-400 font-medium">Tailwind CSS v4</span>
            <span>&</span>
            <span className="text-sky-400 font-medium">Vite 6</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
