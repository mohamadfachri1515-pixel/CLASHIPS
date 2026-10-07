import React from 'react';
import { Shield, Sparkles, ChevronRight, BookOpen, Layers, Flame, Award } from 'lucide-react';
import { audio } from '../../services/audio';

interface LandingScreenProps {
  onEnterArena: () => void;
  onOpenTeacherPanel: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onEnterArena,
  onOpenTeacherPanel,
}) => {
  const handleStart = () => {
    // START BGM on user interaction as required
    audio.playBGM();
    onEnterArena();
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070b14] bg-arena-grid flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden select-none">
      {/* Background Cyber Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Bar with Teacher Portal Link */}
      <div className="w-full max-w-6xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-rajdhani text-xs tracking-widest uppercase text-cyan-400 font-bold">
            SESI TURNAMEN AKTIF
          </span>
        </div>

        <button
          onClick={onOpenTeacherPanel}
          className="px-3.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/80 text-xs font-rajdhani font-bold tracking-wider text-slate-300 hover:text-white transition-all shadow-md cursor-pointer"
        >
          PANEL GURU
        </button>
      </div>

      {/* CENTER HERO: Esports Fantasy Shield Logo */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto py-8 max-w-4xl">
        {/* Massive Animated Logo Crest */}
        <div className="relative mb-6 flex flex-col items-center">
          {/* Wings & Gem Container */}
          <div className="relative w-64 h-20 flex items-center justify-center">
            {/* Left Wings */}
            <svg
              className="absolute left-0 w-28 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,242,254,0.9)] animate-pulse"
              viewBox="0 0 100 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 40 C70 36, 30 24, 4 4 C16 24, 50 44, 100 48 Z"
                fill="url(#heroWingL)"
                stroke="#00f2fe"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="heroWingL" x1="0" y1="0" x2="100" y2="50">
                  <stop stopColor="#00f2fe" />
                  <stop offset="1" stopColor="#042736" />
                </linearGradient>
              </defs>
            </svg>

            {/* Central Giant Hexagonal Glowing Cyan Gem */}
            <div className="relative z-20 w-12 h-14 flex items-center justify-center">
              <div className="w-10 h-12 bg-gradient-to-b from-[#e0fcff] via-[#00f2fe] to-[#04616d] clip-hex shadow-[0_0_25px_#00f2fe] border-2 border-cyan-100 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full opacity-90 shadow-[0_0_8px_white]" />
              </div>
            </div>

            {/* Right Wings */}
            <svg
              className="absolute right-0 w-28 h-16 text-cyan-400 drop-shadow-[0_0_15px_rgba(0,242,254,0.9)] animate-pulse"
              viewBox="0 0 100 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 40 C30 36, 70 24, 96 4 C84 24, 50 44, 0 48 Z"
                fill="url(#heroWingR)"
                stroke="#00f2fe"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="heroWingR" x1="100" y1="0" x2="0" y2="50">
                  <stop stopColor="#00f2fe" />
                  <stop offset="1" stopColor="#042736" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* CLASH OF CHAMPIONS Title */}
          <h1 className="font-cinzel font-black tracking-widest text-4xl sm:text-6xl md:text-7xl text-metallic-silver drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-none mt-2">
            CLASH OF CHAMPIONS
          </h1>

          {/* Subtitle Badge: IPS ARENA */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="font-rajdhani text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.25em] text-cyan-300 drop-shadow-[0_0_10px_rgba(0,242,254,0.6)]">
              IPS ARENA
            </span>
            <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          {/* Topic Banner: PERUBAHAN IKLIM */}
          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-950/80 via-emerald-950/80 to-cyan-950/80 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span className="font-rajdhani text-sm sm:text-base font-bold tracking-widest text-cyan-200">
              TOPIK: PERUBAHAN IKLIM
            </span>
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </div>
        </div>

        {/* Short Instructions */}
        <p className="font-rajdhani text-base sm:text-lg text-slate-300 max-w-2xl font-medium leading-relaxed drop-shadow">
          Uji pengetahuanmu tentang perubahan iklim. Pilih kartu tantangan, jawab pertanyaan essay secara mendalam, dan raih posisi tertinggi di arena turnamen!
        </p>

        {/* Level & Arena Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 w-full max-w-2xl">
          <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-700/80 flex flex-col items-center">
            <div className="font-rajdhani text-xs text-slate-400 font-bold uppercase">TOTAL SOAL</div>
            <div className="font-cinzel text-xl font-black text-cyan-300">30 KARTU</div>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/50 flex flex-col items-center">
            <div className="font-rajdhani text-xs text-amber-300 font-bold uppercase">LEVEL 1: MUDAH</div>
            <div className="font-cinzel text-xl font-black text-amber-400">100 POIN</div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex flex-col items-center">
            <div className="font-rajdhani text-xs text-emerald-300 font-bold uppercase">LEVEL 2: MENENGAH</div>
            <div className="font-cinzel text-xl font-black text-emerald-400">200 POIN</div>
          </div>

          <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/50 flex flex-col items-center">
            <div className="font-rajdhani text-xs text-rose-300 font-bold uppercase">LEVEL 3: SULIT</div>
            <div className="font-cinzel text-xl font-black text-rose-400">300 POIN</div>
          </div>
        </div>

        {/* PRIMARY CTA: [ MASUK ARENA PERTANDINGAN ] */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button
            onClick={handleStart}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-[#00f2fe] to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-cinzel font-black text-base sm:text-lg tracking-wider transition-all duration-300 shadow-[0_0_35px_rgba(0,242,254,0.6)] hover:shadow-[0_0_50px_rgba(0,242,254,0.9)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-3"
          >
            <Shield className="w-5 h-5 text-black" />
            <span>MASUK ARENA PERTANDINGAN</span>
            <ChevronRight className="w-5 h-5 text-black transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mt-3 text-xs text-cyan-400/80 font-rajdhani font-semibold tracking-wide">
          🎵 Musik latar otomatis aktif saat memasuki arena
        </div>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-rajdhani pt-4 border-t border-slate-800/80 gap-2">
        <div>Mata Pelajaran: Ilmu Pengetahuan Sosial (IPS)</div>
        <div className="text-cyan-400/70">Clash of Champions Quiz Engine</div>
        <div>Turnamen Edukasi Ramah Lingkungan</div>
      </div>
    </div>
  );
};
