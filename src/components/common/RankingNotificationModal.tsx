import React, { useEffect, useState } from 'react';
import { Trophy, Award, X, Sparkles } from 'lucide-react';
import { Player } from '../../types/game';

interface RankingNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  autoCloseSeconds?: number;
}

export const RankingNotificationModal: React.FC<RankingNotificationModalProps> = ({
  isOpen,
  onClose,
  players,
  autoCloseSeconds = 12,
}) => {
  const [countdown, setCountdown] = useState<number>(autoCloseSeconds);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(autoCloseSeconds);
      return;
    }

    setCountdown(autoCloseSeconds);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, autoCloseSeconds, onClose]);

  if (!isOpen) return null;

  // Sort players for top 5
  const topPlayers = [...players]
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.correctCards.length !== a.correctCards.length) return b.correctCards.length - a.correctCards.length;
      return a.createdAt - b.createdAt;
    })
    .slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#0b1b2d] via-[#08121f] to-[#040810] border-2 border-amber-400/80 p-6 shadow-[0_0_50px_rgba(255,183,3,0.5)] overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-400 hover:text-white hover:border-amber-400 transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center relative z-10 mb-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_0_25px_rgba(255,183,3,0.8)] border border-amber-200 mb-3 animate-bounce">
            <Trophy className="w-8 h-8 text-black" />
          </div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-black text-metallic-gold tracking-wider">
            🏆 UPDATE RANKING ARENA 🏆
          </h2>
          <p className="font-rajdhani text-sm sm:text-base text-cyan-300 font-semibold mt-1">
            Berikut posisi sementara para Champion!
          </p>
          <div className="text-xs text-slate-400 mt-0.5">
            (Pembaruan berkala setiap 8 menit arena)
          </div>
        </div>

        {/* Top 5 Leaderboard List */}
        <div className="relative z-10 space-y-2 mb-5">
          {topPlayers.length === 0 ? (
            <div className="text-center py-6 text-slate-400 font-rajdhani text-sm">
              Belum ada peserta yang mengumpulkan poin. Jadilah yang pertama di papan skor!
            </div>
          ) : (
            topPlayers.map((player, index) => {
              const rank = index + 1;
              const isTop1 = rank === 1;
              const isTop2 = rank === 2;
              const isTop3 = rank === 3;

              return (
                <div
                  key={player.id}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border transition-all ${
                    isTop1
                      ? 'bg-amber-950/60 border-amber-400/90 shadow-[0_0_15px_rgba(255,183,3,0.3)]'
                      : isTop2
                      ? 'bg-slate-800/70 border-slate-400/60'
                      : isTop3
                      ? 'bg-orange-950/40 border-amber-700/60'
                      : 'bg-[#091524]/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center font-cinzel font-black text-sm">
                      {isTop1 ? (
                        <span className="text-lg">🥇</span>
                      ) : isTop2 ? (
                        <span className="text-lg">🥈</span>
                      ) : isTop3 ? (
                        <span className="text-lg">🥉</span>
                      ) : (
                        <span className="text-slate-400 font-rajdhani font-bold">#{rank}</span>
                      )}
                    </div>

                    <div>
                      <div className="font-rajdhani font-bold text-sm sm:text-base text-white">
                        {player.name}
                      </div>
                      <div className="font-rajdhani text-xs text-slate-400">
                        {player.correctCards.length} Kartu Selesai
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-rajdhani font-black text-base sm:text-lg text-amber-400">
                      {player.score} <span className="text-xs font-normal text-amber-300">PTS</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info & Countdown */}
        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-slate-800 text-xs text-slate-400 font-rajdhani">
          <span>Menutup otomatis dalam <strong className="text-amber-400">{countdown}s</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-black font-extrabold uppercase tracking-wider text-xs transition-all shadow-[0_0_12px_rgba(0,242,254,0.5)] cursor-pointer"
          >
            Lanjutkan Pertandingan
          </button>
        </div>
      </div>
    </div>
  );
};
