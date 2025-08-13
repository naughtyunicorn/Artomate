import React from 'react';
import Icon from '../ui/Icon.jsx';

const Sidebar = ({ currentPage, onPageChange, onLogout }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart-bar' },
    { id: 'campaigns', label: 'Campaigns', icon: 'megaphone' },
    { id: 'settings', label: 'Settings', icon: 'cog' }
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">Artomate</h1>
        <p className="text-sm text-gray-400">AI Content Suite</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
              currentPage === item.id
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Icon name={item.icon} className="w-5 h-5 mr-3" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
        >
          <Icon name="logout" className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 