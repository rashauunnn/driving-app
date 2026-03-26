import React from 'react';

export default function ModuleDetail({ 
  module, 
  completedLessons, 
  completedModules, 
  onBack, 
  onSelectLesson, 
  onStartQuiz 
}) {
  if (!module) return null;

  // --- LOGIC FIX ---
  // We filter the global completedLessons list to find only those that belong to the current module.
  const currentModuleLessonTitles = module.lessons?.map(l => l.title) || [];
  const completedInThisModule = completedLessons.filter(title => 
    currentModuleLessonTitles.includes(title)
  );
  
  // The quiz is only "Ready" if the count of completed lessons matches the total in this module.
  const isQuizUnlocked = completedInThisModule.length >= (module.lessons?.length || 0);
  // -----------------

  const isModulePassed = completedModules.includes(Number(module.id));

  return (
    <div className="training-area">
      <div className="back-nav-container">
        <button className="back-link-btn" onClick={onBack}>❮ BACK TO TRAINING AREA</button>
      </div>

      <header className="module-detail-header">
        <span className="unit-label-blue">UNIT DOCUMENTATION</span>
        <h1 className="hero-title-large">
          {module.title.includes(':') ? module.title.split(': ')[1].toUpperCase() : module.title.toUpperCase()}
        </h1>
        <p className="hero-description-left">Detailed technical breakdown of road protocols.</p>
      </header>

      <section className="lessons-section">
        <div className="section-divider">
          <span className="divider-text">TECHNICAL LESSONS</span>
        </div>
        
        <div className="lessons-list">
          {module.lessons && module.lessons.map((lesson, index) => {
            const isDone = completedLessons.includes(lesson.title);
            const isPreviousDone = index === 0 || completedLessons.includes(module.lessons[index - 1].title);
            const isLocked = !isPreviousDone;

            return (
              <button 
                key={lesson.id || index} 
                className={`lesson-item-row ${isDone ? 'is-complete' : ''} ${isLocked ? 'is-locked' : ''}`}
                onClick={() => !isLocked && onSelectLesson(lesson.title)}
                disabled={isLocked}
              >
                <div className="lesson-number-box">
                  {isLocked ? "🔒" : index + 1}
                </div>
                <span className="lesson-name">{lesson.title}</span>
                <div className="status-indicator">
                  {isDone ? <span className="check-mark">✔ DONE</span> : isLocked ? <span className="lock-label">RESTRICTED</span> : <span className="arrow-slim">→</span>}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="assessment-section">
        <div className="section-divider">
          <span className="divider-text">QUALIFICATION PHASE</span>
        </div>
        
        <div className="assessment-grid">
          <div className={`assessment-card-tactical ${isModulePassed ? 'is-passed' : isQuizUnlocked ? 'is-ready' : 'is-locked'}`}>
            <div className="card-scanner-line"></div> 
            <div className="card-header-tactical">
              <span className="phase-tag">{isModulePassed ? "PHASE COMPLETED" : "PHASE 02: EVALUATION"}</span>
              <h3>MID-UNIT TECHNICAL QUIZ</h3>
            </div>

            <div className="quiz-meta-stats">
              <div className="meta-item">
                <span className="meta-label">QUESTIONS</span>
                <span className="meta-value">{module.midQuiz?.length || 0}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">PASS RATE</span>
                <span className="meta-value">70%</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">STATUS</span>
                <span className="meta-value">{isModulePassed ? "QUALIFIED" : "PENDING"}</span>
              </div>
            </div>

            <button 
              className="tactical-start-btn" 
              disabled={!isQuizUnlocked}
              onClick={() => onStartQuiz()}
            >
              {isModulePassed ? "✅ UNIT QUALIFIED" : isQuizUnlocked ? "⚡ INITIALIZE ASSESSMENT" : "🔒 ACCESS RESTRICTED"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}