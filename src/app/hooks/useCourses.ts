import { useContext } from "react";
import { CoursesContext } from "@/context";

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCoursesContext must be used within a CoursesProvider");
  }
  return context;
};
