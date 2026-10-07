import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { AnswerStatus } from '../../types/game';

interface AnswerResultModalProps {
  status: AnswerStatus;
  cardNumber: number;
  points: number;
  onReturnToArena: () => void;
}

export const AnswerResultModal: React.FC<AnswerResultModalProps> = ({
  status,
  cardNumber,
  points,
  onReturnToArena,
}) => {
  const formattedNumber = cardNumber < 10 ? `0${cardNumber}` : `${cardNumber}`;

  useEffect(() => {
    if (status === 'CORRECT') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#ffb703', '#10b981', '#ffffff'],
      });
    }
  }, [status]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200 select-none">
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#0c1929] via-[#08121f] to-[#040810] border-2 border-cyan-400/80 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,242,254,0.4)] text-center overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Content depending on status */}
        {status === 'PENDING' && (
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-950/80 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_25px_rgba(255,183,3,0.5)] mb-4 animate-pulse">
              <Clock className="w-8 h-8 text-amber-400" />
            </div>

            <div className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-rajdhani text-slate-300 font-bold mb-2">
              KARTU #{formattedNumber}
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-black text-metallic-gold tracking-wide">
              JAWABAN TERKIRIM!
            </h3>
            <p className="font-rajdhani text-sm sm:text-base text-cyan-300 font-semibold mt-2">
              Menunggu pengesahan guru di Panel Guru...
            </p>
            <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
              Kamu dapat melanjutkan menjawab kartu tantangan lainnya di arena sementara jawabanmu ditinjau.
            </p>
          </div>
        )}

        {status === 'CORRECT' && (
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.8)] mb-4">
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            </div>

            <div className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-rajdhani text-slate-300 font-bold mb-2">
              KARTU #{formattedNumber}
            </div>

            <h3 className="font-cinzel text-2xl font-black text-emerald-400 tracking-wider flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>JAWABAN BENAR!</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h3>
            <p className="font-rajdhani text-lg sm:text-xl text-amber-300 font-black mt-2 drop-shadow-[0_0_10px_rgba(255,183,3,0.6)]">
              ANDA MENDAPATKAN +{points} POIN!
            </p>
            <p className="text-xs text-slate-300 mt-2">
              Skor bertambah di papan peringkat Champion!
            </p>
          </div>
        )}

        {status === 'WRONG' && (
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-rose-950/80 border-2 border-rose-500 flex items-center justify-center shadow-[0_0_25px_rgba(244,63,94,0.6)] mb-4">
              <XCircle className="w-8 h-8 text-rose-400" />
            </div>

            <div className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-rajdhani text-slate-300 font-bold mb-2">
              KARTU #{formattedNumber}
            </div>

            <h3 className="font-cinzel text-xl sm:text-2xl font-black text-rose-400 tracking-wide">
              JAWABAN BELUM TEPAT
            </h3>
            <p className="font-rajdhani text-sm sm:text-base text-slate-300 font-semibold mt-2">
              Guru telah memeriksa jawabanmu dan menandainya belum tepat.
            </p>
            <p className="text-xs text-slate-400 mt-2 max-w-xs">
              Tetap semangat! Pilih kartu arena lain atau pelajari kembali materi perubahan iklim.
            </p>
          </div>
        )}

        {/* Return Button */}
        <div className="relative z-10 pt-6 mt-4 border-t border-slate-800">
          <button
            onClick={onReturnToArena}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-[#00f2fe] to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-cinzel font-black text-sm tracking-wider transition-all shadow-[0_0_20px_rgba(0,242,254,0.5)] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>KEMBALI KE ARENA</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
