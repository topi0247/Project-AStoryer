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
