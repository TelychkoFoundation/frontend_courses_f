"use client";

import { createContext, useState, ReactNode } from "react";
import { LoadingOverlay } from "@/components";
import { useQuery } from "@/hooks";
import { QueryParamsKeyType, QueryParamsValueType } from "@/typings";

interface DrawerContextType {
  isDrawerOpen: boolean;
  openDrawerWithQueryString: (
    key: QueryParamsKeyType,
    value: QueryParamsValueType,
  ) => void;
  closeDrawerWithQueryString: (key: QueryParamsKeyType) => void;
}

export const DrawerContext = createContext<DrawerContextType | undefined>(
  undefined,
);

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setOpenDrawer] = useState<boolean>(false);

  const { addQueryString, removeQueryString } = useQuery();

  const openDrawerWithQueryString = (
    key: QueryParamsKeyType,
    value: QueryParamsValueType,
  ): void => {
    setOpenDrawer(true);
    addQueryString(key, value);
  };

  const closeDrawerWithQueryString = (key: QueryParamsKeyType): void => {
    setOpenDrawer(false);
    removeQueryString(key);
  };

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        openDrawerWithQueryString,
        closeDrawerWithQueryString,
      }}
    >
      {children}
      <LoadingOverlay />
    </DrawerContext.Provider>
  );
};
