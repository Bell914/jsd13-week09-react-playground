import React, { useState, useEffect, useCallback } from 'react';
import {
  Globe,
  RefreshCw,
  AlertTriangle,
  Search,
  Sliders,
  Sparkles,
  Layers,
  Clock,
  CheckCircle2,
  Package,
  Star,
  DollarSign
} from 'lucide-react';

const MOCK_DATABASE = {
  products: [
    {
      id: 1,
      title: 'Mechanical Keyboard RGB Pro',
      category: 'Electronics',
      price: 2490,
      rating: 4.8,
      stock: 14,
      image: '⌨️',
      description: 'คีย์บอร์ดกลไกสวิตช์ Red ไร้เสียง พร้อมไฟ RGB ปรับแต่งได้ตามต้องการ',
    },
    {
      id: 2,
      title: 'Wireless Ergonomic Mouse',
      category: 'Electronics',
      price: 1290,
      rating: 4.6,
      stock: 25,
      image: '🖱️',
      description: 'เมาส์ไร้สายทรงสุขภาพ ลดอาการเมื่อยล้าข้อมือ แบตเตอรี่ใช้งานได้ 60 วัน',
    },
    {
      id: 3,
      title: 'Ultra-Wide 4K Gaming Monitor',
      category: 'Electronics',
      price: 14500,
      rating: 4.9,
      stock: 6,
      image: '🖥️',
      description: 'จอมอนิเตอร์ IPS ขนาด 34 นิ้ว 144Hz รองรับ HDR600 สีตรงระดับโปร',
    },
    {
      id: 4,
      title: 'Noise Cancelling Studio Headphones',
      category: 'Audio',
      price: 4990,
      rating: 4.7,
      stock: 12,
      image: '🎧',
      description: 'หูฟังตัดเสียงรบกวนภายนอก Active Noise Cancelling พร้อมไมโครโฟนความคมชัดสูง',
    },
    {
      id: 5,
      title: 'Minimalist Desk Mat (90x40cm)',
      category: 'Accessories',
      price: 450,
      rating: 4.5,
      stock: 40,
      image: '🪵',
      description: 'แผ่นรองโต๊ะทำงานหนังเทียมกันน้ำ ผิวสัมผัสนุ่ม เรียบหรู',
    },
    {
      id: 6,
      title: 'Smart LED Light Bar',
      category: 'Accessories',
      price: 1150,
      rating: 4.7,
      stock: 18,
      image: '💡',
      description: 'โคมไฟติดหน้าจอปรับอุณหภูมิสีได้ ไม่สะท้อนเข้าตา ถนอมสายตาขณะทำงาน',
    },
  ],
  users: [
    {
      id: 101,
      title: 'Tanawat Prasert',
      category: 'Engineering',
      price: 0,
      rating: 5.0,
      stock: 'Online',
      image: '👨‍💻',
      description: 'Senior Frontend Developer (React, Next.js, Tailwind CSS)',
    },
    {
      id: 102,
      title: 'Sudarat Chaiwong',
      category: 'Design',
      price: 0,
      rating: 4.9,
      stock: 'In Meeting',
      image: '👩‍🎨',
      description: 'Product Designer specializing in Design Systems and Prototyping',
    },
    {
      id: 103,
      title: 'Nattapong Srisuk',
      category: 'DevOps',
      price: 0,
      rating: 4.8,
      stock: 'Offline',
      image: '🚀',
      description: 'Cloud & Infrastructure Architect (Docker, Kubernetes, CI/CD)',
    },
  ],
};

export default function AsyncApiPlayground({ onStateChange }) {
  const [resourceType, setResourceType] = useState('products'); // 'products' | 'users'
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [delayMs, setDelayMs] = useState(800); // Artificial delay to observe loading
  const [simulateError, setSimulateError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [fetchCount, setFetchCount] = useState(0);
  const [lastFetchedAt, setLastFetchedAt] = useState('');

  // 1. Debounce Search Term (useEffect พร้อม Cleanup Function)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);

    // Cleanup function: ล้าง timeout เก่าเมื่อผู้ใช้ยังพิมพ์ไม่เสร็จ
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // 2. Fetch Data Effect (รันเมื่อ resourceType, debouncedSearch หรือ fetchCount เปลี่ยน)
  const fetchData = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();

    const fetchTimer = setTimeout(() => {
      if (simulateError) {
        setIsLoading(false);
        setError('เกิดข้อผิดพลาด 500: ไม่สามารถเชื่อมต่อกับ Server ได้ (Simulated Network Error)');
        return;
      }

      // ดึงข้อมูลจาก Mock API และ Filter ด้วย Debounced Search
      const sourceList = MOCK_DATABASE[resourceType] || [];
      const filtered = sourceList.filter(
        (item) =>
          item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      );

      setData(filtered);
      setIsLoading(false);
      setLastFetchedAt(new Date().toLocaleTimeString());
    }, delayMs);

    return () => {
      clearTimeout(fetchTimer);
      controller.abort();
    };
  }, [resourceType, debouncedSearch, delayMs, simulateError]);

  useEffect(() => {
    fetchData();
  }, [fetchData, fetchCount]);

  // Sync to Live State Inspector
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        endpoint: `/api/${resourceType}`,
        status: isLoading ? 'LOADING' : error ? 'ERROR' : 'SUCCESS',
        itemsCount: data.length,
        delaySetting: `${delayMs}ms`,
        searchTerm,
        debouncedSearch,
        lastFetchedAt,
        error,
        dataSnippet: data.slice(0, 2),
      });
    }
  }, [resourceType, isLoading, error, data, delayMs, searchTerm, debouncedSearch, lastFetchedAt, onStateChange]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/50 via-slate-900 to-slate-900 border border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Module 4: Side Effects & Async Data Fetching
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              ทำความเข้าใจวงจรชีวิตของ <code className="text-purple-300 font-mono text-xs bg-purple-500/10 px-1.5 py-0.5 rounded">useEffect</code>, การจัดการ Dependency Array, การทำ Search Debouncing และการแสดงสถานะ Loading & Error
            </p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          
          {/* Endpoint Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Endpoint:</span>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setResourceType('products')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  resourceType === 'products'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                📦 Products API
              </button>
              <button
                onClick={() => setResourceType('users')}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  resourceType === 'users'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                👥 Team Users API
              </button>
            </div>
          </div>

          {/* Action Buttons: Refresh & Simulate Error */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSimulateError(!simulateError)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                simulateError
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-rose-400'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>จำลอง Error (500): {simulateError ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setFetchCount((c) => c + 1)}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>ดึงข้อมูลใหม่ (Re-fetch)</span>
            </button>
          </div>
        </div>

        {/* Second Row: Search & Delay Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          
          {/* Search with Debounce */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ค้นหา (มี Debounce 400ms)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            />
            {searchTerm !== debouncedSearch && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-purple-400 animate-pulse font-mono">
                debouncing...
              </span>
            )}
          </div>

          {/* Delay Slider */}
          <div className="flex items-center gap-3 bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800">
            <Sliders className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-slate-400 whitespace-nowrap">จำลองความช้า (Delay):</span>
            <input
              type="range"
              min="0"
              max="2000"
              step="200"
              value={delayMs}
              onChange={(e) => setDelayMs(Number(e.target.value))}
              className="w-full accent-purple-500 cursor-pointer"
            />
            <span className="text-xs font-mono text-purple-300 w-12 text-right">{delayMs}ms</span>
          </div>
        </div>
      </div>

      {/* Main Content / API Results Area */}
      <div className="space-y-4">
        
        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <div className="flex items-center gap-2">
            <span>สถานะ:</span>
            {isLoading ? (
              <span className="text-amber-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                กำลังโหลดข้อมูล (Loading)...
              </span>
            ) : error ? (
              <span className="text-rose-400 font-mono font-semibold">เกิดข้อผิดพลาด (Error)</span>
            ) : (
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                สำเร็จ (พบ {data.length} รายการ)
              </span>
            )}
          </div>

          {lastFetchedAt && (
            <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              อัปเดตล่าสุด: {lastFetchedAt}
            </span>
          )}
        </div>

        {/* 1. ERROR STATE */}
        {error ? (
          <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-center space-y-3 animate-fadeIn">
            <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
            <h4 className="text-base font-bold text-rose-200">ไม่สามารถโหลดข้อมูลได้</h4>
            <p className="text-xs text-slate-300 max-w-md mx-auto">{error}</p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSimulateError(false);
                  setFetchCount((c) => c + 1);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-rose-600/20"
              >
                ลองใหม่อีกครั้ง (Retry Fetch)
              </button>
            </div>
          </div>
        ) : isLoading ? (
          /* 2. LOADING SKELETON STATE */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((sk) => (
              <div
                key={sk}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-800" />
                  <div className="w-16 h-5 rounded bg-slate-800" />
                </div>
                <div className="w-3/4 h-5 rounded bg-slate-800" />
                <div className="w-full h-10 rounded bg-slate-800/60" />
                <div className="flex justify-between pt-2">
                  <div className="w-16 h-4 rounded bg-slate-800" />
                  <div className="w-12 h-4 rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          /* 3. EMPTY STATE */
          <div className="p-12 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-center text-slate-500 space-y-2">
            <Package className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-xs">ไม่พบข้อมูลที่ตรงกับคำค้นหา "{debouncedSearch}"</p>
          </div>
        ) : (
          /* 4. SUCCESS STATE: RENDER CARDS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900 transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {item.image}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-slate-700">
                      {item.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  {resourceType === 'products' ? (
                    <>
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        ฿{item.price.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-mono">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.rating}</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-400 font-mono text-[11px]">
                        Status: <strong className="text-emerald-400">{item.stock}</strong>
                      </span>
                      <span className="text-purple-400 font-mono text-[11px]">Active Member</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export const asyncApiPlaygroundCode = `import React, { useState, useEffect } from 'react';

export default function AsyncApiPlayground() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('products');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // 1. Debounce Search (Timer Cleanup)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer); // Cleanup เมื่อมีการพิมพ์ซ้ำ
  }, [search]);

  // 2. Fetch Data with useEffect & Dependency Array
  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // ยิง API (หรือ Mock Async)
    fetch(\`/api/\${category}?search=\${debouncedSearch}\`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });

  }, [category, debouncedSearch]); // Dependency Array

  return (
    <div>
      {isLoading && <p>Loading Skeleton...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <ul>
          {data.map(item => <li key={item.id}>{item.title}</li>)}
        </ul>
      )}
    </div>
  );
}`;

export const asyncApiPlaygroundExplanations = [
  {
    title: '1. วงจรชีวิต useEffect',
    desc: 'useEffect ทำงานหลังจากที่ Component ถูก Mount หรือ Render เสร็จสิ้น ใช้สำหรับจัดการ Side Effects เช่น การยิง API, การตั้ง Timer, หรือการเชื่อมต่อ WebSockets',
  },
  {
    title: '2. Dependency Array [dependencies]',
    desc: 'หากส่ง Array เปล่า [] จะทำงานเพียงครั้งเดียวตอน Mount แต่ถ้าใส่ [category, debouncedSearch] จะทำงานซ้ำเฉพาะเมื่อค่าใน Dependency มีการเปลี่ยนแปลง',
  },
  {
    title: '3. Effect Cleanup Function',
    desc: 'การ Return ฟังก์ชัน เช่น () => clearTimeout(timer) หรือ controller.abort() จะทำงานก่อนที่ Effect รอบถัดไปจะเริ่ม หรือตอนที่ Component Unmount เพื่อป้องกัน Memory Leak',
  },
  {
    title: '4. Async UI States (Loading / Error / Success)',
    desc: 'แอปพลิเคชันที่ดีต้องจัดการ State ให้ครบทั้ง 3 แบบ: ระหว่างโหลด (Skeleton / Spinner), เมื่อเกิดปัญหา (Error Alert + Retry), และเมื่อสำเร็จ (Data Display)',
  },
];
