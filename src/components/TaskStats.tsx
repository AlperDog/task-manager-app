import React from 'react';
import { Task } from './TaskManager';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) < new Date() && 
    !task.completed
  ).length;

  const getProgressColor = (rate: number) => {
    if (rate >= 80) return '#28a745';
    if (rate >= 60) return '#ffc107';
    if (rate >= 40) return '#fd7e14';
    return '#dc3545';
  };

  return (
    <div className="task-stats mb-4">
      <div className="row g-3">
        {/* Total Tasks */}
        <div className="col-md-3 col-6">
          <div className="card-custom text-center p-3">
            <div style={{ fontSize: '2rem', color: '#aa00ff', marginBottom: '0.5rem' }}>
              <i className="fas fa-list"></i>
            </div>
            <h4 className="text-white mb-1">{totalTasks}</h4>
            <small className="text-white-50">Total Tasks</small>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="col-md-3 col-6">
          <div className="card-custom text-center p-3">
            <div style={{ fontSize: '2rem', color: '#28a745', marginBottom: '0.5rem' }}>
              <i className="fas fa-check-circle"></i>
            </div>
            <h4 className="text-white mb-1">{completedTasks}</h4>
            <small className="text-white-50">Completed</small>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="col-md-3 col-6">
          <div className="card-custom text-center p-3">
            <div style={{ fontSize: '2rem', color: '#ffc107', marginBottom: '0.5rem' }}>
              <i className="fas fa-clock"></i>
            </div>
            <h4 className="text-white mb-1">{pendingTasks}</h4>
            <small className="text-white-50">Pending</small>
          </div>
        </div>

        {/* High Priority */}
        <div className="col-md-3 col-6">
          <div className="card-custom text-center p-3">
            <div style={{ fontSize: '2rem', color: '#dc3545', marginBottom: '0.5rem' }}>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h4 className="text-white mb-1">{highPriorityTasks}</h4>
            <small className="text-white-50">High Priority</small>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {totalTasks > 0 && (
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-white">Completion Progress</span>
            <span className="text-white-50">{completionRate}%</span>
          </div>
          <div className="progress" style={{ height: '10px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <div
              className="progress-bar"
              style={{
                width: `${completionRate}%`,
                backgroundColor: getProgressColor(completionRate),
                transition: 'width 0.3s ease'
              }}
            ></div>
          </div>
        </div>
      )}

      {/* Alerts */}
      {(overdueTasks > 0 || highPriorityTasks > 0) && (
        <div className="mt-3">
          {overdueTasks > 0 && (
            <div className="alert alert-danger d-flex align-items-center" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              <span>{overdueTasks} task{overdueTasks > 1 ? 's' : ''} overdue</span>
            </div>
          )}
          {highPriorityTasks > 0 && (
            <div className="alert alert-warning d-flex align-items-center" role="alert">
              <i className="fas fa-exclamation me-2"></i>
              <span>{highPriorityTasks} high priority task{highPriorityTasks > 1 ? 's' : ''} pending</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskStats; 