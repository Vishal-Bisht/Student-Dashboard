import { Suspense } from "react";
import { Sidebar, BottomNav } from "@/components/dashboard/Sidebar";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { StatsTile } from "@/components/dashboard/StatsTile";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { CoursesGrid } from "@/components/dashboard/CoursesGrid";
import { CoursesLoadingSkeleton } from "@/components/dashboard/CoursesLoadingSkeleton";
import { BookOpen } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      {/* ── Sidebar (hidden on mobile) ── */}
      <aside className="hidden md:flex flex-shrink-0 h-full">
        <Sidebar />
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0" id="main-content">
        {/* Ambient background blobs */}
        <div
          className="pointer-events-none fixed top-0 left-1/3 w-[600px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse, #00E5FF 0%, transparent 70%)", transform: "translateZ(0)" }}
        />
        <div
          className="pointer-events-none fixed bottom-1/4 right-0 w-[500px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(ellipse, #A78BFA 0%, transparent 70%)", transform: "translateZ(0)" }}
        />

        <div className="relative z-10 p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
          {/* ── Bento grid ── */}
          <section
            aria-label="Dashboard overview"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {/* Hero tile — spans 2 cols on lg */}
            <div className="lg:col-span-2">
              <HeroTile />
            </div>

            {/* Stats tile */}
            <div className="md:col-span-1">
              <StatsTile />
            </div>

            {/* ── Courses section heading ── */}
            <div className="col-span-full flex items-center gap-2 mt-2">
              <BookOpen size={14} className="text-white/30" />
              <span className="font-display text-xs tracking-[0.18em] text-white/30 uppercase font-semibold">
                Active Courses
              </span>
            </div>

            {/* Courses grid — fetched via Server Component + Suspense */}
            <Suspense fallback={<CoursesLoadingSkeleton />}>
              <CoursesGrid />
            </Suspense>

            {/* Activity tile — spans full width */}
            <div className="col-span-full">
              <ActivityTile />
            </div>
          </section>
        </div>
      </main>

      {/* ── Mobile bottom nav ── */}
      <BottomNav />
    </div>
  );
}
