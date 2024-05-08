export const Settings = {
  API_URL: `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`,
};

export const RouterPath = {
  home: "/",
  signUp: "/signup",
  login: "/login",
  illustIndex: "/",
  illust: (id: number) => `/illusts/${id}`,
  illustSearch: (searchWord: string) => `/illusts?search=${searchWord}`,
  users: (id: number) => `/users/${id}`,
  account: "/account",
  bookmark: (id: number) => `/users/${id}?bookmark=true`,
};
