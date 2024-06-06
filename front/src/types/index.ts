export interface IHomeIllustData {
  uuid: string;
  title: string;
  image: string;
  user: {
    uuid: string;
    name: string;
    avatar: string;
  };
}

export interface IndexIllustData {
  uuid: string;
  title: string;
  image: string;
  user?: {
    uuid: string;
    name: string;
    avatar: string;
  };
  count?: number;
  publishRange?: string;
}

export interface IEditIllust {
  body: string;
  position: number;
}

export interface IEditIllustData {
  uuid: string;
  title: string;
  caption?: string;
  image?: IEditIllust[];
  tags?: string[];
  synalio?: string;
  publish_state: IPublicState;
  game_system?: string;
}

export interface IButtonState {
  favorite: boolean;
  bookmark: boolean;
}

export interface IUser {
  uuid: string;
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
  links: {
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
