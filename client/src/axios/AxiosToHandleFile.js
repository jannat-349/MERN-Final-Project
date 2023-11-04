import axios from "axios";
import authServices from "../services/authServices";

const AxiosToHandleFile = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
AxiosToHandleFile.interceptors.request.use(
  (config) => {
    if (config.authorization !== false) {
      const token = authServices.getAuthenticationToken();
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosToHandleFile;
