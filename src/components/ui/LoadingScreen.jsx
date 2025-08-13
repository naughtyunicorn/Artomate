import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  
  const messages = [
    "Crafting your creative vision...",
    "Summoning the AI muse...",
    "Brewing marketing magic...",
    "Transforming ideas into content...",
    "Preparing your campaign arsenal...",
    "Loading creative superpowers...",
    "Almost ready to create magic..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white animate-pulse">
            Artomate
          </h1>
          <p className="text-xl text-gray-300">
            AI-Powered Content Creation Suite
          </p>
        </div>

        {/* Loading Animation */}
        <div className="relative">
          <div className="w-24 h-24 border-4 border-gray-700 border-t-primary rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-secondary rounded-full animate-spin mx-auto" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Creative Message */}
        <div className="space-y-2">
          <p className="text-lg text-gray-400 transition-opacity duration-500">
            {messages[messageIndex]}
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 bg-gray-700 rounded-full h-2 mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 