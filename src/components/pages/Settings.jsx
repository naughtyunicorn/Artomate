import React, { useState } from 'react';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Icon from '../ui/Icon.jsx';

const Settings = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'subscription', label: 'Subscription', icon: 'credit-card' },
    { id: 'notifications', label: 'Notifications', icon: 'bell' },
    { id: 'security', label: 'Security', icon: 'shield' }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Display Name"
            value={userProfile?.displayName || ''}
            placeholder="Enter your display name"
          />
          <Input
            label="Email"
            value={userProfile?.email || ''}
            type="email"
            disabled
          />
          <Input
            label="Bio"
            placeholder="Tell us about yourself"
          />
          <Input
            label="Website"
            placeholder="https://yourwebsite.com"
          />
        </div>
        <div className="mt-6">
          <Button>Save Changes</Button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <img
            src={userProfile?.photoURL}
            alt={userProfile?.displayName}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <Button variant="outline">Change Photo</Button>
            <p className="text-sm text-gray-400 mt-2">
              Recommended: Square image, at least 200x200 pixels
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptionTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Current Plan</h3>
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold mb-2">
                {userProfile?.subscriptionStatus === 'pro' ? 'Pro Plan' : 'Free Plan'}
              </h4>
              <p className="text-primary-100">
                {userProfile?.subscriptionStatus === 'pro' 
                  ? 'Unlimited campaigns and premium features'
                  : 'Limited to 3 campaigns per month'
                }
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">
                {userProfile?.subscriptionStatus === 'pro' ? '$10' : '$0'}
              </div>
              <div className="text-primary-100">
                {userProfile?.subscriptionStatus === 'pro' ? '/month' : '/month'}
              </div>
            </div>
          </div>
        </div>
        
        {userProfile?.subscriptionStatus === 'free' && (
          <div className="mt-6">
            <Button size="lg">Upgrade to Pro</Button>
            <p className="text-sm text-gray-400 mt-2">
              Get unlimited campaigns, priority support, and advanced analytics
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
        <div className="text-center py-8 text-gray-400">
          <Icon name="credit-card" className="w-12 h-12 mx-auto mb-4" />
          <p>No billing history yet</p>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Campaign Updates</h4>
              <p className="text-sm text-gray-400">Get notified when your campaigns are ready</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Marketing Tips</h4>
              <p className="text-sm text-gray-400">Receive helpful content marketing advice</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Product Updates</h4>
              <p className="text-sm text-gray-400">Stay informed about new features</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
          />
        </div>
        <div className="mt-6">
          <Button>Update Password</Button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">Enable 2FA</h4>
            <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
          </div>
          <Button variant="outline">Setup 2FA</Button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div>
              <p className="font-medium text-white">Current Session</p>
              <p className="text-sm text-gray-400">Chrome on macOS • Active now</p>
            </div>
            <span className="text-green-400 text-sm">Current</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'subscription':
        return renderSubscriptionTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return renderSecurityTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-gray-400">Manage your account preferences and settings</p>
      </div>

      {/* Tabs */}
      <div className="bg-gray-800 rounded-lg p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon name={tab.icon} className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Settings; 