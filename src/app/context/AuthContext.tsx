"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { ITelegramUserData, IUserDatabaseData } from "@/typings";
import { checkAuth, getUser, loginUser, logoutUser } from "@/actions";
import { useToast } from "@/hooks";
import { redirect, useRouter } from "next/navigation";
import { Header } from "@/components";

interface AuthContextType {
  user: IUserDatabaseData | null;
  setUser: (user: IUserDatabaseData | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  loading: boolean;
  login: (userData: ITelegramUserData, route: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUserDatabaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { showToast } = useToast();
  const router = useRouter();

  const fetchUserStatus = async () => {
    const { success, data, error } = await checkAuth();

    // if (!success && error) {
    //   setLoading(false);
    //   setIsAuthenticated(false);
    //   redirect("/");
    // }

    setIsAuthenticated(true);

    try {
      const response = await getUser(data?.userID as string);
      if (response?.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user status:", error);
      showToast("Error while fetching user status:", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  const login = async (userData: ITelegramUserData, route: string) => {
    console.log(route, userData, "AUTH");
    try {
      setLoading(true);
      await loginUser(userData);
      router.push(route);
      setIsAuthenticated(true);
    } catch (error) {
      showToast((error as Error).message, "error");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        loading,
        setIsAuthenticated,
        login,
        logout,
      }}
    >
      <Header />
      {children}
    </AuthContext.Provider>
  );
};
