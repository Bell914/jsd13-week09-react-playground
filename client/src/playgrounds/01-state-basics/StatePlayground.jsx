import React, { useState, useEffect } from 'react';
import {
  Plus,
  Minus,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Palette,
  Eye,
  EyeOff,
  History,
  Type,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function StatePlayground({ onStateChange }) {
  // --- 1. Counter State ---
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [minLimit, setMinLimit] = useState(-50);
  const [maxLimit, setMaxLimit] = useState(50);
  const [history, setHistory] = useState([0]);

  // --- 2. Text Input State ---
  const [text, setText] = useState('สวัสดี React 19!');
  const [isUppercase, setIsUppercase] = useState(false);

  // --- 3. Color & Theme State (Object State) ---
  const [themeConfig, setThemeConfig] = useState({
    name: 'Cyber Indigo',
    primaryColor: '#6366f1',
    bgColor: 'bg-indigo-950/40',
    borderColor: 'border-indigo-500/40',
    textColor: 'text-indigo-400',
    isGlow: true,
  });

  // --- 4. Boolean Toggle State ---
  const [showSecret, setShowSecret] = useState(false);

  // Helper for Counter updates with History
  const updateCount = (newVal) => {
    const clamped = Math.max(minLimit, Math.min(maxLimit, newVal));
    setCount(clamped);
    setHistory((prev) => [clamped, ...prev.slice(0, 4)]);
  };

  const handleReset = () => {
    setCount(0);
    setHistory([0]);
  };

  // Sync to State Inspector
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        counter: { count, step, minLimit, maxLimit, history },
        textWidget: {
          text,
          length: text.length,
          wordCount: text.trim() ? text.trim().split(/\s+/).length : 0,
          isUppercase,
        },
        themeConfig,
        showSecret,
      });
    }
  }, [count, step, minLimit, maxLimit, history, text, isUppercase, themeConfig, showSecret, onStateChange]);

  const presetThemes = [
    {
      name: 'Cyber Indigo',
      primaryColor: '#6366f1',
      bgColor: 'bg-indigo-950/40',
      borderColor: 'border-indigo-500/40',
      textColor: 'text-indigo-400',
      isGlow: true,
    },
    {
      name: 'Emerald Aurora',
      primaryColor: '#10b981',
      bgColor: 'bg-emerald-950/40',
      borderColor: 'border-emerald-500/40',
      textColor: 'text-emerald-400',
      isGlow: true,
    },
    {
      name: 'Electric Amber',
      primaryColor: '#f59e0b',
      bgColor: 'bg-amber-950/40',
      borderColor: 'border-amber-500/40',
      textColor: 'text-amber-400',
      isGlow: true,
    },
    {
      name: 'Neon Rose',
      primaryColor: '#f43f5e',
      bgColor: 'bg-rose-950/40',
      borderColor: 'border-rose-500/40',
      textColor: 'text-rose-400',
      isGlow: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Module Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Module 1: State & Event Handling Lab
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              ฝึกฝนการจัดการ <code className="text-indigo-300 font-mono text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">useState</code> ทั้งแบบ Primitive (Number, String, Boolean), Array History, และ Object State
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Interactive Labs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Lab 1: Advanced Stepper & History */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-bold text-white">1. Advanced Counter & History</span>
            </div>
            <span className="text-xs text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Functional Update
            </span>
          </div>

          {/* Display */}
          <div className="text-center py-6 bg-slate-950/70 rounded-xl border border-slate-800/80 relative overflow-hidden">
            <div className="text-5xl font-extrabold text-white font-mono tracking-tight">
              {count}
            </div>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs text-slate-400 font-mono">
              <span>Min: {minLimit}</span>
              <span>•</span>
              <span>Max: {maxLimit}</span>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => updateCount(count - step)}
              disabled={count <= minLimit}
              className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 font-semibold flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Minus className="w-4 h-4" />
              <span>ลด {step}</span>
            </button>
            <button
              onClick={() => updateCount(count + step)}
              disabled={count >= maxLimit}
              className="py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่ม {step}</span>
            </button>
          </div>

          {/* Controls: Step size & Reset */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400">Step:</span>
              {[1, 5, 10, 25].map((s) => (
                <button
                  key={s}
                  onClick={() => setStep(s)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono font-medium transition-colors ${
                    step === s
                      ? 'bg-indigo-500 text-white font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* State Array: History Snapshot */}
          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5 text-indigo-400" />
              <span>History (ล่าสุด 5 ค่า):</span>
            </span>
            <div className="flex gap-1.5 font-mono">
              {history.map((h, idx) => (
                <span
                  key={idx}
                  className={`px-1.5 py-0.5 rounded text-[11px] ${
                    idx === 0 ? 'bg-indigo-500/20 text-indigo-300 font-bold' : 'text-slate-500'
                  }`}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Lab 2: Controlled Input & Text Manipulation */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white">2. Controlled Input & String State</span>
            </div>
            <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              e.target.value
            </span>
          </div>

          {/* Input field */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 block">กรอกข้อความ (Controlled Input):</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="พิมพ์ข้อความที่นี่..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Transformation Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsUppercase(!isUppercase)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isUppercase
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              Aa Uppercase ({isUppercase ? 'ON' : 'OFF'})
            </button>
            <button
              onClick={() => setText('')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs border border-slate-700 transition-colors"
            >
              Clear Text
            </button>
          </div>

          {/* Real-time Output */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Live Mirror Display:</span>
              </span>
              <div className="flex gap-3 font-mono text-[11px]">
                <span>{text.length} ตัวอักษร</span>
                <span>•</span>
                <span>{text.trim() ? text.trim().split(/\s+/).length : 0} คำ</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 min-h-[50px] flex items-center text-sm font-medium text-slate-200 break-all">
              {text ? (
                isUppercase ? text.toUpperCase() : text
              ) : (
                <span className="text-slate-600 italic">ข้อความว่างเปล่า...</span>
              )}
            </div>
          </div>
        </div>

        {/* Lab 3: Object State & Dynamic Theme Switcher */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">3. Object State (Theme Config)</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {'{ ...prev, key }'}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 block">เลือก Preset ธีม (อัปเดต Object State):</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {presetThemes.map((theme) => {
                const isSelected = themeConfig.name === theme.name;
                return (
                  <button
                    key={theme.name}
                    onClick={() => setThemeConfig(theme)}
                    className={`p-2 rounded-xl text-left border transition-all text-xs ${
                      isSelected
                        ? 'border-white bg-slate-800 shadow-md ring-1 ring-white/20'
                        : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/60 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: theme.primaryColor }}
                      />
                      <span className="font-semibold text-slate-200 truncate">{theme.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Render Preview based on Object State */}
          <div
            className={`p-4 rounded-xl border transition-all duration-300 ${themeConfig.bgColor} ${themeConfig.borderColor}`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold ${themeConfig.textColor}`}>
                🎨 {themeConfig.name} Preview Card
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-300">
                {themeConfig.primaryColor}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              การ์ดใบนี้เปลี่ยนสไตล์แบบ Real-time ตามค่า Object State ใน <code className="font-mono text-xs">themeConfig</code>
            </p>
          </div>
        </div>

        {/* Lab 4: Boolean Toggle & Conditional Rendering */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-white">4. Boolean State & Conditional UI</span>
            </div>
            <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              useState(boolean)
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <div>
                <span className="text-sm font-medium text-white block">สลับการแสดงผลข้อความลับ</span>
                <span className="text-xs text-slate-400">สถานะปัจจุบัน: <strong>{showSecret ? 'TRUE (แสดง)' : 'FALSE (ซ่อน)'}</strong></span>
              </div>
              <button
                onClick={() => setShowSecret(!showSecret)}
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-semibold ${
                  showSecret
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showSecret ? 'ซ่อน' : 'แสดง'}</span>
              </button>
            </div>

            {/* Conditional Display */}
            {showSecret ? (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1.5 animate-fadeIn">
                <div className="font-bold flex items-center gap-1.5 text-amber-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>🎉 ข้อความลับถูกเปิดเผย:</span>
                </div>
                <p className="leading-relaxed">
                  Conditional Rendering ใน React สามารถใช้ Ternary Operator (<code className="font-mono">condition ? A : B</code>) หรือ Logical AND (<code className="font-mono">condition && A</code>) ได้อย่างยืดหยุ่น!
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center text-xs text-slate-500">
                🔒 ข้อความถูกซ่อนอยู่ (กดปุ่ม "แสดง" ด้านบนเพื่อเปิดดู)
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export const statePlaygroundCode = `import React, { useState } from 'react';

export default function StatePlayground() {
  // 1. Primitive State (Number, String, Boolean)
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [text, setText] = useState('สวัสดี React');
  const [showSecret, setShowSecret] = useState(false);

  // 2. Array State (History Logs)
  const [history, setHistory] = useState([0]);

  // 3. Object State (Theme Configuration)
  const [themeConfig, setThemeConfig] = useState({
    name: 'Cyber Indigo',
    primaryColor: '#6366f1',
    isGlow: true,
  });

  // ฟังก์ชันอัปเดตแบบ Functional Updates พร้อมเก็บ History
  const handleIncrement = () => {
    setCount((prevCount) => {
      const nextCount = prevCount + step;
      setHistory((prevHistory) => [nextCount, ...prevHistory.slice(0, 4)]);
      return nextCount;
    });
  };

  // การอัปเดต Object State แบบ Immutable
  const updateTheme = (newColor, newName) => {
    setThemeConfig((prev) => ({
      ...prev,
      primaryColor: newColor,
      name: newName,
    }));
  };

  return (
    <div className="space-y-4">
      {/* 1. Counter */}
      <h2>Count: {count}</h2>
      <button onClick={handleIncrement}>+{step}</button>

      {/* 2. Controlled Input */}
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
      />

      {/* 3. Conditional Rendering */}
      <button onClick={() => setShowSecret(!showSecret)}>
        {showSecret ? 'ซ่อน' : 'แสดง'}
      </button>
      {showSecret && <p>ข้อความลับปรากฏแล้ว!</p>}
    </div>
  );
}`;

export const statePlaygroundExplanations = [
  {
    title: '1. useState Hook',
    desc: 'ใช้ประกาศ State ให้กับ Component เมื่อ State เปลี่ยนแปลง React จะทำการ Re-render UI ใหม่อัตโนมัติ',
  },
  {
    title: '2. Functional State Updates',
    desc: 'การใช้ setCount(prev => prev + step) รับประกันว่าเรากำลังคำนวณจากค่า State ล่าสุดเสมอ ป้องกันปัญหา stale closure',
  },
  {
    title: '3. Controlled Inputs & Events',
    desc: 'การผูก value={text} และรับค่าผ่าน onChange={(e) => setText(e.target.value)} ทำให้ React เป็น Single Source of Truth',
  },
  {
    title: '4. Immutable State (Array & Object)',
    desc: 'ห้ามแก้ไข state ตรงๆ เช่น state.count = 5 แต่ให้ใช้ Spread Operator เช่น [...prev] หรือ { ...prev, newKey: val } เสมอ',
  },
];
