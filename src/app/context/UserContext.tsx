"use client";

import { createContext, useState, ReactNode } from "react";
import { ITelegramUserData } from "@/typings";
// import { createDBConnection, verifySession } from "@/lib";
// import { getUser } from "@/actions";
// import { useToast } from "@/hooks";
// import { useRouter } from "next/navigation";

interface UserContextType {
  user: ITelegramUserData | null;
  setUser: (user: ITelegramUserData | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // const { showToast } = useToast();
  // const router = useRouter();

  const [user, setUser] = useState<ITelegramUserData | null>(null);

  console.log("user", user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
