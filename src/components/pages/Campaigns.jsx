import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon.jsx';
import Button from '../ui/Button.jsx';

const Campaigns = ({ userProfile }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      // Mock data - in real app, fetch from Firestore
      const mockCampaigns = [
        {
          id: '1',
          title: 'Summer Vibes EP',
          status: 'published',
          type: 'music',
          createdAt: new Date('2024-01-15'),
          engagement: 89,
          sourceFile: 'summer_vibes.mp3'
        },
        {
          id: '2',
          title: 'Chapter 3: The Journey',
          status: 'draft',
          type: 'book',
          createdAt: new Date('2024-01-14'),
          engagement: 0,
          sourceFile: 'chapter3.txt'
        },
        {
          id: '3',
          title: 'Behind the Scenes',
          status: 'published',
          type: 'video',
          createdAt: new Date('2024-01-13'),
          engagement: 156,
          sourceFile: 'bts_video.mp4'
        },
        {
          id: '4',
          title: 'New Single Release',
          status: 'processing',
          type: 'music',
          createdAt: new Date('2024-01-12'),
          engagement: 0,
          sourceFile: 'new_single.wav'
        }
      ];

      setCampaigns(mockCampaigns);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      published: 'bg-green-600 text-white',
      draft: 'bg-gray-600 text-gray-200',
      processing: 'bg-yellow-600 text-white',
      failed: 'bg-red-600 text-white'
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

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true;
    return campaign.status === filter;
  });

  const handleEdit = (campaignId) => {
    console.log('Edit campaign:', campaignId);
    // In real app, open edit modal or navigate to edit page
  };

  const handleDelete = (campaignId) => {
    if (confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      setCampaigns(campaigns.filter(c => c.id !== campaignId));
    }
  };

  const handleView = (campaignId) => {
    console.log('View campaign:', campaignId);
    // In real app, open preview modal
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Campaigns</h2>
          <p className="text-gray-400">Manage and track your content campaigns</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button className="flex items-center">
            <Icon name="plus" className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex flex-wrap gap-2">
          {['all', 'published', 'draft', 'processing'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 bg-gray-600 rounded-lg mr-3">
                        {getTypeIcon(campaign.type)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {campaign.title}
                        </div>
                        <div className="text-sm text-gray-400">
                          {campaign.sourceFile}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-300 capitalize">
                      {campaign.type}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(campaign.status)}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {campaign.createdAt.toLocaleDateString()}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {campaign.engagement > 0 ? (
                        <span className="text-green-400 font-medium">
                          {campaign.engagement} likes
                        </span>
                      ) : (
                        <span className="text-gray-500">No engagement yet</span>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleView(campaign.id)}
                        className="text-secondary hover:text-secondary/80 p-1"
                        title="View"
                      >
                        <Icon name="eye" className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleEdit(campaign.id)}
                        className="text-primary hover:text-primary/80 p-1"
                        title="Edit"
                      >
                        <Icon name="pencil" className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(campaign.id)}
                        className="text-red-400 hover:text-red-300 p-1"
                        title="Delete"
                      >
                        <Icon name="trash" className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <Icon name="megaphone" className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No campaigns found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You haven't created any campaigns yet. Start by creating your first one!"
                : `No ${filter} campaigns found.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns; 