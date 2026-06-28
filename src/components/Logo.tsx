import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  variant?: 'emblem' | 'full';
  theme?: 'light' | 'dark'; // light background (dark text) or dark background (white text)
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  theme = 'light',
  height = 44,
}) => {
  const isDark = theme === 'dark';
  const textPrimaryColor = isDark ? 'text-white' : 'text-slate-900';
  const textSecondaryColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const zxBlockColor = isDark ? '#ffffff' : '#0f172a'; // White or Slate-900

  // Calculate proportional widths based on height
  const emblemWidth = height;
  const fullWidth = variant === 'full' ? height * 4 : height;

  return (
    <div 
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      style={{ height }}
    >
      {/* 1. Vector Logo Emblem */}
      <svg
        width={emblemWidth}
        height={height}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          {/* Exact purple-teal-green linear gradient for the arrow */}
          <linearGradient id="zxArrowGradient" x1="10" y1="80" x2="85" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9333ea" /> {/* Purple */}
            <stop offset="50%" stopColor="#06b6d4" /> {/* Teal */}
            <stop offset="100%" stopColor="#22c55e" /> {/* Emerald Green */}
          </linearGradient>

          {/* Mask or drop shadow for the arrow separation */}
          <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Stylized background ZX Monogram */}
        {/* Left 'Z' Block and Right 'X' Block integrated together, leaving gap for arrow */}
        <g id="zx-letters">
          {/* Z Top bar & upper diagonal */}
          <path
            d="M 12 30 L 52 30 C 52 30 52 36 49 41 L 32 63 L 14 63 L 14 55 L 26 39 L 12 39 Z"
            fill={zxBlockColor}
          />
          {/* X Top-right leg */}
          <path
            d="M 54 32 C 57 28 62 25 66 25 L 83 25 L 61 54 L 52 46 Z"
            fill={zxBlockColor}
          />
          {/* Z Bottom bar & X Bottom-right leg */}
          <path
            d="M 10 75 L 56 75 L 64 63 L 73 75 L 83 75 L 67 55 L 59 64 L 33 64 L 10 75 Z"
            fill={zxBlockColor}
          />
        </g>

        {/* Outline / gap mask for the arrow (drawn slightly larger than the arrow in background color) */}
        <path
          d="M 10 71 L 32 49 L 44 61 L 79 17"
          stroke={isDark ? '#020617' : '#ffffff'} // matching background color
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* White arrowhead gap mask */}
        <path
          d="M 70 18 L 82 14 L 86 26 Z"
          fill={isDark ? '#020617' : '#ffffff'}
          stroke={isDark ? '#020617' : '#ffffff'}
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Growth Arrow (Purple -> Teal -> Emerald Gradient) */}
        {/* Animated slide in of the arrow on mount */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          d="M 10 71 L 32 49 L 44 61 L 77 19"
          stroke="url(#zxArrowGradient)"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#logoShadow)"
        />

        {/* Arrowhead */}
        <motion.path
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4, type: "spring" }}
          d="M 68 18 C 72 17 76 16 82 14 C 80 20 79 24 78 28 L 72 24 Z"
          fill="url(#zxArrowGradient)"
          stroke="url(#zxArrowGradient)"
          strokeWidth="2"
          strokeLinejoin="round"
          filter="url(#logoShadow)"
        />
      </svg>

      {/* 2. Text Brand Logo "ZENX ACADEMY" */}
      {variant === 'full' && (
        <div className="flex flex-col justify-center leading-none">
          <span 
            className={`font-black tracking-tight ${textPrimaryColor} text-base sm:text-lg`}
            style={{ fontSize: height * 0.42 }}
          >
            ZENX
          </span>
          <span 
            className={`font-extrabold tracking-[0.2em] ${textSecondaryColor} text-[9px] uppercase mt-0.5`}
            style={{ fontSize: height * 0.20 }}
          >
            ACADEMY
          </span>
        </div>
      )}
    </div>
  );
};
