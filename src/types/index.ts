import { Article } from './models';

export interface Person {
  name: String;
  age: Number;
  country: String;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface LoginForm {
  email: string;
  pwd: string;
}


// Redux States: ================================================

export interface ArticleState {
  instance: Article;
  isEditing: boolean;
}

export interface AuthState {
  verified: boolean;
}

export interface ThemeState {
  isDark: boolean;
}