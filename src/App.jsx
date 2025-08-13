import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoginPage from './components/auth/LoginPage.jsx';
import MainApp from './components/MainApp.jsx';
import LoadingScreen from './components/ui/LoadingScreen.jsx';
import ErrorScreen from './components/ui/ErrorScreen.jsx';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(window.firebaseAuth, (user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth error:', error);
      setError('Authentication failed. Please check your connection.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(window.firebaseAuth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} onRetry={() => window.location.reload()} />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return <MainApp user={user} onLogout={handleLogout} />;
};

export default App; 