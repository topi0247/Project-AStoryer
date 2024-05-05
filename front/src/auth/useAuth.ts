import { Settings } from "@/settings";
import { IUser } from "@/types";

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const response = await fetch(`${Settings.API_URL}/auth/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      clearAccessTokens();
      return { success: false, message: data.message };
    }
    setAccessTokens(
      response.headers.get("access-token") || "",
      response.headers.get("client") || "",
      response.headers.get("uid") || "",
      response.headers.get("expiry") || ""
    );

    return {
      success: true,
      user: { id: data.user.id, name: data.user.name } as IUser,
    };
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    const response = await fetch(`${Settings.API_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      clearAccessTokens();
      return { success: false, message: data.message };
    }

    setAccessTokens(
      response.headers.get("access-token") || "",
      response.headers.get("client") || "",
      response.headers.get("uid") || "",
      response.headers.get("expiry") || ""
    );
    return {
      success: true,
      user: { id: data.user.id, name: data.user.name } as IUser,
    };
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

  return { login, signUp };
};
