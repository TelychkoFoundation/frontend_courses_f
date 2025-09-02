"use client";

import { createContext, useState, ReactNode, useEffect, useMemo } from "react";
import { ICategoryLesson, ICategoryStructure } from "@/typings";
import { useCourses, useToast, useAuth } from "@/hooks";
import { getLessonsForCourse, getLessonById } from "@/actions";
import { useParams } from "next/navigation";
import { transformLessonByCategory, transformLessonsByCategory } from "@/utils";
import { categories } from "@/constants";

interface LessonsContextType {
  allLessons: ICategoryStructure[] | null;
  setAllLessons: (allLessons: ICategoryStructure[]) => void;
  currentLesson: ICategoryLesson | null;
  setCurrentLesson: (currentLesson: ICategoryLesson | null) => void;
  clearCurrentLesson: () => void;
}

export const LessonsContext = createContext<LessonsContextType | undefined>(
  undefined,
);

export const LessonsProvider = ({ children }: { children: ReactNode }) => {
  const [allLessons, setAllLessons] = useState<ICategoryStructure[] | null>(
    null,
  );
  const [currentLesson, setCurrentLesson] = useState<ICategoryLesson | null>(
    null,
  );

  const params = useParams();
  const { currentCourse } = useCourses();
  const { showToast } = useToast();

  useEffect(() => {
    if (!currentCourse) {
      return;
    }

    if (!params.slug) {
      return;
    }

    const fetchLessons = async () => {
      const { success, data, error } = await getLessonsForCourse(
        currentCourse.id,
      );

      if (!success) {
        showToast(error as string, "error");
        return;
      }

      const lessons: ICategoryStructure[] = transformLessonsByCategory(
        data,
        categories,
      );

      setAllLessons(lessons);
    };

    fetchLessons();
  }, [currentCourse, params.slug]);

  useEffect(() => {
    if (params.lesson_slug) {
      const fetchLesson = async () => {
        const { success, data, error } = await getLessonById(
          params.lesson_slug as string,
        );

        if (!success) {
          showToast(error as string, "error");
          return;
        }

        const lesson: ICategoryLesson = transformLessonByCategory(
          data,
          categories,
        );

        setCurrentLesson(lesson);
      };

      fetchLesson();
    }
  }, [params.lesson_slug]);

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
