import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Icon from '../ui/Icon.jsx';

const Dashboard = ({ userProfile }) => {
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    published: 0,
    drafts: 0,
    totalLikes: 0
  });
  const [recentCampaigns, setRecentCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // In a real app, you'd fetch this from Firestore
      // For now, using mock data
      setStats({
        totalCampaigns: 12,
        published: 8,
        drafts: 4,
        totalLikes: 1247
      });

      setRecentCampaigns([
        {
          id: '1',
          title: 'Summer Vibes EP',
          status: 'published',
          type: 'music',
          createdAt: new Date('2024-01-15'),
          engagement: 89
        },
        {
          id: '2',
          title: 'Chapter 3: The Journey',
          status: 'draft',
          type: 'book',
          createdAt: new Date('2024-01-14'),
          engagement: 0
        },
        {
          id: '3',
          title: 'Behind the Scenes',
          status: 'published',
          type: 'video',
          createdAt: new Date('2024-01-13'),
          engagement: 156
        }
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      published: 'bg-green-600 text-white',
      draft: 'bg-gray-600 text-gray-200',
      processing: 'bg-yellow-600 text-white'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${variants[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const icons = {
      music: 'music',
      video: 'video',
      book: 'document-text'
    };

    return <Icon name={icons[type] || 'document-text'} className="w-5 h-5" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Welcome back, {userProfile?.displayName}! 👋
        </h2>
        <p className="text-primary-100">
          Ready to create some amazing content? Let's turn your creativity into engaging campaigns.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Icon name="megaphone" className="w-6 h-6 text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Campaigns</p>
              <p className="text-2xl font-bold text-white">{stats.totalCampaigns}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Icon name="check-circle" className="w-6 h-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Published</p>
              <p className="text-2xl font-bold text-white">{stats.published}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-gray-500/20 rounded-lg">
              <Icon name="document-text" className="w-6 h-6 text-gray-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Drafts</p>
              <p className="text-2xl font-bold text-white">{stats.drafts}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Icon name="chart-bar" className="w-6 h-6 text-secondary" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Likes</p>
              <p className="text-2xl font-bold text-white">{stats.totalLikes.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Campaigns</h3>
          <button className="text-primary hover:text-primary/80 text-sm font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentCampaigns.map((campaign) => (
            <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-600 rounded-lg">
                  {getTypeIcon(campaign.type)}
                </div>
                <div>
                  <h4 className="font-medium text-white">{campaign.title}</h4>
                  <p className="text-sm text-gray-400">
                    {campaign.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Engagement</p>
                  <p className="font-medium text-white">{campaign.engagement}</p>
                </div>
                {getStatusBadge(campaign.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left">
            <Icon name="plus" className="w-6 h-6 text-primary mb-2" />
            <h4 className="font-medium text-white">New Campaign</h4>
            <p className="text-sm text-gray-400">Start creating content</p>
          </button>
          
          <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left">
            <Icon name="chart-bar" className="w-6 h-6 text-secondary mb-2" />
            <h4 className="font-medium text-white">View Analytics</h4>
            <p className="text-sm text-gray-400">Check performance</p>
          </button>
          
          <button className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-left">
            <Icon name="cog" className="w-6 h-6 text-gray-400 mb-2" />
            <h4 className="font-medium text-white">Settings</h4>
            <p className="text-sm text-gray-400">Configure preferences</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 