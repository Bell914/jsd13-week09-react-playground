import React, { useState } from 'react';
import { Code2, BookOpen, Copy, Check, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CodeViewer({ module, codeSnippet, explanations = [] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!codeSnippet) return;
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Module Overview Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Concept Guide</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{module?.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{module?.description}</p>
          </div>
        </div>

        {/* Key Concepts Tags */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 block mb-2">หัวข้อและแนวคิดสำคัญในโมดูลนี้:</span>
          <div className="flex flex-wrap gap-2">
            {module?.concepts?.map((c, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-200"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Explanations List */}
      {explanations.length > 0 && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>คำอธิบายโค้ดและหลักการทำงาน (Code Breakdown)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {explanations.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Snippet Box */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-slate-200 font-mono">React Source Code</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 overflow-x-auto font-mono text-xs text-slate-200 bg-slate-950/70 max-h-[500px]">
          <pre className="whitespace-pre">
            {codeSnippet || '// Source code snippet will appear here.'}
          </pre>
        </div>
      </div>
    </div>
  );
}
