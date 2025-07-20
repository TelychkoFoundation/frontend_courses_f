"use client";

import { createContext, useState, ReactNode } from "react";
import { ICourse } from "@/typings";
import { getAllCourses, deleteCourseById } from "@/lib";

interface AdminContextType {
  courses: ICourse[];
  activeCourse: ICourse | null;
  loading: boolean;
  setActiveCourse: (course: ICourse | null) => void;
  deleteCourse: (id: string) => Promise<void>;
  fetchCourses: () => void;
}

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined,
);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [activeCourse, setActiveCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCourses = async () => {
    setLoading(true);
    const result = await getAllCourses();

    if (result.success) {
      setCourses(result.data);
    }
    setLoading(false);
  };

  const deleteCourse = async (id: string) => {
    await deleteCourseById(id);
    setCourses(prev => prev.filter(course => course.id !== id));
    if (activeCourse?.id === id) {
      setActiveCourse(null);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        courses,
        activeCourse,
        loading,
        setActiveCourse,
        deleteCourse,
        fetchCourses,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
