import React, { useState, useRef } from 'react';
import Icon from '../ui/Icon.jsx';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';

const UploadStep = ({ onComplete, onClose }) => {
  const [contentType, setContentType] = useState('');
  const [theme, setTheme] = useState('');
  const [sourceFile, setSourceFile] = useState(null);
  const [sourceFileUrl, setSourceFileUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const contentTypes = [
    { id: 'music', label: 'Song/Audio', icon: 'music', extensions: ['.mp3', '.wav', '.m4a', '.flac'] },
    { id: 'video', label: 'Video', icon: 'video', extensions: ['.mp4', '.mov', '.avi', '.mkv'] },
    { id: 'book', label: 'Text/Book', icon: 'document-text', extensions: ['.txt', '.doc', '.pdf', '.md'] }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    // Validate file type
    const selectedType = contentTypes.find(type => 
      type.extensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );

    if (!selectedType) {
      alert('Please select a valid file type for the selected content type.');
      return;
    }

    // Auto-set content type if not already set
    if (!contentType) {
      setContentType(selectedType.id);
    }

    // Auto-populate theme from filename
    const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
    if (!theme) {
      setTheme(fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
    }

    setSourceFile(file);
    
    // Create object URL for preview
    const url = URL.createObjectURL(file);
    setSourceFileUrl(url);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleContinue = () => {
    if (!contentType || !theme || !sourceFile) {
      alert('Please fill in all required fields and upload a file.');
      return;
    }

    onComplete({
      contentType,
      theme,
      sourceFile,
      sourceFileUrl
    });
  };

  const canContinue = contentType && theme && sourceFile;

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Upload & Configure</h3>
        <p className="text-gray-400">
          Select your content type, upload source material, and set the theme for your campaign
        </p>
      </div>

      {/* Content Type Selection */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">1. Select Content Type</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contentTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setContentType(type.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                contentType === type.id
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500'
              }`}
            >
              <Icon name={type.icon} className={`w-8 h-8 mx-auto mb-3 ${
                contentType === type.id ? 'text-primary' : 'text-gray-400'
              }`} />
              <h5 className="font-medium text-white mb-1">{type.label}</h5>
              <p className="text-xs text-gray-400">
                {type.extensions.join(', ')}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Input */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">2. Set Theme or Vibe</h4>
        <Input
          label="Theme or Vibe"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="e.g., Summer vibes, Dark and mysterious, Upbeat and energetic..."
          className="max-w-2xl"
        />
        <p className="text-sm text-gray-400">
          Describe the mood, style, or theme of your content to help AI generate relevant marketing materials
        </p>
      </div>

      {/* File Upload */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">3. Upload Source Material</h4>
        
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/10'
              : 'border-gray-600 bg-gray-800 hover:border-gray-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {sourceFile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Icon name={contentTypes.find(t => t.id === contentType)?.icon || 'document-text'} className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-white">{sourceFile.name}</p>
                  <p className="text-sm text-gray-400">
                    {(sourceFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              {contentType === 'music' && (
                <audio controls className="mx-auto">
                  <source src={sourceFileUrl} type={sourceFile.type} />
                  Your browser does not support the audio element.
                </audio>
              )}
              
              {contentType === 'video' && (
                <video controls className="mx-auto max-w-md">
                  <source src={sourceFileUrl} type={sourceFile.type} />
                  Your browser does not support the video element.
                </video>
              )}
              
              <Button
                variant="outline"
                onClick={() => {
                  setSourceFile(null);
                  setSourceFileUrl(null);
                  fileInputRef.current?.click();
                }}
              >
                Change File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Icon name="upload" className="w-16 h-16 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-white mb-2">
                  Drop your file here, or click to browse
                </p>
                <p className="text-gray-400 mb-4">
                  Supported formats: {contentTypes.find(t => t.id === contentType)?.extensions.join(', ') || 'All types'}
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileInputChange}
          accept={contentTypes.find(t => t.id === contentType)?.extensions.join(',') || '*'}
          className="hidden"
        />
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-6 border-t border-gray-700">
        <Button
          onClick={handleContinue}
          disabled={!canContinue}
          className="px-8"
        >
          Continue to AI Generation
        </Button>
      </div>
    </div>
  );
};

export default UploadStep; 