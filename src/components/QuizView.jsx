import React, { useState } from 'react';

export default function QuizView({ questions = [], onComplete, onBack }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Safety check for empty questions
  if (!questions || questions.length === 0) {
    return (
      <div className="training-area">
        <div className="qualification-briefing">
          <h2 className="assessment-title">NO DATA FOUND</h2>
          <p className="doc-text">This module's assessment is currently offline.</p>
          <button className="confirm-btn" onClick={onBack}>RETURN</button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === currentQuestion.a) {
      setScore(prev => prev + 1);
    }
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setQuizStarted(false);
  };

  if (!quizStarted) {
    return (
      <div className="training-area">
        <div className="back-nav-container">
          <button className="back-link-btn" onClick={onBack}>❮ RETURN TO MODULE</button>
        </div>
        <div className="qualification-briefing">
          <div className="scanner-line"></div>
          <div className="briefing-content">
            <div className="briefing-header">
              <span className="phase-label">PHASE: FINAL QUALIFICATION</span>
              <h2 className="assessment-title">TECHNICAL ASSESSMENT</h2>
            </div>
            <div className="briefing-stats">
              <div className="stat-box"><span className="stat-label">ITEMS</span><span className="stat-value">{questions.length}</span></div>
              <div className="stat-box"><span className="stat-label">PASS RATE</span><span className="stat-value">70%</span></div>
              <div className="stat-box"><span className="stat-label">STATUS</span><span className="stat-value">PENDING</span></div>
            </div>
            <p className="briefing-warning">⚠ WARNING: This examination is mandatory for unit certification.</p>
            <button className="start-assessment-btn" onClick={() => setQuizStarted(true)}>
              <span className="btn-glitch-effect">INITIALIZE EXAM</span>
              <span className="btn-arrow">❯❯</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const passed = (score / questions.length) >= 0.7;
    return (
      <div className="training-area quiz-results">
        <div className="documentation-card result-card">
          <div className="scanner-line"></div>
          <header className="doc-header">
            <span className="doc-label">EXAMINATION RESULTS</span>
            <h1 className="doc-title">{passed ? "QUALIFIED" : "UNQUALIFIED"}</h1>
          </header>
          <div className="doc-body result-body">
            <div className={`score-circle ${passed ? 'pass' : 'fail'}`}>
              <span className="score-num">{score}</span>
              <span className="score-total">/ {questions.length}</span>
            </div>
            <p className="result-text">{passed ? "Congratulations. Proficiency verified." : "Standard not met. Review documentation."}</p>
            <div className="doc-footer">
              <button className="confirm-btn" onClick={() => passed ? onComplete(true) : handleRestart()}>
                {passed ? "FINALIZE CERTIFICATION" : "RETRY ASSESSMENT"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="training-area">
      <div className="back-nav-container">
        <button className="back-link-btn" onClick={onBack}>❮ ABORT EXAMINATION</button>
      </div>
      <div className="quiz-container-tactical" key={currentQuestionIndex}>
        <div className="scanner-line"></div>
        <div className="quiz-progress-header">
          <span className="progress-label">QUESTION {currentQuestionIndex + 1} OF {questions.length}</span>
          <div className="mini-progress-bar">
            <div className="fill" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        <h2 className="quiz-question-text">{currentQuestion.q}</h2>
        <div className="options-grid">
          {currentQuestion.options.map((option, idx) => (
            <button key={idx} className="option-btn" onClick={() => handleAnswerClick(option)}>
              <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}