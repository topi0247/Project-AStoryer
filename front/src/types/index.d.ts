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
