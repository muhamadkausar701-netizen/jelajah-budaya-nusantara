import React from 'react';
import { Home, Compass, Gamepad2, Award, MapPin, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export type ScreenType = 'home' | 'menu' | 'detail' | 'quiz' | 'map' | 'passport';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  stampsCount: number;
  totalSuku: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  stampsCount,
  totalSuku,
  soundEnabled,
  onToggleSound,
}) => {
  const navItems: { screen: ScreenType; label: string; icon: React.ReactNode; color: string }[] = [
    { screen: 'home', label: 'Beranda', icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'hover:text-blue-600' },
    { screen: 'menu', label: 'Pilih Suku', icon: <Compass className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'hover:text-amber-600' },
    { screen: 'quiz', label: 'Kuis Menjodohkan', icon: <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'hover:text-purple-600' },
    { screen: 'map', label: 'Peta Budaya', icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'hover:text-emerald-600' },
    { screen: 'passport', label: 'Paspor Saya', icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />, color: 'hover:text-rose-600' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-4 border-amber-400 shadow-md">
      {/* Red and white stripe bar */}
      <div className="h-1.5 w-full flex">
        <div className="w-1/2 bg-red-600"></div>
        <div className="w-1/2 bg-white border-b border-slate-200"></div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo / Brand */}
        <button
          onClick={() => {
            sounds.playClick();
            onNavigate('home');
          }}
          className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-xl sm:text-2xl shadow-md group-hover:scale-105 transition-transform">
            🇮🇩
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-xl text-blue-900 tracking-tight leading-tight flex items-center gap-1.5">
              <span>Jelajah Budaya</span>
              <span className="text-red-600 hidden xs:inline">Nusantara</span>
            </h1>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 hidden sm:block">
              Mengenal Kebudayaan Indonesia untuk Siswa SD
            </p>
          </div>
        </button>

        {/* Center Navigation Items */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => {
                  sounds.playClick();
                  onNavigate(item.screen);
                }}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-md shadow-blue-500/20 scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {item.icon}
                <span className={item.screen === 'quiz' ? 'inline' : 'hidden md:inline'}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right tools: Sound toggle & Passport stamps */}
        <div className="flex items-center gap-2">
          {/* Passport Stamp Mini Pill */}
          <button
            onClick={() => {
              sounds.playClick();
              onNavigate('passport');
            }}
            title="Koleksi Paspor Budaya"
            className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-bold text-xs shadow-xs cursor-pointer transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-400" />
            <span className="hidden xs:inline">Stempel:</span>
            <span className="bg-amber-500 text-white rounded-full px-1.5 py-0.2 text-[11px]">
              {stampsCount}/{totalSuku}
            </span>
          </button>

          {/* Sound Mute / Unmute */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Matikan Suara Efek' : 'Nyalakan Suara Efek'}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center border border-slate-300 transition-all cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
