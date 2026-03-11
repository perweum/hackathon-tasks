import React, { useState, useEffect } from 'react';
import { User, RefreshCw, ArrowRight } from 'lucide-react';
import './Onboarding.css';

const getRandomSeed = () => Math.random().toString(36).substring(7);

function Onboarding({ onComplete }) {
  const [name, setName] = useState('');
  const [seed, setSeed] = useState(getRandomSeed());
  const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;

  const handleRefresh = () => {
    setSeed(getRandomSeed());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      onComplete({ name, avatar: { id: seed, url: avatarUrl } });
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card fade-in">
        <div className="logo-section">
          <div className="coop-logo">Coop</div>
          <h1>Velkomment til Fridgaton!</h1>
          <p>Hvem er du i dag?</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Ditt navn</label>
            <div className="input-wrapper">
              <User size={18} />
              <input
                id="name"
                type="text"
                placeholder="Skriv inn navnet ditt..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="avatar-section">
            <label>Din karakter</label>
            <div className="single-avatar-picker">
              <div className="avatar-preview">
                <img src={avatarUrl} alt="Avatar" />
              </div>
              <button 
                type="button" 
                className="refresh-btn" 
                onClick={handleRefresh}
                title="Ny karakter"
              >
                <RefreshCw size={24} />
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={!name}
          >
            Kom i gang <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Onboarding;
