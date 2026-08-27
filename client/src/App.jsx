import React, { useState, useCallback } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import StateInspector from './components/layout/StateInspector';
import CodeViewer from './components/layout/CodeViewer';
import { PLAYGROUND_MODULES } from './playgrounds/registry';

// Module 1: State Basics
import StatePlayground, {
  statePlaygroundCode,
  statePlaygroundExplanations,
} from './playgrounds/01-state-basics/StatePlayground';

// Module 2: Lists & CRUD
import ListCrudPlayground, {
  listCrudPlaygroundCode,
  listCrudPlaygroundExplanations,
} from './playgrounds/02-list-crud/ListCrudPlayground';

// Module 3: Forms & Validation
import FormsPlayground, {
  formsPlaygroundCode,
  formsPlaygroundExplanations,
} from './playgrounds/03-forms/FormsPlayground';

// Module 4: useEffect & Async API
import AsyncApiPlayground, {
  asyncApiPlaygroundCode,
  asyncApiPlaygroundExplanations,
} from './playgrounds/04-api-effects/AsyncApiPlayground';

// Module 5: Context API & Global Cart
import CartPlayground, {
  cartPlaygroundCode,
  cartPlaygroundExplanations,
} from './playgrounds/05-context-cart/CartPlayground';

// Module 6: useRef & DOM Manipulation
import UseRefPlayground, {
  useRefPlaygroundCode,
  useRefPlaygroundExplanations,
} from './playgrounds/06-use-ref/UseRefPlayground';

// Module 7: useReducer & Complex State
import UseReducerPlayground, {
  useReducerPlaygroundCode,
  useReducerPlaygroundExplanations,
} from './playgrounds/07-use-reducer/UseReducerPlayground';

// Module 8: Custom Hooks Architecture
import CustomHooksPlayground, {
  customHooksPlaygroundCode,
  customHooksPlaygroundExplanations,
} from './playgrounds/08-custom-hooks/CustomHooksPlayground';

export default function App() {
  const [activeModuleId, setActiveModuleId] = useState('custom-hooks-lab');
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
      case 'list-crud':
        return <ListCrudPlayground onStateChange={handleStateChange} />;
      case 'forms-validation':
        return <FormsPlayground onStateChange={handleStateChange} />;
      case 'use-effect-api':
        return <AsyncApiPlayground onStateChange={handleStateChange} />;
      case 'context-cart':
        return <CartPlayground onStateChange={handleStateChange} />;
      case 'use-ref-dom':
        return <UseRefPlayground onStateChange={handleStateChange} />;
      case 'use-reducer-kanban':
        return <UseReducerPlayground onStateChange={handleStateChange} />;
      case 'custom-hooks-lab':
        return <CustomHooksPlayground onStateChange={handleStateChange} />;
      default:
        return <StatePlayground onStateChange={handleStateChange} />;
    }
  };

  const getActiveCodeAndExplanations = () => {
    switch (activeModuleId) {
      case 'state-basics':
        return {
          code: statePlaygroundCode,
          explanations: statePlaygroundExplanations,
        };
      case 'list-crud':
        return {
          code: listCrudPlaygroundCode,
          explanations: listCrudPlaygroundExplanations,
        };
      case 'forms-validation':
        return {
          code: formsPlaygroundCode,
          explanations: formsPlaygroundExplanations,
        };
      case 'use-effect-api':
        return {
          code: asyncApiPlaygroundCode,
          explanations: asyncApiPlaygroundExplanations,
        };
      case 'context-cart':
        return {
          code: cartPlaygroundCode,
          explanations: cartPlaygroundExplanations,
        };
      case 'use-ref-dom':
        return {
          code: useRefPlaygroundCode,
          explanations: useRefPlaygroundExplanations,
        };
      case 'use-reducer-kanban':
        return {
          code: useReducerPlaygroundCode,
          explanations: useReducerPlaygroundExplanations,
        };
      case 'custom-hooks-lab':
        return {
          code: customHooksPlaygroundCode,
          explanations: customHooksPlaygroundExplanations,
        };
      default:
        return {
          code: statePlaygroundCode,
          explanations: statePlaygroundExplanations,
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
