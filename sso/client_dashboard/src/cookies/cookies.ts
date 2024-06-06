import cookies from "js-cookie";
import { USER_DATA } from "./cookies.d";

export const setUserCookies = (data: { token: string }) => {
  cookies.set(USER_DATA, JSON.stringify(data));
};

export const getUserCookies = () => {
  const data = cookies.get(USER_DATA);
  return data ? JSON.parse(data) : undefined;
};

export const removeUserCookies = () => {
  cookies.remove(USER_DATA);
};

export const getStatusInCookie = (status: string | any) => {
  const stateCookie = cookies.get("selectedStatus");
  return stateCookie ? stateCookie : status;
};

export const setStatusInCookie = (state: string | any) => {
  cookies.set("selectedStatus", state);
};