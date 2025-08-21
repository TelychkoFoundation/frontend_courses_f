"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { IUserDatabaseData } from "@/typings";
import { checkDBConnection, getUser } from "@/actions";
import { useToast } from "@/hooks";
import { useRouter } from "next/navigation";
import { Header } from "@/components";
import { useSession } from "next-auth/react";

interface AuthContextType {
  user: IUserDatabaseData | null;
  setUser: (user: IUserDatabaseData | null) => void;
  loading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserDatabaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dbConnected, setDbConnected] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { showToast } = useToast();
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    const checkDBConnectionHandler = async () => {
      const { success, error } = await checkDBConnection();

      if (!success) {
        showToast(error as string, "error");
        setDbConnected(false);
        return;
      }

      setDbConnected(true);
    };

    checkDBConnectionHandler();
  }, []);

  useEffect(() => {
    if (!dbConnected) {
      return;
    }

    if (status === "authenticated") {
      const fetchUser = async () => {
        try {
          const response = await getUser(data?.user?.id as string);
          if (response?.success) {
            setUser(response.data);
            setIsAuthenticated(true);
          } else {
            showToast(response?.error as string, "error");
            setUser(null);
          }
        } catch {
          showToast("Error while fetching user status:", "error");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }

    if (status === "unauthenticated") {
      setIsAuthenticated(false);
      setLoading(false);
      router.push("/");
    }
  }, [status, dbConnected]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <Header />
      {children}
    </AuthContext.Provider>
  );
};
