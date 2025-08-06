import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/useTheme';

const StatsCard = ({ title, value, icon, color, trend, isLoading = false }) => {
  const { isDarkMode } = useTheme();
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== undefined && !isLoading) {
      setIsAnimating(true);
      const startValue = 0;
      const endValue = value;
      const duration = 1000;
      const increment = (endValue - startValue) / (duration / 16);

      let currentValue = startValue;
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= endValue) {
          setDisplayValue(endValue);
          setIsAnimating(false);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(currentValue));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [value, isLoading]);

  const getColorClasses = (color) => {
    const colors = {
      blue: isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800',
      green: isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800',
      purple: isDarkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800',
      orange: isDarkMode ? 'bg-orange-900 text-orange-200' : 'bg-orange-100 text-orange-800',
      red: isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800',
      indigo: isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
    };
    return colors[color] || colors.blue;
  };

  const getIconColor = (color) => {
    const colors = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      orange: 'text-orange-600 dark:text-orange-400',
      red: 'text-red-600 dark:text-red-400',
      indigo: 'text-indigo-600 dark:text-indigo-400'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`
      rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105
      ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
      ${isLoading ? 'animate-pulse' : ''}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <div className="flex items-baseline space-x-2 mt-2">
            <p className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {isLoading ? '...' : displayValue.toLocaleString()}
            </p>
            {trend && (
              <span className={`text-sm font-medium ${
                trend > 0 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
        </div>
        
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <div className={`w-6 h-6 ${getIconColor(color)}`}>
            {icon}
          </div>
        </div>
      </div>
      
      {isAnimating && (
        <div className="mt-2">
          <div className={`h-1 rounded-full ${getColorClasses(color)} overflow-hidden`}>
            <div 
              className={`h-full ${getIconColor(color)} transition-all duration-1000 ease-out`}
              style={{ width: `${(displayValue / value) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsCard; 