import React, { useState, useRef, useEffect } from 'react';
import Icon from '../ui/Icon.jsx';
import Button from '../ui/Button.jsx';

const Header = ({ currentPage, userProfile, onNewCampaign, onLogout }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard';
      case 'campaigns':
        return 'Campaigns';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const getSubscriptionBadge = () => {
    const status = userProfile?.subscriptionStatus || 'free';
    const variants = {
      free: 'bg-gray-600 text-gray-200',
      pro: 'bg-primary text-white',
      premium: 'bg-secondary text-gray-900'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${variants[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <Button onClick={onNewCampaign} className="flex items-center">
            <Icon name="plus" className="w-4 h-4 mr-2" />
            New Campaign
          </Button>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <img
                src={userProfile?.photoURL}
                alt={userProfile?.displayName}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-left">
                <p className="text-sm font-medium text-white">{userProfile?.displayName}</p>
                {getSubscriptionBadge()}
              </div>
              <Icon name="chevron-down" className="w-4 h-4 text-gray-400" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">{userProfile?.displayName}</p>
                  <p className="text-sm text-gray-400">{userProfile?.email}</p>
                  <div className="mt-2">{getSubscriptionBadge()}</div>
                </div>
                
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      // Navigate to settings
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Icon name="cog" className="w-4 h-4 mr-2 inline" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileDropdown(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Icon name="logout" className="w-4 h-4 mr-2 inline" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 