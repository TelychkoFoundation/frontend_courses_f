"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { ILesson } from "@/typings";
import { useCourses, useToast } from "@/hooks";
import { getLessonsForCourse, getLessonById } from "@/actions";
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

      setAllLessons(data);
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

        setCurrentLesson(data);
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
