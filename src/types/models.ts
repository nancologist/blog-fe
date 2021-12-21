export interface Article {
  _id: string;
  title: string;
  body: string;
  imageName: string | undefined;
  tags: string[] | undefined
}