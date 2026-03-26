import React, { useState, useEffect } from 'react';



export default function FinalExam({ questions, onExit, onComplete }) {

  const [examStatus, setExamStatus] = useState('briefing');

  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(30 * 60);

  const [localTimer, setLocalTimer] = useState(null);

  const [lockoutTime, setLockoutTime] = useState(0);

  const [wasCriticalFail, setWasCriticalFail] = useState(false);



  const currentQuestion = shuffledQuestions[currentIndex];



  const startExam = () => {

    const shuffled = [...questions].sort(() => Math.random() - 0.5);

    setShuffledQuestions(shuffled);

    setExamStatus('active');

  };



  useEffect(() => {

    const savedLock = localStorage.getItem('exam_lockout_until');

    if (savedLock && Date.now() < parseInt(savedLock)) setLockoutTime(parseInt(savedLock));

  }, []);



  useEffect(() => {

    let timer;

    if (examStatus === 'active') {

      timer = setInterval(() => {

        setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));

        if (currentQuestion?.type === 'hazard') {

          setLocalTimer((prev) => {

            if (prev === null) return 5;

            if (prev <= 1) { handleNext(null); return null; }

            return prev - 1;

          });

        } else { setLocalTimer(null); }

      }, 1000);

    }

    return () => clearInterval(timer);

  }, [examStatus, currentIndex, currentQuestion]);



  const handleNext = (selectedOpt) => {

    if (!currentQuestion) return;

    const isCorrect = selectedOpt === currentQuestion.a;

   

    if (selectedOpt !== null && !isCorrect && currentQuestion.critical) {

      setWasCriticalFail(true);

      const lockUntil = Date.now() + 60 * 1000;

      localStorage.setItem('exam_lockout_until', lockUntil.toString());

      setLockoutTime(lockUntil);

      setExamStatus('results');

      return;

    }



    setAnswers({...answers, [currentIndex]: selectedOpt});



    if (currentIndex < shuffledQuestions.length - 1) {

      setCurrentIndex(prev => prev + 1);

      setLocalTimer(null);

    } else {

      setExamStatus('results');

    }

  };



  const formatTime = (seconds) => {

    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, '0')}`;

  };



  if (examStatus === 'briefing') {

    const isLocked = Date.now() < lockoutTime;

    return (

      <div className="stealth-container briefing-view">

        <style>{`

          @keyframes subtle-pulse {

            0% { border-color: #444; color: #888; }

            50% { border-color: #888; color: #bbb; box-shadow: 0 0 10px rgba(255,255,255,0.05); }

            100% { border-color: #444; color: #888; }

          }

          .abort-btn-pulse { animation: subtle-pulse 3s infinite ease-in-out; }

        `}</style>



        <div className="briefing-box">

          <h1 className="stealth-title">FINAL ASSESSMENT</h1>

          <div className="rules-grid">

            <div className="rule-item"><span>ITEMS</span><strong>{questions.length}</strong></div>

            <div className="rule-item"><span>PASS</span><strong>85%</strong></div>

            <div className="rule-item"><span>CRITICALS</span><strong>0 TOLERANCE</strong></div>

          </div>



          <div className="briefing-actions" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>

            {isLocked ? (

              <button className="stealth-btn locked-btn" disabled>LOCKED: {Math.ceil((lockoutTime - Date.now()) / 1000)}s</button>

            ) : (

              <button className="stealth-btn" onClick={startExam} style={{ width: '100%', padding: '15px' }}>INITIALIZE EVALUATION</button>

            )}



            <button className="abort-btn abort-btn-pulse" onClick={onExit} style={{ background: 'transparent', border: '1px solid #444', padding: '12px', fontSize: '12px', borderRadius: '4px' }}>

              RE-EVALUATE PREPARATION

            </button>

          </div>

        </div>

      </div>

    );

  }



  if (examStatus === 'results') {

    let score = 0;

    shuffledQuestions.forEach((q, i) => { if (answers[i] === q.a) score++; });

    const percent = Math.round((score / shuffledQuestions.length) * 100);

    const passed = percent >= 85 && !wasCriticalFail;

    return (

      <div className="stealth-container results-view">

        <div className="results-box">

          <h1 className={passed ? "res-pass" : "res-fail"}>{passed ? "QUALIFIED" : "QUALIFICATION DENIED"}</h1>

          <div className="big-score">{percent}%</div>

          {wasCriticalFail && <p className="critical-alert">🛑 CRITICAL SAFETY VIOLATION DETECTED.</p>}

          <button className="stealth-btn" onClick={() => onComplete(passed)}>RETURN TO COMMAND</button>

        </div>

      </div>

    );

  }



  return (

    <div className={`stealth-container active-exam ${currentQuestion?.critical ? 'critical-pulse' : ''}`}>

      <div className="exam-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px' }}>

        <button onClick={() => { if(window.confirm("Abort?")) onExit(); }} style={{ background: 'transparent', border: '1px solid #333', color: '#555', padding: '4px 8px', fontSize: '10px' }}>❮ ABORT</button>

        <div className="timers-group" style={{ textAlign: 'center' }}>

            <span className="timer" style={{ fontSize: '12px' }}>{formatTime(timeLeft)}</span>

            {localTimer !== null && <span className="local-timer" style={{ color: '#ff4444', marginLeft: '10px' }}>{localTimer}s</span>}

        </div>

        <span style={{ fontSize: '10px', color: '#555' }}>Q{currentIndex + 1}/{shuffledQuestions.length}</span>

      </div>

     

      <div className="question-zone" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)', padding: '20px' }}>

        {currentQuestion?.image && <div className="scenario-image-container"><img src={currentQuestion.image} className="scenario-img" alt="Scenario" /></div>}

        <h2 className="stealth-q" style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{currentQuestion?.q || "Loading..."}</h2>

       

        <div className="options-stack" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {currentQuestion?.options ? (

            currentQuestion.options.map((opt) => (

              <button

                key={opt}

                className="option-btn"

                onClick={() => handleNext(opt)}

                style={{ height: 'auto', minHeight: '50px', whiteSpace: 'normal', textAlign: 'left', padding: '10px 15px' }}

              >

                {opt}

              </button>

            ))

          ) : (

            <button className="option-btn" onClick={() => handleNext(null)} style={{ color: 'red' }}>PROCEED (DATA ERROR)</button>

          )}

        </div>

      </div>

    </div>

  );

}