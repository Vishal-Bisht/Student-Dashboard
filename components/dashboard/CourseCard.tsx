"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import * as LucideIcons from "lucide-react";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  index: number;
}

const ACCENT_COLORS = [
  { bar: "#00E5FF", glow: "rgba(0,229,255,0.12)", border: "rgba(0,229,255,0.2)", text: "text-accent-cyan" },
  { bar: "#A78BFA", glow: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.2)", text: "text-accent-violet" },
  { bar: "#10B981", glow: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.2)", text: "text-accent-emerald" },
  { bar: "#F59E0B", glow: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.2)", text: "text-accent-amber" },
];

function DynamicIcon({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) {
  // Lucide icons are PascalCase
  const pascal = name
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[pascal] as React.FC<{ size?: number; className?: string }>;
  if (!Icon) return <LucideIcons.BookOpen size={size} className={className} />;
  return <Icon size={size} className={className} />;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.15 + index * 0.08,
      }}
      whileHover={{ scale: 1.018 }}
      className="relative rounded-2xl border bg-bg-elevated overflow-hidden p-5 flex flex-col gap-4 cursor-default group"
      style={{
        borderColor: "rgb(30,39,51)",
      }}
      whileTap={{ scale: 0.995 }}
    >
      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 0 1px ${accent.border}` }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle gradient accent on top-left */}
      <div
        className="absolute top-0 left-0 w-32 h-32 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
      />

      {/* Header */}
      <header className="relative z-10 flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: accent.glow, border: `1px solid ${accent.border}` }}
        >
          <DynamicIcon name={course.icon_name} size={18} className={accent.text} />
        </div>
        <h2 className="font-body text-sm font-semibold text-white/90 leading-snug line-clamp-2">
          {course.title}
        </h2>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="w-full h-1.5 rounded-full bg-bg-border overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: `${course.progress}%` } : { width: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 + index * 0.08 }}
            style={{ background: `linear-gradient(90deg, ${accent.bar}80, ${accent.bar})` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-white/30">Progress</span>
          <motion.span
            className="font-mono text-[11px] font-bold"
            style={{ color: accent.bar }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 + index * 0.08 }}
          >
            {course.progress}%
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}
