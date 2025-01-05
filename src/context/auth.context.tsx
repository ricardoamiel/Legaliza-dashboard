"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import publicApiConfig from "@/config/public-api.config";
import { UserRes } from "@/interfaces/types";

interface UserRootResponse {
  data: {
    _id: string;
    nombres: string;
    apellidos: string;
    tipoUsuario: string;
    email: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  status: string;
}

type AuthValuesType = {
  isAuth: boolean;
  data?: UserRes | null;
  logout: () => void;
  login: (val: {
    authValues?: { email: string; password: string };
  }) => Promise<{ status?: "success" | "error"; message?: string }>;
  isLoading: boolean;
};

const authConfig = {
  storageTokenKeyName: "auth_access_token_os",
  storageUserId: "auth_user_id_os",
  storageSession: "session_user_data_os",
};

const defaultProvider: AuthValuesType = {
  isAuth: false,
  login: async () => ({}),
  logout: () => {},
  data: null,
  isLoading: true,
};

const AuthContext = createContext(defaultProvider);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(defaultProvider.isAuth);
  const [data, setData] = useState<UserRes | null | undefined>(
    defaultProvider.data,
  );

  const [isLoading, setIsLoading] = useState(defaultProvider.isLoading);

  let isRender = false;

  useEffect(() => {
    if (isRender) return;

    (async () => {
      const token = Cookies.get(authConfig.storageTokenKeyName);

      try {
        if (token) {
          const userRes = await fetch(publicApiConfig.apiUrl + "/auth/login", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const dataUser: UserRootResponse = await userRes.json();

          if (dataUser.status === "success" && !!dataUser?.data?._id) {
            window.localStorage.setItem(
              authConfig.storageUserId,
              dataUser?.data?._id,
            );

            window.localStorage.setItem(
              authConfig.storageSession,
              JSON.stringify(dataUser.data),
            );

            setData({
              token: token,
              user: dataUser.data,
            });

            setIsAuth(true);
            setIsLoading(false);

            toast.success("Welcome " + dataUser?.data?.nombres);
          } else {
            throw new Error("Error auth");
          }
        }
      } catch (error) {
        window.localStorage.removeItem(authConfig.storageUserId);
        window.localStorage.removeItem(authConfig.storageSession);
        Cookies.remove(authConfig.storageTokenKeyName);

        setData(null);
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    })();

    isRender = true;
  }, []);

  const handleLogin: AuthValuesType["login"] = async ({ authValues }) => {
    try {
      const res = await fetch(publicApiConfig.apiUrl + "/auth/login", {
        method: "POST",
        body: JSON.stringify(authValues),
        headers: { "Content-Type": "application/json" },
      });

      const data: UserRes = await res.json();

      if (!data?.user?._id) {
        throw new Error("Error auth");
      }

      setData(data);
      setIsAuth(true);

      Cookies.set(authConfig.storageTokenKeyName, data?.token, {
        sameSite: "strict",
        expires: 1,
      });

      Cookies.set(authConfig.storageUserId, data?.user?._id, {
        sameSite: "strict",
        expires: 1,
      });

      window.localStorage.setItem(
        authConfig.storageSession,
        JSON.stringify(data),
      );

      router.replace("/");

      return { message: "Success!", status: "success" };
    } catch (error) {
      //console.log(error);
      if (error instanceof Error) {
        return { message: error.message, status: "error" };
      }
      return { message: "Unknown error", status: "error" };
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(authConfig.storageUserId);
    window.localStorage.removeItem(authConfig.storageSession);

    Cookies.remove(authConfig.storageTokenKeyName);
    Cookies.remove(authConfig.storageUserId);
    router.replace("/auth/login");

    setData(null);
    setIsAuth(false);
  };

  const values: AuthValuesType = {
    isAuth,
    login: handleLogin,
    logout: handleLogout,
    data,
    isLoading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider, authConfig };