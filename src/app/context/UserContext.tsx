"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { IUser } from "../models/User";
import { getUser } from "../lib/getActions";

interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUserFromDB = async () => {
      const response = await getUser();

      if (response.success) {
        setUser(response.data);
      }
    };

    fetchUserFromDB();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
