import { client } from "@/auth";

export function usePost(url: string, body: any) {
  return client.post(url, body);
}

export function useDelete(url: string) {
  return client.delete(url);
}

export function useGet(url: string) {
  return client.get(url).then((res) => res.data);
}

export function usePut(url: string, body: any) {
  return client.put(url, body);
}
