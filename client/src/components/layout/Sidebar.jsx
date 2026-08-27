import React from 'react';
import { PLAYGROUND_MODULES, PLAYGROUND_CATEGORIES } from '../../playgrounds/registry';
import { ChevronRight, X, Sparkles, BookOpen } from 'lucide-react';

export default function Sidebar({
  activeModuleId,
  onSelectModule,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const categories = [
    PLAYGROUND_CATEGORIES.BASICS,
    PLAYGROUND_CATEGORIES.INTERMEDIATE,
    PLAYGROUND_CATEGORIES.ADVANCED,
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 w-72 bg-slate-950/95 lg:bg-slate-950 border-r border-slate-800/80 p-4 overflow-y-auto z-40 transition-transform duration-200 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between lg:hidden mb-4 pb-3 border-b border-slate-800">
          <span className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Modules Menu</span>
          </span>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modules List by Category */}
        <div className="space-y-6">
          {categories.map((catName) => {
            const modulesInCat = PLAYGROUND_MODULES.filter((m) => m.category === catName);
            if (modulesInCat.length === 0) return null;

            return (
              <div key={catName} className="space-y-2">
                <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {catName}
                </div>

                <div className="space-y-1">
                  {modulesInCat.map((module) => {
                    const Icon = module.icon;
                    const isActive = activeModuleId === module.id;

                    return (
                      <button
                        key={module.id}
                        onClick={() => {
                          onSelectModule(module.id);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-start gap-3 group relative ${
                          isActive
                            ? 'bg-indigo-600/10 border border-indigo-500/30 text-white shadow-sm'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                        }`}
                      >
                        {/* Active Accent Bar */}
                        {isActive && (
                          <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full" />
                        )}

                        <div
                          className={`p-2 rounded-lg mt-0.5 transition-colors ${
                            isActive
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                              : 'bg-slate-900 text-slate-400 group-hover:text-indigo-400 group-hover:bg-slate-800'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-xs font-semibold truncate ${
                                isActive ? 'text-white' : 'text-slate-300'
                              }`}
                            >
                              {module.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded border font-medium ${module.difficultyColor}`}
                            >
                              {module.difficulty}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          className={`w-4 h-4 mt-2 transition-transform ${
                            isActive
                              ? 'text-indigo-400 translate-x-0.5'
                              : 'text-slate-600 group-hover:text-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Info */}
        <div className="mt-8 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
          <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Learning</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            เลือกหัวข้อด้านบนเพื่อทดสอบ State, Props, Event และดูค่า State แบบเรียลไทม์
          </p>
        </div>
      </aside>
    </>
  );
}
