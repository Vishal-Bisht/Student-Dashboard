import { CourseCardSkeleton } from "@/components/ui/Skeleton";

export function CoursesLoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </>
  );
}
