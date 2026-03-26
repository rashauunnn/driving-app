import React, { useState } from 'react';

export default function LessonView({ module, onFinishLessons, onBack }) {
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);
  const [viewedLessons, setViewedLessons] = useState(new Set([0]));

  const nextLesson = () => {
    const nextIdx = currentLessonIdx + 1;
    setCurrentLessonIdx(nextIdx);
    setViewedLessons(prev => new Set(prev).add(nextIdx));
  };

  const allViewed = viewedLessons.size >= module.lessons.length;

  return (
    <div className="card">
      <button className="btn-secondary" onClick={onBack}>⬅ Exit Module</button>
      <h2>{module.lessons[currentLessonIdx].title}</h2>
      <p className="lesson-text">{module.lessons[currentLessonIdx].content}</p>
      
      <div className="navigation-btns">
        {currentLessonIdx > 0 && (
          <button onClick={() => setCurrentLessonIdx(prev => prev - 1)}>Previous</button>
        )}
        
        {currentLessonIdx < module.lessons.length - 1 ? (
          <button className="btn" onClick={nextLesson}>Next Lesson</button>
        ) : (
          <button 
            className="btn" 
            disabled={!allViewed} 
            onClick={onFinishLessons}
            style={{ background: allViewed ? 'var(--success)' : '#ccc' }}
          >
            {allViewed ? "Unlock Mid-Module Quiz" : "Read all lessons first"}
          </button>
        )}
      </div>
    </div>
  );
}