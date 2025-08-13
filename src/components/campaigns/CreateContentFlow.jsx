import React, { useState } from 'react';
import Icon from '../ui/Icon.jsx';
import Button from '../ui/Button.jsx';
import UploadStep from './UploadStep.jsx';
import AIGenerationStep from './AIGenerationStep.jsx';
import GeneratedContentPreview from './GeneratedContentPreview.jsx';

const CreateContentFlow = ({ userProfile, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    contentType: '',
    theme: '',
    sourceFile: null,
    sourceFileUrl: null
  });
  const [generatedContent, setGeneratedContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, title: 'Upload & Configure', description: 'Select content type and upload source material' },
    { id: 2, title: 'AI Generation', description: 'AI creates your marketing package' },
    { id: 3, title: 'Review & Publish', description: 'Preview and publish your campaign' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUploadComplete = (data) => {
    setCampaignData(data);
    handleNext();
  };

  const handleGenerationComplete = (content) => {
    setGeneratedContent(content);
    handleNext();
  };

  const handleClose = () => {
    if (currentStep === 1 || confirm('Are you sure you want to close? Your progress will be lost.')) {
      onClose();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <UploadStep
            onComplete={handleUploadComplete}
            onClose={handleClose}
          />
        );
      case 2:
        return (
          <AIGenerationStep
            campaignData={campaignData}
            onComplete={handleGenerationComplete}
            onBack={handleBack}
            onClose={handleClose}
          />
        );
      case 3:
        return (
          <GeneratedContentPreview
            generatedContent={generatedContent}
            campaignData={campaignData}
            userProfile={userProfile}
            onBack={handleBack}
            onClose={handleClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="close" className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold text-white">Create New Campaign</h2>
            </div>
            
            {/* Progress Steps */}
            <div className="hidden md:flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep >= step.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-600 text-gray-400'
                  }`}>
                    {currentStep > step.id ? (
                      <Icon name="check" className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-gray-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobile Progress */}
          <div className="md:hidden mt-4">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{steps[currentStep - 1]?.title}</span>
            </div>
            <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default CreateContentFlow; 