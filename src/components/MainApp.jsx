import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Sidebar from './layout/Sidebar.jsx';
import Header from './layout/Header.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Campaigns from './pages/Campaigns.jsx';
import Settings from './pages/Settings.jsx';
import CreateContentFlow from './campaigns/CreateContentFlow.jsx';

const MainApp = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showCreateFlow, setShowCreateFlow] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    initializeUserProfile();
  }, [user]);

  const initializeUserProfile = async () => {
    if (!user) return;

    try {
      const userRef = doc(window.firebaseDb, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create new user profile
        const profileData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL || generateAvatarUrl(user.displayName || user.email),
          subscriptionStatus: 'free',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        await setDoc(userRef, profileData);
        setUserProfile(profileData);
      } else {
        setUserProfile(userSnap.data());
      }
    } catch (error) {
      console.error('Error initializing user profile:', error);
    }
  };

  const generateAvatarUrl = (name) => {
    const initials = name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
    
    return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=8B5CF6&textColor=ffffff`;
  };

  const handleNewCampaign = () => {
    setShowCreateFlow(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userProfile={userProfile} />;
      case 'campaigns':
        return <Campaigns userProfile={userProfile} />;
      case 'settings':
        return <Settings userProfile={userProfile} />;
      default:
        return <Dashboard userProfile={userProfile} />;
    }
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage} 
        onLogout={onLogout}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          currentPage={currentPage}
          userProfile={userProfile}
          onNewCampaign={handleNewCampaign}
          onLogout={onLogout}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>

      {showCreateFlow && (
        <CreateContentFlow
          userProfile={userProfile}
          onClose={() => setShowCreateFlow(false)}
        />
      )}
    </div>
  );
};

export default MainApp; 