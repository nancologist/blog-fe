export interface Article {
  _id: string;
  title: string;
  body: string;
  createdAt: number;
  imageName?: string;
  tags?: string[];
}

export interface ArticleForm {
  title: string;
  body: string;
  tags?: string[];
}