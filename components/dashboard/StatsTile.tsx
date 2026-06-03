"use client";

import { motion } from "framer-motion";
import { Clock, GraduationCap, Zap } from "lucide-react";

const STATS = [
  { icon: Clock, label: "Hours this week", value: "12.4", unit: "hrs", color: "text-accent-cyan", glow: "rgba(0,229,255,0.1)" },
  { icon: GraduationCap, label: "Completed", value: "8", unit: "modules", color: "text-accent-violet", glow: "rgba(167,139,250,0.1)" },
  { icon: Zap, label: "XP Earned", value: "2.4k", unit: "xp", color: "text-accent-amber", glow: "rgba(245,158,11,0.1)" },
];

export function StatsTile() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
      whileHover={{ scale: 1.01 }}
      className="rounded-2xl border border-bg-border bg-bg-elevated overflow-hidden p-5 flex flex-col gap-4 group"
      aria-label="Learning statistics"
    >
      <header>
        <span className="font-display text-xs font-bold tracking-widest text-white/40 uppercase">
          This Week
        </span>
      </header>

      <div className="flex flex-col gap-3">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 300, damping: 25 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: stat.glow }}
              >
                <Icon size={15} className={stat.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] text-white/30 truncate">{stat.label}</p>
                <p className={`font-display text-lg font-bold leading-none ${stat.color}`}>
                  {stat.value}
                  <span className="text-xs font-normal text-white/30 ml-1">{stat.unit}</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
