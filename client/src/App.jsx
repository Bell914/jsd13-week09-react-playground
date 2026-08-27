import React, { useState, useCallback } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import StateInspector from './components/layout/StateInspector';
import CodeViewer from './components/layout/CodeViewer';
import { PLAYGROUND_MODULES } from './playgrounds/registry';

// Playgrounds
import StatePlayground, {
  statePlaygroundCode,
  statePlaygroundExplanations,
} from './playgrounds/01-state-basics/StatePlayground';
import ModulePlaceholder from './playgrounds/common/ModulePlaceholder';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState('state-basics');
  const [activeView, setActiveView] = useState('demo'); // 'demo' | 'code'
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentModuleState, setCurrentModuleState] = useState(null);

  const activeModule =
    PLAYGROUND_MODULES.find((m) => m.id === activeModuleId) || PLAYGROUND_MODULES[0];

  const handleStateChange = useCallback((newState) => {
    setCurrentModuleState(newState);
  }, []);

  const renderActivePlayground = () => {
    switch (activeModuleId) {
      case 'state-basics':
        return <StatePlayground onStateChange={handleStateChange} />;
      default:
        return <ModulePlaceholder module={activeModule} />;
    }
  };

  const getActiveCodeAndExplanations = () => {
    switch (activeModuleId) {
      case 'state-basics':
        return {
          code: statePlaygroundCode,
          explanations: statePlaygroundExplanations,
        };
      default:
        return {
          code: '// โค้ดจะถูกเพิ่มในขั้นตอนถัดไป',
          explanations: [],
        };
    }
  };

  const { code, explanations } = getActiveCodeAndExplanations();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Header Bar */}
      <Header
        activeModule={activeModule}
        activeView={activeView}
        setActiveView={setActiveView}
        isInspectorOpen={isInspectorOpen}
        setIsInspectorOpen={setIsInspectorOpen}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <Sidebar
          activeModuleId={activeModuleId}
          onSelectModule={(id) => {
            setActiveModuleId(id);
            setCurrentModuleState(null);
          }}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Content Area */}
        <main className="flex-1 lg:pl-72 p-4 sm:p-6 lg:p-8 max-w-6xl">
          {activeView === 'demo' ? (
            renderActivePlayground()
          ) : (
            <CodeViewer
              module={activeModule}
              codeSnippet={code}
              explanations={explanations}
            />
          )}
        </main>
      </div>

      {/* Real-time State Inspector Panel */}
      <StateInspector
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        stateData={currentModuleState}
        moduleName={activeModule?.title}
      />
    </div>
  );
}
