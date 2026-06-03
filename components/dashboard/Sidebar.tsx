"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  User,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "My Courses", icon: BookOpen },
  { id: "achievements", label: "Achievements", icon: Trophy },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.nav
      initial={false}
      animate={{ width: collapsed ? 68 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative flex flex-col h-full bg-bg-surface border-r border-bg-border overflow-visible ${className ?? ""}`}
      aria-label="Primary navigation"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-bg-border min-h-[68px]">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center">
            <Zap size={16} className="text-accent-cyan" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="font-display text-sm font-bold tracking-widest text-white uppercase whitespace-nowrap"
              >
                Edgelearn
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse toggle */}
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          animate={{
            right: collapsed ? -36 : 12,
          }}
          className={`flex-shrink-0 w-6 h-6 rounded-full bg-bg-elevated border border-bg-border flex items-center justify-center hover:border-accent-cyan/40 hover:text-accent-cyan transition-colors text-white/40 z-10 absolute`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </motion.button>
      </div>

      {/* Nav items */}
      <ul className="flex flex-col gap-1 p-2 pt-4 flex-1" role="list">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActive(item.id)}
                className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-150 group"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-highlight"
                    className="absolute inset-0 rounded-xl bg-accent-cyan/10 border border-accent-cyan/25"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`relative z-10 flex-shrink-0 transition-colors ${
                    isActive
                      ? "text-accent-cyan"
                      : "text-white/40 group-hover:text-white/70"
                  }`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className={`relative z-10 font-body text-sm whitespace-nowrap transition-colors ${
                        isActive
                          ? "text-white font-medium"
                          : "text-white/40 group-hover:text-white/70"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ul>

      {/* User profile */}
      <div className="p-2 border-t border-bg-border">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-bg-elevated transition-colors group">
          <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-violet/20 border border-accent-violet/40 flex items-center justify-center">
            <User size={13} className="text-accent-violet" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="flex flex-col items-start"
              >
                <span className="font-body text-xs text-white/80 font-medium">
                  Vishal Bist
                </span>
                <span className="font-mono text-[10px] text-white/30">
                  Pro Plan
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.nav>
  );
}

/* ─── Bottom mobile nav ─── */
export function BottomNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-bg-surface/90 backdrop-blur-md border-t border-bg-border md:hidden"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around px-2 py-2" role="list">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActive(item.id)}
                className="relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg"
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="bottom-nav-highlight"
                    className="absolute inset-0 rounded-lg bg-accent-cyan/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`relative z-10 transition-colors ${
                    isActive ? "text-accent-cyan" : "text-white/30"
                  }`}
                />
                <span
                  className={`relative z-10 font-mono text-[9px] transition-colors ${
                    isActive ? "text-accent-cyan" : "text-white/30"
                  }`}
                >
                  {item.label.split(" ")[0]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
