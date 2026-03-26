import React from 'react';

export default function WelcomeScreen({ onStart }) {
  // Using the direct path since the file is in the root of your public/dist folder
  const logoPath = "/logo-hero.jpg"; 

  return (
    <div className="welcome-page">
      <div className="welcome-main-content">
        <div className="icon-container">
          {/* We added overflow hidden and flex centering to make the logo look perfect */}
          <div className="blue-icon-box" style={{ 
            overflow: 'hidden', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            backgroundColor: '#007bff' // Ensures the blue background matches your theme
          }}>
            <img 
              src={logoPath} 
              alt="RoadReady Pro Logo" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                objectPosition: 'center',
                borderRadius: '12px' 
              }} 
            />
          </div>
        </div>
        
        <h1 className="hero-title">ROADREADY PRO</h1>
        
        <p className="hero-description">
          Master driving laws, safety protocols, and road ethics through our rigorous professional curriculum.
        </p>

        <button className="hero-start-btn" onClick={onStart}>
          START THE COURSE
        </button>

        <div className="hero-stats">
          <span>3 UNITS</span>
          <span>15 LESSONS</span>
          <span>CERTIFIABLE</span>
        </div>
      </div>

      <footer className="welcome-footer">
        <div className="footer-brand">
          <span className="brand-box">RR</span> ROADREADY PROFESSIONAL UNIT
        </div>
        <p className="copyright-text">
          ALL RIGHTS RESERVED. © 2026 ROADREADY EDUCATIONAL RESEARCH GROUP.
        </p>
        <p className="disclaimer-text">
          <span className="blue-text">LEGAL DISCLAIMER:</span> THIS ENVIRONMENT IS FOR TECHNICAL RESEARCH AND CURRICULUM SIMULATION ONLY. IT DOES NOT REPLACE GOVERNMENTAL LICENSING REQUIREMENTS.
        </p>
      </footer>
    </div>
  );
}