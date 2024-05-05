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
    console.log(response.headers.get("Access-Token"));
    setAccessTokens(
      response.headers.get("Access-Token") || "",
      response.headers.get("Client") || "",
      response.headers.get("Uid") || "",
      response.headers.get("Expiry") || ""
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
      response.headers.get("Access-Token") || "",
      response.headers.get("Client") || "",
      response.headers.get("Uid") || "",
      response.headers.get("Expiry") || ""
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
    localStorage.setItem("Access-Token", accessToken);
    localStorage.setItem("Client", client);
    localStorage.setItem("Uid", uid);
    localStorage.setItem("Expiry", expiry);
  };

  const clearAccessTokens = () => {
    localStorage.removeItem("Access-Token");
    localStorage.removeItem("Client");
    localStorage.removeItem("Uid");
    localStorage.removeItem("Expiry");
  };

  return { login, signUp };
};
