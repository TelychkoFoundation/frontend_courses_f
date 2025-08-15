import { LessonSkeleton } from "@/components";

export default function Loading() {
  return (
    <div>
      {Array.from({ length: 12 }).map((_, idx) => (
        <LessonSkeleton key={idx} />
      ))}
    </div>
  );
}
