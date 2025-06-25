import React from 'react';
import { Task } from './TaskManager';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onEdit }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return 'fas fa-briefcase';
      case 'personal': return 'fas fa-user';
      case 'shopping': return 'fas fa-shopping-cart';
      case 'health': return 'fas fa-heartbeat';
      case 'education': return 'fas fa-graduation-cap';
      default: return 'fas fa-tag';
    }
  };

  const isOverdue = (dueDate: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div
          key={task.id}
          className="task-item card-custom mb-3"
          style={{
            opacity: task.completed ? 0.7 : 1,
            borderLeft: `4px solid ${getPriorityColor(task.priority)}`
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center flex-grow-1">
              {/* Checkbox */}
              <div className="me-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                  style={{
                    width: '1.2rem',
                    height: '1.2rem',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* Task Content */}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center mb-1">
                  <h6 
                    className="text-white mb-0 me-2"
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? '#888' : '#fff'
                    }}
                  >
                    {task.title}
                  </h6>
                  
                  {/* Priority Badge */}
                  <span 
                    className="badge me-2"
                    style={{
                      backgroundColor: getPriorityColor(task.priority),
                      fontSize: '0.7rem'
                    }}
                  >
                    {task.priority.toUpperCase()}
                  </span>

                  {/* Category */}
                  <span className="text-white-50 me-2">
                    <i className={`${getCategoryIcon(task.category)} me-1`}></i>
                    {task.category}
                  </span>
                </div>

                {/* Due Date */}
                {task.dueDate && (
                  <div className="d-flex align-items-center">
                    <small 
                      className={`me-2 ${isOverdue(task.dueDate) ? 'text-danger' : 'text-white-50'}`}
                    >
                      <i className="fas fa-calendar me-1"></i>
                      Due: {formatDate(task.dueDate)}
                      {isOverdue(task.dueDate) && (
                        <span className="ms-1">
                          <i className="fas fa-exclamation-triangle"></i> Overdue
                        </span>
                      )}
                    </small>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-1">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onEdit(task)}
                title="Edit task"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(task.id)}
                title="Delete task"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList; 