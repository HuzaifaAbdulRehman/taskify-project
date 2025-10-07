import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/useTheme';

const Sidebar = ({ isOpen, isCollapsed, onClose, onToggleCollapse }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { path: '/add-task', label: 'Add Task', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
    { path: '/profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ path: '/admin', label: 'Admin Panel', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' });
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full z-50 transform transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        ${isCollapsed ? 'w-20' : 'w-64'}
        ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
        border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
      `}>
        {/* Header */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
          {isCollapsed ? (
            <Link to="/dashboard" className="flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </Link>
          ) : (
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="text-xl font-bold">Taskify Pro</span>
            </Link>
          )}
          {!isCollapsed && (
            <>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Collapse button - desktop only */}
              <button
                onClick={onToggleCollapse}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Toggle sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </>
          )}
          {isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:block absolute top-6 -right-3 p-1.5 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
              title="Expand sidebar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              title={isCollapsed ? item.label : ''}
              className={`
                flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-200
                ${isActive(item.path)
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200`}
              title={isCollapsed ? user?.name : ''}
            >
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                alt={user?.name}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              {!isCollapsed && (
                <>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                  </div>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>

            {isProfileOpen && !isCollapsed && (
              <div className={`absolute bottom-full left-0 right-0 mb-2 rounded-lg shadow-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isDarkMode ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"} />
                  </svg>
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 