import React, { useState } from 'react';
import { Trophy, Download, Search, ArrowLeft, Medal, Sparkles } from 'lucide-react';
import { Player } from '../../types/game';
import { exportRankingToCSV } from '../../services/storage';

interface RankingScreenProps {
  players: Player[];
  onBackToArena: () => void;
  currentPlayerId?: string | null;
}

export const RankingScreen: React.FC<RankingScreenProps> = ({
  players,
  onBackToArena,
  currentPlayerId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sort players by:
  // 1. Total score descending
  // 2. Correct cards count descending
  // 3. Earliest createdAt ascending
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.correctCards.length !== a.correctCards.length) return b.correctCards.length - a.correctCards.length;
    return a.createdAt - b.createdAt;
  });

  const filteredPlayers = sortedPlayers.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top1 = sortedPlayers[0];
  const top2 = sortedPlayers[1];
  const top3 = sortedPlayers[2];

  return (
    <div className="relative min-h-screen w-full bg-[#070b14] bg-arena-grid p-4 sm:p-8 flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-5xl relative z-10 flex flex-col flex-1">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <button
            onClick={onBackToArena}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white font-rajdhani font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>KEMBALI KE ARENA</span>
          </button>

          <div className="text-center">
            <h1 className="font-cinzel text-3xl sm:text-4xl font-black text-metallic-gold tracking-widest flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-amber-400" />
              <span>CHAMPION RANKING</span>
              <Trophy className="w-8 h-8 text-amber-400" />
            </h1>
            <p className="font-rajdhani text-sm sm:text-base text-cyan-300 font-semibold mt-1">
              Papan Peringkat Turnamen IPS: Perubahan Iklim
            </p>
          </div>

          <button
            onClick={() => exportRankingToCSV(players)}
            disabled={players.length === 0}
            className="self-end sm:self-auto px-4 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/60 text-emerald-300 font-rajdhani font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT CSV</span>
          </button>
        </div>

        {/* TOP 3 PODIUM DISPLAY */}
        {sortedPlayers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* RUNNER UP (#2) */}
            <div className="order-2 md:order-1 rounded-2xl bg-gradient-to-b from-[#111e30] to-[#070e18] border-2 border-slate-400/50 p-5 flex flex-col items-center text-center shadow-[0_0_25px_rgba(148,163,184,0.2)]">
              <div className="w-14 h-14 rounded-full bg-slate-700/80 border-2 border-slate-300 flex items-center justify-center shadow-lg text-2xl mb-3">
                🥈
              </div>
              <span className="font-cinzel text-xs font-black tracking-widest text-slate-300 uppercase">
                RUNNER UP
              </span>
              <h3 className="font-rajdhani font-extrabold text-xl text-white mt-1 max-w-full truncate">
                {top2 ? top2.name : '-'}
              </h3>
              <div className="mt-2 font-cinzel text-2xl font-black text-slate-200">
                {top2 ? top2.score : 0} <span className="text-xs font-normal text-slate-400">PTS</span>
              </div>
              <div className="text-xs text-slate-400 font-rajdhani mt-1">
                {top2 ? `${top2.correctCards.length} Kartu Terjawab` : '0 Kartu'}
              </div>
            </div>

            {/* CHAMPION (#1) */}
            <div className="order-1 md:order-2 rounded-2xl bg-gradient-to-b from-[#221c0b] via-[#161204] to-[#0a0701] border-2 border-amber-400 p-6 flex flex-col items-center text-center shadow-[0_0_40px_rgba(255,183,3,0.5)] md:-translate-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
              <div className="w-18 h-18 rounded-full bg-gradient-to-b from-amber-300 to-amber-600 border-2 border-amber-200 flex items-center justify-center shadow-[0_0_25px_rgba(255,183,3,0.8)] text-3xl mb-3 animate-pulse">
                🥇
              </div>
              <span className="font-cinzel text-sm font-black tracking-widest text-amber-400 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>CHAMPION OF THE ARENA</span>
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="font-rajdhani font-black text-2xl sm:text-3xl text-white mt-1 max-w-full truncate drop-shadow">
                {top1 ? top1.name : '-'}
              </h3>
              <div className="mt-2 font-cinzel text-3xl sm:text-4xl font-black text-metallic-gold">
                {top1 ? top1.score : 0} <span className="text-sm font-normal text-amber-300">PTS</span>
              </div>
              <div className="text-sm text-cyan-300 font-rajdhani font-bold mt-1">
                {top1 ? `${top1.correctCards.length} Kartu Diselesaikan` : '0 Kartu'}
              </div>
            </div>

            {/* THIRD PLACE (#3) */}
            <div className="order-3 md:order-3 rounded-2xl bg-gradient-to-b from-[#1f170f] to-[#0d0905] border-2 border-amber-700/50 p-5 flex flex-col items-center text-center shadow-[0_0_25px_rgba(180,83,9,0.2)]">
              <div className="w-14 h-14 rounded-full bg-amber-900/80 border-2 border-amber-600 flex items-center justify-center shadow-lg text-2xl mb-3">
                🥉
              </div>
              <span className="font-cinzel text-xs font-black tracking-widest text-amber-600 uppercase">
                THIRD PLACE
              </span>
              <h3 className="font-rajdhani font-extrabold text-xl text-white mt-1 max-w-full truncate">
                {top3 ? top3.name : '-'}
              </h3>
              <div className="mt-2 font-cinzel text-2xl font-black text-amber-500">
                {top3 ? top3.score : 0} <span className="text-xs font-normal text-amber-400">PTS</span>
              </div>
              <div className="text-xs text-slate-400 font-rajdhani mt-1">
                {top3 ? `${top3.correctCards.length} Kartu Terjawab` : '0 Kartu'}
              </div>
            </div>
          </div>
        )}

        {/* SEARCH BAR & CONTROLS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama peserta..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700 focus:border-cyan-400 rounded-xl text-white font-rajdhani text-sm outline-none transition-colors"
            />
          </div>

          <div className="text-xs font-rajdhani text-slate-400 font-semibold">
            Total Peserta: <strong className="text-cyan-300">{players.length}</strong>
          </div>
        </div>

        {/* FULL LEADERBOARD TABLE */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0a1626] to-[#040912] border-2 border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-rajdhani">
              <thead>
                <tr className="bg-[#0e2137] border-b border-slate-700/80 text-xs font-bold uppercase tracking-widest text-cyan-300">
                  <th className="py-3.5 px-4 text-center w-16">RANK</th>
                  <th className="py-3.5 px-4">NAMA PESERTA</th>
                  <th className="py-3.5 px-4 text-center">TOTAL POIN</th>
                  <th className="py-3.5 px-4 text-center">KARTU BENAR</th>
                  <th className="py-3.5 px-4 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-sm">
                {filteredPlayers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-500 font-medium">
                      {players.length === 0
                        ? 'Belum ada peserta yang bermain di turnamen ini.'
                        : 'Tidak ada peserta yang cocok dengan pencarian.'}
                    </td>
                  </tr>
                ) : (
                  filteredPlayers.map((player) => {
                    const rank = sortedPlayers.findIndex((p) => p.id === player.id) + 1;
                    const isCurrent = player.id === currentPlayerId;

                    return (
                      <tr
                        key={player.id}
                        className={`transition-colors ${
                          isCurrent
                            ? 'bg-cyan-950/40 border-l-4 border-l-cyan-400'
                            : 'hover:bg-slate-900/50'
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center font-bold">
                          {rank === 1 ? (
                            <span className="text-lg">🥇</span>
                          ) : rank === 2 ? (
                            <span className="text-lg">🥈</span>
                          ) : rank === 3 ? (
                            <span className="text-lg">🥉</span>
                          ) : (
                            <span className="text-slate-400">#{rank}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-base">{player.name}</span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-900/80 text-cyan-200 border border-cyan-500 font-extrabold uppercase">
                                ANDA
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">
                            Bergabung: {new Date(player.createdAt).toLocaleTimeString('id-ID')}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-cinzel font-black text-amber-400 text-lg">
                            {player.score}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-bold text-emerald-400 text-base">
                            {player.correctCards.length}
                          </span>
                          <span className="text-xs text-slate-500 ml-1">/ 30</span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {player.score > 0 ? (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/50">
                              CHAMPION
                            </span>
                          ) : (
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-slate-400 border border-slate-700">
                              CONTENDER
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
