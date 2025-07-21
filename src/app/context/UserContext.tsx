"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "@/typings";
import { createDBConnection, getCookieToken, getUser } from "@/lib";
import { useToast } from "@/hooks";
import { useRouter } from "next/navigation";

interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { showToast } = useToast();
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const initialCheck = async () => {
      await createDBConnection();

      const token = await getCookieToken();

      if (token) {
        const response = await getUser(token);

        if (response?.success) {
          setUser(response.data);
        } else {
          router.push("/");
          showToast(response?.error as string, "error");
        }
      } else {
        router.push("/");
      }
    };

    initialCheck();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
