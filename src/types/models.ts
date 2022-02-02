export interface Article {
  _id: string;
  title: string;
  body: string;
  createdAt: number;
  imageName?: string;
  category: string;
}

export interface ArticleForm {
  title: string;
  body: string;
  category: string;
}