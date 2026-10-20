import React, { useState } from 'react';
import { DATA_SUKU, PULAU_LIST, SukuBudaya } from '../data/budayaData';
import { Gamepad2, ArrowLeft, Search, Volume2, CheckCircle2, Sparkles, MapPin } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface MenuScreenProps {
  onSelectSuku: (sukuKey: string) => void;
  onOpenQuiz: () => void;
  onBackHome: () => void;
  visitedSuku: string[];
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  onSelectSuku,
  onOpenQuiz,
  onBackHome,
  visitedSuku,
}) => {
  const [selectedPulau, setSelectedPulau] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const sukuEntries = Object.entries(DATA_SUKU);

  const filteredSuku = sukuEntries.filter(([key, data]) => {
    const matchesPulau = selectedPulau === 'Semua' || data.pulau === selectedPulau;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      data.nama.toLowerCase().includes(query) ||
      data.provinsi.toLowerCase().includes(query) ||
      data.kuliner.nama.toLowerCase().includes(query) ||
      data.pakaian.nama.toLowerCase().includes(query) ||
      data.budaya.nama.toLowerCase().includes(query);
    return matchesPulau && matchesSearch;
  });

  const handleSpeakGreeting = (e: React.MouseEvent, greeting: string, makna: string) => {
    e.stopPropagation();
    sounds.speak(`${greeting}. Artinya: ${makna}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg border-b-4 border-amber-400 text-center relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <span className="inline-block bg-amber-400 text-blue-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Eksplorasi Budaya Nusantara
          </span>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Pilih Suku yang Ingin Kamu Kenali!
          </h1>
          <p className="text-sky-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
            Setiap suku memiliki ciri khas pakaian adat, makanan tradisional lezat, seni musik, dan adat istiadat yang mengagumkan.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari suku, provinsi, kuliner, atau pakaian adat..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm text-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full px-2 py-0.5"
              >
                Reset
              </button>
            )}
          </div>

          {/* Suku Count Pill */}
          <div className="text-xs font-extrabold text-slate-600 bg-slate-100 px-3.5 py-2 rounded-xl flex items-center justify-between gap-2">
            <span>Ditemukan:</span>
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full">
              {filteredSuku.length} Suku
            </span>
          </div>
        </div>

        {/* Pulau Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs sm:text-sm">
          <span className="text-slate-400 font-bold text-xs mr-1 hidden sm:inline">Pulau:</span>
          {PULAU_LIST.map((pulau) => {
            const isSelected = selectedPulau === pulau;
            return (
              <button
                key={pulau}
                onClick={() => {
                  sounds.playClick();
                  setSelectedPulau(pulau);
                }}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {pulau}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Kartu Suku */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSuku.map(([sukuKey, data]) => {
          const isVisited = visitedSuku.includes(data.id) || visitedSuku.includes(sukuKey);
          return (
            <div
              key={sukuKey}
              className="bg-white rounded-3xl border-3 shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between group"
              style={{ borderColor: data.warna }}
            >
              {/* Card Header with Tribe Color */}
              <div
                className="p-4 sm:p-5 text-white flex items-start justify-between relative"
                style={{ backgroundColor: data.warna }}
              >
                <div>
                  <span className="inline-block bg-black/20 text-white font-extrabold text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full mb-1">
                    {data.pulau}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-xs">
                    {data.nama}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold opacity-90 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{data.provinsi}</span>
                  </p>
                </div>

                {/* Cultural Emojis */}
                <div className="flex flex-col items-end gap-1">
                  <span className="text-3xl filter drop-shadow group-hover:scale-110 transition-transform">
                    {data.pakaian.emoji}
                  </span>
                  {isVisited && (
                    <span className="bg-white text-emerald-700 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3 fill-emerald-500 text-white" />
                      <span>Dipaspor</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body Information */}
              <div className="p-4 sm:p-5 space-y-3 flex-1 text-slate-700 text-xs sm:text-sm">
                {/* Regional Greeting */}
                <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                      Salam Khas:
                    </span>
                    <span className="font-extrabold text-amber-950 text-sm">
                      "{data.salamKhas}"
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleSpeakGreeting(e, data.salamKhas, data.maknaSalam)}
                    title="Dengarkan Ucapan"
                    className="p-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Snippets */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-800 flex-shrink-0">👕 Pakaian:</span>
                    <span className="line-clamp-1">{data.pakaian.nama}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-800 flex-shrink-0">🍲 Kuliner:</span>
                    <span className="line-clamp-1">{data.kuliner.nama}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-800 flex-shrink-0">🎭 Budaya:</span>
                    <span className="line-clamp-1">{data.budaya.nama}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-4 sm:p-5 pt-0">
                <button
                  onClick={() => {
                    sounds.playClick();
                    onSelectSuku(sukuKey);
                  }}
                  className="w-full py-2.5 sm:py-3 rounded-xl font-extrabold text-sm sm:text-base text-white shadow-md transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer hover:brightness-105"
                  style={{ backgroundColor: data.warna }}
                >
                  <span>Lihat Detail Lengkap</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredSuku.length === 0 && (
        <div className="bg-white rounded-3xl p-8 text-center text-slate-500 border border-slate-200 space-y-3">
          <span className="text-4xl">🔍</span>
          <h3 className="font-bold text-lg text-slate-800">Suku tidak ditemukan</h3>
          <p className="text-xs sm:text-sm">
            Coba gunakan kata kunci pencarian yang lain atau pilih opsi 'Semua' pada filter pulau.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedPulau('Semua');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs"
          >
            Tampilkan Semua Suku
          </button>
        </div>
      )}

      {/* Bottom Action Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => {
            sounds.playSuccess();
            onOpenQuiz();
          }}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base px-7 py-3 rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all border-b-4 border-purple-800"
        >
          <Gamepad2 className="w-5 h-5" />
          <span>🎮 Main Game Kuis Menjodohkan!</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            onBackHome();
          }}
          className="w-full sm:w-auto bg-slate-600 hover:bg-slate-700 text-white font-bold text-base px-6 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    </div>
  );
};
