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
  avatar: string;
  following_count: number;
  follower_count: number;
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

export interface UserPageEdit {
  headerImage: string;
  avatar: string;
  link: {
    twitter: string;
    pixiv: string;
    fusetter: string;
    privatter: string;
    other: string;
  };
  profile: string;
}
