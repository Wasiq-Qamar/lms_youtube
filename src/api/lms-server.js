import axios from "axios";

const instance = axios.create({
  baseURL:
    "BACKEND CONNECTION URL (e.g. localhost:3000) without '/' at the end",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
