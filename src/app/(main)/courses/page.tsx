import { Suspense } from "react";
import { CoursesHeader } from "./header";
import CoursesList from "./list";
import CourseDetailModal from "../modal";

export default function Page() {
  return (
    <Suspense>
      <CoursesHeader />
      <CoursesList />
      <CourseDetailModal />
    </Suspense>
  );
}
