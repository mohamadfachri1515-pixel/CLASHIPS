import React, { useState } from 'react';
import { Question, Player, CardVisualStatus } from '../../types/game';
import { Send, ArrowLeft, HelpCircle, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

interface QuestionModalProps {
  question: Question;
  player: Player;
  currentStatus: CardVisualStatus;
  onSubmitAnswer: (answerText: string) => void;
  onClose: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  player,
  currentStatus,
  onSubmitAnswer,
  onClose,
}) => {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const formattedNumber =
    question.cardNumber < 10 ? `0${question.cardNumber}` : `${question.cardNumber}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = answer.trim();
    if (!trimmed) {
      setError('Harap ketik jawaban essay kamu terlebih dahulu!');
      return;
    }
    if (trimmed.length < 5) {
      setError('Jawaban terlalu singkat. Jelaskan pemikiranmu dengan lebih lengkap!');
      return;
    }

    setError('');
    onSubmitAnswer(trimmed);
  };

  const isAlreadyCorrect = currentStatus === 'CORRECT';
  const isPending = currentStatus === 'PENDING';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto rounded-2xl bg-gradient-to-b from-[#0e1d2c] via-[#091522] to-[#040810] border-2 border-cyan-400/80 p-5 sm:p-8 shadow-[0_0_50px_rgba(0,242,254,0.4)] text-white">
        {/* Top Metallic Border Lights */}
        <div className="absolute top-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f2fe]" />

        {/* Modal Header Badge */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1 rounded-md bg-gradient-to-r from-cyan-950 to-slate-900 border border-cyan-400/80 shadow-[0_0_10px_rgba(0,242,254,0.3)]">
              <span className="font-rajdhani font-black tracking-widest text-sm text-cyan-300">
                KARTU #{formattedNumber}
              </span>
            </div>
            <div className="px-3 py-1 rounded-md bg-slate-900/90 border border-slate-700">
              <span className="font-rajdhani font-bold text-xs text-slate-300">
                LEVEL {question.level} ({question.difficulty})
              </span>
            </div>
          </div>

          <div className="px-3.5 py-1 rounded-md bg-amber-950/70 border border-amber-500/70 shadow-[0_0_12px_rgba(255,183,3,0.3)]">
            <span className="font-cinzel font-black text-amber-400 text-sm">
              +{question.points} POIN
            </span>
          </div>
        </div>

        {/* Status Notice if already completed or pending */}
        {isAlreadyCorrect && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/80 text-emerald-300 text-xs sm:text-sm font-rajdhani font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>Kartu ini telah berhasil diselesaikan dan poin sudah ditambahkan ke skormu! Kamu tetap dapat mengirim jawaban perbaikan jika diizinkan guru.</span>
          </div>
        )}

        {isPending && (
          <div className="mb-4 p-3 rounded-xl bg-amber-950/60 border border-amber-500/80 text-amber-300 text-xs sm:text-sm font-rajdhani font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-400 animate-pulse" />
            <span>Jawaban untuk kartu ini sedang menunggu validasi dari guru di Panel Guru.</span>
          </div>
        )}

        {/* Question Content Box */}
        <div className="rounded-xl bg-[#061421] border border-cyan-500/40 p-4 sm:p-5 mb-5 shadow-inner">
          <div className="flex items-center gap-2 text-cyan-400 font-rajdhani text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>PERTANYAAN ARENA</span>
          </div>
          <h3 className="font-rajdhani font-extrabold text-lg sm:text-2xl text-slate-100 leading-snug">
            {question.question}
          </h3>
        </div>

        {/* Essay Answer Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-rajdhani text-xs font-bold tracking-widest text-slate-300 uppercase flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>JAWABAN ANDA (ESSAY)</span>
              </label>
              <span className="text-[11px] text-slate-400 font-rajdhani">
                {answer.length} karakter
              </span>
            </div>

            <textarea
              rows={5}
              autoFocus
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                if (error) setError('');
              }}
              placeholder="Tuliskan jawaban penjelasanmu secara lengkap dan terstruktur di sini..."
              className="w-full p-4 rounded-xl bg-[#050e18] border-2 border-slate-700 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,242,254,0.4)] text-white font-rajdhani text-base font-semibold leading-relaxed placeholder-slate-500 outline-none resize-none transition-all"
            />

            {error && (
              <div className="mt-2 text-xs text-rose-400 font-rajdhani font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-400 font-rajdhani leading-normal">
            💡 <em>Catatan: Jawaban essay kamu akan dikirimkan langsung ke Panel Guru untuk diperiksa dan disahkan poinnya.</em>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>KEMBALI KE ARENA</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-[#00f2fe] to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-cinzel font-black text-sm tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(0,242,254,0.6)] hover:shadow-[0_0_35px_rgba(0,242,254,0.9)] cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
            >
              <Send className="w-4 h-4 text-black" />
              <span>KIRIM JAWABAN</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
