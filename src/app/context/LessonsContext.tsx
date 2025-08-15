"use client";

import { createContext, useState, ReactNode, useEffect, useMemo } from "react";
import {
  ICategoryLesson,
  ICategoryStructure,
  IPurchasedLesson,
} from "@/typings";
import { useCourses, useToast, useUser } from "@/hooks";
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
  isCurrentLessonPaid: boolean;
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
  const { user } = useUser();
  const { showToast } = useToast();

  const isCurrentLessonPaid: boolean = useMemo(() => {
    if (user && currentLesson) {
      return !!user.purchased_lessons?.find(
        (purchasedLesson: IPurchasedLesson): boolean =>
          purchasedLesson.lesson_id === currentLesson.lesson._id,
      );
    }

    return false;
  }, [currentLesson, user]);

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
        isCurrentLessonPaid,
      }}
    >
      {children}
    </LessonsContext.Provider>
  );
};
