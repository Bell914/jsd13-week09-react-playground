import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw, Sparkles, MessageSquare } from 'lucide-react';

export default function StatePlayground({ onStateChange }) {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [text, setText] = useState('สวัสดี React!');

  // Sync state to inspector
  useEffect(() => {
    onStateChange({ count, step, text });
  }, [count, step, text, onStateChange]);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-800">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span>Module 1: State & Event Handling</span>
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          ทดลองใช้งาน <code className="text-indigo-300 font-mono text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">useState</code> และสังเกตการอัปเดต State ผ่าน Live State Inspector ทางขวาล่าง
        </p>
      </div>

      {/* Grid of Interactive Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Widget 1: Interactive Counter */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">1. Advanced Counter</span>
            <span className="text-xs text-indigo-400 font-mono">useState(0)</span>
          </div>

          <div className="text-center py-6 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <span className="text-5xl font-extrabold text-white font-mono tracking-tight">{count}</span>
            <p className="text-xs text-slate-500 mt-1">Current Count</p>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCount((prev) => prev - step)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <Minus className="w-4 h-4" />
                <span>-{step}</span>
              </button>
              <button
                onClick={() => setCount((prev) => prev + step)}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-1 shadow-lg shadow-indigo-600/25 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+{step}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Step:</span>
                {[1, 5, 10].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStep(s)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-mono font-medium transition-colors ${
                      step === s
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCount(0)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Widget 2: Live Text Mirror */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">2. Live Text Mirror & Length</span>
            <span className="text-xs text-cyan-400 font-mono">onChange</span>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5">พิมพ์ข้อความเพื่อทดสอบ:</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 text-cyan-400">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Mirror Output:</span>
              </span>
              <span className="font-mono">{text.length} ตัวอักษร</span>
            </div>
            <p className="text-sm font-medium text-slate-200 break-all bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 min-h-[40px]">
              {text || <span className="text-slate-600 italic">ไม่มีข้อความ...</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const statePlaygroundCode = `import React, { useState } from 'react';

export default function StatePlayground() {
  // 1. กำหนด State
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [text, setText] = useState('');

  return (
    <div>
      {/* 2. การอัปเดต State แบบ Functional Update */}
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(prev => prev + step)}>
        +{step}
      </button>

      {/* 3. การรับค่าจาก Controlled Input */}
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />
      <p>Mirror: {text} ({text.length} ตัวอักษร)</p>
    </div>
  );
}`;

export const statePlaygroundExplanations = [
  {
    title: 'useState Hook',
    desc: 'ใช้เก็บข้อมูลที่เมื่อเกิดการเปลี่ยนแปลงแล้ว React จะ Re-render คอมโพเนนต์ใหม่ให้สอดคล้องกับค่า State',
  },
  {
    title: 'Functional State Update',
    desc: 'การส่งฟังก์ชัน setCount(prev => prev + 1) ช่วยป้องกัน race conditions และรับประกันว่าจะได้ค่า state ล่าสุดเสมอ',
  },
  {
    title: 'Controlled Inputs',
    desc: 'การผูก value={text} เข้ากับ state และรับ event e.target.value ผ่าน onChange เพื่อให้ React เป็น Single Source of Truth',
  },
  {
    title: 'Component Re-rendering',
    desc: 'เมื่อ state มีการอัปเดต คอมโพเนนต์จะประมวลผล JSX ใหม่อัตโนมัติโดยที่ไม่ต้องสั่ง DOM manipulation ด้วยมือ',
  },
];
