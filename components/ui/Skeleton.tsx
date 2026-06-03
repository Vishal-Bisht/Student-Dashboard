"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-bg-elevated",
        "before:absolute before:inset-0 before:bg-gradient-to-r",
        "before:from-transparent before:via-white/[0.04] before:to-transparent",
        "before:animate-shimmer before:bg-[length:200%_100%]",
        className
      )}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="rounded-2xl border border-bg-border bg-bg-elevated p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <Skeleton className="h-4 w-40 rounded-md" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <Skeleton className="h-3 w-16 rounded-md" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="rounded-2xl border border-bg-border bg-bg-elevated p-7 flex flex-col gap-4">
      <Skeleton className="h-6 w-48 rounded-md" />
      <Skeleton className="h-10 w-72 rounded-md" />
      <Skeleton className="h-4 w-36 rounded-md" />
    </div>
  );
}
