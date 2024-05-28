export const Settings = {
  API_URL: `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`,
  GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

export const RouterPath = {
  home: "/",
  signUp: "/signup",
  login: "/login",
  illustIndex: "/",
  illust: (uuid: string) => `/illusts/${uuid}`,
  illustSearch: (searchWord: string) => `/illusts?${searchWord}`,
  illustPost: "/illusts/post",
  illustEdit: (uuid: string) => `/illusts/${uuid}/edit`,
  users: (uuid: string) => `/users/${uuid}`,
  account: "/account",
  bookmark: (uuid: string) => `/users/${uuid}?bookmark=true`,
};
