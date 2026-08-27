import React from 'react';
import { Cpu, ShieldCheck, Box, Flame, Code, Sparkles } from 'lucide-react';

export default function TechStack() {
  const cards = [
    {
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      title: 'Vite 6 Build Tool',
      desc: 'ระบบ Bundler และ Dev Server ที่มีความเร็วสูงสุด พร้อม Instant HMR สำหรับ React และ Tailwind',
      tag: 'Fast Bundling',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
      title: 'Tailwind CSS v4',
      desc: 'เวอร์ชันล่าสุดที่เชื่อมต่อผ่าน @tailwindcss/vite ไม่ต้องตั้งค่า postcss.config.js แยกให้ซับซ้อน',
      tag: 'Next-Gen Engine',
    },
    {
      icon: <Box className="w-6 h-6 text-cyan-400" />,
      title: 'React 19 Core',
      desc: 'รองรับฟีเจอร์และ Hooks รุ่นใหม่ล่าสุดจาก React เพื่อการจัดการ State และ Component ที่มีประสิทธิภาพ',
      tag: 'Modern UI Library',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'No CSS Conflicts',
      desc: 'แทนที่ไฟล์ CSS แยกย่อยด้วย Utility-first classes ทำให้ดูแลโค้ดง่าย สไตล์ไม่ชนกันข้ามคอมโพเนนต์',
      tag: 'Scoped & Clean',
    },
  ];

  return (
    <section id="tech" className="py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tech Stack & Configuration</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            การตั้งค่าและแพ็กเกจที่ติดตั้ง
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            รวมเครื่องมือสำหรับการพัฒนาเว็บแอปพลิเคชันยุคใหม่ที่เร็วและยืดหยุ่นที่สุด
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/80 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 group-hover:scale-105 transition-transform duration-200">
                  {card.icon}
                </div>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {card.tag}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
