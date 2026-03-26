import React, { useState, useEffect } from 'react';
import { roadmap } from '../data';

export default function LessonDetail({ title, onBack, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongSelection, setWrongSelection] = useState(null); // Tracks the last wrong click

  const currentLesson = roadmap
    .flatMap(module => module.lessons)
    .find(lesson => lesson.title === title) || roadmap[0].lessons[0];

  // Validate if all 3 questions match the data.js answers
  useEffect(() => {
    if (currentLesson.miniQuiz) {
      const correctCount = currentLesson.miniQuiz.filter(
        (q, idx) => answers[idx] === q.a
      ).length;
      setIsCorrect(correctCount === currentLesson.miniQuiz.length);
    }
  }, [answers, currentLesson.miniQuiz]);

  const handleSelectOption = (qIndex, selectedOption, correctAnswer) => {
    if (selectedOption === correctAnswer) {
      setAnswers(prev => ({ ...prev, [qIndex]: selectedOption }));
      setWrongSelection(null);
    } else {
      // Trigger the shake/red animation
      setWrongSelection({ qIndex, option: selectedOption });
      
      // Remove the red flash after 400ms (matching the CSS animation)
      setTimeout(() => setWrongSelection(null), 400);
    }
  };

  return (
    <div className="training-area">
      <div className="back-nav-container">
        <button className="back-link-btn" onClick={onBack}>❮ BACK TO UNIT</button>
      </div>

      <div className="documentation-card">
        <header className="doc-header">
          <span className="doc-label">OFFICIAL TECHNICAL DOCUMENTATION</span>
          <h1 className="doc-title">{title?.toUpperCase()}</h1>
        </header>

        <div className="doc-body">
          <div className="image-placeholder-frame">
            <img src={currentLesson.image} alt={title} className="lesson-main-img" />
          </div>

          <div className="text-content">
            {currentLesson.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="verification-gate">
            <h3 className="gate-title">KNOWLEDGE VERIFICATION</h3>
            <p className="gate-instruction">Select the correct protocol for each point.</p>
            
            <div className="mini-quiz-list">
              {currentLesson.miniQuiz?.map((q, qIdx) => (
                <div key={qIdx} className="mini-q-item">
                  <p className="q-text">{qIdx + 1}. {q.q}</p>
                  <div className="mini-options-grid">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[qIdx] === opt;
                      const isWrong = wrongSelection?.qIndex === qIdx && wrongSelection?.option === opt;

                      return (
                        <button
                          key={opt}
                          className={`mini-opt-btn ${isSelected ? 'selected' : ''} ${isWrong ? 'wrong' : ''}`}
                          onClick={() => handleSelectOption(qIdx, opt, q.a)}
                          disabled={isSelected} // Lock the button once correctly chosen
                        >
                          <span className="opt-letter">
                            {String.fromCharCode(65 + optIdx)}.
                          </span> {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="doc-footer">
             <button 
                className={`confirm-btn ${isCorrect ? 'active' : 'locked'}`} 
                onClick={onComplete}
                disabled={!isCorrect}
             >
               {isCorrect ? "CONFIRM COMPLETION & PROCEED" : "🔒 ANSWER ALL QUESTIONS CORRECTLY"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}