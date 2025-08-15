"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { CourseKeyTypes, ICourse } from "@/typings";
import { useParams } from "next/navigation";
import { getCurrentCourse } from "@/actions";

interface CoursesContextType {
  allCourses: ICourse[] | null;
  myCourses: ICourse[] | null;
  setAllCourses: (allCourses: ICourse[]) => void;
  setMyCourses: (myCourses: ICourse[]) => void;
  currentCourse: ICourse | null;
  setCurrentCourse: (currentCourse: ICourse) => void;
  currentCourseDetailsVisibility: boolean;
  setCurrentCourseDetailsVisibility: (visible: boolean) => void;
}

export const CoursesContext = createContext<CoursesContextType | undefined>(
  undefined,
);

export const CoursesProvider = ({ children }: { children: ReactNode }) => {
  const [allCourses, setAllCourses] = useState<ICourse[] | null>(null);
  const [myCourses, setMyCourses] = useState<ICourse[] | null>(null);
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
  const [currentCourseDetailsVisibility, setCurrentCourseDetailsVisibility] =
    useState<boolean>(false);

  const params = useParams();

  useEffect(() => {
    if (params.slug) {
      const getCurrentCourseHandler = async () => {
        const { success, data } = await getCurrentCourse(
          params.slug as CourseKeyTypes,
        );

        if (!success) {
          return;
        }

        setCurrentCourse(data);
      };

      getCurrentCourseHandler();
    }
  }, [params.slug]);

  return (
    <CoursesContext.Provider
      value={{
        allCourses,
        setAllCourses,
        myCourses,
        setMyCourses,
        currentCourse,
        setCurrentCourse,
        currentCourseDetailsVisibility,
        setCurrentCourseDetailsVisibility,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
