import { client } from "@/auth";

export function Post2API(url: string, body: any) {
  return client.post(url, body);
}

export function Delete2API(url: string) {
  return client.delete(url);
}

export function GetFromAPI(url: string) {
  const response = client.get(url);
  return response;
}

export function Put2API(url: string, body: any) {
  return client.put(url, body);
}
