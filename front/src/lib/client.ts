import { Settings } from "@/settings";
import axios from "axios";

const API_URL = Settings.API_URL;

export const client = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const accessToken = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");
  const expiry = localStorage.getItem("expiry");

  if (accessToken && client && uid && expiry) {
    config.headers["access-token"] = accessToken;
    config.headers.client = client;
    config.headers.uid = uid;
    config.headers.expiry = expiry;
  }

  return config;
});
