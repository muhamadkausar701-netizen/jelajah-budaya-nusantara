import React, { useState } from 'react';
import { DATA_SUKU } from '../data/budayaData';
import { sounds } from '../utils/soundEffects';
import { Award, CheckCircle2, Star, Sparkles, Printer, User, Compass, Gamepad2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PassportScreenProps {
  visitedSuku: string[];
  bestQuizScore: { score: number; total: number } | null;
  onSelectSuku: (sukuKey: string) => void;
  onOpenQuiz: () => void;
}

export const PassportScreen: React.FC<PassportScreenProps> = ({
  visitedSuku,
  bestQuizScore,
  onSelectSuku,
  onOpenQuiz,
}) => {
  const [studentName, setStudentName] = useState<string>('Sahabat Nusantara');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(studentName);

  const allSukuKeys = Object.keys(DATA_SUKU);
  const totalSuku = allSukuKeys.length;
  const collectedCount = visitedSuku.length;
  const progressPercent = Math.round((collectedCount / totalSuku) * 100);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setStudentName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handlePrintCertificate = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Passport Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-b-4 border-yellow-400">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-red-900 flex items-center justify-center text-3xl font-black shadow-md border-2 border-white">
              🇮🇩
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-yellow-200 uppercase tracking-wider block">
                Dokumen Resmi Penjelajah Cilik
              </span>
              <h1 className="text-2xl sm:text-3xl font-black">
                Paspor Budaya Nusantara
              </h1>
            </div>
          </div>

          <button
            onClick={handlePrintCertificate}
            className="flex items-center gap-2 bg-white text-red-700 hover:bg-yellow-50 px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Piagam Penghargaan</span>
          </button>
        </div>

        {/* Student Profile Row */}
        <div className="mt-6 pt-4 border-t border-red-400/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-red-200 font-bold uppercase block">
                Nama Pemegang Paspor:
              </span>
              {isEditingName ? (
                <div className="flex items-center gap-2 mt-0.5">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded-lg w-40 focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="bg-yellow-400 text-yellow-950 font-bold text-xs px-2 py-1 rounded-lg"
                  >
                    Simpan
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setTempName(studentName);
                    setIsEditingName(true);
                  }}
                  className="font-extrabold text-white text-sm sm:text-base flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <span>{studentName}</span>
                  <span className="text-xs text-yellow-300 font-normal">(Ubah Nama)</span>
                </button>
              )}
            </div>
          </div>

          {/* Overall completion bar */}
          <div className="bg-black/20 backdrop-blur-xs px-4 py-2 rounded-2xl flex items-center gap-3">
            <div>
              <div className="text-[10px] text-red-100 font-bold">Stempel Terkumpul:</div>
              <div className="text-base font-black text-yellow-300">
                {collectedCount} / {totalSuku} Suku ({progressPercent}%)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stamps Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Cap & Stempel Suku Nusantara</span>
          </h2>
          <span className="text-xs font-bold text-slate-500">
            Kunjungi lembar suku untuk mengumpulkan cap
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {allSukuKeys.map((key) => {
            const data = DATA_SUKU[key];
            const hasStamp = visitedSuku.includes(key) || visitedSuku.includes(data.id);

            return (
              <button
                key={key}
                onClick={() => {
                  sounds.playClick();
                  onSelectSuku(key);
                }}
                className={`p-4 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group ${
                  hasStamp
                    ? 'bg-amber-50/60 border-amber-300 shadow-sm hover:scale-102'
                    : 'bg-slate-50 border-dashed border-slate-300 opacity-60 hover:opacity-100'
                }`}
              >
                {/* Visual Stamp Seal */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-2 transition-transform group-hover:scale-110 ${
                    hasStamp
                      ? 'bg-white shadow-md border-2 border-amber-400 rotate-[-4deg]'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {hasStamp ? data.pakaian.emoji : '🔒'}
                </div>

                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">
                  Suku {data.nama}
                </h4>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                  {data.provinsi}
                </p>

                {hasStamp ? (
                  <span className="mt-2 text-[9px] font-black uppercase text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full">
                    ✓ Terverifikasi
                  </span>
                ) : (
                  <span className="mt-2 text-[9px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                    Belum Dibuka
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quiz Record Card */}
      <div className="bg-purple-50 rounded-3xl p-6 border-2 border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <h3 className="font-extrabold text-base sm:text-lg text-purple-950">
              Rekor Kuis Menjodohkan
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-purple-800 font-medium">
            {bestQuizScore
              ? `Skor Terbaik Kamu: ${bestQuizScore.score} dari ${bestQuizScore.total} Soal (${Math.round((bestQuizScore.score / bestQuizScore.total) * 100)}%)`
              : 'Kamu belum mencoba kuis hari ini. Ayo uji pengetahuan budaya Nusantara!'}
          </p>
        </div>

        <button
          onClick={() => {
            sounds.playSuccess();
            onOpenQuiz();
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all self-start sm:self-auto border-b-3 border-purple-800"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>{bestQuizScore ? 'Tingkatkan Nilai Kuis' : 'Mulai Kuis Menjodohkan'}</span>
        </button>
      </div>

      {/* Printable Certificate (Visible always on screen, formatted for print) */}
      <div className="bg-amber-50/50 border-4 border-double border-amber-600 rounded-3xl p-8 text-center space-y-4 shadow-sm print:m-0 print:border-4">
        <div className="inline-block px-4 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-widest">
          Piagam Penghargaan • Penjelajah Budaya Nusantara
        </div>
        
        <p className="text-xs text-slate-600 font-semibold">
          Diberikan dengan bangga kepada Siswa Berprestasi:
        </p>

        <h2 className="text-3xl font-black text-blue-950 underline decoration-amber-400 decoration-wavy decoration-2">
          {studentName}
        </h2>

        <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto font-medium leading-relaxed">
          Atas semangat belajar, kecintaan pada tanah air, dan dedikasi dalam mempelajari adat istiadat, pakaian adat, makanan tradisional, dan kesenian suku bangsa di seluruh Nusantara.
        </p>

        <div className="pt-4 flex items-center justify-around border-t border-amber-300 text-xs font-bold text-slate-600">
          <div>
            <span>Tanggal Belajar</span>
            <div className="font-extrabold text-slate-800">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
          </div>
          <div>
            <span>Pendamping Edukasi</span>
            <div className="font-extrabold text-amber-800">👦👧 Si Bhinneka</div>
          </div>
        </div>
      </div>
    </div>
  );
};
