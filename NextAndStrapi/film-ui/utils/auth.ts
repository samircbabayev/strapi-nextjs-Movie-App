import { useRouter } from "next/router";
import Cookies from "js-cookie";

export const setToken = (data: any) => {
  const router = useRouter();

  if (typeof window === "undefined") {
    return;
  }

  Cookies.set("id", data.user.id);
  Cookies.set("username", data.user.username);
  Cookies.set("jwt", data.jwt);

  if (Cookies.get("username")) {
    router.reload();
  }
};

export const unsetToken = () => {
  const router = useRouter();
  if (typeof window === "undefined") {
    return;
  }

  Cookies.remove("id");
  Cookies.remove("username");
  Cookies.remove("jwt");

  router.reload();
};

export const getUserFromLocalCookie = () => {
  return Cookies.get("username");
};
export const getIdrFromLocalCookie = () => {
  return Cookies.get("id");
};
export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};
