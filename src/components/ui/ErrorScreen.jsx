import React from 'react';
import Button from './Button.jsx';
import Icon from './Icon.jsx';

const ErrorScreen = ({ error, onRetry }) => {
  const getErrorDetails = (errorMessage) => {
    if (errorMessage.includes('Firestore') || errorMessage.includes('database')) {
      return {
        title: 'Database Connection Error',
        description: 'Unable to connect to the database. This could be due to:',
        causes: [
          'Firestore not enabled in your Firebase project',
          'Incorrect Firebase configuration',
          'Network connectivity issues',
          'Firebase project permissions'
        ],
        actions: [
          {
            label: 'Check Firebase Console',
            url: 'https://console.firebase.google.com/',
            external: true
          },
          {
            label: 'Verify Configuration',
            action: () => console.log('Check firebaseConfig in index.html')
          }
        ]
      };
    }
    
    if (errorMessage.includes('Authentication')) {
      return {
        title: 'Authentication Error',
        description: 'Unable to authenticate. This could be due to:',
        causes: [
          'Firebase Auth not enabled',
          'Incorrect API keys',
          'Domain not authorized',
          'Authentication rules misconfigured'
        ],
        actions: [
          {
            label: 'Check Firebase Console',
            url: 'https://console.firebase.google.com/',
            external: true
          }
        ]
      };
    }

    return {
      title: 'Something went wrong',
      description: 'An unexpected error occurred:',
      causes: [errorMessage],
      actions: [
        {
          label: 'Retry',
          action: onRetry
        }
      ]
    };
  };

  const errorDetails = getErrorDetails(error);

  const handleAction = (action) => {
    if (action.url && action.external) {
      window.open(action.url, '_blank');
    } else if (action.action) {
      action.action();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-xl p-8 space-y-6">
        {/* Error Icon */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <Icon name="close" className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Error Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            {errorDetails.title}
          </h1>
          <p className="text-gray-300 text-lg">
            {errorDetails.description}
          </p>
        </div>

        {/* Error Causes */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">Possible causes:</h3>
          <ul className="space-y-2">
            {errorDetails.causes.map((cause, index) => (
              <li key={index} className="flex items-start">
                <Icon name="close" className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{cause}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Error Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {errorDetails.actions.map((action, index) => (
            <Button
              key={index}
              onClick={() => handleAction(action)}
              variant={index === 0 ? 'primary' : 'outline'}
              className="flex items-center justify-center"
            >
              {action.label}
              {action.external && (
                <Icon name="external-link" className="w-4 h-4 ml-2" />
              )}
            </Button>
          ))}
        </div>

        {/* Additional Help */}
        <div className="text-center text-sm text-gray-400">
          <p>
            If the problem persists, please check your Firebase configuration in the{' '}
            <code className="bg-gray-700 px-2 py-1 rounded">index.html</code> file.
          </p>
        </div>

        {/* Technical Details */}
        <details className="bg-gray-700 rounded-lg p-4">
          <summary className="text-white font-medium cursor-pointer">
            Technical Details
          </summary>
          <div className="mt-3">
            <pre className="text-sm text-gray-300 bg-gray-800 p-3 rounded overflow-x-auto">
              {error}
            </pre>
          </div>
        </details>
      </div>
    </div>
  );
};

export default ErrorScreen; 