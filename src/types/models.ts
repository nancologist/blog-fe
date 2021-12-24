export interface Article {
  _id: string;
  title: string;
  body: string;
  imageName?: string;
  tags?: string[];
}

export interface ArticleForm {
  title: string;
  body: string;
  tags?: string[];
}