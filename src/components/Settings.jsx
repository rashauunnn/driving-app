import React from 'react';
import { signInWithGoogle, logout } from '../firebase';

export default function Settings({
  theme,
  setTheme,
  config,
  setConfig,
  onBack,
  user,    
  setUser,
  godMode,       // <--- Add this prop
  setGodMode     // <--- Add this prop
}) {

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Authentication failed:", error.code);
      alert("Login failed. Check your internet or browser popup settings.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="settings-container">
      <header className="settings-header">
        <button className="back-btn-circle" onClick={onBack}>❮</button>
        <h1 className="settings-title-pro">SETTINGS</h1>
      </header>

      <div className="settings-content">
        
        {/* --- 1. THEME PREFERENCE --- */}
        <section className="settings-section">
          <p className="section-label-blue">THEME PREFERENCE</p>
          <div className="theme-toggle-row">
            {['LIGHT', 'DARK', 'SYSTEM'].map((t) => (
              <button
                key={t}
                className={`theme-option ${theme === t ? 'active' : ''}`}
                onClick={() => setTheme(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        {/* --- 2. USER IDENTITY --- */}
        <section className="settings-section">
          <p className="section-label-blue">USER IDENTITY</p>
          {!user ? (
            <div
              className="logic-card login-btn-card"
              style={{
                cursor: 'pointer',
                justifyContent: 'center',
                background: '#fff',
                color: '#000',
                padding: '15px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onClick={handleLogin}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{ width: '18px', marginRight: '10px' }} />
              <span style={{ fontWeight: 'bold' }}>SIGN IN WITH GOOGLE</span>
            </div>
          ) : (
            <div className="logic-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '10px', padding: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                {user.photoURL && <img src={user.photoURL} alt="pfp" style={{ width: '40px', borderRadius: '50%', border: '2px solid var(--accent-blue)' }} />}
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{user.displayName}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', color: '#ff4444', fontSize: '11px', cursor: 'pointer', padding: 0, marginTop: '5px' }}
              >
                Sign Out of System
              </button>
            </div>
          )}
        </section>

        {/* --- 3. COURSE LOGIC & OVERRIDE --- */}
        <section className="settings-section">
          <p className="section-label-blue">COURSE LOGIC</p>
          <div className="logic-card">
            <span>Exam Confirmation Dialog</span>
            <input
              type="checkbox"
              className="pro-checkbox"
              checked={config.confirmExam}
              onChange={() => setConfig({...config, confirmExam: !config.confirmExam})}
            />
          </div>
          <div className="logic-card">
            <span>Show Progress on Home</span>
            <input
              type="checkbox"
              className="pro-checkbox"
              checked={config.showProgress}
              onChange={() => setConfig({...config, showProgress: !config.showProgress})}
            />
          </div>

          {/* SYSTEM OVERRIDE BUTTON */}
          <div className="logic-card override-card" style={{ border: godMode ? '1px solid #ff4444' : '1px solid var(--border-color)' }}>
            <div className="override-info">
              <span style={{ color: godMode ? '#ff4444' : 'inherit', fontWeight: 'bold' }}>System Override (God Mode)</span>
              <p style={{ margin: 0, fontSize: '0.65rem', color: 'var(--text-dim)' }}>Bypass all module locks for testing.</p>
            </div>
            <input
              type="checkbox"
              className="pro-checkbox override-checkbox"
              checked={godMode}
              onChange={() => setGodMode(!godMode)}
            />
          </div>
        </section>

        {/* --- 4. DEVELOPER & PROJECT INFO --- */}
        <div className="about-pro-card">
          <div className="dev-header">
            <h4 className="about-title">ⓘ PROJECT INFORMATION</h4>
            <span className="version-tag">v2.5.0-PRO</span>
          </div>
          
          <div className="dev-details">
            <p><strong>Developer:</strong> Shaquiel Daniel G. Umandap</p>
            <p><strong>Affiliation:</strong> Madridejos Community College</p>
            <p><strong>Course:</strong> BSIT - 3rd Year - NORTH</p>
            <p><strong>Roles:</strong> Lead Developer | System Architect | UI/UX Designer</p>
          </div>

          <div className="project-purpose-box">
            <p className="purpose-label">MISSION & PURPOSE</p>
            <p className="purpose-text">
              RoadReady is a technical research project and interactive curriculum simulation designed to evaluate motorist road ethics, legal compliance, and spatial hazard perception.
            </p>
          </div>

          <div className="improvement-notice">
            <p className="notice-icon">🛠️</p>
            <div className="notice-content">
              <p className="notice-title">OPEN FOR OPTIMIZATION</p>
              <p className="notice-text">
                This application is currently in its <strong>Evaluation Phase</strong>. We are actively seeking feedback to improve spatial reasoning algorithms and hazard perception modules.
              </p>
            </div>
          </div>

          <div className="dev-footer-links">
            <a 
              href="https://rashauunnn.github.io/SHAQUIEL_DANIEL_UMANDAP-3NORTH-/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="portfolio-link-btn"
            >
              VIEW DEVELOPER PORTFOLIO ↗
            </a>
          </div>

          <div className="disclaimer-box-pro">
            FOR ACADEMIC & RESEARCH PURPOSES ONLY.
          </div>
        </div>
      </div>
    </div>
  );
}