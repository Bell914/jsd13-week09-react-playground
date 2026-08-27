import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, Palette, Code2 } from 'lucide-react';

export default function Hero() {
  const [count, setCount] = useState(0);

  return (
    <section id="overview" className="relative pt-12 pb-16 overflow-hidden">
      {/* Background glow decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium backdrop-blur-md shadow-sm">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>พร้อมใช้งาน: Tailwind CSS v4 + Vite + React</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            ปรับโครงสร้างโปรเจกต์เป็น{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Tailwind CSS & Vite
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            เปลี่ยนการเขียนสไตล์แบบ Vanilla CSS มาใช้ Utility-First CSS ด้วย Tailwind CSS v4 ผ่าน `@tailwindcss/vite` ที่เร็วและเบาที่สุด
          </p>

          {/* Interactive Action Card */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span>ทดสอบกด React State: {count}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#structure"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold border border-slate-700/80 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>ดูโครงสร้างโฟลเดอร์</span>
            </a>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Vite Fast HMR</h2>
                  <p className="text-xs text-slate-400">อัปเดตสไตล์และโค้ดทันที</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Tailwind v4</h2>
                  <p className="text-xs text-slate-400">@tailwindcss/vite plugin</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Clean Structure</h2>
                  <p className="text-xs text-slate-400">แยก Components เป็นสัดส่วน</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
