import React from 'react';
import { Rocket, Gamepad2, MapPin, Sparkles, BookOpen, Heart, Shirt, Utensils, Music, Lightbulb } from 'lucide-react';
import { MascotBhinneka } from './MascotBhinneka';
import { sounds } from '../utils/soundEffects';
import { DATA_SUKU } from '../data/budayaData';

interface HomeScreenProps {
  onStartAdventure: () => void;
  onOpenQuiz: () => void;
  onOpenMap: () => void;
  onSelectSuku: (sukuKey: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartAdventure,
  onOpenQuiz,
  onOpenMap,
  onSelectSuku,
}) => {
  const highlights = [
    { title: "Pakaian Adat", desc: "Baju Bodo, Kebaya Encim, Baju Cele & Ti'i Langga", icon: <Shirt className="w-6 h-6 text-rose-500" />, bg: "bg-rose-50 border-rose-200" },
    { title: "Kuliner Khas", desc: "Kerak Telor, Coto Makassar, Papeda & Asam Pedas", icon: <Utensils className="w-6 h-6 text-amber-500" />, bg: "bg-amber-50 border-amber-200" },
    { title: "Kesenian & Musik", desc: "Ondel-ondel, Sasando, Tifa, Tari Cakalele", icon: <Music className="w-6 h-6 text-blue-500" />, bg: "bg-blue-50 border-blue-200" },
    { title: "Fakta Menarik", desc: "Asal-usul tradisi bersejarah dari Sabang sampai Merauke", icon: <Lightbulb className="w-6 h-6 text-emerald-500" />, bg: "bg-emerald-50 border-emerald-200" },
  ];

  const previewSuku = Object.keys(DATA_SUKU).slice(0, 5);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 text-white shadow-xl p-6 sm:p-10 border-4 border-yellow-400">
        {/* Decorative background shapes */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400/90 text-yellow-950 font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-md animate-bounce">
            <span>🇮🇩</span>
            <span>Bhinneka Tunggal Ika</span>
            <span className="hidden sm:inline">• Berbeda-beda tetapi Tetap Satu</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md">
            Jelajah Budaya Nusantara
          </h1>

          <p className="text-base sm:text-xl font-semibold text-sky-100 max-w-2xl mx-auto leading-relaxed">
            Halo Teman-teman! Ayo kenali identitas masyarakat dan kebudayaan Indonesia yang kaya raya bersama Si Bhinneka!
          </p>

          {/* Action Button Row */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                sounds.playSuccess();
                onStartAdventure();
              }}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-base sm:text-lg px-6 sm:px-8 py-3.5 rounded-2xl shadow-lg shadow-amber-500/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-1 cursor-pointer border-b-4 border-amber-700"
            >
              <Rocket className="w-5 h-5" />
              <span>🚀 Mulai Petualangan!</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenQuiz();
              }}
              className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-extrabold text-base sm:text-lg px-5 sm:px-7 py-3.5 rounded-2xl shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all transform hover:-translate-y-1 cursor-pointer border-b-4 border-purple-800"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>🎮 Main Kuis Menjodohkan!</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenMap();
              }}
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold text-sm sm:text-base px-4 sm:px-6 py-3.5 rounded-2xl shadow-md flex items-center gap-2 transition-all cursor-pointer border-b-4 border-emerald-800"
            >
              <MapPin className="w-4 h-4" />
              <span>🗺️ Peta Budaya</span>
            </button>
          </div>

          {/* Educational Target Badge */}
          <div className="pt-2">
            <span className="inline-block bg-white/20 backdrop-blur-xs text-white/95 text-xs font-bold px-3.5 py-1 rounded-full border border-white/25">
              📚 Untuk Siswa SD Kelas 3 - 6 (IPAS & Kebudayaan)
            </span>
          </div>
        </div>
      </div>

      {/* Mascot Speech Bubble Card */}
      <MascotBhinneka
        mood="happy"
        message="Halo adik-adik hebat! Tahukah kamu bahwa Indonesia memiliki lebih dari 1.340 suku bangsa? Di aplikasi ini, kita akan mengenal pakaian adat, makanan tradisional lezat, alat musik, dan rahasia budaya dari berbagai penjuru tanah air! Siap menjelajah?"
      />

      {/* 4 Cultural Pillars Highlight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {highlights.map((h, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl border-2 ${h.bg} shadow-sm hover:shadow-md transition-all flex flex-col justify-between`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-3 border border-slate-100">
                {h.icon}
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                {h.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {h.desc}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/50 flex items-center text-xs font-bold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              <span>Interaktif & Menyenangkan</span>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Suku Preview Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-100 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🌟 Suku Bangsa yang Siap Kamu Kenali</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Pilih salah satu suku untuk membuka lembar informasi budaya lengkap!
            </p>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onStartAdventure();
            }}
            className="text-blue-700 hover:text-blue-900 font-extrabold text-sm flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Lihat Semua Suku</span>
            <span>→</span>
          </button>
        </div>

        {/* Quick Suku Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {previewSuku.map((sukuKey) => {
            const data = DATA_SUKU[sukuKey];
            return (
              <button
                key={sukuKey}
                onClick={() => {
                  sounds.playClick();
                  onSelectSuku(sukuKey);
                }}
                className="group p-4 rounded-2xl border-2 text-left transition-all hover:scale-102 hover:shadow-md cursor-pointer flex flex-col justify-between"
                style={{
                  backgroundColor: data.warnaMuda,
                  borderColor: data.warna,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{data.pakaian.emoji}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: data.warna }}>
                      {data.pulau}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900 group-hover:underline">
                    Suku {data.nama}
                  </h4>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">
                    📍 {data.provinsi}
                  </p>
                </div>
                <div className="mt-3 pt-2 text-xs font-bold flex items-center justify-between" style={{ color: data.warna }}>
                  <span>Buka Detail</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
