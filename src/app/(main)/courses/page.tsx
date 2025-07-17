import { Suspense } from "react";
import { CoursesHeader } from "./coursesHeader";
import CoursesList from "./coursesList";
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
