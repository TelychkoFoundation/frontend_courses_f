"use client";

import React, { createContext, useState, ReactNode } from "react";
import LoadingOverlay from "../components/LoadingOverlay";

interface GlobalContextType {
  initialLoading: boolean;
  setInitialLoading: (loading: boolean) => void;
  initialLoadingMessage: string;
  setInitialLoadingMessage: (message: string) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined,
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [initialLoadingMessage, setInitialLoadingMessage] =
    useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        initialLoading,
        setInitialLoading,
        initialLoadingMessage,
        setInitialLoadingMessage,
      }}
    >
      {children}
      <LoadingOverlay />
    </GlobalContext.Provider>
  );
};
