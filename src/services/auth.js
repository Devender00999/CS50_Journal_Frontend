import http from "./httpServices";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
const tokenKey = "loginToken";
const apiEndPoint = apiUrl + "/auth";

http.setJwt(localStorage.getItem(tokenKey));

const login = async (user) => {
  const { data: jwt } = await http.post(apiEndPoint, user);
  localStorage.setItem(tokenKey, jwt);
  http.setJwt(jwt);
};

const loginWithToken = (token) => {
  localStorage.setItem(tokenKey, token);
};

const getCurrentUser = () => {
  try {
    const token = localStorage.getItem(tokenKey);
    const user = jwtDecode(token);
    return user;
  } catch (ex) {
    return null;
  }
};
const logout = () => {
  localStorage.removeItem(tokenKey);
};
const auth = { login, logout, loginWithToken, getCurrentUser };
export default auth;
