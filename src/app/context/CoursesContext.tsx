"use client";

import { createContext, useState, ReactNode } from "react";
import { ICourse } from "../models/Course";

interface CoursesContextType {
  allCourses: ICourse[] | null;
  myCourses: ICourse[] | null;
  setAllCourses: (allCourses: ICourse[]) => void;
  setMyCourses: (myCourses: ICourse[]) => void;
  currentCourse: ICourse | null;
  setCurrentCourse: (currentCourse: ICourse) => void;
}

export const CoursesContext = createContext<CoursesContextType | undefined>(
  undefined,
);

export const CoursesProvider = ({ children }: { children: ReactNode }) => {
  const [allCourses, setAllCourses] = useState<ICourse[] | null>(null);
  const [myCourses, setMyCourses] = useState<ICourse[] | null>(null);
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);

  return (
    <CoursesContext.Provider
      value={{
        allCourses,
        setAllCourses,
        myCourses,
        setMyCourses,
        currentCourse,
        setCurrentCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
