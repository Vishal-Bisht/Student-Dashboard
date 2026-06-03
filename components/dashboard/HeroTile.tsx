"use client";

import { motion } from "framer-motion";
import { Flame, Star, ArrowUpRight } from "lucide-react";

const STREAK_DAYS = 14;

export function HeroTile() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
      whileHover={{ scale: 1.012 }}
      whileTap={{ scale: 0.995 }}
      className="relative col-span-2 row-span-1 rounded-2xl border border-bg-border bg-bg-elevated overflow-hidden p-7 flex flex-col justify-between min-h-[180px] cursor-default group"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-glow-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none"
        style={{ backgroundSize: "32px 32px" }}
      />

      {/* Accent line top */}
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[10px] tracking-[0.2em] text-accent-cyan/70 uppercase">
            Welcome back
          </span>
          <Star size={10} className="text-accent-cyan/50" />
        </div>
        <h1 className="font-display text-3xl font-bold text-white tracking-tight leading-none">
          Vishal Bist
        </h1>
        <p className="font-body text-sm text-white/40 mt-1.5">
          Continue where you left off — you&apos;re on a roll.
        </p>
      </div>

      {/* Streak badge */}
      <div className="relative z-10 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-xl px-4 py-2">
          <Flame size={16} className="text-amber-400 animate-pulse_glow" />
          <span className="font-display text-sm font-bold text-amber-300">
            {STREAK_DAYS}-day streak
          </span>
        </div>

        {/* Mini streak bar */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: 0.3 + i * 0.05,
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              className={`w-1.5 rounded-full origin-bottom ${
                i < 6 ? "h-5 bg-amber-400" : "h-3 bg-amber-400/30"
              }`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ x: 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="ml-auto flex items-center gap-1.5 font-mono text-xs text-accent-cyan/60 hover:text-accent-cyan transition-colors"
        >
          View progress <ArrowUpRight size={12} />
        </motion.button>
      </div>
    </motion.article>
  );
}
