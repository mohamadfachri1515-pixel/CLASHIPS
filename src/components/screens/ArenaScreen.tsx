import React from 'react';
import { CardFrame } from '../common/CardFrame';
import { Question, Player, CardVisualStatus, AnswerSubmission, GameSettings } from '../../types/game';
import { Trophy, User, Sparkles, AlertCircle } from 'lucide-react';

interface ArenaScreenProps {
  questions: Question[];
  player: Player;
  submissions: AnswerSubmission[];
  settings: GameSettings;
  onSelectQuestion: (question: Question) => void;
  onOpenRanking: () => void;
  onChangePlayer?: () => void;
}

export const ArenaScreen: React.FC<ArenaScreenProps> = ({
  questions,
  player,
  submissions,
  settings,
  onSelectQuestion,
  onOpenRanking,
  onChangePlayer,
}) => {
  // Compute visual status for each card for this player
  const getCardStatus = (cardId: number): CardVisualStatus => {
    const cardSubs = submissions.filter(
      (s) => s.playerId === player.id && s.cardId === cardId
    );

    if (cardSubs.length === 0) {
      return 'AVAILABLE';
    }

    // Check if any submission was marked CORRECT
    const hasCorrect = cardSubs.some((s) => s.status === 'CORRECT');
    if (hasCorrect) return 'CORRECT';

    // Check if latest submission is PENDING
    const latest = cardSubs[0]; // submissions are unshifted (latest first)
    if (latest.status === 'PENDING') return 'PENDING';

    if (latest.status === 'WRONG') {
      return settings.allowRetryOnWrong ? 'WRONG' : 'LOCKED';
    }

    return 'AVAILABLE';
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] w-full bg-[#070b14] bg-arena-grid p-3 sm:p-6 flex flex-col items-center">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Player Status & Level Legend Bar */}
      <div className="w-full max-w-7xl relative z-10 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#0c1a2b]/95 via-[#08121f]/95 to-[#0c1a2b]/95 border border-cyan-500/40 shadow-xl backdrop-blur-md">
        {/* Player Profile & Score */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-900 to-slate-950 border border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.4)]">
            <User className="w-6 h-6 text-cyan-300" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-rajdhani text-xs uppercase tracking-widest text-slate-400 font-bold">
                PETANDING ARENA:
              </span>
              <span className="font-rajdhani text-lg font-extrabold text-white">
                {player.name}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-0.5">
              <div className="flex items-center gap-1">
                <span className="font-rajdhani text-xs text-slate-400">Total Skor:</span>
                <span className="font-cinzel text-base font-black text-amber-400">
                  {player.score} PTS
                </span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-1">
                <span className="font-rajdhani text-xs text-slate-400">Kartu Selesai:</span>
                <span className="font-rajdhani text-sm font-bold text-emerald-400">
                  {player.correctCards.length} / {questions.length}
                </span>
              </div>
              {onChangePlayer && (
                <>
                  <span className="text-slate-600">·</span>
                  <button
                    onClick={onChangePlayer}
                    className="text-[11px] font-bold text-cyan-400 hover:text-cyan-200 underline cursor-pointer"
                  >
                    Ganti Peserta
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Level Badges & Quick Rank Button */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-rajdhani font-bold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/50 text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#ffb703]" />
            <span>LEVEL 1: 100 PTS (MUDAH)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/50 text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>LEVEL 2: 200 PTS (MENENGAH)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/50 text-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-400 shadow-[0_0_8px_#fb7185]" />
            <span>LEVEL 3: 300 PTS (SULIT)</span>
          </div>

          <button
            onClick={onOpenRanking}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(255,183,3,0.4)] cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-black" />
            <span>LIHAT RANKING</span>
          </button>
        </div>
      </div>

      {/* Instructions banner */}
      <div className="w-full max-w-7xl relative z-10 mb-4 px-2 flex items-center justify-between text-xs font-rajdhani text-slate-400">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Klik kartu mana pun untuk membuka pertanyaan essay. Anda bebas memilih dan menyelesaikan kartu dalam urutan apa pun!</span>
        </span>
        <span className="hidden sm:inline text-cyan-400 font-semibold">
          30 Kartu Tantangan Tersedia
        </span>
      </div>

      {/* THE 30 CARDS 5x6 GRID (DESKTOP: 5 COLUMNS X 6 ROWS, RESPONSIVE ON MOBILE/TABLET) */}
      <div className="w-full max-w-7xl relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 pb-12">
        {questions.map((question) => {
          const status = getCardStatus(question.id);
          return (
            <CardFrame
              key={question.id}
              cardNumber={question.cardNumber}
              level={question.level}
              points={question.points}
              status={status}
              onClick={() => onSelectQuestion(question)}
            />
          );
        })}
      </div>
    </div>
  );
};
