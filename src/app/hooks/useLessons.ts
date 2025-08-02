import { useContext } from "react";
import { LessonsContext } from "@/context";

export const useLessons = () => {
  const context = useContext(LessonsContext);
  if (!context) {
    throw new Error("useLessonsContext must be used within a LessonsProvider");
  }
  return context;
};
