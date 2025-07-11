"use client";

import { Suspense } from "react";
import { CoursesHeader } from "./header";
import CoursesList from "./list";

export default function Page() {
  return (
    <Suspense>
      <CoursesHeader />
      <CoursesList />
    </Suspense>
  );
}
