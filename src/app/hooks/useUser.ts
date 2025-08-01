import { useContext } from "react";
import { UserContext } from "@/context";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
