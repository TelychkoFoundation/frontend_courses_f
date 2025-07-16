"use client";

import React, { createContext, useState, ReactNode } from "react";
import LoadingOverlay from "../components/LoadingOverlay";
import { ICourse } from "../models/Course";

interface GlobalContextType {
  initialLoading: boolean;
  setInitialLoading: (loading: boolean) => void;
  initialLoadingMessage: string;
  setInitialLoadingMessage: (message: string) => void;
  activeCourse: ICourse | null;
  setActiveCourse: (status: ICourse | null) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined,
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [initialLoadingMessage, setInitialLoadingMessage] =
    useState<string>("");
  const [activeCourse, setActiveCourse] = useState<ICourse | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        initialLoading,
        setInitialLoading,
        initialLoadingMessage,
        setInitialLoadingMessage,
        activeCourse,
        setActiveCourse,
      }}
    >
      {children}
      <LoadingOverlay />
    </GlobalContext.Provider>
  );
};
