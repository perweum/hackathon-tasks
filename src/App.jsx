import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Board from './components/Board';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hackathon_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleOnboardingComplete = (userData) => {
    setUser(userData);
    localStorage.setItem('hackathon_user', JSON.stringify(userData));
  };

  if (loading) return null;

  return (
    <div className="app-container">
      {!user ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Board user={user} />
      )}
    </div>
  );
}

export default App;
