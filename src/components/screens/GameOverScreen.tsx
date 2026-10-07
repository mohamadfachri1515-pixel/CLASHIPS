import React, { useEffect } from 'react';
import { Trophy, RotateCcw, Home, Crown, Medal, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Player } from '../../types/game';
import { audio } from '../../services/audio';

interface GameOverScreenProps {
  players: Player[];
  onPlayAgain: () => void;
  onReturnToHome: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  players,
  onPlayAgain,
  onReturnToHome,
}) => {
  // REQUIREMENT: BGM MUST STOP WHEN GAME OVER SCREEN APPEARS!
  useEffect(() => {
    audio.stopBGM();

    // Grand confetti explosion for champion ceremony
    const end = Date.now() + 3 * 1000;
    const colors = ['#00f2fe', '#ffb703', '#ffffff', '#38bdf8'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const sortedPlayers = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.correctCards.length !== a.correctCards.length) return b.correctCards.length - a.correctCards.length;
    return a.createdAt - b.createdAt;
  });

  const champion = sortedPlayers[0];
  const top10 = sortedPlayers.slice(0, 10);

  return (
    <div className="relative min-h-screen w-full bg-[#070b14] bg-arena-grid p-4 sm:p-8 flex flex-col items-center justify-center select-none overflow-x-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10 flex flex-col items-center text-center">
        {/* Banner Title */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-amber-950/80 border border-amber-400/80 shadow-[0_0_20px_rgba(255,183,3,0.4)] mb-4">
          <Crown className="w-5 h-5 text-amber-300" />
          <span className="font-rajdhani text-sm sm:text-base font-extrabold tracking-widest text-amber-200">
            PERTANDINGAN TELAH DIAKHIRI
          </span>
          <Crown className="w-5 h-5 text-amber-300" />
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl font-black text-metallic-gold tracking-widest drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
          🏆 CLASH OF CHAMPIONS 🏆
        </h1>
        <h2 className="font-rajdhani text-xl sm:text-2xl font-black tracking-widest text-cyan-300 mt-1 uppercase">
          PERTANDINGAN BERAKHIR
        </h2>

        {/* CHAMPION OF THE ARENA HERO CARD */}
        <div className="my-8 w-full max-w-xl rounded-2xl bg-gradient-to-b from-[#211906] via-[#141004] to-[#080602] border-2 border-amber-400 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,183,3,0.6)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffb703_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 border-2 border-amber-100 flex items-center justify-center shadow-[0_0_30px_rgba(255,183,3,0.9)] text-4xl mb-3 animate-bounce">
              👑
            </div>

            <div className="font-cinzel text-xs sm:text-sm font-black tracking-[0.2em] text-amber-300 uppercase">
              CHAMPION OF THE ARENA
            </div>

            <div className="font-rajdhani text-2xl sm:text-4xl font-black text-white mt-1 drop-shadow">
              {champion ? champion.name : 'Belum Ada Pemenang'}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs font-rajdhani text-slate-400 uppercase tracking-widest font-bold">
                TOTAL POIN:
              </span>
              <span className="font-cinzel text-3xl sm:text-4xl font-black text-metallic-gold">
                {champion ? champion.score : 0} PTS
              </span>
            </div>

            {champion && (
              <div className="text-xs font-rajdhani text-cyan-300 font-bold mt-1">
                Berhasil Menyelesaikan {champion.correctCards.length} Kartu Tantangan IPS
              </div>
            )}
          </div>
        </div>

        {/* TOP 10 LEADERBOARD SUMMARY */}
        <div className="w-full max-w-xl rounded-2xl bg-[#091522]/90 border border-slate-700/80 p-4 mb-8 text-left">
          <div className="flex items-center gap-2 text-xs font-rajdhani font-bold text-slate-300 uppercase tracking-widest border-b border-slate-800 pb-2.5 mb-2.5">
            <Medal className="w-4 h-4 text-amber-400" />
            <span>TOP 10 ARENA CHAMPIONS</span>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {top10.length === 0 ? (
              <div className="text-center py-4 text-slate-500 text-xs font-rajdhani">
                Tidak ada data peserta.
              </div>
            ) : (
              top10.map((player, idx) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#050c14] border border-slate-800 text-xs font-rajdhani"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold w-5 text-center text-slate-400">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </span>
                    <span className="font-bold text-white text-sm truncate max-w-[180px]">
                      {player.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{player.correctCards.length} Kartu</span>
                    <span className="font-cinzel font-black text-amber-400 text-sm">
                      {player.score} PTS
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons: [ MAIN LAGI ], [ KEMBALI KE HOME ] */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
          <button
            onClick={onPlayAgain}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-[#00f2fe] to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-cinzel font-black text-sm tracking-wider transition-all shadow-[0_0_25px_rgba(0,242,254,0.6)] cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
          >
            <RotateCcw className="w-4 h-4 text-black" />
            <span>MAIN LAGI</span>
          </button>

          <button
            onClick={onReturnToHome}
            className="w-full py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-cinzel font-black text-sm tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>KEMBALI KE HOME</span>
          </button>
        </div>
      </div>
    </div>
  );
};
