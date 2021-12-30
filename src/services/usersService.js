import http from "./httpServices";
import { apiUrl } from "../config.json";
const apiEndPoint = apiUrl + "/users";
export const register = (userDetails) => {
  return http.post(apiEndPoint, userDetails);
};
