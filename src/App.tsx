import React, { useState, useEffect } from 'react';
import { Navbar, ScreenType } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { MenuScreen } from './components/MenuScreen';
import { DetailScreen } from './components/DetailScreen';
import { QuizScreen } from './components/QuizScreen';
import { MapScreen } from './components/MapScreen';
import { PassportScreen } from './components/PassportScreen';
import { DATA_SUKU } from './data/budayaData';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedSukuKey, setSelectedSukuKey] = useState<string>('Betawi');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Visited and stamped suku persistent list
  const [visitedSuku, setVisitedSuku] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nusantara_stamps');
      return saved ? JSON.parse(saved) : ['Betawi'];
    } catch {
      return ['Betawi'];
    }
  });

  // Best quiz score persistent record
  const [bestQuizScore, setBestQuizScore] = useState<{ score: number; total: number } | null>(() => {
    try {
      const saved = localStorage.getItem('nusantara_quiz_score');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persist stamps
  useEffect(() => {
    try {
      localStorage.setItem('nusantara_stamps', JSON.stringify(visitedSuku));
    } catch {
      // ignore
    }
  }, [visitedSuku]);

  // Persist quiz score
  useEffect(() => {
    try {
      if (bestQuizScore) {
        localStorage.setItem('nusantara_quiz_score', JSON.stringify(bestQuizScore));
      }
    } catch {
      // ignore
    }
  }, [bestQuizScore]);

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sounds.setSoundEnabled(nextVal);
    if (nextVal) {
      sounds.playClick();
    }
  };

  const handleSelectSuku = (sukuKey: string) => {
    setSelectedSukuKey(sukuKey);
    setCurrentScreen('detail');
    // Automatically add to visited if not yet
    if (!visitedSuku.includes(sukuKey)) {
      setVisitedSuku((prev) => [...prev, sukuKey]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleStamp = (sukuKey: string) => {
    setVisitedSuku((prev) => {
      if (prev.includes(sukuKey)) {
        return prev;
      } else {
        return [...prev, sukuKey];
      }
    });
  };

  const handleRecordQuizScore = (score: number, total: number) => {
    setBestQuizScore((prev) => {
      if (!prev || score / total > prev.score / prev.total) {
        return { score, total };
      }
      return prev;
    });
  };

  const totalSuku = Object.keys(DATA_SUKU).length;

  return (
    <div className="min-h-screen flex flex-col bg-batik-pattern text-slate-800">
      {/* Top Fixed Header with Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        stampsCount={visitedSuku.length}
        totalSuku={totalSuku}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentScreen === 'home' && (
          <HomeScreen
            onStartAdventure={() => {
              setCurrentScreen('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuiz={() => {
              setCurrentScreen('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenMap={() => {
              setCurrentScreen('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSuku={handleSelectSuku}
          />
        )}

        {currentScreen === 'menu' && (
          <MenuScreen
            onSelectSuku={handleSelectSuku}
            onOpenQuiz={() => {
              setCurrentScreen('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackHome={() => {
              setCurrentScreen('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            visitedSuku={visitedSuku}
          />
        )}

        {currentScreen === 'detail' && (
          <DetailScreen
            sukuKey={selectedSukuKey}
            onBackMenu={() => {
              setCurrentScreen('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenQuiz={() => {
              setCurrentScreen('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSuku={handleSelectSuku}
            isStamped={visitedSuku.includes(selectedSukuKey)}
            onToggleStamp={handleToggleStamp}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            onBackMenu={() => {
              setCurrentScreen('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPassport={() => {
              setCurrentScreen('passport');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRecordQuizScore={handleRecordQuizScore}
          />
        )}

        {currentScreen === 'map' && (
          <MapScreen
            onSelectSuku={handleSelectSuku}
            onOpenQuiz={() => {
              setCurrentScreen('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'passport' && (
          <PassportScreen
            visitedSuku={visitedSuku}
            bestQuizScore={bestQuizScore}
            onSelectSuku={handleSelectSuku}
            onOpenQuiz={() => {
              setCurrentScreen('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer with Cultural Badge */}
      <footer className="mt-auto bg-white/90 border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 font-bold text-slate-700 text-sm">
            <span>🇮🇩 Jelajah Budaya Nusantara</span>
            <span>•</span>
            <span className="text-amber-600">Bhinneka Tunggal Ika</span>
          </div>
          <p className="max-w-md mx-auto text-slate-500">
            Aplikasi edukatif mengenal keanekaragaman budaya suku bangsa Indonesia untuk anak-anak sekolah dasar, dilengkapi kuis interaktif menjodohkan dan eksplorasi kepulauan.
          </p>
        </div>
      </footer>
    </div>
  );
}
