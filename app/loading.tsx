import { HeroSkeleton, CourseCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      {/* Sidebar skeleton */}
      <aside className="hidden md:flex w-[220px] flex-shrink-0 h-full border-r border-bg-border bg-bg-surface" />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Hero skeleton */}
          <div className="lg:col-span-2">
            <HeroSkeleton />
          </div>
          {/* Stats skeleton */}
          <Skeleton className="h-48 rounded-2xl" />
          {/* Course skeletons */}
          {[0, 1, 2].map((i) => (
            <CourseCardSkeleton key={i} />
          ))}
          {/* Activity skeleton */}
          <Skeleton className="col-span-full h-40 rounded-2xl" />
        </div>
      </main>
    </div>
  );
}
