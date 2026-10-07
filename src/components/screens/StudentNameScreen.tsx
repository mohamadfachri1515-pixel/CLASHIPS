import React, { useState } from 'react';
import { User, Swords, ArrowRight, ShieldAlert } from 'lucide-react';
import { storage } from '../../services/storage';
import { Player } from '../../types/game';

interface StudentNameScreenProps {
  onNameSubmitted: (player: Player) => void;
  onBackToLanding: () => void;
}

export const StudentNameScreen: React.FC<StudentNameScreenProps> = ({
  onNameSubmitted,
  onBackToLanding,
}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Harap masukkan nama peserta sebelum melanjutkan ke arena!');
      return;
    }

    if (trimmed.length < 2) {
      setError('Nama peserta minimal 2 karakter.');
      return;
    }

    setError('');
    const player = storage.getOrCreatePlayer(trimmed);
    onNameSubmitted(player);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070b14] bg-arena-grid flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      {/* Background Cyber Glowing Accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[300px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Glass/Metallic Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-gradient-to-b from-[#0c1827] via-[#08121f] to-[#040810] border-2 border-cyan-500/50 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,242,254,0.35)] backdrop-blur-xl">
        {/* Top Wing / Crest */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-950 via-[#0d2e3f] to-slate-950 border border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.5)] mb-3">
            <Swords className="w-8 h-8 text-cyan-300" />
          </div>

          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-metallic-silver tracking-wider">
            SIAPA YANG AKAN BERTANDING?
          </h2>
          <p className="font-rajdhani text-sm text-cyan-300 font-semibold mt-1">
            Masukkan namamu untuk mencatat rekor di Arena Turnamen IPS
          </p>
        </div>

        {/* Form: STRICTLY NAMA PESERTA ONLY (No class, no school, no student ID) */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-rajdhani text-xs uppercase tracking-widest text-slate-300 font-bold mb-2">
              NAMA PESERTA
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                autoFocus
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Contoh: Raditya Pratama"
                className="w-full pl-11 pr-4 py-3 bg-[#050e18] border-2 border-slate-700 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,242,254,0.4)] rounded-xl text-white font-rajdhani text-base font-bold placeholder-slate-500 outline-none transition-all"
              />
            </div>
            {error && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-400 font-rajdhani font-semibold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-3">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-[#00f2fe] to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-cinzel font-black text-base tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,242,254,0.6)] hover:shadow-[0_0_35px_rgba(0,242,254,0.9)] cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
            >
              <span>MULAI PERTANDINGAN</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </button>

            <button
              type="button"
              onClick={onBackToLanding}
              className="w-full py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-slate-200 font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
