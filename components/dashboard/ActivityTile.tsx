"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { generateActivityData, getIntensityClass } from "@/lib/activity";
import { Activity } from "lucide-react";

export function ActivityTile() {
  const [data, setData] = useState<ReturnType<
    typeof generateActivityData
  > | null>(null);

  useEffect(() => {
    setData(generateActivityData());
  }, []);

  // Group into weeks (columns) for the grid
  if (!data) {
    return null; // Don't render until client-side data is ready
  }

  const weeks: (typeof data)[] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const totalContributions = data.reduce((sum, d) => sum + d.count, 0);
  const activeDays = data.filter((d) => d.count > 0).length;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.4 }}
      whileHover={{ scale: 1.008 }}
      className="relative rounded-2xl border border-bg-border bg-bg-elevated overflow-hidden p-5 flex flex-col gap-4 group"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 bg-glow-violet opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <header className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-accent-violet" />
          <span className="font-display text-xs font-bold tracking-widest text-white/60 uppercase">
            Learning Activity
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-white/30">
            {activeDays} active days
          </span>
          <span className="font-mono text-xs font-bold text-accent-violet">
            {totalContributions} sessions
          </span>
        </div>
      </header>

      {/* Contribution grid */}
      <div className="relative z-10 flex gap-1 overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <motion.div
                key={day.date}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.45 + wi * 0.015 + di * 0.005,
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                title={`${day.date}: ${day.count} sessions`}
                className={`w-2.5 h-2.5 rounded-sm ${getIntensityClass(day.count)} transition-colors hover:ring-1 hover:ring-white/20`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="relative z-10 flex items-center gap-1.5 justify-end">
        <span className="font-mono text-[9px] text-white/25">Less</span>
        {[0, 2, 4, 6, 9].map((count) => (
          <div
            key={count}
            className={`w-2.5 h-2.5 rounded-sm ${getIntensityClass(count)}`}
          />
        ))}
        <span className="font-mono text-[9px] text-white/25">More</span>
      </div>
    </motion.article>
  );
}
