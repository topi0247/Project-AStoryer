export interface IndexIllustData {
  id: number;
  title: string;
  image: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
  count: number;
}

export interface ButtonState {
  favorite: boolean;
  bookmark: boolean;
}

export interface IUser {
  id: number;
  name: string;
}

export enum PublicState {
  DRAFT = 0, // 下書き
  PRIVATE = 1, // 非公開
  PUBLIC = 2, // 全体公開
  ONLY_URL = 3, // URLを知ってる人のみ
}

export interface NoticeState {
  favorite: boolean;
  bookmark: boolean;
  comment: boolean;
  follower: boolean;
}

export interface NoticeStates {
  app: NoticeState;
  email: NoticeState;
}
