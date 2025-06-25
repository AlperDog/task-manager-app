import React, { useState, useEffect } from 'react';
import { Task } from './TaskManager';

interface TaskFormProps {
  task?: Task | null;
  onSave: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setCategory(task.category);
      setPriority(task.priority);
      setDueDate(task.dueDate || '');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === '') return;

    onSave({
      title: title.trim(),
      category,
      priority,
      dueDate: dueDate || undefined,
      completed: task?.completed || false
    });
  };

  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Education', 'Other'];

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div className="modal-content card-custom" style={{
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="text-white mb-0">
            {task ? 'Edit Task' : 'Add New Task'}
          </h4>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onCancel}
          ></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-white">Task Title *</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Category</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label text-white">Priority</label>
            <select
              className="form-select bg-dark text-white border-secondary"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label text-white">Due Date (Optional)</label>
            <input
              type="date"
              className="form-control bg-dark text-white border-secondary"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-custom"
              disabled={title.trim() === ''}
            >
              {task ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm; 