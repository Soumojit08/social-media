import { useMemo } from "react";
import { useAuth } from "@clerk/react";
import axios from "axios";

export const useAxios = () => {
  const { getToken } = useAuth();

  return useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      withCredentials: true,
    });

    instance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (config?.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        } else if (config) {
          config.headers = { Authorization: `Bearer ${token}` };
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    return instance;
  }, [getToken]);
};
