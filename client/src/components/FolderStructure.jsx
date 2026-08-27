import React from 'react';
import { Folder, FileCode, CheckCircle2, FileText, Settings, Sparkles } from 'lucide-react';

export default function FolderStructure() {
  const structureItems = [
    {
      name: 'client/',
      type: 'folder',
      desc: 'รูทโฟลเดอร์ฝั่ง Client (React + Vite + Tailwind)',
      children: [
        {
          name: 'public/',
          type: 'folder',
          desc: 'ไฟล์ Static assets สาธารณะ เช่น favicon, logo',
        },
        {
          name: 'src/',
          type: 'folder',
          desc: 'ซอร์สโค้ดหลักของโปรเจกต์',
          children: [
            {
              name: 'components/',
              type: 'folder',
              desc: 'คอมโพเนนต์ที่ใช้ซ้ำได้ เช่น Navbar, Hero, Card, Button',
            },
            {
              name: 'assets/',
              type: 'folder',
              desc: 'รูปภาพและไฟล์มีเดียภายในโปรเจกต์',
            },
            {
              name: 'App.jsx',
              type: 'file',
              desc: 'หน้าหลักที่รวบรวม components และ logic',
              badge: 'Tailwind CSS Classes',
            },
            {
              name: 'index.css',
              type: 'file',
              desc: 'ไฟล์ CSS หลักที่นำเข้า @import "tailwindcss";',
              badge: 'Tailwind v4 Setup',
            },
            {
              name: 'main.jsx',
              type: 'file',
              desc: 'จุดเริ่มต้น React 19 Root Render',
            },
          ],
        },
        {
          name: 'vite.config.js',
          type: 'file',
          desc: 'คอนฟิก Vite พร้อมปลั๊กอิน @tailwindcss/vite และ @vitejs/plugin-react',
          badge: 'Vite Plugin',
        },
        {
          name: 'package.json',
          type: 'file',
          desc: 'ไฟล์กำหนด Dependencies และคำสั่งรัน (npm run dev / build)',
        },
        {
          name: 'index.html',
          type: 'file',
          desc: 'HTML Template หลักสำหรับ Single Page Application',
        },
      ],
    },
  ];

  return (
    <section id="structure" className="py-16 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-cyan-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clean Architecture</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            โครงสร้างโฟลเดอร์ใน <span className="text-indigo-400">client/</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            จัดโครงสร้างแบบแยกส่วน (Modular Structure) ใช้งาน Tailwind CSS utility classes แทนไฟล์ CSS เดิม
          </p>
        </div>

        {/* Tree View Box */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-slate-300">Project Directory Tree</span>
            </span>
            <span className="text-indigo-400">Tailwind CSS v4 + Vite</span>
          </div>

          <div className="space-y-3 font-mono text-sm">
            {/* client/ */}
            <div className="flex items-center gap-2 text-indigo-300 font-semibold">
              <Folder className="w-4 h-4 text-indigo-400" />
              <span>client/</span>
              <span className="text-xs text-slate-500 font-sans ml-2">(Root ของฝั่ง Frontend)</span>
            </div>

            {/* Sub items */}
            <div className="pl-6 space-y-2.5 border-l-2 border-slate-800 ml-2">
              {/* public */}
              <div className="flex items-center gap-2 text-slate-300">
                <Folder className="w-4 h-4 text-amber-400" />
                <span>public/</span>
                <span className="text-xs text-slate-500 font-sans ml-2">- รูปภาพและไอคอน static</span>
              </div>

              {/* src */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                  <Folder className="w-4 h-4 text-cyan-400" />
                  <span>src/</span>
                  <span className="text-xs text-slate-500 font-sans ml-2">- โค้ดคอมโพเนนต์และสไตล์</span>
                </div>

                {/* src sub items */}
                <div className="pl-6 space-y-2 border-l-2 border-slate-800 ml-2">
                  <div className="flex items-center justify-between text-slate-300 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <Folder className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-xs">components/</span>
                    </div>
                    <span className="text-[11px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-sans">
                      Navbar, Hero, TechStack, Footer
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-3.5 h-3.5 text-sky-400" />
                      <span className="text-xs">App.jsx</span>
                    </div>
                    <span className="text-[11px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-sans">
                      Tailwind UI Layout
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs">index.css</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-sans">
                      @import "tailwindcss";
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-3.5 h-3.5 text-sky-400" />
                      <span className="text-xs">main.jsx</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-sans">Entry Point</span>
                  </div>
                </div>
              </div>

              {/* Config files */}
              <div className="flex items-center justify-between text-slate-300 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
                <div className="flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs">vite.config.js</span>
                </div>
                <span className="text-[11px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-sans">
                  @tailwindcss/vite
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-300 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800/60">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs">package.json</span>
                </div>
                <span className="text-[11px] text-slate-400 font-sans">npm scripts & deps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
