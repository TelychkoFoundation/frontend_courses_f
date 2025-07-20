import { Suspense } from "react";
import CoursesHeader from "./coursesHeader";
import CoursesList from "./coursesList";
import DrawerWrapper from "../drawerContent/wrapper";

export default function Page() {
  return (
    <Suspense>
      <CoursesHeader />
      <CoursesList />
      <DrawerWrapper />
    </Suspense>
  );
}
