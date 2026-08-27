import React, { useState, useRef, useEffect } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Flag,
  Crosshair,
  Sparkles,
  History,
  Film,
  Volume2,
  VolumeX,
  FastForward,
  Type,
  CheckCircle2
} from 'lucide-react';

export default function UseRefPlayground({ onStateChange }) {
  // --- 1. STOPWATCH STATE & REFS ---
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null); // เก็บ interval ID โดยไม่ทำให้ Re-render เมื่อค่าเปลี่ยน
  const startTimeRef = useRef(0);

  const startStopwatch = () => {
    if (isRunning) return;
    setIsRunning(true);
    startTimeRef.current = Date.now() - stopwatchTime;

    timerRef.current = setInterval(() => {
      setStopwatchTime(Date.now() - startTimeRef.current);
    }, 10); // Update ทุก 10ms
  };

  const pauseStopwatch = () => {
    if (!isRunning) return;
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setStopwatchTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    if (!isRunning) return;
    setLaps((prev) => [stopwatchTime, ...prev]);
  };

  // Cleanup timer เมื่อ unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(
      centiseconds
    ).padStart(2, '0')}`;
  };

  // --- 2. DOM REF & INPUT FOCUS LAB ---
  const inputRef = useRef(null);
  const [inputText, setInputText] = useState('');

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleSelectAll = () => {
    inputRef.current?.select();
  };

  const handleClearViaRef = () => {
    setInputText('');
    inputRef.current?.focus();
  };

  // --- 3. PREVIOUS STATE TRACKER ---
  const [counter, setCounter] = useState(0);
  const prevCounterRef = useRef(0);

  useEffect(() => {
    // บันทึกค่าล่าสุดไว้ใน ref หลังจาก render เสร็จสิ้น
    prevCounterRef.current = counter;
  }, [counter]);

  // --- 4. RENDER COUNTER (Non-rendering mutable variable) ---
  const renderCountRef = useRef(1);
  useEffect(() => {
    renderCountRef.current += 1;
  });

  // --- 5. VIDEO PLAYER SIMULATOR REF ---
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoIntervalRef = useRef(null);

  const togglePlayVideo = () => {
    if (videoPlaying) {
      setVideoPlaying(false);
      clearInterval(videoIntervalRef.current);
    } else {
      setVideoPlaying(true);
      videoIntervalRef.current = setInterval(() => {
        setVideoTime((t) => (t >= 100 ? 0 : t + 2));
      }, 200);
    }
  };

  const resetVideo = () => {
    setVideoPlaying(false);
    clearInterval(videoIntervalRef.current);
    setVideoTime(0);
  };

  useEffect(() => {
    return () => clearInterval(videoIntervalRef.current);
  }, []);

  // Sync to Live State Inspector
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        stopwatch: {
          formatted: formatTime(stopwatchTime),
          isRunning,
          lapsCount: laps.length,
          timerRefAssigned: !!timerRef.current,
        },
        previousStateTracker: {
          currentValue: counter,
          previousValue: prevCounterRef.current,
          difference: counter - prevCounterRef.current,
        },
        componentRenderCount: renderCountRef.current,
        videoSimulator: {
          isPlaying: videoPlaying,
          progress: `${videoTime}%`,
          isMuted,
        },
      });
    }
  }, [stopwatchTime, isRunning, laps, counter, videoPlaying, videoTime, isMuted, onStateChange]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-slate-900 border border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Timer className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Module 6: useRef & DOM Manipulation Lab
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              ทำความเข้าใจ <code className="text-cyan-300 font-mono text-xs bg-cyan-500/10 px-1.5 py-0.5 rounded">useRef</code>: อ้างอิง DOM Element โดยตรง, เก็บค่า Mutable Variable โดยไม่ทำให้ Re-render และการติดตาม Previous State
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Lab 1: Precision Stopwatch with useRef */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-bold text-white">1. Precision Stopwatch & Lap Timer</span>
            </div>
            <span className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              timerRef.current
            </span>
          </div>

          {/* Time Display */}
          <div className="text-center py-6 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
            <div className="text-5xl font-extrabold text-white font-mono tracking-wider">
              {formatTime(stopwatchTime)}
            </div>
            <p className="text-[11px] text-slate-500 font-mono">MINUTES : SECONDS . MS</p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-3 gap-2">
            {!isRunning ? (
              <button
                onClick={startStopwatch}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start</span>
              </button>
            ) : (
              <button
                onClick={pauseStopwatch}
                className="py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-amber-600/25 transition-all"
              >
                <Pause className="w-3.5 h-3.5 fill-white" />
                <span>Pause</span>
              </button>
            )}

            <button
              onClick={recordLap}
              disabled={!isRunning}
              className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Flag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Lap</span>
            </button>

            <button
              onClick={resetStopwatch}
              className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Laps List */}
          {laps.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block">ประวัติการบันทึกรอบ (Laps):</span>
              <div className="max-h-28 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
                {laps.map((lapTime, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-slate-300"
                  >
                    <span className="text-slate-500">Lap {laps.length - idx}</span>
                    <span className="font-bold text-cyan-400">{formatTime(lapTime)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lab 2: DOM Focus & Selection via ref.current */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white">2. DOM Access & Focus Control</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              inputRef.current.focus()
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-400 block">
              ช่อง Input ที่ถูกผูกกับ <code className="text-emerald-400 font-mono">ref={'{inputRef}'}</code>:
            </label>
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="คลิกปุ่มด้านล่างเพื่อสั่ง Focus หรือ Select ข้อความ..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* DOM Control Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleFocus}
              className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>สั่ง Focus ช่องพิมพ์</span>
            </button>

            <button
              onClick={handleSelectAll}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              ไฮไลต์ข้อความทั้งหมด (.select())
            </button>

            <button
              onClick={handleClearViaRef}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition-colors"
            >
              ล้างข้อความ & Re-focus
            </button>
          </div>

          {/* Explanation Box */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 leading-relaxed space-y-1">
            <span className="font-bold text-slate-200 block">📌 การเข้าถึง DOM โดยตรง:</span>
            <p>
              ใน React เมื่อต้องการทำคำสั่งเฉพาะของ Native DOM เช่น <code>.focus()</code>, <code>.select()</code>, หรือการวัดขนาด <code>.getBoundingClientRect()</code> เราจะใช้ <code>useRef</code> แทนการใช้ <code>document.getElementById()</code>
            </p>
          </div>
        </div>

        {/* Lab 3: Previous Value Tracker */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-bold text-white">3. Previous Value Tracker</span>
            </div>
            <span className="text-xs text-purple-400 font-mono bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              prevRef.current
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-400">ค่าปัจจุบัน (Current State)</span>
              <div className="text-3xl font-extrabold text-purple-400 font-mono mt-1">
                {counter}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-xs text-slate-400">ค่าก่อนหน้า (Previous via Ref)</span>
              <div className="text-3xl font-extrabold text-slate-500 font-mono mt-1">
                {prevCounterRef.current}
              </div>
            </div>
          </div>

          {/* Counter Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setCounter((c) => c + Math.floor(Math.random() * 10) + 1)}
              className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-md shadow-purple-600/20 transition-all"
            >
              + สุ่มเพิ่มตัวเลข (Random Add)
            </button>
            <button
              onClick={() => setCounter(0)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs transition-colors"
            >
              Reset
            </button>
          </div>

          <p className="text-xs text-slate-400">
            ผลต่างจากรอบก่อนหน้า: <strong className="text-emerald-400 font-mono">+{counter - prevCounterRef.current}</strong>
          </p>
        </div>

        {/* Lab 4: Media / Video Player Simulation */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-rose-400" />
              <span className="text-sm font-bold text-white">4. Video Player Simulator</span>
            </div>
            <span className="text-xs text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              Media Ref
            </span>
          </div>

          {/* Simulated Video Screen */}
          <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="text-4xl mb-2 animate-bounce">
              {videoPlaying ? '🎬' : '⏸️'}
            </div>
            <span className="text-xs font-semibold text-slate-300">
              {videoPlaying ? 'กำลังเล่นวิดีโอ (Playing...)' : 'วิดีโอหยุดชั่วคราว (Paused)'}
            </span>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
              <div
                className="h-full bg-rose-500 transition-all duration-200"
                style={{ width: `${videoTime}%` }}
              />
            </div>
          </div>

          {/* Video Controls */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                onClick={togglePlayVideo}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                {videoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                <span>{videoPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={resetVideo}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-xl border transition-colors ${
                isMuted
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export const useRefPlaygroundCode = `import React, { useState, useRef, useEffect } from 'react';

export default function UseRefPlayground() {
  // 1. การใช้ useRef อ้างอิง DOM Element
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current.focus(); // สั่ง Native DOM API
  };

  // 2. การใช้ useRef เก็บ Mutable Variable (เช่น Interval Timer ID)
  const timerRef = useRef(null);
  const [seconds, setSeconds] = useState(0);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  // 3. การเก็บ Previous State
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>

      <h2>Timer: {seconds}s</h2>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>

      <p>Current: {count} | Previous: {prevCountRef.current}</p>
    </div>
  );
}`;

export const useRefPlaygroundExplanations = [
  {
    title: '1. useRef ไม่ทำให้ Re-render',
    desc: 'ต่างจาก useState เมื่อค่าใน ref.current มีการเปลี่ยนแปลง React จะไม่มีการสั่ง Re-render คอมโพเนนต์ใหม่ จึงเหมาะมากกับการเก็บ Timer ID หรือค่าเบื้องหลัง',
  },
  {
    title: '2. DOM Reference (.current)',
    desc: 'การส่ง ref={inputRef} เข้าไปที่แท็ก JSX ทำให้เราสามารถเข้าถึง Native DOM Properties และ Methods เช่น .focus(), .scrollIntoView(), .play(), .pause() ได้โดยตรง',
  },
  {
    title: '3. Persisted across Renders',
    desc: 'ค่าใน useRef จะคงอยู่ตลอดอายุขัยของ Component แม้ Component จะถูก Re-render กี่รอบก็ตาม',
  },
  {
    title: '4. Tracking Previous State',
    desc: 'เราสามารถใช้ useEffect ร่วมกับ ref เพื่อบันทึกค่า State ของรอบการเรนเดอร์ก่อนหน้า เพื่อนำมาเปรียบเทียบกับค่าในรอบปัจจุบันได้',
  },
];
