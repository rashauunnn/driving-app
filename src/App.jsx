import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import ModuleDetail from './components/ModuleDetail';
import LessonDetail from './components/LessonDetail';
import QuizView from './components/QuizView'; 
import FinalExam from './components/FinalExam'; 
import CertificateView from './CertificateView'; 
import { roadmap as initialData } from './data'; 
import { finalExamData } from './examData'; 
import Profile from './components/Profile';

// AUTH & DB IMPORTS
import { auth, onAuthStateChanged, getUserProgress, saveUserProgress, logout } from './firebase';

import './App.css';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [view, setView] = useState('dashboard'); 
  const [activeModule, setActiveModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [theme, setTheme] = useState('SYSTEM'); 
  const [config, setConfig] = useState({ confirmExam: true, showProgress: true });
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [godMode, setGodMode] = useState(false);

  const [completedLessons, setCompletedLessons] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);

  // --- AUTH & CLOUD DATA ENGINE ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          setHasStarted(true);

          const cloudData = await getUserProgress(currentUser.uid);
          
          if (cloudData) {
            if (cloudData.completedLessons) setCompletedLessons(cloudData.completedLessons);
            if (cloudData.completedModules) setCompletedModules(cloudData.completedModules);
          } else {
            const savedLessons = localStorage.getItem('completed_lessons');
            const savedModules = localStorage.getItem('completed_modules');
            if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));
            if (savedModules) setCompletedModules(JSON.parse(savedModules).map(Number));
          }
        } else {
          setUser(null);
          setCompletedLessons([]);
          setCompletedModules([]);
          setHasStarted(false); 
        }
      } catch (err) {
        console.error("Initialization Error:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Roadmap calculation logic
// 1. Update the initial roadmap calculation logic
  const [roadmap, setRoadmap] = useState(() => {
    return initialData.map((module, index) => {
      // If godMode is on, it's always unlocked. 
      // Otherwise, check if it's the first module or if the previous one is done.
      const isUnlocked = godMode || index === 0 || completedModules.includes(Number(initialData[index - 1]?.id));
      return { ...module, isLocked: !isUnlocked };
    });
  });

  // 2. Update the useEffect to listen to [completedModules, godMode]
  useEffect(() => {
    setRoadmap(initialData.map((module, index) => {
      const isUnlocked = godMode || index === 0 || completedModules.includes(Number(initialData[index - 1]?.id));
      return { ...module, isLocked: !isUnlocked };
    }));
  }, [completedModules, godMode]); // <--- Crucial: add godMode to the dependency array

  // Theme Engine
  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = () => {
      let activeTheme = theme;
      if (theme === 'SYSTEM') {
        activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'DARK' : 'LIGHT';
      }
      root.setAttribute('data-theme', activeTheme);
    };
    applyTheme();
  }, [theme]);


  // --- NAVIGATION HANDLERS ---
  
  // This is the missing piece that takes you back to the Welcome Screen
  const handleBackToHome = () => {
    setHasStarted(false);
    setView('dashboard'); // Ensure when they start again, they land on dashboard
  };

  const handleMasterReset = async () => {
    try {
      await logout(); 
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem('completed_lessons');
      localStorage.removeItem('completed_modules');
      setCompletedLessons([]);
      setCompletedModules([]);
      setUser(null);
      setGodMode(false);
      setView('dashboard');
      setHasStarted(false);
    }
  };

  const handleOpenProfile = () => {
    if (user) setView('profile');
    else alert("SYSTEM NOTICE: Please log in to view your Operator Profile.");
  };

  const handleOpenModule = (module) => {
    const target = roadmap.find(m => m.id === module.id) || module;
    
    // ALLOW if godMode is active OR if the module isn't locked
    if (!godMode && target.isLocked && module.id !== 99) return;
    
    if (module.id === 99) {
      // Ensure the exam is accessible even if lessons aren't done
      setActiveModule({ ...target, questions: finalExamData });
      setView('final_exam');
    } else {
      setActiveModule(target);
      setView('module_detail');
    }
  };

  const handleOpenLesson = (lessonTitle) => {
    setActiveLesson(lessonTitle);
    setView('lesson_detail');
  };

  const markLessonComplete = async (lessonTitle) => {
    const newLessons = completedLessons.includes(lessonTitle) 
      ? completedLessons 
      : [...completedLessons, lessonTitle];
    
    setCompletedLessons(newLessons);
    localStorage.setItem('completed_lessons', JSON.stringify(newLessons));

    if (user) {
      await saveUserProgress(user.uid, { completedLessons: newLessons });
    }
    setView('module_detail');
  };

  const handleQuizFinish = async (passed) => {
    if (passed && activeModule) {
      const moduleId = Number(activeModule.id);
      const newModules = completedModules.includes(moduleId) 
        ? completedModules 
        : [...completedModules, moduleId];

      setCompletedModules(newModules);
      localStorage.setItem('completed_modules', JSON.stringify(newModules));

      if (user) {
        await saveUserProgress(user.uid, { completedModules: newModules });
      }
      setView('dashboard');
    } else {
      setView('module_detail');
    }
  };

  if (loading) return <div className="loading-spinner">Initializing RoadReady...</div>;

  if (!hasStarted) return <WelcomeScreen onStart={() => setHasStarted(true)} />;

  return (
    <div className="app-container">
      {view === 'dashboard' && (
        <Dashboard 
          roadmap={roadmap} 
          completedLessons={completedLessons}
          showProgress={config.showProgress}
          user={user}
          godMode={godMode} 
          onOpenSettings={() => setView('settings')} 
          onOpenProfile={handleOpenProfile}
          onBackToHome={handleBackToHome} // 
          onLogout={handleMasterReset} 
          onSelectUnit={handleOpenModule}
          onViewCertificate={() => setView('certificate')} 
        />
      )}

      {view === 'module_detail' && activeModule && (
        <ModuleDetail 
          module={activeModule} 
          completedLessons={completedLessons}
          completedModules={completedModules}
          onBack={() => setView('dashboard')} 
          onSelectLesson={handleOpenLesson}
          onStartQuiz={() => setView('quiz_view')}
        />
      )}

      {view === 'lesson_detail' && (
        <LessonDetail 
          title={activeLesson} 
          onBack={() => setView('module_detail')} 
          onComplete={() => markLessonComplete(activeLesson)}
        />
      )}

      {view === 'quiz_view' && activeModule && (
        <QuizView 
          questions={activeModule.midQuiz || []}
          onBack={() => setView('module_detail')}
          onComplete={handleQuizFinish}
        />
      )}

      {view === 'final_exam' && activeModule && (
        <FinalExam 
          questions={activeModule.questions || []}
          onExit={() => setView('dashboard')}
          onComplete={(passed) => {
            if(passed) setView('certificate');
            else setView('dashboard');
          }}
        />
      )}

      {view === 'certificate' && (
        <CertificateView 
          userData={{ 
            name: user ? user.displayName.toUpperCase() : "CHIEF OPERATOR", 
            score: 98 
          }} 
          onExit={() => setView('dashboard')} 
        />
      )}

      {view === 'profile' && user && (
        <Profile 
          user={user} 
          completedModules={completedModules} 
          onBack={() => setView('dashboard')} 
        />
      )}

      {view === 'settings' && (
          <Settings 
            theme={theme} 
            setTheme={setTheme} 
            config={config} 
            setConfig={setConfig} 
            user={user} 
            setUser={setUser} 
            godMode={godMode}        // Add this
            setGodMode={setGodMode}  // Add this
            onBack={() => setView('dashboard')} 
          />
        )}
    </div>
  );
}

export default App;