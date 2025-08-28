"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { IUserDatabaseData } from "@/typings";
import { checkDBConnection, getUser } from "@/actions";
import { useToast } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "@/components";
import { useSession } from "next-auth/react";

interface AuthContextType {
  user: IUserDatabaseData | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserDatabaseData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dbSuccess, setDbSuccess] = useState<boolean>(false);

  const { showToast } = useToast();
  const { status, data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const connectDB = async () => {
      const { success: dbSuccess, error: dbError } = await checkDBConnection();
      if (dbSuccess) {
        setDbSuccess(true);
      }

      if (dbError) {
        showToast(dbError as string, "error");
        setUser(null);
        setLoading(false);
      }
    };

    connectDB();
  }, []);

  useEffect(() => {
    if (!dbSuccess) {
      return;
    }

    const handleAuth = async () => {
      if (status === "unauthenticated") {
        setUser(null);
        setLoading(false);
        router.push("/");
        return;
      }

      try {
        const response = await getUser(session?.user?.id as string);

        if (response?.success) {
          setUser(response.data);

          if (pathname === "/") {
            router.push("/courses");
          }
        } else {
          showToast(response?.error as string, "error");
          setUser(null);
        }
      } catch (e) {
        showToast("Error while fetching user data.", "error");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    handleAuth();
  }, [status, session, pathname, router, showToast, dbSuccess]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      <Header />
      {children}
    </AuthContext.Provider>
  );
};
