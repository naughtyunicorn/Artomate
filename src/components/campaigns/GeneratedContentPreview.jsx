import React, { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import Button from '../ui/Button.jsx';
import PaymentModal from './PaymentModal.jsx';

const GeneratedContentPreview = ({ generatedContent, campaignData, userProfile, onBack, onClose }) => {
  const [selectedCaption, setSelectedCaption] = useState('A');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handlePublish = () => {
    if (userProfile?.subscriptionStatus === 'free') {
      setShowPaymentModal(true);
    } else {
      // Pro user can publish directly
      publishCampaign();
    }
  };

  const publishCampaign = async () => {
    setPublishing(true);
    try {
      // In a real app, save to Firestore and update campaign status
      console.log('Publishing campaign:', {
        campaignData,
        generatedContent,
        userProfile
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success - close modal and show success message
      alert('Campaign published successfully!');
      onClose();
    } catch (error) {
      console.error('Error publishing campaign:', error);
      alert('Failed to publish campaign. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      // In a real app, save to Firestore as draft
      console.log('Saving draft:', {
        campaignData,
        generatedContent,
        userProfile
      });
      
      alert('Draft saved successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Failed to save draft. Please try again.');
    }
  };

  const handleDiscard = () => {
    if (confirm('Are you sure you want to discard this campaign? This action cannot be undone.')) {
      onClose();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Review & Publish</h3>
        <p className="text-gray-400">
          Preview your generated content and choose what to do next
        </p>
      </div>

      {/* Content Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Instagram Post Preview */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Icon name="instagram" className="w-5 h-5 mr-2 text-pink-500" />
            Instagram Post
          </h4>
          
          {/* Image Preview */}
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <img
              src={generatedContent?.image?.url}
              alt="Generated image"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          
          {/* Caption Toggle */}
          <div className="mb-4">
            <div className="flex space-x-2 mb-3">
              <button
                onClick={() => setSelectedCaption('A')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  selectedCaption === 'A'
                    ? 'bg-primary text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Caption A
              </button>
              <button
                onClick={() => setSelectedCaption('B')}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  selectedCaption === 'B'
                    ? 'bg-primary text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Caption B
              </button>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-white text-sm">
                {selectedCaption === 'A' ? generatedContent?.caption : generatedContent?.captionB}
              </p>
            </div>
          </div>
          
          {/* Hashtags */}
          <div>
            <h5 className="text-sm font-medium text-gray-300 mb-2">Hashtags</h5>
            <div className="flex flex-wrap gap-2">
              {generatedContent?.hashtags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Video Reel Preview */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Icon name="video-camera" className="w-5 h-5 mr-2 text-green-500" />
            Video Reel
          </h4>
          
          {/* Video Player */}
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            {generatedContent?.video?.url ? (
              <video
                controls
                className="w-full h-48 object-cover rounded-lg"
                src={generatedContent.video.url}
              >
                Your browser does not support the video element.
              </video>
            ) : (
              <div className="w-full h-48 bg-gray-600 rounded-lg flex items-center justify-center">
                <Icon name="video-camera" className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          
          {/* Video Script */}
          <div>
            <h5 className="text-sm font-medium text-gray-300 mb-2">Video Script</h5>
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-white text-sm whitespace-pre-line">
                {generatedContent?.videoScript}
              </p>
            </div>
          </div>
        </div>

        {/* Email Campaign Preview */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Icon name="envelope" className="w-5 h-5 mr-2 text-blue-500" />
            Email Campaign
          </h4>
          
          {/* Email Preview */}
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <div className="bg-white text-gray-900 rounded p-3">
              <h5 className="font-bold text-lg mb-2">
                {generatedContent?.email?.subject}
              </h5>
              <div className="text-sm whitespace-pre-line">
                {generatedContent?.email?.body}
              </div>
              <div className="mt-4">
                <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium">
                  {generatedContent?.email?.ctaText}
                </button>
              </div>
            </div>
          </div>
          
          {/* Email Stats */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-2xl font-bold text-white">2.4k</p>
              <p className="text-xs text-gray-400">Subscribers</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-2xl font-bold text-white">18.2%</p>
              <p className="text-xs text-gray-400">Open Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-700 space-y-4 sm:space-y-0">
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleDiscard}>
            <Icon name="trash" className="w-4 h-4 mr-2" />
            Discard
          </Button>
          <Button variant="secondary" onClick={handleSaveDraft}>
            <Icon name="save" className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
        </div>
        
        <Button
          onClick={handlePublish}
          loading={publishing}
          className="px-8"
        >
          <Icon name="upload" className="w-4 h-4 mr-2" />
          Publish Now
        </Button>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={publishCampaign}
          campaignData={campaignData}
        />
      )}
    </div>
  );
};

export default GeneratedContentPreview; 