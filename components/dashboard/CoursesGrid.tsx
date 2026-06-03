import { getCourses } from "@/lib/data";
import { CourseCard } from "./CourseCard";
import { CoursesError } from "./CoursesError";

export async function CoursesGrid() {
  let courses;

  try {
    courses = await getCourses();
  } catch (err) {
    const msg = err instanceof Error ? err.message : undefined;
    return <CoursesError message={msg} />;
  }

  if (courses.length === 0) {
    return (
      <div className="col-span-full rounded-2xl border border-bg-border bg-bg-elevated p-6 text-center">
        <p className="font-mono text-xs text-white/30">No courses found. Add some to your Supabase table.</p>
      </div>
    );
  }

  return (
    <>
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </>
  );
}
