"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

export function CoursesError({ message }: { message?: string }) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 flex flex-col items-center justify-center gap-3 text-center col-span-full">
      <AlertTriangle size={22} className="text-rose-400" />
      <div>
        <p className="font-body text-sm font-medium text-rose-300">Failed to load courses</p>
        <p className="font-mono text-[11px] text-white/30 mt-1">
          {message ?? "Could not connect to the database."}
        </p>
      </div>
      <button
        onClick={() => router.refresh()}
        className="flex items-center gap-2 font-mono text-xs text-rose-400 hover:text-rose-300 transition-colors mt-1"
      >
        <RefreshCw size={12} />
        Try again
      </button>
    </div>
  );
}
