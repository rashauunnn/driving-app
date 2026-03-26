import React from 'react';

export default function Profile({ user, onBack, completedModules }) {
  if (!user) return null;

  return (
    <div className="settings-container"> {/* Reusing your layout classes */}
      <header className="settings-header">
        <button className="back-btn-circle" onClick={onBack}>❮</button>
        <h1 className="settings-title-pro">DRIVER PROFILE</h1>
      </header>

      <div className="settings-content">
        <div className="profile-card-pro">
          <div className="profile-avatar-wrapper">
            <img 
              src={user.photoURL || 'https://via.placeholder.com/150'} 
              alt="Profile" 
              className="profile-img-large"
            />
            <div className="status-badge">PRO</div>
          </div>
          
          <h2 className="profile-name-big">{user.displayName}</h2>
          <p className="profile-email-sub">{user.email}</p>
          
          <div className="profile-stats-row">
            <div className="stat-item">
              <span className="stat-value">{completedModules.length}</span>
              <span className="stat-label">Units Passed</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">Active</span>
              <span className="stat-label">Status</span>
            </div>
          </div>
        </div>

        <section className="settings-section">
          <p className="section-label-blue">ACCOUNT DETAILS</p>
          <div className="logic-card">
            <span style={{color: '#888'}}>Member Since</span>
            <span>{new Date(user.metadata.creationTime).toLocaleDateString()}</span>
          </div>
          <div className="logic-card">
            <span style={{color: '#888'}}>System UID</span>
            <span style={{fontSize: '10px', fontFamily: 'monospace'}}>{user.uid.substring(0, 12)}...</span>
          </div>
        </section>

        <div className="disclaimer-box-pro" style={{marginTop: '20px', textAlign: 'center'}}>
          ROADREADY VERIFIED STUDENT
        </div>
      </div>
    </div>
  );
}