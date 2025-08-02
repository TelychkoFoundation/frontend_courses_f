"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { ILesson } from "@/typings";
import { useCourses } from "@/hooks";
import { getLessonsForCourse } from "@/actions";
import { useParams } from "next/navigation";

interface LessonsContextType {
  allLessons: ILesson[] | null;
  setAllLessons: (allLessons: ILesson[]) => void;
  currentLesson: ILesson | null;
  setCurrentLesson: (currentLesson: ILesson | null) => void;
  clearCurrentLesson: () => void;
}

export const LessonsContext = createContext<LessonsContextType | undefined>(
  undefined,
);

export const LessonsProvider = ({ children }: { children: ReactNode }) => {
  const [allLessons, setAllLessons] = useState<ILesson[] | null>(null);
  const [currentLesson, setCurrentLesson] = useState<ILesson | null>(null);

  const params = useParams();
  const { currentCourse } = useCourses();

  useEffect(() => {
    if (!currentCourse) {
      return;
    }

    if (!params.slug) {
      return;
    }

    const getLessons = async () => {
      const courseLessonsResponse = await getLessonsForCourse(currentCourse.id);

      if (!courseLessonsResponse.success) {
        return;
      }

      setAllLessons(courseLessonsResponse.data);
    };

    getLessons();
  }, [currentCourse, params.slug]);

  const clearCurrentLesson = () => {
    setCurrentLesson(null);
  };

  return (
    <LessonsContext.Provider
      value={{
        allLessons,
        setAllLessons,
        currentLesson,
        setCurrentLesson,
        clearCurrentLesson,
      }}
    >
      {children}
    </LessonsContext.Provider>
  );
};
