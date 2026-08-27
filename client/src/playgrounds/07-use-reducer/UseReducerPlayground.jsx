import React, { useReducer, useState, useEffect } from 'react';
import {
  GitPullRequest,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
  Briefcase,
  User,
  DollarSign,
  Activity,
  Layers
} from 'lucide-react';

// --- INITIAL STATE ---
const INITIAL_KANBAN_STATE = {
  columns: {
    todo: {
      id: 'todo',
      title: '📋 To Do (รอดำเนินการ)',
      color: 'border-slate-700 bg-slate-900/50',
      items: [
        {
          id: 'k-1',
          title: 'ออกแบบ UI System ด้วย Tailwind v4',
          priority: 'High',
          assignee: 'Tanawat',
        },
        {
          id: 'k-2',
          title: 'เขียน Unit Test สำหรับ useReducer',
          priority: 'Medium',
          assignee: 'Sudarat',
        },
      ],
    },
    inProgress: {
      id: 'inProgress',
      title: '⚡ In Progress (กำลังทำ)',
      color: 'border-amber-500/30 bg-amber-950/10',
      items: [
        {
          id: 'k-3',
          title: 'เชื่อมต่อ API กับ Express Backend',
          priority: 'High',
          assignee: 'Nattapong',
        },
      ],
    },
    done: {
      id: 'done',
      title: '✅ Done (เสร็จสิ้น)',
      color: 'border-emerald-500/30 bg-emerald-950/10',
      items: [
        {
          id: 'k-4',
          title: 'ตั้งค่า Vite และ Tailwind CSS v4',
          priority: 'Low',
          assignee: 'Tanawat',
        },
      ],
    },
  },
  actionLogs: [],
};

// --- PURE REDUCER FUNCTION ---
function kanbanReducer(state, action) {
  const timestamp = new Date().toLocaleTimeString();

  switch (action.type) {
    case 'ADD_CARD': {
      const { title, columnId, priority, assignee } = action.payload;
      const newCard = {
        id: 'k-' + Date.now(),
        title,
        priority: priority || 'Medium',
        assignee: assignee || 'Member',
      };

      const targetCol = state.columns[columnId];
      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...targetCol,
            items: [newCard, ...targetCol.items],
          },
        },
        actionLogs: [
          { type: 'ADD_CARD', desc: `เพิ่มการ์ด "${title}" ใน ${targetCol.title}`, time: timestamp },
          ...state.actionLogs.slice(0, 7),
        ],
      };
    }

    case 'MOVE_CARD': {
      const { cardId, sourceColId, targetColId } = action.payload;
      if (sourceColId === targetColId) return state;

      const sourceCol = state.columns[sourceColId];
      const targetCol = state.columns[targetColId];

      const movingCard = sourceCol.items.find((item) => item.id === cardId);
      if (!movingCard) return state;

      return {
        ...state,
        columns: {
          ...state.columns,
          [sourceColId]: {
            ...sourceCol,
            items: sourceCol.items.filter((item) => item.id !== cardId),
          },
          [targetColId]: {
            ...targetCol,
            items: [...targetCol.items, movingCard],
          },
        },
        actionLogs: [
          {
            type: 'MOVE_CARD',
            desc: `ย้าย "${movingCard.title}" ไปที่ ${targetCol.title}`,
            time: timestamp,
          },
          ...state.actionLogs.slice(0, 7),
        ],
      };
    }

    case 'DELETE_CARD': {
      const { cardId, columnId } = action.payload;
      const col = state.columns[columnId];
      const deletedCard = col.items.find((i) => i.id === cardId);

      return {
        ...state,
        columns: {
          ...state.columns,
          [columnId]: {
            ...col,
            items: col.items.filter((item) => item.id !== cardId),
          },
        },
        actionLogs: [
          {
            type: 'DELETE_CARD',
            desc: `ลบการ์ด "${deletedCard?.title || cardId}" จาก ${col.title}`,
            time: timestamp,
          },
          ...state.actionLogs.slice(0, 7),
        ],
      };
    }

    case 'RESET_BOARD': {
      return {
        ...INITIAL_KANBAN_STATE,
        actionLogs: [
          { type: 'RESET_BOARD', desc: 'รีเซ็ตกระดานกลับสู่ค่าเริ่มต้น', time: timestamp },
          ...state.actionLogs.slice(0, 7),
        ],
      };
    }

    default:
      throw new Error(`Unhandled Action Type: ${action.type}`);
  }
}

export default function UseReducerPlayground({ onStateChange }) {
  const [state, dispatch] = useReducer(kanbanReducer, INITIAL_KANBAN_STATE);

  // Form State สำหรับเพิ่ม Card ใหม่
  const [newTitle, setNewTitle] = useState('');
  const [newColumn, setNewColumn] = useState('todo');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newAssignee, setNewAssignee] = useState('Tanawat');

  // Submit Handler
  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // DISPATCH ACTION TO REDUCER
    dispatch({
      type: 'ADD_CARD',
      payload: {
        title: newTitle.trim(),
        columnId: newColumn,
        priority: newPriority,
        assignee: newAssignee,
      },
    });

    setNewTitle('');
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Low':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default:
        return 'text-slate-400 bg-slate-800';
    }
  };

  // Sync to Live State Inspector
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        boardSummary: {
          todoCount: state.columns.todo.items.length,
          inProgressCount: state.columns.inProgress.items.length,
          doneCount: state.columns.done.items.length,
          totalCards:
            state.columns.todo.items.length +
            state.columns.inProgress.items.length +
            state.columns.done.items.length,
        },
        recentActionLogs: state.actionLogs,
        rawState: state.columns,
      });
    }
  }, [state, onStateChange]);

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-950/50 via-slate-900 to-slate-900 border border-orange-500/30">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <GitPullRequest className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Module 7: useReducer & Complex State Lab
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                จัดการ State ที่มีเงื่อนไขซับซ้อนด้วย <code className="text-orange-300 font-mono text-xs bg-orange-500/10 px-1.5 py-0.5 rounded">useReducer</code> ผ่าน Action Dispatches และ Pure Reducer Function
              </p>
            </div>
          </div>

          <button
            onClick={() => dispatch({ type: 'RESET_BOARD' })}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Board</span>
          </button>
        </div>
      </div>

      {/* Add Card Form */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          ⚡ Dispatch: ADD_CARD Action
        </span>

        <form onSubmit={handleAddCard} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="ชื่องานใหม่ เช่น เขียน React Documentation..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-slate-100 focus:outline-none focus:border-orange-500"
          />

          <select
            value={newColumn}
            onChange={(e) => setNewColumn(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-orange-500"
          >
            <option value="todo">📋 To Do</option>
            <option value="inProgress">⚡ In Progress</option>
            <option value="done">✅ Done</option>
          </select>

          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-orange-500"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <select
            value={newAssignee}
            onChange={(e) => setNewAssignee(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-orange-500"
          >
            <option value="Tanawat">Tanawat</option>
            <option value="Sudarat">Sudarat</option>
            <option value="Nattapong">Nattapong</option>
          </select>

          <button
            type="submit"
            disabled={!newTitle.trim()}
            className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-40 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Dispatch</span>
          </button>
        </form>
      </div>

      {/* Kanban Board Columns (3 Columns Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Todo */}
        {['todo', 'inProgress', 'done'].map((colKey) => {
          const column = state.columns[colKey];

          return (
            <div
              key={column.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-4 ${column.color}`}
            >
              <div className="space-y-3">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <h3 className="text-xs font-bold text-white">{column.title}</h3>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {column.items.length}
                  </span>
                </div>

                {/* Cards List */}
                <div className="space-y-3 min-h-[160px]">
                  {column.items.length === 0 ? (
                    <div className="py-8 text-center text-slate-600 text-xs italic">
                      ไม่มีงานในคอลัมน์นี้
                    </div>
                  ) : (
                    column.items.map((card) => (
                      <div
                        key={card.id}
                        className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-200 leading-snug">
                            {card.title}
                          </span>
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'DELETE_CARD',
                                payload: { cardId: card.id, columnId: column.id },
                              })
                            }
                            className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Meta Tags */}
                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span
                            className={`px-1.5 py-0.2 rounded border font-mono ${getPriorityBadge(
                              card.priority
                            )}`}
                          >
                            {card.priority}
                          </span>

                          <span className="text-slate-400 flex items-center gap-1">
                            <User className="w-3 h-3 text-slate-500" />
                            <span>{card.assignee}</span>
                          </span>
                        </div>

                        {/* Move Buttons */}
                        <div className="pt-2 border-t border-slate-800/80 flex justify-between gap-2">
                          {colKey !== 'todo' && (
                            <button
                              onClick={() =>
                                dispatch({
                                  type: 'MOVE_CARD',
                                  payload: {
                                    cardId: card.id,
                                    sourceColId: colKey,
                                    targetColId: colKey === 'done' ? 'inProgress' : 'todo',
                                  },
                                })
                              }
                              className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                            >
                              <ArrowLeft className="w-3 h-3" />
                              <span>ย้อนกลับ</span>
                            </button>
                          )}

                          {colKey !== 'done' && (
                            <button
                              onClick={() =>
                                dispatch({
                                  type: 'MOVE_CARD',
                                  payload: {
                                    cardId: card.id,
                                    sourceColId: colKey,
                                    targetColId: colKey === 'todo' ? 'inProgress' : 'done',
                                  },
                                })
                              }
                              className="ml-auto px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
                            >
                              <span>ถัดไป</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Dispatch Logger Box */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Dispatcher Action Logs (ประวัติคำสั่ง Reducer)
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Live Redux/Reducer Flow</span>
        </div>

        <div className="space-y-1.5 font-mono text-xs max-h-36 overflow-y-auto">
          {state.actionLogs.length === 0 ? (
            <div className="text-slate-500 italic text-center py-2 text-xs">
              ยังไม่มี Action ถูกส่งเข้ามา (ลองกดเพิ่มการ์ดหรือย้ายสถานะ)
            </div>
          ) : (
            state.actionLogs.map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-slate-300"
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                    {log.type}
                  </span>
                  <span className="text-xs text-slate-300">{log.desc}</span>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0">{log.time}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export const useReducerPlaygroundCode = `import React, { useReducer } from 'react';

// 1. Initial State
const initialState = {
  todo: [],
  inProgress: [],
  done: []
};

// 2. Pure Reducer Function (รับ state + action คืนค่า state ใหม่)
function kanbanReducer(state, action) {
  switch (action.type) {
    case 'ADD_CARD':
      return {
        ...state,
        [action.payload.column]: [
          ...state[action.payload.column],
          action.payload.card
        ]
      };

    case 'MOVE_CARD': {
      const { card, from, to } = action.payload;
      return {
        ...state,
        [from]: state[from].filter(c => c.id !== card.id),
        [to]: [...state[to], card]
      };
    }

    default:
      return state;
  }
}

export default function KanbanBoard() {
  // 3. เรียกใช้ useReducer
  const [state, dispatch] = useReducer(kanbanReducer, initialState);

  const addCard = (title) => {
    // 4. Dispatch Action
    dispatch({
      type: 'ADD_CARD',
      payload: { column: 'todo', card: { id: Date.now(), title } }
    });
  };

  return (
    <div>
      <button onClick={() => addCard('งานใหม่')}>+ Add Card</button>
      {/* เรนเดอร์ state.todo, state.inProgress, state.done */}
    </div>
  );
}`;

export const useReducerPlaygroundExplanations = [
  {
    title: '1. เมื่อไหร่ควรใช้ useReducer แทน useState?',
    desc: 'เมื่อ State มีโครงสร้างที่ซับซ้อน (Nested Objects/Arrays), เมื่อ State ถัดไปขึ้นอยู่กับเงื่อนไขหลายอย่าง, หรือเมื่อต้องการรวมศูนย์ Logic การอัปเดต State ไว้ที่จุดเดียว',
  },
  {
    title: '2. Action Object & Dispatch',
    desc: 'Action คือ Object ธรรมดาที่มีฟิลด์ type (ระบุคำสั่ง) และ payload (ข้อมูลที่ส่งไป) ส่วน dispatch ทำหน้าที่ส่ง Action นี้ไปยัง Reducer Function',
  },
  {
    title: '3. Pure Reducer Function',
    desc: 'Reducer ต้องเป็น Pure Function เสมอ: ไม่มี Side Effects, ไม่แก้ State เดิมโดยตรง (Immutable), และเมื่อส่ง input เดิมต้องคืนค่า output แบบเดิมเสมอ',
  },
  {
    title: '4. State Machine & Predictability',
    desc: 'useReducer ทำให้การเปลี่ยนสถานะของโปรแกรมคาดเดาได้ง่าย (Predictable) และเป็นพื้นฐานสำคัญที่สุดในการเรียนรู้ Redux Toolkit หรือ Zustand',
  },
];
