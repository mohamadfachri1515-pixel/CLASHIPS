import React from 'react';
import { CardVisualStatus } from '../../types/game';

interface CardFrameProps {
  cardNumber: number;
  level: 1 | 2 | 3;
  points: number;
  status?: CardVisualStatus;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const CardFrame: React.FC<CardFrameProps> = ({
  cardNumber,
  level,
  points,
  status = 'AVAILABLE',
  onClick,
  disabled = false,
  className = '',
}) => {
  const formattedNumber = cardNumber < 10 ? `0${cardNumber}` : `${cardNumber}`;

  // Level visual styles
  const levelText = `LEVEL ${level} | ${points} POIN`;
  const levelColor =
    level === 1
      ? 'text-[#ffdd53]' // Gold
      : level === 2
      ? 'text-[#4ef2bb]' // Emerald/Teal
      : 'text-[#ff6584]'; // Ruby/Neon Red-Orange

  // Status border & glow configurations
  let statusGlowClass = 'hover:border-[#00f2fe] hover:shadow-[0_0_25px_rgba(0,242,254,0.45)]';
  let badgeInfo: { text: string; bg: string; border: string; textCol: string } | null = null;

  if (status === 'SELECTED') {
    statusGlowClass = 'border-[#00f2fe] shadow-[0_0_30px_rgba(0,242,254,0.7)] scale-[1.02]';
  } else if (status === 'PENDING') {
    statusGlowClass = 'border-[#ffb703] shadow-[0_0_25px_rgba(255,183,3,0.6)] animate-pulse';
    badgeInfo = {
      text: 'MENUNGGU VALIDASI',
      bg: 'bg-amber-950/90',
      border: 'border-amber-500/80',
      textCol: 'text-amber-300',
    };
  } else if (status === 'CORRECT') {
    statusGlowClass = 'border-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.7)]';
    badgeInfo = {
      text: `✓ TERSELESAIKAN (+${points})`,
      bg: 'bg-emerald-950/90',
      border: 'border-emerald-400/80',
      textCol: 'text-emerald-300',
    };
  } else if (status === 'WRONG') {
    statusGlowClass = 'border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.5)] opacity-90';
    badgeInfo = {
      text: '✕ BELUM TEPAT',
      bg: 'bg-rose-950/90',
      border: 'border-rose-500/80',
      textCol: 'text-rose-300',
    };
  } else if (status === 'LOCKED') {
    statusGlowClass = 'border-slate-800 opacity-50 grayscale hover:scale-100 cursor-not-allowed';
  }

  return (
    <div
      onClick={!disabled && status !== 'LOCKED' ? onClick : undefined}
      className={`group relative flex flex-col items-center select-none transition-all duration-300 ${
        disabled || status === 'LOCKED' ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
    >
      {/* Outer Fantasy Metallic Card Container */}
      <div
        className={`relative w-full aspect-[4/5.6] rounded-xl bg-gradient-to-b from-[#0e1d2c] via-[#091522] to-[#050b12] p-3 flex flex-col items-center justify-between border-2 border-slate-700/80 overflow-hidden backdrop-blur-md transition-all duration-300 ${statusGlowClass}`}
      >
        {/* Subtle Metallic Diagonal Shine Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
          <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:animate-shine" />
        </div>

        {/* TOP CREST: Metallic Wings & Glowing Gem */}
        <div className="relative w-full flex flex-col items-center z-10 pt-1">
          {/* Wings & Gem SVG Illustration */}
          <div className="relative w-28 h-7 flex items-center justify-center">
            {/* Left Wing */}
            <svg
              className="absolute left-1 top-0 w-12 h-6 text-cyan-400 drop-shadow-[0_0_6px_rgba(0,242,254,0.8)]"
              viewBox="0 0 50 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 20 C35 18, 15 12, 2 2 C8 12, 25 22, 50 24 Z"
                fill="url(#wingGradientL)"
                stroke="#00f2fe"
                strokeWidth="1"
              />
              <path
                d="M45 15 C30 14, 18 8, 8 6 C16 12, 32 18, 45 18 Z"
                fill="#00f2fe"
                opacity="0.6"
              />
              <defs>
                <linearGradient id="wingGradientL" x1="0" y1="0" x2="50" y2="25">
                  <stop stopColor="#00f2fe" />
                  <stop offset="1" stopColor="#0a3242" />
                </linearGradient>
              </defs>
            </svg>

            {/* Central Hexagonal Glowing Cyan Gem */}
            <div className="relative z-20 w-4 h-5 flex items-center justify-center">
              <div className="w-3.5 h-4.5 bg-gradient-to-b from-[#bbf7fc] via-[#00f2fe] to-[#047481] clip-hex shadow-[0_0_12px_#00f2fe] border border-cyan-200" />
            </div>

            {/* Right Wing */}
            <svg
              className="absolute right-1 top-0 w-12 h-6 text-cyan-400 drop-shadow-[0_0_6px_rgba(0,242,254,0.8)]"
              viewBox="0 0 50 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 20 C15 18, 35 12, 48 2 C42 12, 25 22, 0 24 Z"
                fill="url(#wingGradientR)"
                stroke="#00f2fe"
                strokeWidth="1"
              />
              <path
                d="M5 15 C20 14, 32 8, 42 6 C34 12, 18 18, 5 18 Z"
                fill="#00f2fe"
                opacity="0.6"
              />
              <defs>
                <linearGradient id="wingGradientR" x1="50" y1="0" x2="0" y2="25">
                  <stop stopColor="#00f2fe" />
                  <stop offset="1" stopColor="#0a3242" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Logo Title: CLASH OF CHAMPIONS */}
          <div className="mt-0.5 text-center">
            <span className="font-cinzel tracking-wider text-[11px] sm:text-[13px] font-black text-metallic-silver block leading-none">
              CLASH OF
            </span>
            <span className="font-cinzel tracking-widest text-[13px] sm:text-[15px] font-black text-metallic-silver block leading-tight">
              CHAMPIONS
            </span>
          </div>

          {/* KARTU #XX Plaque / Ribbon */}
          <div className="mt-1.5 relative px-3 py-0.5 bg-gradient-to-r from-cyan-950 via-[#072430] to-cyan-950 border border-cyan-400/80 rounded shadow-[0_0_10px_rgba(0,242,254,0.4)] flex items-center justify-center">
            <span className="font-rajdhani font-bold tracking-widest text-[11px] sm:text-[12px] text-cyan-300 leading-none">
              KARTU #{formattedNumber}
            </span>
          </div>

          {/* LEVEL & POINTS (Metallic Gold text) */}
          <div className="mt-1 flex items-center justify-center gap-1">
            <span
              className={`font-rajdhani font-extrabold tracking-wider text-[10px] sm:text-[11px] ${levelColor} drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]`}
            >
              {levelText}
            </span>
          </div>
        </div>

        {/* CENTER INNER FRAME: Challenge Chamber */}
        <div className="relative w-full flex-1 my-2 rounded-lg bg-gradient-to-b from-[#061421] via-[#040e18] to-[#02070d] border border-cyan-500/30 flex flex-col items-center justify-center p-2 overflow-hidden shadow-inner">
          {/* Subtle Cyber Grid in chamber */}
          <div className="absolute inset-0 bg-[radial-gradient(#00f2fe_1px,transparent_1px)] [background-size:12px_12px] opacity-15" />

          {/* Corner Metallic Claws */}
          <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/70" />
          <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/70" />
          <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/70" />
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/70" />

          {/* Central Holographic Emblem / Status Badge */}
          {badgeInfo ? (
            <div
              className={`z-10 px-2 py-1.5 rounded-md border text-center ${badgeInfo.bg} ${badgeInfo.border} shadow-lg`}
            >
              <span
                className={`font-rajdhani font-bold text-[10px] sm:text-[11px] tracking-wide block ${badgeInfo.textCol}`}
              >
                {badgeInfo.text}
              </span>
            </div>
          ) : (
            <div className="z-10 flex flex-col items-center justify-center text-center opacity-85 group-hover:opacity-100 transition-opacity">
              {/* Challenge Arena Emblem */}
              <div className="w-10 h-10 rounded-full border border-cyan-400/40 bg-cyan-950/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.2)] group-hover:shadow-[0_0_20px_rgba(0,242,254,0.6)] group-hover:border-cyan-300 transition-all">
                <span className="font-cinzel text-cyan-300 font-black text-sm">
                  {formattedNumber}
                </span>
              </div>
              <span className="font-rajdhani text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1.5 group-hover:text-cyan-300 transition-colors">
                BUKA TANTANGAN
              </span>
            </div>
          )}
        </div>

        {/* BOTTOM METALLIC PRONGS & FACETED GEM */}
        <div className="relative w-full flex items-center justify-center z-10 pb-0.5">
          {/* Bottom Prongs */}
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-slate-500 to-transparent absolute" />
          {/* Glowing bottom gem */}
          <div className="relative w-3.5 h-3.5 bg-gradient-to-br from-cyan-200 via-cyan-400 to-[#025a66] rotate-45 border border-cyan-100 shadow-[0_0_10px_#00f2fe] flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};
