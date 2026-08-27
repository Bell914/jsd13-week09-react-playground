import React from 'react';
import { Construction, Sparkles, ArrowRight } from 'lucide-react';

export default function ModulePlaceholder({ module, onProceedNext }) {
  return (
    <div className="text-center py-16 px-4 max-w-xl mx-auto space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
        <Construction className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          ขั้นตอนถัดไปใน Roadmap
        </span>
        <h3 className="text-2xl font-bold text-white">{module?.title}</h3>
        <p className="text-sm text-slate-400">{module?.description}</p>
      </div>

      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left space-y-2">
        <span className="text-xs font-bold text-slate-300">สิ่งที่จะได้เรียนรู้ในโมดูลนี้:</span>
        <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
          {module?.concepts?.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
