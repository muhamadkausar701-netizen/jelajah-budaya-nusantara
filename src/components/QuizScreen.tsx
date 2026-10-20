import React, { useState, useEffect } from 'react';
import { KUIS_DATA, KuisSoal, DATA_SUKU } from '../data/budayaData';
import { sounds } from '../utils/soundEffects';
import { MascotBhinneka } from './MascotBhinneka';
import { 
  Gamepad2, 
  RotateCcw, 
  Home, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ArrowRight, 
  Volume2, 
  Flame, 
  Sparkles,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizScreenProps {
  onBackMenu: () => void;
  onOpenPassport: () => void;
  onRecordQuizScore: (score: number, total: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  onBackMenu,
  onOpenPassport,
  onRecordQuizScore,
}) => {
  const [quizMode, setQuizMode] = useState<'standard' | 'challenge'>('standard');
  const [questions, setQuestions] = useState<KuisSoal[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  
  // Feedback state after clicking an answer
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  
  // Review log
  const [answerHistory, setAnswerHistory] = useState<{
    item: string;
    chosen: string;
    correct: string;
    isRight: boolean;
  }[]>([]);

  // Initialize or restart quiz
  const startQuiz = (mode = quizMode) => {
    // 8 original questions vs 12 full questions
    const pool = mode === 'standard' ? KUIS_DATA.slice(0, 8) : [...KUIS_DATA];
    // Shuffle array
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsFinished(false);
    setAnswerHistory([]);
  };

  useEffect(() => {
    startQuiz(quizMode);
  }, [quizMode]);

  // When question changes, generate 4 randomized choices (1 correct + 3 distractor choices from other items)
  useEffect(() => {
    if (questions.length === 0 || currentIndex >= questions.length) return;

    const currentQuestion = questions[currentIndex];
    const allAnswers = Array.from(new Set(KUIS_DATA.map((q) => q.benar)));
    const otherAnswers = allAnswers.filter((ans) => ans !== currentQuestion.benar);
    
    // Pick 3 distractors
    const shuffledOthers = [...otherAnswers].sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [...shuffledOthers, currentQuestion.benar].sort(() => Math.random() - 0.5);

    setShuffledOptions(options);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  }, [currentIndex, questions]);

  const handleSelectOption = (option: string) => {
    if (isAnswerChecked) return;

    const currentQuestion = questions[currentIndex];
    const correct = option === currentQuestion.benar;
    setSelectedAnswer(option);
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playSuccess();
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);

      if (newStreak >= 3) {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.6 }
        });
      }
    } else {
      sounds.playError();
      setStreak(0);
    }

    setAnswerHistory((prev) => [
      ...prev,
      {
        item: currentQuestion.gambar,
        chosen: option,
        correct: currentQuestion.benar,
        isRight: correct,
      },
    ]);
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Quiz finished
      sounds.playFanfare();
      setIsFinished(true);
      const finalScore = isCorrect ? score : score; // already updated
      onRecordQuizScore(finalScore, questions.length);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Quiz Top Header */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 rounded-3xl p-6 text-white shadow-lg border-b-4 border-amber-400">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-purple-950 flex items-center justify-center text-2xl font-black shadow-md">
              🎮
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-amber-300 uppercase tracking-wider block">
                Permainan Interaktif
              </span>
              <h1 className="text-xl sm:text-2xl font-black">
                Kuis Menjodohkan Budaya
              </h1>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-purple-900/60 p-1.5 rounded-2xl border border-purple-400/40">
            <button
              onClick={() => {
                sounds.playClick();
                setQuizMode('standard');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                quizMode === 'standard'
                  ? 'bg-amber-400 text-purple-950 shadow-xs'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              8 Soal Asli
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setQuizMode('challenge');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                quizMode === 'challenge'
                  ? 'bg-amber-400 text-purple-950 shadow-xs'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              12 Soal Lengkap
            </button>
          </div>
        </div>

        {/* Live Score & Streak Bar */}
        {!isFinished && questions.length > 0 && (
          <div className="mt-5 pt-4 border-t border-purple-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-200">Kemajuan:</span>
              <span className="bg-purple-900 text-amber-300 font-extrabold text-xs px-2.5 py-0.5 rounded-full border border-purple-400/50">
                Soal {currentIndex + 1} dari {questions.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {streak > 1 && (
                <div className="flex items-center gap-1 bg-amber-500/90 text-yellow-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full animate-bounce">
                  <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                  <span>Streak {streak}x!</span>
                </div>
              )}

              <div className="flex items-center gap-1 bg-white/20 text-white font-extrabold text-sm sm:text-base px-3 py-0.5 rounded-full">
                <span>Skor:</span>
                <span className="text-yellow-300">{score}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QUIZ IN PROGRESS */}
      {!isFinished && currentQ && (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-purple-600 h-full transition-all duration-300 rounded-full"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>

          {/* Question Image/Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-lg border-3 border-purple-200 relative overflow-hidden">
            <span className="inline-block bg-purple-100 text-purple-800 text-xs font-extrabold px-3 py-1 rounded-full mb-3">
              {currentQ.kategori} • Suku {currentQ.sukuTerkait}
            </span>

            {/* Big Gambar Card styled as in Tkinter */}
            <div className="my-2 py-4 px-6 bg-gradient-to-b from-blue-50 to-indigo-50/50 rounded-2xl border-2 border-blue-200 inline-block shadow-inner min-w-[260px] sm:min-w-[320px]">
              <div className="text-5xl sm:text-6xl mb-2 filter drop-shadow">
                {currentQ.emoji}
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-blue-900 tracking-tight">
                {currentQ.gambar}
              </h2>
            </div>

            <p className="text-slate-600 font-bold text-sm sm:text-base mt-4 flex items-center justify-center gap-1.5">
              <span>Jodohkan dengan penjelasan yang tepat:</span>
            </p>
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 gap-3">
            {shuffledOptions.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isThisCorrect = option === currentQ.benar;

              let btnStyle =
                'bg-[#FFF3E0] hover:bg-[#FFE0B2] text-[#E65100] border-2 border-amber-300';

              if (isAnswerChecked) {
                if (isThisCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-md font-black';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500 text-white border-2 border-rose-600 shadow-md';
                } else {
                  btnStyle = 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswerChecked}
                  className={`w-full p-4 sm:p-4.5 rounded-2xl text-left font-bold text-sm sm:text-base shadow-sm transition-all duration-150 transform flex items-center justify-between gap-3 cursor-pointer ${btnStyle} ${
                    !isAnswerChecked ? 'hover:scale-101 active:scale-99' : ''
                  }`}
                >
                  <span className="flex-1 leading-snug">{option}</span>

                  {isAnswerChecked && isThisCorrect && (
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-white fill-emerald-600" />
                  )}
                  {isAnswerChecked && isSelected && !isThisCorrect && (
                    <XCircle className="w-6 h-6 flex-shrink-0 text-white fill-rose-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Section after selecting an answer */}
          {isAnswerChecked && (
            <div
              className={`p-5 rounded-3xl border-2 shadow-lg animate-fade-in space-y-3 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-base sm:text-lg">
                  {isCorrect ? (
                    <>
                      <span className="text-2xl">⭐</span>
                      <span className="text-emerald-700">Benar! Hebat! Jawabanmu tepat sekali!</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">😊</span>
                      <span className="text-rose-700">Kurang Tepat!</span>
                    </>
                  )}
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>{currentIndex + 1 < questions.length ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {!isCorrect && (
                <div className="bg-white/80 p-3 rounded-xl border border-rose-200 text-xs sm:text-sm">
                  <span className="font-bold text-rose-900 block mb-0.5">Penjelasan yang benar:</span>
                  <p className="font-extrabold text-slate-800">{currentQ.benar}</p>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-white/70 p-3 rounded-xl">
                💡 <strong>Pengetahuan Budaya:</strong> {currentQ.penjelasan}
              </p>
            </div>
          )}
        </div>
      )}

      {/* QUIZ FINISHED RESULTS SCREEN */}
      {isFinished && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-3 border-purple-200 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-4xl mx-auto shadow-md animate-bounce">
            🎉
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-purple-900">
              Hasil Kuis Menjodohkan
            </h2>
            <p className="text-slate-500 font-semibold text-sm">
              Hebat! Kamu telah menyelesaikan seluruh soal budaya!
            </p>
          </div>

          {/* Big Score Box */}
          <div className="bg-gradient-to-tr from-purple-50 to-amber-50 p-6 rounded-3xl border-2 border-purple-200 max-w-sm mx-auto shadow-inner">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-widest block mb-1">
              Skor Kamu:
            </span>
            <div className="text-5xl font-black text-purple-900 tracking-tight">
              {score} <span className="text-2xl font-bold text-slate-400">/ {questions.length}</span>
            </div>
            <div className="mt-2 text-sm font-extrabold text-amber-600">
              Nilai: {Math.round((score / questions.length) * 100)}%
            </div>
          </div>

          {/* Encouraging Feedback matching Tkinter logic */}
          <div className="max-w-md mx-auto">
            {score / questions.length >= 0.8 ? (
              <div className="bg-emerald-50 text-emerald-900 p-4 rounded-2xl border-2 border-emerald-300 font-bold text-sm sm:text-base">
                🌟 Luar biasa! Kamu sudah sangat mengenal budaya Indonesia! Kamu adalah Juara Budaya Nusantara!
              </div>
            ) : score / questions.length >= 0.5 ? (
              <div className="bg-blue-50 text-blue-900 p-4 rounded-2xl border-2 border-blue-300 font-bold text-sm sm:text-base">
                👍 Bagus! Terus belajar ya, kemampuanmu mengingat budaya Nusantara sudah hebat!
              </div>
            ) : (
              <div className="bg-amber-50 text-amber-900 p-4 rounded-2xl border-2 border-amber-300 font-bold text-sm sm:text-base">
                💪 Jangan menyerah! Coba lagi dan pelajari detail sukunya di menu Jelajah Budaya ya!
              </div>
            )}
          </div>

          {/* Mascot encouraging note */}
          <MascotBhinneka
            mood={score / questions.length >= 0.8 ? 'celebrating' : 'happy'}
            message={`Selamat atas usahamu! Belajar budaya Nusantara itu seru dan membuat kita semakin bangga menjadi anak Indonesia!`}
          />

          {/* Review of answers list */}
          <div className="text-left bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3">
            <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>Rekapitulasi Jawabanmu:</span>
            </h4>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {answerHistory.map((h, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 border ${
                    h.isRight
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-rose-50/70 border-rose-200 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {h.isRight ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    )}
                    <span className="font-bold">{h.item}</span>
                  </div>
                  <span className="text-slate-600 line-clamp-1 italic text-[11px]">
                    {h.correct}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Action Buttons matching Tkinter */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                sounds.playClick();
                startQuiz(quizMode);
              }}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base px-7 py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all border-b-4 border-purple-800"
            >
              <RotateCcw className="w-5 h-5" />
              <span>🔄 Main Lagi</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onBackMenu();
              }}
              className="w-full sm:w-auto bg-slate-600 hover:bg-slate-700 text-white font-bold text-base px-6 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Home className="w-5 h-5" />
              <span>🏠 Menu Utama</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenPassport();
              }}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-5 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Award className="w-5 h-5" />
              <span>📜 Lihat Paspor Budaya</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
