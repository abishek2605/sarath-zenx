import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface ThreeDIconProps {
  icon: LucideIcon;
  color?: 'emerald' | 'purple' | 'indigo' | 'amber' | 'slate' | 'rose' | 'blue' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export const ThreeDIcon: React.FC<ThreeDIconProps> = ({
  icon: Icon,
  color = 'slate',
  size = 'md',
  className = '',
  animate = true,
}) => {
  // Theme styling mapping (each theme provides light-mode and responsive properties with realistic 3D shadow and bezel effects)
  const colorThemes = {
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-400 shadow-[0_5px_12px_rgba(16,185,129,0.25),inset_0_2px_0_rgba(255,255,255,0.35),inset_0_-4px_0_rgba(4,120,87,0.4)]',
      glow: 'bg-emerald-400/20',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-600 text-white border-purple-400 shadow-[0_5px_12px_rgba(147,51,234,0.25),inset_0_2px_0_rgba(255,255,255,0.35),inset_0_-4px_0_rgba(109,40,217,0.4)]',
      glow: 'bg-purple-400/20',
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-indigo-400 shadow-[0_5px_12px_rgba(79,70,229,0.25),inset_0_2px_0_rgba(255,255,255,0.35),inset_0_-4px_0_rgba(67,56,202,0.4)]',
      glow: 'bg-indigo-400/20',
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-400 to-amber-550 text-amber-950 border-amber-300 shadow-[0_5px_12px_rgba(245,158,11,0.25),inset_0_2px_0_rgba(255,255,255,0.4),inset_0_-4px_0_rgba(217,119,6,0.4)]',
      glow: 'bg-amber-400/20',
    },
    slate: {
      bg: 'bg-gradient-to-br from-slate-700 to-slate-800 text-white border-slate-600 shadow-[0_5px_12px_rgba(15,23,42,0.25),inset_0_2px_0_rgba(255,255,255,0.2),inset_0_-4px_0_rgba(15,23,42,0.4)]',
      glow: 'bg-slate-400/10',
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-500 to-rose-600 text-white border-rose-400 shadow-[0_5px_12px_rgba(244,63,94,0.25),inset_0_2px_0_rgba(255,255,255,0.35),inset_0_-4px_0_rgba(190,24,74,0.4)]',
      glow: 'bg-rose-400/20',
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400 shadow-[0_5px_12px_rgba(59,130,246,0.25),inset_0_2px_0_rgba(255,255,255,0.35),inset_0_-4px_0_rgba(29,78,216,0.4)]',
      glow: 'bg-blue-400/20',
    },
    white: {
      bg: 'bg-gradient-to-br from-white to-slate-100 text-slate-800 border-white shadow-[0_5px_12px_rgba(15,23,42,0.1),inset_0_2.5px_0_rgba(255,255,255,1),inset_0_-4px_0_rgba(226,232,240,1)]',
      glow: 'bg-slate-200/20',
    }
  };

  const sizeStyles = {
    sm: 'w-8 h-8 rounded-lg text-xs p-1.5 border-[1.5px]',
    md: 'w-10 h-10 rounded-xl text-sm p-2 border-[1.5px]',
    lg: 'w-12 h-12 rounded-2xl text-base p-2.5 border-2',
    xl: 'w-14 h-14 rounded-3xl text-lg p-3 border-2',
  };

  const theme = colorThemes[color] || colorThemes.slate;
  const sizeStyle = sizeStyles[size] || sizeStyles.md;

  return (
    <motion.div
      whileHover={animate ? { scale: 1.1, y: -2, rotate: [0, -3, 3, 0] } : {}}
      whileTap={animate ? { scale: 0.94 } : {}}
      className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden ${theme.bg} ${sizeStyle} ${className}`}
    >
      {/* 3D Glossy Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[30%] bg-white/25 rounded-t-full pointer-events-none" />
      
      {/* Dynamic Animated Glow Backing */}
      {animate && (
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute inset-0 rounded-full blur-md pointer-events-none ${theme.glow}`}
        />
      )}

      {/* The actual Icon */}
      <Icon className="w-full h-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] relative z-10" />
    </motion.div>
  );
};
