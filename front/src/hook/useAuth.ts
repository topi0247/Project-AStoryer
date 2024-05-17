import { Delete2API, GetFromAPI, Post2API } from "@/lib";
import { IUser } from "@/types";

// TODO : axiosに置き換える
export const useAuth = () => {
  const login = async (email: string, password: string) => {
    try {
      const response = await Post2API(
        "/auth/sign_in",
        JSON.stringify({ email, password })
      );

      if (response.status !== 200 || !response.data.success) {
        clearAccessTokens();
        return { success: false, message: response.data.message };
      }

      console.log(response.headers);

      setAccessTokens(
        response.headers["access-token"] || "",
        response.headers.client || "",
        response.headers.uid || "",
        response.headers.expiry || ""
      );

      return {
        success: true,
        user: response.data.user as IUser,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    try {
      const response = await Post2API(
        "/auth/sign_in",
        JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        })
      );

      if (response.status !== 200 || !response.data.success) {
        clearAccessTokens();
        return { success: false, message: response.data.message };
      }

      setAccessTokens(
        response.headers["access-token"] || "",
        response.headers.client || "",
        response.headers.uid || "",
        response.headers.expiry || ""
      );

      return {
        success: true,
        user: response.data.user as IUser,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  };

  const autoLogin = async () => {
    try {
      const response = await GetFromAPI("/auth/validate_token");

      if (response.status !== 200 || !response.data.success) {
        clearAccessTokens();
        return { success: false };
      }
      return {
        success: true,
        user: response.data.user as IUser,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  };

  const logout = async () => {
    try {
      const response = await Delete2API("/auth/sign_out");
      console.log(response);
      clearAccessTokens();
      return {
        success: true,
      };
    } catch (error) {
      clearAccessTokens();
      return {
        success: false,
      };
    }
  };

  const setAccessTokens = (
    accessToken: string,
    client: string,
    uid: string,
    expiry: string
  ) => {
    localStorage.setItem("access-token", accessToken);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
    localStorage.setItem("expiry", expiry);
  };

  const clearAccessTokens = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    localStorage.removeItem("expiry");
  };

  return { login, signUp, autoLogin, logout };
};
