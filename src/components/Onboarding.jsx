import React, { useState } from 'react';
import { AVATARS } from '../data/tasks';
import { User, ArrowRight } from 'lucide-react';
import './Onboarding.css';

function Onboarding({ onComplete }) {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && selectedAvatar) {
      onComplete({ name, avatar: selectedAvatar });
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card fade-in">
        <div className="logo-section">
          <div className="coop-logo">Coop</div>
          <h1>Velkommen til Hackathon!</h1>
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
            <label>Velg din karakter</label>
            <div className="avatar-grid">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  className={`avatar-btn ${selectedAvatar?.id === av.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(av)}
                >
                  <img src={av.url} alt="Avatar" />
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={!name || !selectedAvatar}
          >
            Start Hackathon <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Onboarding;
