"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { CourseKeyTypes, ICourse, ILesson } from "@/typings";
import {
  getAllCourses,
  deleteCourseById,
  getLessonsForCourse,
  getCurrentCourse,
  getLessonById,
  deleteLessonById,
} from "@/actions";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks";

interface AdminContextType {
  courses: ICourse[];
  totalCourses: number;
  currentCourse: ICourse | null;
  lessons: ILesson[];
  totalLessons: number;
  loading: boolean;
  currentLesson: ILesson | null;
  setCurrentCourse: (course: ICourse | null) => void;
  deleteCourse: (id: string) => void;
  deleteLesson: () => void;
  fetchCourses: () => void;
  fetchCourse: () => void;
  fetchLessons: (courseID: string) => void;
  fetchLesson: () => void;
}

export const AdminContext = createContext<AdminContextType | undefined>(
  undefined,
);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [totalLessons, setTotalLessons] = useState<number>(0);
  const [currentLesson, setCurrentLesson] = useState<ILesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      showToast(error, "error");
      setError(null);
    }
  }, [error]);

  const fetchCourses = async () => {
    setLoading(true);
    const { success, data, error } = await getAllCourses();

    if (!success) {
      setLoading(false);
      setError(error as string);
      return;
    }

    setCourses(data);
    setTotalCourses(data.length);
    setLoading(false);
  };

  const fetchCourse = async () => {
    setLoading(true);

    if (!params?.slug) {
      setLoading(false);
      setCurrentCourse(null);
      setError("Курсу не існує");
      return;
    }

    const { success, data, error } = await getCurrentCourse(
      params.slug as CourseKeyTypes,
    );

    if (!success) {
      setLoading(false);
      setError(error as string);
      return;
    }

    setCurrentCourse(data);
    setLoading(false);
  };

  const fetchLessons = async (courseID: string) => {
    setLoading(true);

    const { success, data, error } = await getLessonsForCourse(courseID);

    if (!success) {
      setLoading(false);
      setError(error as string);
      return;
    }

    setLessons(data);
    setTotalLessons(data.length);
    setLoading(false);
  };

  const fetchLesson = async () => {
    setLoading(true);

    if (!params?.lesson_slug) {
      setLoading(false);
      setCurrentLesson(null);
      setError("Уроку не існує");
      return;
    }

    const { success, data, error } = await getLessonById(
      params.lesson_slug as string,
    );

    if (!success) {
      setLoading(false);
      setError(error as string);
      return;
    }

    setCurrentLesson(data);
    setLoading(false);
  };

  const deleteCourse = async (id: string) => {
    await deleteCourseById(id);
    setCourses(prev => prev.filter(course => course.id !== id));
    if (currentCourse?.id === id) {
      setCurrentCourse(null);
    }
  };

  const deleteLesson = async () => {
    const lessonID = params.lesson_slug as string;

    const { success } = await deleteLessonById(lessonID);

    if (!success) {
      return;
    }

    setLessons(prev => prev.filter(lesson => lesson._id !== lessonID));
    if (currentLesson?._id === lessonID) {
      setCurrentLesson(null);
    }

    router.back();
  };

  return (
    <AdminContext.Provider
      value={{
        courses,
        totalCourses,
        currentCourse,
        lessons,
        totalLessons,
        currentLesson,
        loading,
        setCurrentCourse,
        deleteCourse,
        fetchCourses,
        fetchCourse,
        fetchLessons,
        fetchLesson,
        deleteLesson,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
