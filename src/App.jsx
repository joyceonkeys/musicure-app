import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus, 
  Trash2, 
  Sun, 
  Moon, 
  Layout, 
  Calendar as CalendarIcon,
  BarChart3,
  Search,
  Settings,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Destructure hooks from the namespace import to ensure compatibility
const { useState, useEffect } = React;

// --- Mock Data ---
const MOCK_TASKS = [
  { id: 1, title: "Review project proposal", completed: false, category: "Work", due: "Today" },
  { id: 2, title: "Update documentation", completed: true, category: "Work", due: "Yesterday" },
  { id: 3, title: "Buy groceries", completed: false, category: "Personal", due: "Tomorrow" },
  { id: 4, title: "Schedule team meeting", completed: false, category: "Work", due: "Today" },
];

const CHART_DATA = [
  { name: 'Mon', completed: 3 },
  { name: 'Tue', completed: 5 },
  { name: 'Wed', completed: 2 },
  { name: 'Thu', completed: 8 },
  { name: 'Fri', completed: 4 },
  { name: 'Sat', completed: 1 },
  { name: 'Sun', completed: 0 },
];

// --- Components ---

const TaskItem = ({ task, onToggle, onDelete }) => (
  <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-200 group">
    <div className="flex items-center gap-4">
      <button 
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 transition-colors duration-200 ${task.completed ? 'text-emerald-500' : 'text-slate-300 hover:text-emerald-500'}`}
      >
        {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
      </button>
      <div className="flex flex-col">
        <span className={`text-base font-medium transition-all duration-200 ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
          {task.title}
        </span>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 font-medium">
            {task.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock size={12} /> {task.due}
          </span>
        </div>
      </div>
    </div>
    <button 
      onClick={() => onDelete(task.id)}
      className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2"
    >
      <Trash2 size={18} />
    </button>
  </div>
);

const StatsCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10`}>
      <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
    </div>
  </div>
);

const Sidebar = ({ isOpen, activeTab, setActiveTab, closeMobile }) => {
  const links = [
    { id: 'dashboard', icon: Layout, label: 'Dashboard' },
    { id: 'tasks', icon: CheckCircle2, label: 'My Tasks' },
    { id: 'calendar', icon: CalendarIcon, label: 'Calendar' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={closeMobile}
        />
      )}
      
      {/* Sidebar Content */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-30 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">Focus</span>
          </div>
          <button onClick={closeMobile} className="lg:hidden text-slate-500">
            <X size={24} />
          </button>
        </div>

        <nav className="px-3 mt-4 space-y-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveTab(link.id);
                closeMobile();
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${activeTab === link.id 
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'}
              `}
            >
              <link.icon size={20} />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">John Doe</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Main App Component ---

const App = () => {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Toggle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      completed: false,
      category: "Personal",
      due: "Today"
    };
    
    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    efficiency: tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
  };

  return (
    <div className={`flex h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden font-sans`}>
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        closeMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
        
        {/* Header */}
        <header className="h-16 px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white capitalize">
              {activeTab}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white w-64 border-none"
              />
            </div>
            
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Stats Row */}
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatsCard 
                    title="Total Tasks" 
                    value={stats.total} 
                    icon={Layout} 
                    colorClass="bg-blue-500 text-blue-600"
                  />
                  <StatsCard 
                    title="Completed" 
                    value={stats.completed} 
                    icon={CheckCircle2} 
                    colorClass="bg-emerald-500 text-emerald-600"
                  />
                  <StatsCard 
                    title="Pending" 
                    value={stats.pending} 
                    icon={Clock} 
                    colorClass="bg-amber-500 text-amber-600"
                  />
                  <StatsCard 
                    title="Efficiency" 
                    value={`${stats.efficiency}%`} 
                    icon={BarChart3} 
                    colorClass="bg-purple-500 text-purple-600"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Chart Section */}
                  <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Activity Overview</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={CHART_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 12}} 
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#94a3b8', fontSize: 12}} 
                          />
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="completed" 
                            stroke="#6366f1" 
                            strokeWidth={3} 
                            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4, stroke: '#fff' }} 
                            activeDot={{ r: 6 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Quick Add Task & Recent */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-6 rounded-2xl shadow-lg text-white">
                      <h3 className="text-lg font-semibold mb-2">Pro Tip</h3>
                      <p className="text-indigo-100 text-sm mb-4">Complete your most difficult task first thing in the morning.</p>
                      <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                        Learn More
                      </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Today's Focus</h3>
                      <form onSubmit={addTask} className="relative">
                        <input
                          type="text"
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          placeholder="Add a new task..."
                          className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 dark:text-white placeholder-slate-400"
                        />
                        <button 
                          type="submit"
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors"
                        >
                          <Plus size={18} />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Tasks List */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Tasks</h3>
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
                  </div>
                  <div className="p-6 space-y-3">
                    {tasks.length > 0 ? (
                      tasks.map(task => (
                        <TaskItem 
                          key={task.id} 
                          task={task} 
                          onToggle={toggleTask} 
                          onDelete={deleteTask} 
                        />
                      ))
                    ) : (
                      <div className="text-center py-10 text-slate-400">
                        <CheckCircle2 size={48} className="mx-auto mb-3 opacity-20" />
                        <p>No tasks yet. Enjoy your day!</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab !== 'dashboard' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-full mb-6">
                  <Layout size={64} className="text-slate-300 dark:text-slate-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Work in Progress</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-md">
                  The {activeTab} section is currently under development. Check back later for updates!
                </p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-8 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
                >
                  Return to Dashboard
                </button>
              </div>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
};

// --- Proper Mounting for this Environment ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

export default App;
