import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';

export interface Task {
  id: number;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  completed: boolean;
  createdAt: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
    setShowForm(false);
  }, []);

  const updateTask = useCallback((taskData: Task) => {
    setTasks(prev => prev.map(task => 
      task.id === taskData.id ? taskData : task
    ));
    setEditingTask(null);
    setShowForm(false);
  }, []);

  const toggleTask = useCallback((id: number) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const editTask = useCallback((task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  }, []);

  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Get unique categories for filter dropdown
  const categories = ['all', ...Array.from(new Set(tasks.map(task => task.category)))];

  return (
    <div className="task-manager-container">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-white mb-3">
          <i className="fas fa-tasks me-3" style={{ color: '#aa00ff' }}></i>
          Task Manager
        </h2>
        <p className="text-white-50">Organize your tasks with categories, priorities, and due dates</p>
      </div>

      {/* Statistics */}
      <TaskStats tasks={tasks} />

      {/* Search and Filter Controls */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text bg-dark text-white border-secondary">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <select
            className="form-select bg-dark text-white border-secondary"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <select
            className="form-select bg-dark text-white border-secondary"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* Add Task Button */}
      <div className="text-center mb-4">
        <button 
          className="btn btn-custom btn-lg"
          onClick={() => setShowForm(true)}
        >
          <i className="fas fa-plus me-2"></i>
          Add New Task
        </button>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={editingTask ? updateTask : addTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />

      {/* Empty State */}
      {filteredTasks.length === 0 && tasks.length > 0 && (
        <div className="text-center py-5">
          <div style={{ fontSize: '4rem', color: '#aa00ff', marginBottom: '1rem' }}>
            <i className="fas fa-search"></i>
          </div>
          <h5 className="text-white">No tasks found</h5>
          <p className="text-white-50">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-5">
          <div style={{ fontSize: '4rem', color: '#aa00ff', marginBottom: '1rem' }}>
            <i className="fas fa-clipboard-list"></i>
          </div>
          <h5 className="text-white">No tasks yet!</h5>
          <p className="text-white-50">Start by adding your first task</p>
        </div>
      )}
    </div>
  );
};

export default TaskManager; 