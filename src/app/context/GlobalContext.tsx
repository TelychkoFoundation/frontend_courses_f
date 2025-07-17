"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { useSearchParams } from "next/navigation";
import { ModalType } from "../typings/modals";
import { CourseKeyTypes } from "../typings/course";
import { useQuery } from "../hooks/useQuery";

interface GlobalContextType {
  initialLoading: boolean;
  setInitialLoading: (loading: boolean) => void;
  initialLoadingMessage: string;
  setInitialLoadingMessage: (message: string) => void;
  activeCourseModalOpen: boolean;
  setActiveCourseModalOpen: (status: boolean) => void;
  activeCourseContentModalOpen: boolean;
  setActiveCourseContentModalOpen: (status: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined,
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [initialLoadingMessage, setInitialLoadingMessage] =
    useState<string>("");
  const [activeCourseModalOpen, setActiveCourseModalOpen] =
    useState<boolean>(false);
  const [activeCourseContentModalOpen, setActiveCourseContentModalOpen] =
    useState<boolean>(false);
  const searchParams = useSearchParams();
  const { removeQueryString } = useQuery();

  useEffect(() => {
    const courseDetailsModalParam = searchParams.get(
      ModalType.CourseDetailsModal,
    );

    if (
      courseDetailsModalParam &&
      Object.values(CourseKeyTypes).includes(
        courseDetailsModalParam as CourseKeyTypes,
      )
    ) {
      setActiveCourseModalOpen(true);
    } else {
      setActiveCourseModalOpen(false);
      removeQueryString(ModalType.CourseDetailsModal);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        initialLoading,
        setInitialLoading,
        initialLoadingMessage,
        setInitialLoadingMessage,
        activeCourseModalOpen,
        setActiveCourseModalOpen,
        activeCourseContentModalOpen,
        setActiveCourseContentModalOpen,
      }}
    >
      {children}
      <LoadingOverlay />
    </GlobalContext.Provider>
  );
};
