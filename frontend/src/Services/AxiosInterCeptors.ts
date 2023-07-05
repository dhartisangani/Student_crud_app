import axios from "axios";
import { API_BASE_URI } from "../Configs/AppConfig";
import { refreshtoken } from "./EventTemplateServices";

axios.defaults.baseURL = API_BASE_URI;
export const axiosPublic = axios.create();
export const axiosAuth = axios.create();

const instance = axios.create({
  baseURL: API_BASE_URI,
});
instance.interceptors.response.use(
  (response: any) => response,
  (error: any) => onResponseRejected(error, (error) => null)
);

instance.defaults.headers.common["Authorization"] = "Auth Token";
axios.defaults.baseURL = API_BASE_URI;

const onResponseRejected = (error: any, handle401: (error: any) => void) => {
  console.warn(error);
  let message = "";
  if (error && error.response) {
    const { response } = error;
    if (response.status === 401) {
      handle401(error);
    } else if (response.status === 402) {
      refreshtoken();
      // return refreshtoken().then(() => {
      //   // Refresh token completed successfully, retry the original request
      //   return instance(error.config);
      // });
    } else if (response.status === 404) {
      message = "Not Found";
    } else if (response.status === 500) {
      message = "Internal Server Error";
    }
  } else {
    message = "Could not load from server, check your internet connection";
  }

  return Promise.reject(error);
};

axiosAuth.interceptors.response.use(
  (response) => response,
  (error) => onResponseRejected(error, (error) => null)
);

export default instance;
