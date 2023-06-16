import { API_BASE_URL } from "../Configs/AppConfig";
import { axiosPublic, axiosAuth } from "./AxiosInterCeptors";

export const getProfileData = async () => {
  const token = localStorage.getItem("token");
  const response = await axiosAuth.get(`${API_BASE_URL}user/userdata`, {
    headers: {
      Authorization: token,
    },
  });
  const { username, email } = response.data;
  return { username, email };
};
export const login = (user: any) => {};

export const logout = () => {};
