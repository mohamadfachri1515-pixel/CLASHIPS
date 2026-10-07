import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Trophy, Shield, Maximize2, Minimize2, User, Home } from 'lucide-react';
import { audio } from '../../services/audio';
import { Player } from '../../types/game';

interface HeaderProps {
  player: Player | null;
  onOpenRanking: () => void;
  onOpenTeacherPanel: () => void;
  onReturnHome?: () => void;
  titleSubtitle?: string;
  isTeacherView?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  player,
  onOpenRanking,
  onOpenTeacherPanel,
  onReturnHome,
  titleSubtitle = 'IPS ARENA : PERUBAHAN IKLIM',
  isTeacherView = false,
}) => {
  const [musicOn, setMusicOn] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    setMusicOn(audio.isMusicOn());
  }, []);

  const handleToggleMusic = () => {
    const nextState = audio.toggleBGM();
    setMusicOn(nextState);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08101e]/90 backdrop-blur-md border-b border-cyan-500/30 px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_4px_25px_rgba(0,0,0,0.7)]">
      {/* Brand & Mode info */}
      <div className="flex items-center gap-3">
        {onReturnHome && (
          <button
            onClick={onReturnHome}
            title="Kembali ke Halaman Utama"
            className="p-1.5 rounded-lg border border-slate-700 hover:border-cyan-400 bg-slate-900/80 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-2">
          {/* Logo Crest Icon */}
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-900 to-slate-950 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_12px_rgba(0,242,242,0.4)]">
            <Shield className="w-5 h-5 text-cyan-300" />
            <div className="absolute w-1.5 h-1.5 bg-cyan-200 rounded-full shadow-[0_0_6px_#00f2fe]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cinzel text-xs sm:text-sm font-black tracking-wider text-metallic-silver leading-none">
                CLASH OF CHAMPIONS
              </span>
              <span className="hidden sm:inline font-rajdhani text-[11px] font-bold text-amber-400 px-1.5 py-0.2 rounded bg-amber-950/60 border border-amber-500/40">
                IPS ARENA
              </span>
            </div>
            <div className="font-rajdhani text-[10px] sm:text-xs text-cyan-400/90 font-medium tracking-wide">
              {titleSubtitle}
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Active Player Info */}
      {player && !isTeacherView && (
        <div className="hidden md:flex items-center gap-3 px-3.5 py-1 bg-[#0b1b2d] rounded-lg border border-cyan-500/40 shadow-inner">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-white max-w-[120px] truncate">{player.name}</span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400">Poin:</span>
            <span className="font-bold text-amber-400">{player.score}</span>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400">Kartu Benar:</span>
            <span className="font-bold text-emerald-400">{player.correctCards.length}</span>
          </div>
        </div>
      )}

      {/* Right Controls: Audio Toggle, Ranking, Teacher Panel, Fullscreen */}
      <div className="flex items-center gap-2">
        {/* MUSIC TOGGLE (Prominent & Explicit as requested) */}
        <button
          onClick={handleToggleMusic}
          aria-label={musicOn ? 'Matikan Musik' : 'Nyalakan Musik'}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-rajdhani font-bold tracking-wide transition-all cursor-pointer ${
            musicOn
              ? 'bg-cyan-950/70 border-cyan-400/80 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.4)] hover:bg-cyan-900/80'
              : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500'
          }`}
        >
          {musicOn ? (
            <>
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="hidden xs:inline">MUSIC ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span className="hidden xs:inline">MUSIC OFF</span>
            </>
          )}
        </button>

        {/* RANKING BUTTON */}
        <button
          onClick={onOpenRanking}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-950/50 border border-amber-500/70 text-amber-300 hover:bg-amber-900/60 text-xs font-rajdhani font-bold tracking-wide transition-all shadow-[0_0_10px_rgba(255,183,3,0.3)] cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">RANKING</span>
        </button>

        {/* TEACHER PANEL BUTTON */}
        <button
          onClick={onOpenTeacherPanel}
          className="px-2.5 py-1.5 rounded-lg bg-indigo-950/60 border border-indigo-500/60 text-indigo-200 hover:bg-indigo-900/70 text-xs font-rajdhani font-bold tracking-wide transition-all cursor-pointer"
        >
          {isTeacherView ? 'KE ARENA' : 'PANEL GURU'}
        </button>

        {/* FULLSCREEN TOGGLE */}
        <button
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh'}
          className="p-1.5 rounded-lg border border-slate-700 hover:border-cyan-400 bg-slate-900/80 text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
