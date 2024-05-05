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

  const accessToken = localStorage.getItem("Access-Token");
  const client = localStorage.getItem("Client");
  const uid = localStorage.getItem("Uid");
  const expiry = localStorage.getItem("Expiry");

  if (accessToken && client && uid && expiry) {
    config.headers["Access-Token"] = accessToken;
    config.headers["Client"] = client;
    config.headers["Uid"] = uid;
    config.headers["Expiry"] = expiry;
  }

  return config;
});
