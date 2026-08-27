import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useToggle, useDebounce } from '../../hooks/useUtilityHooks';
import {
  Puzzle,
  HardDrive,
  Monitor,
  Search,
  Sliders,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Eye,
  EyeOff,
  Laptop
} from 'lucide-react';

export default function CustomHooksPlayground({ onStateChange }) {
  // 1. useLocalStorage Hook
  const [persistedNote, setPersistedNote] = useLocalStorage('jsd13_user_note', 'บันทึกสำคัญ: React Custom Hooks เจ๋งมาก!');
  const [noteCategory, setNoteCategory] = useLocalStorage('jsd13_note_category', 'Work');

  // 2. useWindowSize Hook
  const { width, height, isMobile, isTablet, isDesktop, currentBreakpoint } = useWindowSize();

  // 3. useToggle Hook
  const [isOpen, toggleOpen] = useToggle(true);
  const [isSecretVisible, toggleSecret] = useToggle(false);

  // 4. useDebounce Hook
  const [searchInput, setSearchInput] = useState('React 19');
  const debouncedSearch = useDebounce(searchInput, 600);

  // 5. Copy helper
  const [copied, setCopied] = useState(false);
  const handleCopy = (txt) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sync to Live State Inspector
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        useLocalStorage: {
          key: 'jsd13_user_note',
          persistedNote,
          noteCategory,
        },
        useWindowSize: {
          width: `${width}px`,
          height: `${height}px`,
          currentBreakpoint,
          isMobile,
          isTablet,
          isDesktop,
        },
        useToggle: {
          isOpen,
          isSecretVisible,
        },
        useDebounce: {
          rawInput: searchInput,
          debouncedOutput: debouncedSearch,
        },
      });
    }
  }, [persistedNote, noteCategory, width, height, currentBreakpoint, isMobile, isTablet, isDesktop, isOpen, isSecretVisible, searchInput, debouncedSearch, onStateChange]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Puzzle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Module 8: Custom Hooks Architecture Lab
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              สร้างและสกัด Reusable Stateful Logic เป็น Custom Hooks: <code className="text-emerald-300 font-mono text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded">useLocalStorage</code>, <code className="text-emerald-300 font-mono text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded">useWindowSize</code>, <code className="text-emerald-300 font-mono text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded">useDebounce</code>, และ <code className="text-emerald-300 font-mono text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded">useToggle</code>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Lab 1: useLocalStorage Hook */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">1. useLocalStorage Hook</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Persistent State
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">
                ข้อความที่บันทึกลง Browser Storage (รีเฟรชหน้าเว็บแล้วข้อมูลไม่หาย):
              </label>
              <textarea
                value={persistedNote}
                onChange={(e) => setPersistedNote(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">หมวดหมู่:</span>
                <select
                  value={noteCategory}
                  onChange={(e) => setNoteCategory(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Study">Study</option>
                </select>
              </div>

              <button
                onClick={() => setPersistedNote('')}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                ล้างข้อมูล Note
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 font-mono flex items-center justify-between">
              <span>Key: <code>jsd13_user_note</code></span>
              <span className="text-emerald-400">Synced with localStorage</span>
            </div>
          </div>
        </div>

        {/* Lab 2: useWindowSize Hook */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-bold text-white">2. useWindowSize Hook</span>
            </div>
            <span className="text-xs text-sky-400 font-mono bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              Responsive Listener
            </span>
          </div>

          <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 text-center space-y-3">
            <div className="text-4xl font-extrabold text-white font-mono tracking-wider">
              {width} <span className="text-slate-500 text-xl font-sans">x</span> {height}
              <span className="text-xs text-slate-500 font-mono block mt-1">PX (VIEWPORT SIZE)</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold font-mono">
              <Laptop className="w-3.5 h-3.5" />
              <span>{currentBreakpoint}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className={`p-2 rounded-lg border ${isMobile ? 'bg-sky-500/20 border-sky-500 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              Mobile (&lt;768px)
            </div>
            <div className={`p-2 rounded-lg border ${isTablet ? 'bg-sky-500/20 border-sky-500 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              Tablet (768-1024px)
            </div>
            <div className={`p-2 rounded-lg border ${isDesktop ? 'bg-sky-500/20 border-sky-500 text-sky-300' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              Desktop (&gt;1024px)
            </div>
          </div>
        </div>

        {/* Lab 3: useDebounce Hook */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-white">3. useDebounce Hook</span>
            </div>
            <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Delay: 600ms
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">พิมพ์ข้อความเพื่อทดสอบ Debounce:</label>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-mono">Raw Value (พิมพ์ทันที):</span>
                <p className="font-bold text-white truncate">{searchInput || '(ว่าง)'}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-mono">Debounced Value (600ms):</span>
                <p className="font-bold text-amber-300 truncate">{debouncedSearch || '(ว่าง)'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lab 4: useToggle Hook */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-white">4. useToggle Hook</span>
            </div>
            <span className="text-xs text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              Boolean Helper
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-xs text-slate-300">
                สถานะ Collapsible: <strong className="text-purple-400 font-mono">{isOpen ? 'OPEN' : 'CLOSED'}</strong>
              </span>
              <button
                onClick={() => toggleOpen()}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
              >
                toggleOpen()
              </button>
            </div>

            {isOpen && (
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 animate-fadeIn">
                🎉 กล่องข้อความนี้ถูกควบคุมด้วย <code className="font-mono">const [isOpen, toggleOpen] = useToggle(true)</code> ทำให้ไม่ต้องเขียน <code>setIsOpen(prev =&gt; !prev)</code> ซ้ำๆ!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export const customHooksPlaygroundCode = `import { useState, useEffect } from 'react';

// 1. useLocalStorage Custom Hook
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// 2. useWindowSize Custom Hook
export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// 3. การนำไปใช้ใน Component
export default function MyComponent() {
  const [theme, setTheme] = useLocalStorage('theme', 'dark');
  const { width } = useWindowSize();

  return <div>Screen: {width}px | Theme: {theme}</div>;
}`;

export const customHooksPlaygroundExplanations = [
  {
    title: '1. Custom Hook คืออะไร?',
    desc: 'Custom Hook คือฟังก์ชัน JavaScript ธรรมดาที่ขึ้นต้นด้วยคำว่า "use" (ตามกฎของ React Hooks) และสามารถเรียกใช้ React Hooks อื่นๆ (เช่น useState, useEffect) ภายในตัวมันได้',
  },
  {
    title: '2. ประโยชน์ของการสกัด Logic',
    desc: 'ช่วยลดการเขียนโค้ดซ้ำซ้อน (DRY - Don\'t Repeat Yourself), ทำให้ Component ตัวหลักสะอาด มีหน้าที่แค่เรนเดอร์ UI, และทำให้เขียน Unit Test ได้ง่ายขึ้น',
  },
  {
    title: '3. กฎของ Hooks (Rules of Hooks)',
    desc: 'ห้ามเรียกใช้ Hook ภายในเงื่อนไข (if/else), ภายใน loop หรือฟังก์ชันย่อยซ้อน ต้องเรียกที่ Top-level ของ Component หรือภายใน Custom Hook อื่นเท่านั้น',
  },
  {
    title: '4. การแยก State แต่ละ Instance',
    desc: 'ทุกครั้งที่เรียกใช้ Custom Hook ในคนละ Component React จะสร้าง State ก้อนใหม่แยกกันอย่างอิสระ ไม่ได้แชร์ State ร่วมกัน เว้นแต่จะใช้ร่วมกับ Context API',
  },
];
