import { Settings } from "@/settings";

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const response = await fetch(`${Settings.API_URL}/auth/sing_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setAccessTokens(data);
      return true;
    }

    return false;
  };

  const signUp = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    console.log(Settings.API_URL);
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

    if (response.ok) {
      const data = await response.json();
      setAccessTokens(data);
      return true;
    }

    return false;
  };

  const setAccessTokens = (data: {
    accessToken: string;
    client: string;
    uid: string;
    expiry: string;
  }) => {
    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("client", data.client);
    localStorage.setItem("uid", data.uid);
    localStorage.setItem("expiry", data.expiry);
  };

  const clearAccessTokens = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    localStorage.removeItem("expiry");
  };

  return { login, signUp };
};
