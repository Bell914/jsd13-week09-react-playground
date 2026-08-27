import React, { useState, useEffect, useMemo } from 'react';
import {
  ListTodo,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Search,
  Filter,
  Sparkles,
  Edit2,
  Check,
  X,
  Tag,
  AlertCircle
} from 'lucide-react';

const INITIAL_TASKS = [
  {
    id: 't-1',
    title: 'เรียนรู้เรื่อง useState และ Props',
    category: 'Study',
    priority: 'High',
    completed: true,
  },
  {
    id: 't-2',
    title: 'ฝึกฝน Array .map() และการใส่ Unique Key',
    category: 'Study',
    priority: 'High',
    completed: false,
  },
  {
    id: 't-3',
    title: 'อัปเดตสไตล์ด้วย Tailwind CSS v4',
    category: 'Work',
    priority: 'Medium',
    completed: false,
  },
  {
    id: 't-4',
    title: 'วิ่งออกกำลังกาย 30 นาที',
    category: 'Personal',
    priority: 'Low',
    completed: false,
  },
];

export default function ListCrudPlayground({ onStateChange }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Study');
  const [newPriority, setNewPriority] = useState('Medium');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Active' | 'Completed'
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // 1. CREATE: เพิ่มงานใหม่แบบ Immutable (Spread Operator)
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: 't-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      completed: false,
    };

    // Immutable: สร้าง Array ใหม่ ไม่แก้ของเดิม
    setTasks((prev) => [newTask, ...prev]);
    setNewTitle('');
  };

  // 2. UPDATE: สลับสถานะเสร็จสิ้นด้วย .map()
  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 3. UPDATE: แก้ไขชื่อ Task
  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = (id) => {
    if (!editingTitle.trim()) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: editingTitle.trim() } : task
      )
    );
    setEditingId(null);
  };

  // 4. DELETE: ลบ Task ด้วย .filter()
  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // 5. DELETE ALL COMPLETED
  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  // RESET TO INITIAL
  const handleResetTasks = () => {
    setTasks(INITIAL_TASKS);
  };

  // FILTERED & SEARCHED TASKS (Derived State)
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus =
        statusFilter === 'All'
          ? true
          : statusFilter === 'Completed'
          ? task.completed
          : !task.completed;
      const matchCategory =
        categoryFilter === 'All' ? true : task.category === categoryFilter;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [tasks, searchQuery, statusFilter, categoryFilter]);

  // Statistics
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // Sync to State Inspector
  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        tasksCount: totalCount,
        completedCount,
        progressPercent: `${progressPercent}%`,
        activeFilters: { searchQuery, statusFilter, categoryFilter },
        tasksList: tasks,
      });
    }
  }, [tasks, searchQuery, statusFilter, categoryFilter, totalCount, completedCount, progressPercent, onStateChange]);

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

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/50 via-slate-900 to-slate-900 border border-sky-500/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <ListTodo className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Module 2: Lists, Keys & CRUD Operations Lab
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              ฝึกฝนการจัดการ Array State ใน React: การเพิ่ม (<code className="text-sky-300 font-mono text-xs">Spread</code>), ลบ (<code className="text-sky-300 font-mono text-xs">.filter()</code>), อัปเดต (<code className="text-sky-300 font-mono text-xs">.map()</code>) และการใช้ Unique Key
            </p>
          </div>
        </div>
      </div>

      {/* Progress & Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">งานทั้งหมด</span>
          <div className="text-2xl font-bold text-white font-mono mt-1">{totalCount} รายการ</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">เสร็จสิ้นแล้ว</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {completedCount} <span className="text-xs text-slate-500">/ {totalCount}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">ความคืบหน้า</span>
            <span className="font-mono font-bold text-sky-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main CRUD Workspace */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        
        {/* 1. Add Task Form */}
        <form onSubmit={handleAddTask} className="space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            ➕ เพิ่มรายการใหม่ (Create Operation)
          </span>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="กรอกชื่องาน เช่น ฝึกฝน React Hooks..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-sky-500"
            />

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 text-sm focus:outline-none focus:border-sky-500"
            >
              <option value="Study">Study (การเรียน)</option>
              <option value="Work">Work (งาน)</option>
              <option value="Personal">Personal (ส่วนตัว)</option>
            </select>

            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 text-sm focus:outline-none focus:border-sky-500"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            <button
              type="submit"
              disabled={!newTitle.trim()}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-sky-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มงาน</span>
            </button>
          </div>
        </form>

        {/* 2. Filter & Search Controls */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหารายการ..."
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Status and Category Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {['All', 'Active', 'Completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    statusFilter === status
                      ? 'bg-sky-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
            >
              <option value="All">ทุกหมวดหมู่</option>
              <option value="Study">Study</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
        </div>

        {/* 3. Tasks List Rendering */}
        <div className="space-y-2.5">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-10 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-slate-500 text-xs">
              <AlertCircle className="w-6 h-6 mx-auto mb-2 opacity-50" />
              <span>ไม่พบรายการที่ตรงกับเงื่อนไขการค้นหา</span>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isEditing = editingId === task.id;

              return (
                <div
                  key={task.id} // IMPORTANT: Unique Key
                  className={`p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 ${
                    task.completed
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Left: Checkbox & Title */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className="shrink-0 p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500" />
                      )}
                    </button>

                    {isEditing ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="flex-1 px-2.5 py-1 rounded bg-slate-900 border border-sky-500 text-slate-100 text-sm focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(task.id)}
                          className="p-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex-1 min-w-0">
                        <span
                          className={`text-sm font-medium block truncate ${
                            task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                          }`}
                        >
                          {task.title}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                            <Tag className="w-3 h-3 text-sky-400" />
                            <span>{task.category}</span>
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${getPriorityBadge(
                              task.priority
                            )}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Actions: Edit & Delete */}
                  {!isEditing && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleStartEdit(task)}
                        className="p-2 rounded-lg text-slate-400 hover:text-sky-400 hover:bg-slate-900 transition-colors"
                        title="แก้ไขข้อความ"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                        title="ลบรายการ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-mono">
            Key Rule: <code>key={`{task.id}`}</code> ต้อง Unique เสมอ
          </span>

          <div className="flex gap-2">
            {completedCount > 0 && (
              <button
                onClick={handleClearCompleted}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-colors"
              >
                ล้างรายการที่เสร็จแล้ว ({completedCount})
              </button>
            )}
            <button
              onClick={handleResetTasks}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              รีเซ็ตข้อมูลเริ่มต้น
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export const listCrudPlaygroundCode = `import React, { useState } from 'react';

export default function ListCrudPlayground() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'เรียนรู้ React', completed: false }
  ]);
  const [title, setTitle] = useState('');

  // 1. CREATE: เพิ่มข้อมูลด้วย Spread Operator
  const addTask = () => {
    const newTask = { id: String(Date.now()), title, completed: false };
    setTasks(prev => [newTask, ...prev]);
    setTitle('');
  };

  // 2. UPDATE: อัปเดตข้อมูลด้วย .map()
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };

  // 3. DELETE: ลบข้อมูลด้วย .filter()
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add</button>

      {/* 4. READ: เรนเดอร์ Array ด้วย .map() พร้อมระบุ key */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => toggleTask(task.id)}>Toggle</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

export const listCrudPlaygroundExplanations = [
  {
    title: '1. ทำไมต้องใช้ Unique Key?',
    desc: 'React ใช้ prop "key" ในการระบุว่าไอเทมไหนถูกเพิ่ม ลบ หรือแก้ไข เพื่อทำ Virtual DOM Reconciliation ได้อย่างแม่นยำและมีประสิทธิภาพสูงสุด ห้ามใช้ Array index หากลำดับมีการเปลี่ยนแปลง',
  },
  {
    title: '2. Create (การเพิ่มไอเทม)',
    desc: 'ใช้ Spread Operator [newItem, ...prevTasks] เพื่อสร้าง Array ใหม่แทนการใช้ .push() ซึ่งเป็นการกลายพันธุ์ (Mutate) ข้อมูลเดิมโดยตรง',
  },
  {
    title: '3. Update (การแก้ไขไอเทม)',
    desc: 'ใช้ .map() วนลูปเพื่อคืนค่า Array ใหม่ โดยตรวจสอบ id ที่ตรงกัน และใช้ { ...task, completed: !task.completed } เพื่ออัปเดตเฉพาะฟิลด์ที่ต้องการ',
  },
  {
    title: '4. Delete (การลบไอเทม)',
    desc: 'ใช้ .filter() กรองไอเทมที่ไม่ตรงกับ id ออกไป เช่น prev.filter(task => task.id !== targetId)',
  },
];
