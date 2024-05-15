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

export interface IEditIllustData {
  id: number;
  title: string;
  caption?: string;
  image?: string[];
  tags?: string[];
  synalios?: string[];
  publish_state: IPublicState;
}

export interface IButtonState {
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

export interface INoticeState {
  favorite: boolean;
  bookmark: boolean;
  comment: boolean;
  follower: boolean;
}

export interface INoticeStates {
  app: INoticeState;
  email: INoticeState;
}

export interface IUserPageEdit {
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

export enum IPublicState {
  Draft = "draft",
  All = "all_publish",
  URL = "only_url",
  Follower = "only_follower",
  Private = "private_publish",
}
