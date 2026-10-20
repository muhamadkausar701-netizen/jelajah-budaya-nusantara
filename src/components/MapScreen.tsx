import React, { useState } from 'react';
import { DATA_SUKU, SukuBudaya } from '../data/budayaData';
import { sounds } from '../utils/soundEffects';
import { MapPin, Volume2, Sparkles, Compass, ChevronRight, Info } from 'lucide-react';

interface MapScreenProps {
  onSelectSuku: (sukuKey: string) => void;
  onOpenQuiz: () => void;
}

interface IslandData {
  id: string;
  name: string;
  pulauKey: string;
  salamPopuler: string;
  artinya: string;
  color: string;
  deskripsi: string;
  icon: string;
  posisi: string;
}

const ISLANDS: IslandData[] = [
  {
    id: 'sumatra',
    name: 'Pulau Sumatra',
    pulauKey: 'Sumatra',
    salamPopuler: 'Horas! / Salamaik pagi!',
    artinya: 'Semoga selamat dan sejahtera!',
    color: '#16A34A',
    deskripsi: 'Pulau terbesar ke-6 di dunia dengan kekayaan adat Melayu, Minangkabau, Batak, dan istana bersejarah.',
    icon: '🐅',
    posisi: 'Barat Indonesia'
  },
  {
    id: 'jawa',
    name: 'Pulau Jawa',
    pulauKey: 'Jawa',
    salamPopuler: 'Sugeng rawuh! / Sampurasun!',
    artinya: 'Selamat datang / Salam hormat yang tulus',
    color: '#7C3AED',
    deskripsi: 'Pusat kebudayaan Betawi, Sunda, Jawa, dengan tradisi wayang kulit, gamelan, dan kebaya anggun.',
    icon: '🌋',
    posisi: 'Selatan Nusantara'
  },
  {
    id: 'kalimantan',
    name: 'Pulau Kalimantan',
    pulauKey: 'Kalimantan',
    salamPopuler: "Adil Ka' Talino, Bacuramin Ka' Saruga!",
    artinya: 'Adil kepada sesama manusia, bercermin ke surga!',
    color: '#0D9488',
    deskripsi: 'Pulau zamrud khatulistiwa dengan rumah panjang Betang, alat musik Sape merdu, dan keindahan hutan rimba.',
    icon: '🦧',
    posisi: 'Tengah - Utara'
  },
  {
    id: 'sulawesi',
    name: 'Pulau Sulawesi',
    pulauKey: 'Sulawesi',
    salamPopuler: 'Aga kareba? / Tabik!',
    artinya: 'Apa kabar sahabatku?',
    color: '#F59E0B',
    deskripsi: 'Bentuk pulau unik seperti huruf K, rumah para pelaut ulung Bugis-Makassar, kapal Pinisi, dan Baju Bodo.',
    icon: '⛵',
    posisi: 'Tengah Timur'
  },
  {
    id: 'nusa-tenggara',
    name: 'Bali & Nusa Tenggara',
    pulauKey: 'Bali & Nusa Tenggara',
    salamPopuler: 'Om Swastyastu! / Nai basan!',
    artinya: 'Semoga damai dan selamat!',
    color: '#8D6E63',
    deskripsi: 'Gugusan pulau eksotis dari Pulau Dewata Bali hingga Pulau Rote dengan alat musik dawai Sasando lontar.',
    icon: '🏝️',
    posisi: 'Selatan Timur'
  },
  {
    id: 'maluku-papua',
    name: 'Maluku & Papua',
    pulauKey: 'Maluku & Papua',
    salamPopuler: 'Tabea! / Amolongo!',
    artinya: 'Salam hormat persaudaraan dan damai!',
    color: '#0284C7',
    deskripsi: 'Kepulauan rempah pala & cengkih Ambon hingga bentangan megah bumi Cendrawasih dan seni ukir suku Asmat.',
    icon: '🌺',
    posisi: 'Ujung Timur Indonesia'
  }
];

export const MapScreen: React.FC<MapScreenProps> = ({ onSelectSuku, onOpenQuiz }) => {
  const [selectedIsland, setSelectedIsland] = useState<IslandData>(ISLANDS[0]);

  const sukuInIsland = Object.entries(DATA_SUKU).filter(
    ([_, data]) => data.pulau === selectedIsland.pulauKey
  );

  const handleSpeakIsland = (island: IslandData) => {
    sounds.speak(`${island.name}. Salam khas: ${island.salamPopuler}. Artinya: ${island.artinya}`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg border-b-4 border-amber-400">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-emerald-950 flex items-center justify-center text-2xl font-black shadow-md">
            🗺️
          </div>
          <div>
            <span className="text-[11px] font-extrabold text-amber-300 uppercase tracking-wider block">
              Peta Budaya Nusantara
            </span>
            <h1 className="text-2xl sm:text-3xl font-black">
              Jelajahi Kepulauan Indonesia
            </h1>
          </div>
        </div>
        <p className="text-teal-100 text-xs sm:text-sm mt-2 max-w-xl">
          Klik salah satu gugus pulau di bawah untuk menemukan suku bangsa, salam daerah, dan kekayaan budayanya!
        </p>
      </div>

      {/* Island Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {ISLANDS.map((island) => {
          const isSelected = selectedIsland.id === island.id;
          return (
            <button
              key={island.id}
              onClick={() => {
                sounds.playClick();
                setSelectedIsland(island);
              }}
              className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                isSelected
                  ? 'bg-white shadow-md scale-102 font-extrabold'
                  : 'bg-white/80 hover:bg-white text-slate-700 border-slate-200'
              }`}
              style={{
                borderColor: isSelected ? island.color : undefined,
              }}
            >
              <span className="text-2xl">{island.icon}</span>
              <span className="text-xs sm:text-sm font-bold leading-tight" style={{ color: isSelected ? island.color : undefined }}>
                {island.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Island Detail Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-3 space-y-6" style={{ borderColor: selectedIsland.color }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">{selectedIsland.icon}</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {selectedIsland.name}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl">
              {selectedIsland.deskripsi}
            </p>
          </div>

          {/* Regional Greeting Playback */}
          <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 flex items-center justify-between gap-3 self-start sm:self-auto min-w-[240px]">
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase block">
                Salam Daerah:
              </span>
              <p className="font-extrabold text-amber-950 text-xs sm:text-sm">
                "{selectedIsland.salamPopuler}"
              </p>
              <p className="text-[10px] text-amber-700 font-medium">
                {selectedIsland.artinya}
              </p>
            </div>
            <button
              onClick={() => handleSpeakIsland(selectedIsland)}
              title="Dengarkan Ucapan"
              className="p-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-950 transition-all cursor-pointer shadow-xs"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Suku Suku di Pulau Ini */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Suku Bangsa di {selectedIsland.name}:</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">
              {sukuInIsland.length} Suku Tersedia
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sukuInIsland.map(([sukuKey, data]) => (
              <div
                key={sukuKey}
                className="p-4 rounded-2xl border-2 transition-all hover:shadow-md flex flex-col justify-between"
                style={{
                  backgroundColor: data.warnaMuda,
                  borderColor: data.warna,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-2xl">{data.pakaian.emoji}</span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: data.warna }}>
                      {data.provinsi}
                    </span>
                  </div>
                  <h4 className="font-black text-lg text-slate-900">
                    Suku {data.nama}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {data.budaya.nama} • {data.kuliner.nama}
                  </p>
                </div>

                <button
                  onClick={() => {
                    sounds.playClick();
                    onSelectSuku(sukuKey);
                  }}
                  className="mt-3 pt-2 w-full py-2 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1 cursor-pointer transition-all shadow-xs"
                  style={{ backgroundColor: data.warna }}
                >
                  <span>Buka Lembar Budaya</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
