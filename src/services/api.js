import axios from "axios";
import { getToken } from "~/services/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(async config => {
  // const token = getToken();

  // Verificação, caso haja autenticação com JWT no backend
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`; // eslint-disable-line no-param-reassign
  // }

  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const { response = {} } = error;
    const { data } = response;

    if (data) {
      toast.warn(`Opss... ${data}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        pauseOnFocusLoss: false
      });
    }
    return Promise.reject(error);
  }
);

export default api;
©