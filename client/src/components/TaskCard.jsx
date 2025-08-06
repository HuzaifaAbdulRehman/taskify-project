import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/useTheme';

const TaskCard = ({ task, onStatusChange, onDelete, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    if (isDarkMode) {
      switch (status) {
        case 'todo': return 'bg-gray-700 text-gray-200';
        case 'in-progress': return 'bg-blue-700 text-blue-200';
        case 'completed': return 'bg-green-700 text-green-200';
        default: return 'bg-gray-700 text-gray-200';
      }
    } else {
      switch (status) {
        case 'todo': return 'bg-gray-100 text-gray-800';
        case 'in-progress': return 'bg-blue-100 text-blue-800';
        case 'completed': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const getPriorityColor = (priority) => {
    if (isDarkMode) {
      switch (priority) {
        case 'high': return 'bg-red-700 text-red-200';
        case 'medium': return 'bg-yellow-700 text-yellow-200';
        case 'low': return 'bg-green-700 text-green-200';
        default: return 'bg-gray-700 text-gray-200';
      }
    } else {
      switch (priority) {
        case 'high': return 'bg-red-100 text-red-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = isDarkMode ? {
      'Development': 'bg-purple-700 text-purple-200',
      'Design': 'bg-pink-700 text-pink-200',
      'Backend': 'bg-indigo-700 text-indigo-200',
      'Security': 'bg-red-700 text-red-200',
      'Testing': 'bg-orange-700 text-orange-200'
    } : {
      'Development': 'bg-purple-100 text-purple-800',
      'Design': 'bg-pink-100 text-pink-800',
      'Backend': 'bg-indigo-100 text-indigo-800',
      'Security': 'bg-red-100 text-red-800',
      'Testing': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-800');
  };

  const handleStatusChange = async (newStatus) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      await onStatusChange(task._id, newStatus);
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    try {
      await onDelete(task._id);
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'todo': return 'in-progress';
      case 'in-progress': return 'completed';
      default: return currentStatus;
    }
  };

  const getStatusButtonText = (status) => {
    switch (status) {
      case 'todo': return 'Start';
      case 'in-progress': return 'Complete';
      case 'completed': return 'Completed';
      default: return 'Update';
    }
  };

  return (
    <div className={`
      rounded-xl shadow-lg border p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
      ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      ${isUpdating ? 'opacity-75 pointer-events-none' : ''}
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`font-semibold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>
            {task.description}
          </p>
        </div>
        
        {/* Menu button */}
        <div className="relative ml-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" />
            </svg>
          </button>
          
          {isMenuOpen && (
            <div className={`
              absolute right-0 mt-2 w-48 rounded-lg shadow-xl border py-2 z-10
              ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
            `}>
              <Link
                to={`/task/${task._id}`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                View Details
              </Link>
              <Link
                to={`/edit-task/${task._id}`}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Edit Task
              </Link>
              <button
                onClick={() => {
                  handleDelete();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
          {task.category}
        </span>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ')}
        </span>
      </div>

      {/* Dates */}
      <div className={`flex items-center justify-between text-xs mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        <span>Due: {formatDate(task.dueDate)}</span>
        <span>Created: {formatDate(task.createdAt)}</span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={task.assignedTo?.avatar || `https://ui-avatars.com/api/?name=${task.assignedTo?.name}&size=32&background=random`}
            alt={task.assignedTo?.name}
            className="w-8 h-8 rounded-full"
          />
          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {task.assignedTo?.name}
          </span>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          {task.status !== 'completed' && (
            <button
              onClick={() => handleStatusChange(getNextStatus(task.status))}
              disabled={isUpdating}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                ${task.status === 'todo' 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800'
                  : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
                }
                ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {isUpdating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating...</span>
                </div>
              ) : (
                getStatusButtonText(task.status)
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard; 