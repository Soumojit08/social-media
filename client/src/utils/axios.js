import axios from "axios";

const axiosInstance = (getToken) => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  instance.interceptors.request.use(async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
};

export default axiosInstance;