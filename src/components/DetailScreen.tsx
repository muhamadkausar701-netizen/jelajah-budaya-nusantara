import React, { useState } from 'react';
import { DATA_SUKU, SukuBudaya } from '../data/budayaData';
import { ArrowLeft, Gamepad2, Volume2, VolumeX, Award, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, MapPin, Share2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface DetailScreenProps {
  sukuKey: string;
  onBackMenu: () => void;
  onOpenQuiz: () => void;
  onSelectSuku: (sukuKey: string) => void;
  isStamped: boolean;
  onToggleStamp: (sukuKey: string) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  sukuKey,
  onBackMenu,
  onOpenQuiz,
  onSelectSuku,
  isStamped,
  onToggleStamp,
}) => {
  const data = DATA_SUKU[sukuKey] || DATA_SUKU["Betawi"];
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [showStampFeedback, setShowStampFeedback] = useState<boolean>(false);

  // For next & previous suku navigation
  const allKeys = Object.keys(DATA_SUKU);
  const currentIndex = allKeys.indexOf(sukuKey);
  const prevKey = currentIndex > 0 ? allKeys[currentIndex - 1] : allKeys[allKeys.length - 1];
  const nextKey = currentIndex < allKeys.length - 1 ? allKeys[currentIndex + 1] : allKeys[0];

  const handleReadAloud = () => {
    if (isReadingAloud) {
      sounds.stopSpeaking();
      setIsReadingAloud(false);
    } else {
      setIsReadingAloud(true);
      const textToRead = `Suku ${data.nama} dari ${data.provinsi}. Salam khas: ${data.salamKhas}. Pakaian adat: ${data.pakaian.nama}. Kuliner khas: ${data.kuliner.nama}. Seni dan budaya: ${data.budaya.nama}. Fakta menarik: ${data.fakta}`;
      sounds.speak(textToRead, () => setIsReadingAloud(false));
    }
  };

  const handleStamp = () => {
    sounds.playSuccess();
    onToggleStamp(sukuKey);
    setShowStampFeedback(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setShowStampFeedback(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-14">
      {/* Detail Header Banner */}
      <div
        className="rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden transition-colors border-b-6"
        style={{
          backgroundColor: data.warna,
          borderBottomColor: 'rgba(0,0,0,0.2)'
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-black/25 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs">
                {data.pulau}
              </span>
              <span className="bg-white/25 text-white font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-xs">
                <MapPin className="w-3.5 h-3.5" />
                <span>{data.provinsi}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-sm flex items-center gap-3">
              <span>Suku {data.nama}</span>
              <span className="text-3xl sm:text-4xl">{data.pakaian.emoji}</span>
            </h1>

            <div className="flex items-center gap-2 pt-1">
              <span className="bg-white/20 font-bold text-xs sm:text-sm px-3 py-1 rounded-xl">
                Salam Khas: <strong className="text-yellow-200 font-extrabold">"{data.salamKhas}"</strong> ({data.maknaSalam})
              </span>
            </div>
          </div>

          {/* Header Action Tools */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Read Aloud Button */}
            <button
              onClick={handleReadAloud}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                isReadingAloud
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-white text-slate-800 hover:bg-slate-100'
              }`}
            >
              {isReadingAloud ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-600" />}
              <span>{isReadingAloud ? 'Hentikan Suara' : 'Dengarkan Bacaan'}</span>
            </button>

            {/* Stamp Passport Button */}
            <button
              onClick={handleStamp}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                isStamped
                  ? 'bg-emerald-500 text-white'
                  : 'bg-yellow-400 hover:bg-yellow-300 text-yellow-950'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{isStamped ? '✓ Sudah Disimpan di Paspor' : '+ Cap di Paspor Saya'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stamp Feedback Toast */}
      {showStampFeedback && (
        <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-900 p-4 rounded-2xl flex items-center justify-between shadow-lg animate-bounce">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Hebat! Cap Suku {data.nama} berhasil ditambahkan ke Paspor Budayamu! ⭐</span>
          </div>
        </div>
      )}

      {/* 4 Main Content Sections matching Tkinter buat_section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Section 1: Pakaian Adat */}
        <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-100 hover:border-blue-200 transition-all space-y-3">
          <div className="flex items-center gap-3 border-b pb-3 border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl shadow-xs">
              👕
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-rose-600 uppercase tracking-wider block">
                Pakaian Tradisional
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900" style={{ color: data.warna }}>
                {data.pakaian.nama}
              </h3>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-100">
              <strong className="text-rose-900 block mb-0.5 font-bold">Pria:</strong>
              <p>{data.pakaian.pria}</p>
            </div>
            <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-100">
              <strong className="text-rose-900 block mb-0.5 font-bold">Wanita:</strong>
              <p>{data.pakaian.wanita}</p>
            </div>
            <p className="text-slate-600 italic pt-1 text-xs leading-relaxed">
              {data.pakaian.detail}
            </p>
          </div>
        </div>

        {/* Section 2: Kuliner Khas */}
        <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-100 hover:border-amber-200 transition-all space-y-3">
          <div className="flex items-center gap-3 border-b pb-3 border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl shadow-xs">
              🍲
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-amber-600 uppercase tracking-wider block">
                Makanan Tradisional
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900" style={{ color: data.warna }}>
                {data.kuliner.nama}
              </h3>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100">
              <strong className="text-amber-900 block mb-0.5 font-bold">Bahan Utama & Racikan:</strong>
              <p>{data.kuliner.bahan}</p>
            </div>
            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-100">
              <strong className="text-amber-900 block mb-0.5 font-bold">Cita Rasa & Keunikan:</strong>
              <p>{data.kuliner.detail}</p>
            </div>
          </div>
        </div>

        {/* Section 3: Budaya & Seni */}
        <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-100 hover:border-purple-200 transition-all space-y-3">
          <div className="flex items-center gap-3 border-b pb-3 border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl shadow-xs">
              🎭
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-purple-600 uppercase tracking-wider block">
                Kesenian & Warisan
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900" style={{ color: data.warna }}>
                {data.budaya.nama}
              </h3>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-700">
            <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-100">
              <strong className="text-purple-900 block mb-0.5 font-bold">Bentuk Kesenian:</strong>
              <p>{data.budaya.jenis}</p>
            </div>
            <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-100">
              <strong className="text-purple-900 block mb-0.5 font-bold">Kisah & Pertunjukan:</strong>
              <p>{data.budaya.detail}</p>
            </div>
          </div>
        </div>

        {/* Section 4: Fakta Menarik */}
        <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-slate-100 hover:border-emerald-200 transition-all space-y-3">
          <div className="flex items-center gap-3 border-b pb-3 border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl shadow-xs">
              💡
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider block">
                Tahukah Kamu?
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900" style={{ color: data.warna }}>
                Fakta Menarik
              </h3>
            </div>
          </div>

          <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 space-y-2">
            <p className="font-extrabold text-emerald-950 text-sm sm:text-base leading-relaxed">
              ⭐ {data.fakta}
            </p>
            <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed font-medium">
              {data.penjelasanLengkap}
            </p>
            {data.rumahAdat && (
              <div className="pt-2 border-t border-emerald-200/60 text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <span>🏠 Rumah Adat Tradisional:</span>
                <span className="underline">{data.rumahAdat}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suku Carousel Switcher: Next & Prev */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 border border-slate-200 shadow-xs">
        <button
          onClick={() => {
            sounds.playClick();
            onSelectSuku(prevKey);
          }}
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Suku {DATA_SUKU[prevKey]?.nama}</span>
        </button>

        <span className="text-xs font-bold text-slate-400">
          {currentIndex + 1} dari {allKeys.length}
        </span>

        <button
          onClick={() => {
            sounds.playClick();
            onSelectSuku(nextKey);
          }}
          className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
        >
          <span>Suku {DATA_SUKU[nextKey]?.nama}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => {
            sounds.playClick();
            onBackMenu();
          }}
          className="w-full sm:w-auto bg-slate-600 hover:bg-slate-700 text-white font-extrabold text-base px-6 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Kembali ke Menu Suku</span>
        </button>

        <button
          onClick={() => {
            sounds.playSuccess();
            onOpenQuiz();
          }}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base px-8 py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all border-b-4 border-purple-800"
        >
          <Gamepad2 className="w-5 h-5" />
          <span>🎮 Main Game Kuis Menjodohkan!</span>
        </button>
      </div>
    </div>
  );
};
