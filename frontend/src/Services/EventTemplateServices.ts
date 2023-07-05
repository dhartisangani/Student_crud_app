import { API_BASE_URI } from "../Configs/AppConfig";
import { AllStudent } from "../Types/Type";
import instance, { axiosPublic, axiosAuth } from "./AxiosInterCeptors";

export const getProfileData = async () => {
  const token = localStorage.getItem("token");
  const response = await axiosAuth.get(`${API_BASE_URI}user/userdata`, {
    headers: {
      Authorization: token,
    },
  });
  const { username, email } = response.data;
  return { username, email };
};

export const refreshtoken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    const response = await axiosPublic.post(
      "http://localhost:8080/api/v1/school/token/refresh-token",
      null,
      {
        headers: {
          RefreshToken: refreshToken,
        },
      }
    );

    const data = response.data;
    const newToken = data.authtoken;
    const expirationTime = data.expirationTime;

    localStorage.setItem("token", newToken);
    localStorage.setItem("tokenExpiration", expirationTime);

    // instance.defaults.headers.common["Authorization"] = newToken;

    // // Retry the original request
    // return axios(response.config);
  } catch (error) {
    console.error("Error fetching Student Data:", error);
    return Promise.reject(error);
  }
};


