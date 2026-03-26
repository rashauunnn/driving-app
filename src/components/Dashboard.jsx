import React from 'react';

export default function Dashboard({
  roadmap,
  onOpenSettings,
  onOpenProfile,
  onSelectUnit,
  showProgress,
  completedLessons,
  onBackToHome,
  onViewCertificate,
  user,
  godMode // Received from App.jsx
}) {
  // --- PROGRESS CALCULATIONS ---
  const allLessons = roadmap ? roadmap.filter(m => m.id !== 99).flatMap(m => m.lessons || []) : [];
  const totalLessonCount = allLessons.length;
  const completedCount = completedLessons ? completedLessons.length : 0;
  const progressPercent = totalLessonCount > 0 ? Math.round((completedCount / totalLessonCount) * 100) : 0;

  const finalExamUnit = roadmap?.find(m => m.id === 99) || { id: 99, title: "FINAL EXAM" };
  
  // MASTER UNLOCK LOGIC: Unlocks if criteria met OR godMode is active
  const isFinalUnlocked = godMode || (roadmap && roadmap
    .filter(m => m.id !== 99)
    .every(unit => {
      const moduleLessonTitles = unit.lessons?.map(l => l.title) || [];
      return moduleLessonTitles.length > 0 && 
             moduleLessonTitles.every(title => completedLessons.includes(title));
    }));

  return (
    <div className="training-area">
      {/* TOP NAVIGATION */}
      <div className="dashboard-top-nav">
        <button 
          className="back-link-btn" 
          onClick={onBackToHome}
        >
          ❮ BACK TO HOMESCREEN
        </button>

        {/* PROFILE & SETTINGS GROUP */}
        <div className="nav-controls">
          <button className="settings-icon-btn" onClick={onOpenSettings}>⚙️</button>
          
          <div className="profile-trigger" onClick={onOpenProfile}>
            {user ? (
              <div className="avatar-wrapper">
                <img src={user.photoURL} alt="User" className="nav-avatar" />
                <span className="badge-pro">PRO</span>
              </div>
            ) : (
              <div className="avatar-placeholder">👤</div>
            )}
          </div>
        </div>
      </div>

      {/* HEADER ROW */}
      <div className="header-row">
        <div className="title-group">
          <h1 className="title-main">TRAINING AREA</h1>
          <p className="subtitle-main">Maintain discipline. Follow the sequence.</p>
        </div>
        {/* Optional: Show God Mode indicator for the instructor */}
        {godMode && <span className="debug-badge">OVERRIDE ACTIVE</span>}
      </div>

      {/* PROGRESS BANNER */}
      {showProgress && (
        <div className="progress-banner">
          <div className="progress-labels">
            <span className="label-text">TOTAL PROGRESS</span>
            <span className="percent-text">{godMode ? '100' : progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${godMode ? 100 : progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* UNIT GRID */}
      <div className="unit-grid">
        {roadmap && roadmap.filter(unit => unit.id !== 99).map((unit, idx) => {
          const moduleLessonTitles = unit.lessons?.map(l => l.title) || [];
          const isModuleDone = moduleLessonTitles.length > 0 && 
                               moduleLessonTitles.every(title => completedLessons.includes(title));
          const cleanTitle = unit.title.includes(':') ? unit.title.split(': ')[1] : unit.title;
          
          // isLocked is pre-calculated in App.jsx based on godMode
          const isLocked = unit.isLocked;

          return (
            <div
              key={unit.id}
              className={`unit-card ${isLocked ? 'locked' : ''} ${isModuleDone || godMode ? 'completed-card' : ''}`}
              onClick={() => !isLocked && onSelectUnit(unit)}
            >
              <div className="unit-number">UNIT 0{idx + 1}</div>
              <h2 className="unit-title">{cleanTitle.toUpperCase()}</h2>
              <div className="unit-footer">
                <span className="status-pill">
                  {isLocked ? 'RESTRICTED' : (isModuleDone || godMode) ? 'QUALIFIED' : 'READY'}
                </span>
                {!isLocked && <span className="arrow">→</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* FINAL EVALUATION SECTOR */}
      <div 
        className="final-cert-section"
        style={{ 
          cursor: isFinalUnlocked ? 'pointer' : 'not-allowed', 
          opacity: isFinalUnlocked ? 1 : 0.6,
          border: godMode ? '1px solid var(--accent-blue)' : 'none'
        }}
        onClick={() => isFinalUnlocked && onSelectUnit({ ...finalExamUnit, isLocked: false })}
      >
        <div className="cert-badge">{isFinalUnlocked ? '⚡' : '🏅'}</div>
        <div className="cert-info">
          <h2 className="cert-title">
            {isFinalUnlocked ? 'INITIALIZE FINAL EVALUATION' : 'FINAL EVALUATION SECTOR'}
          </h2>
          <p className="cert-note">
            {isFinalUnlocked 
              ? "All sectors cleared. Authorized for final evaluation." 
              : "Complete all training units to unlock the final evaluation sector."}
          </p>
        </div>
        {/* Shortcut to certificate for the instructor if in God Mode */}
        {godMode && (
          <button 
            className="debug-cert-btn" 
            onClick={(e) => {
              e.stopPropagation();
              onViewCertificate();
            }}
          >
            PREVIEW CERT
          </button>
        )}
      </div>
    </div>
  );
}