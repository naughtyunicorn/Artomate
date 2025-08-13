import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon.jsx';
import Button from '../ui/Button.jsx';
import { generateContentWithAI, generateImageWithAI, generateVideoWithAI } from '../../services/geminiService.js';

const AIGenerationStep = ({ campaignData, onComplete, onBack, onClose }) => {
  const [currentStep, setCurrentStep] = useState('text');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState({});
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generationSteps = [
    { id: 'text', label: 'Generating Text Content', description: 'Creating captions, hashtags, and email content' },
    { id: 'image', label: 'Generating Image', description: 'Creating visual content for your campaign' },
    { id: 'video', label: 'Generating Video', description: 'Creating engaging video content' }
  ];

  useEffect(() => {
    if (isGenerating) {
      startGeneration();
    }
  }, [isGenerating]);

  const startGeneration = async () => {
    try {
      setError(null);
      setIsGenerating(true);
      setGenerationProgress(0);

      // Step 1: Generate text content
      setCurrentStep('text');
      setGenerationProgress(20);
      
      const textContent = await generateContentWithAI(campaignData);
      setGeneratedContent(prev => ({ ...prev, ...textContent }));
      setGenerationProgress(40);

      // Step 2: Generate image
      setCurrentStep('image');
      setGenerationProgress(60);
      
      const imageContent = await generateImageWithAI(textContent.imagePrompt);
      setGeneratedContent(prev => ({ ...prev, image: imageContent }));
      setGenerationProgress(80);

      // Step 3: Generate video
      setCurrentStep('video');
      setGenerationProgress(90);
      
      const videoContent = await generateVideoWithAI({
        image: imageContent,
        script: textContent.videoScript,
        audio: campaignData.sourceFileUrl
      });
      setGeneratedContent(prev => ({ ...prev, video: videoContent }));
      setGenerationProgress(100);

      // Complete generation
      setTimeout(() => {
        onComplete(generatedContent);
      }, 1000);

    } catch (error) {
      console.error('Generation error:', error);
      setError(error.message || 'An error occurred during generation');
      setIsGenerating(false);
    }
  };

  const handleStartGeneration = () => {
    setIsGenerating(true);
  };

  const handleRetry = () => {
    setError(null);
    setGenerationProgress(0);
    setGeneratedContent({});
    setIsGenerating(true);
  };

  const getCurrentStepInfo = () => {
    return generationSteps.find(step => step.id === currentStep);
  };

  if (error) {
    return (
      <div className="p-6 text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
          <Icon name="close" className="w-8 h-8 text-white" />
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Generation Failed</h3>
          <p className="text-gray-400 mb-6">{error}</p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            Go Back
          </Button>
          <Button onClick={handleRetry}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!isGenerating) {
    return (
      <div className="p-6 space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">AI Generation</h3>
          <p className="text-gray-400">
            Our AI will now create a comprehensive marketing package for your content
          </p>
        </div>

        {/* Campaign Summary */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Campaign Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <Icon name={campaignData.contentType === 'music' ? 'music' : campaignData.contentType === 'video' ? 'video' : 'document-text'} className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-gray-400">Content Type</p>
              <p className="font-medium text-white capitalize">{campaignData.contentType}</p>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <Icon name="light-bulb" className="w-8 h-8 text-secondary mx-auto mb-2" />
              <p className="text-sm text-gray-400">Theme</p>
              <p className="font-medium text-white">{campaignData.theme}</p>
            </div>
            <div className="text-center p-4 bg-gray-700 rounded-lg">
              <Icon name="document" className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-400">Source File</p>
              <p className="font-medium text-white text-sm truncate">{campaignData.sourceFile?.name}</p>
            </div>
          </div>
        </div>

        {/* What Will Be Generated */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">What You'll Get</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <Icon name="megaphone" className="w-8 h-8 text-primary mx-auto mb-2" />
              <h5 className="font-medium text-white mb-1">Social Media Posts</h5>
              <p className="text-sm text-gray-400">Engaging captions and hashtags</p>
            </div>
            <div className="text-center p-4">
              <Icon name="envelope" className="w-8 h-8 text-secondary mx-auto mb-2" />
              <h5 className="font-medium text-white mb-1">Email Campaign</h5>
              <p className="text-sm text-gray-400">Professional marketing email</p>
            </div>
            <div className="text-center p-4">
              <Icon name="video-camera" className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <h5 className="font-medium text-white mb-1">Video Content</h5>
              <p className="text-sm text-gray-400">15-second vertical video</p>
            </div>
          </div>
        </div>

        {/* Start Generation */}
        <div className="text-center pt-6">
          <Button onClick={handleStartGeneration} size="lg" className="px-8">
            Start AI Generation
          </Button>
          <p className="text-sm text-gray-400 mt-2">
            This process typically takes 2-3 minutes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-center space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">AI Generation in Progress</h3>
        <p className="text-gray-400">Creating your marketing package...</p>
      </div>

      {/* Progress Bar */}
      <div className="max-w-md mx-auto">
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${generationProgress}%` }}
          />
        </div>
        <p className="text-sm text-gray-400">{generationProgress}% Complete</p>
      </div>

      {/* Current Step */}
      <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h4 className="text-lg font-semibold text-white mb-2">
          {getCurrentStepInfo()?.label}
        </h4>
        <p className="text-gray-400">
          {getCurrentStepInfo()?.description}
        </p>
      </div>

      {/* Generation Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {generationSteps.map((step, index) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg border-2 ${
              currentStep === step.id
                ? 'border-primary bg-primary/10'
                : generationProgress > (index * 33)
                ? 'border-green-500 bg-green-500/10'
                : 'border-gray-600 bg-gray-800'
            }`}
          >
            <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
              currentStep === step.id
                ? 'bg-primary text-white'
                : generationProgress > (index * 33)
                ? 'bg-green-500 text-white'
                : 'bg-gray-600 text-gray-400'
            }`}>
              {generationProgress > (index * 33) ? (
                currentStep === step.id ? (
                  <Icon name="spinner" className="w-4 h-4 animate-spin" />
                ) : (
                  <Icon name="check" className="w-4 h-4" />
                )
              ) : (
                index + 1
              )}
            </div>
            <h5 className="font-medium text-white text-sm">{step.label}</h5>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-400">
        Please don't close this window while generation is in progress
      </div>
    </div>
  );
};

export default AIGenerationStep; 