import { client } from ".";

export function Post2API(url: string, body: any) {
  return client.post(url, body);
}

export function Delete2API(url: string) {
  return client.delete(url);
}

export function GetFromAPI(url: string) {
  return client.get(url);
}

export function Put2API(url: string, body: any) {
  return client.put(url, body);
}
