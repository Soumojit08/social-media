import { useAuth } from "@clerk/react";
import axiosInstance from "@/utils/axios";

export const useAxios = () => {
  const { getToken } = useAuth();

  return axiosInstance(getToken);
};
