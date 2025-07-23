"use client";

import { useEffect } from "react";
import { Drawer } from "@/components";
import { QueryDrawerType, CourseKeyTypes } from "@/typings";
import CourseDetailDrawerContent from "../drawerContent";
import { getCurrentCourse } from "@/actions";
import { useCourses, useQuery } from "@/hooks";

export default function DrawerWrapper() {
  const { getQueryString } = useQuery();
  const { setCurrentCourse, currentCourse } = useCourses();

  const courseKey = getQueryString(QueryDrawerType.CourseDetailsDrawer);

  useEffect(() => {
    if (courseKey) {
      const getCurrentCourseAsync = async () => {
        const response = await getCurrentCourse(courseKey as CourseKeyTypes);

        if (response.success) {
          setCurrentCourse(response.data);
        }
      };

      getCurrentCourseAsync();
    }
  }, []);

  return (
    <Drawer
      drawerID={QueryDrawerType.CourseDetailsDrawer}
      title={currentCourse?.title || ""}
    >
      {currentCourse ? (
        <CourseDetailDrawerContent currentCourse={currentCourse} />
      ) : null}
    </Drawer>
  );
}
