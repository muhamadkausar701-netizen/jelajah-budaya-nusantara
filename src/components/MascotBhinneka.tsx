import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Smile, Star } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MascotProps {
  mood?: 'happy' | 'excited' | 'thinking' | 'celebrating' | 'explaining';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  canSpeak?: boolean;
}

export const MascotBhinneka: React.FC<MascotProps> = ({
  mood = 'happy',
  message = "Ayo jelajahi budaya Nusantara bersama Si Bhinneka!",
  size = 'md',
  canSpeak = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      sounds.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      sounds.speak(message, () => setIsSpeaking(false));
    }
  };

  const getEmojiAndExpression = () => {
    switch (mood) {
      case 'excited':
        return { face: '🤩', badge: 'Wah Keren!', color: 'bg-amber-400' };
      case 'thinking':
        return { face: '🤔', badge: 'Hmm Mari Pikirkan...', color: 'bg-purple-400' };
      case 'celebrating':
        return { face: '🥳', badge: 'Hore Hebat Sekali!', color: 'bg-emerald-400' };
      case 'explaining':
        return { face: '🧐', badge: 'Tahukah Kamu?', color: 'bg-sky-400' };
      case 'happy':
      default:
        return { face: '😄', badge: 'Sahabat Belajar', color: 'bg-rose-400' };
    }
  };

  const current = getEmojiAndExpression();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-3xl shadow-lg border-2 border-amber-300/60 transition-all hover:shadow-xl">
      {/* Mascot Avatar Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-200 via-orange-100 to-amber-300 p-1 shadow-md animate-friendly-bounce flex items-center justify-center border-4 border-amber-400">
          {/* Illustrated Mascot Face with Indonesian Songkok / Ikat Batik Headband */}
          <div className="relative w-full h-full rounded-full bg-amber-50 flex flex-col items-center justify-center overflow-hidden">
            {/* Indonesian Udeng / Ikat Kepala headband strip */}
            <div className="absolute top-0 w-full h-4 bg-red-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            </div>
            {/* Face expression */}
            <span className="text-4xl sm:text-5xl select-none mt-1">{current.face}</span>
          </div>
        </div>
        
        {/* Floating star */}
        <span className="absolute -top-1 -right-1 bg-yellow-400 text-amber-900 rounded-full p-1 shadow animate-bounce">
          <Star className="w-3.5 h-3.5 fill-yellow-100" />
        </span>
      </div>

      {/* Speech Bubble */}
      <div className="flex-1 relative bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-3.5 sm:p-4 text-left">
        {/* Pointer arrow for bubble */}
        <div className="hidden sm:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-amber-50 border-l-2 border-b-2 border-amber-200 transform rotate-45"></div>

        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-amber-900 text-sm sm:text-base flex items-center gap-1">
              👦👧 Si Bhinneka
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full text-white ${current.color} shadow-xs`}>
              {current.badge}
            </span>
          </div>

          {canSpeak && (
            <button
              onClick={handleSpeak}
              title={isSpeaking ? "Hentikan Suara" : "Dengarkan Si Bhinneka"}
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border transition-all ${
                isSpeaking 
                  ? 'bg-red-500 text-white border-red-600 animate-pulse'
                  : 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Diam</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan</span>
                </>
              )}
            </button>
          )}
        </div>

        <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};
