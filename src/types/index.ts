import { ReactNode } from 'react';

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: boolean;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IStep {
  id: string;
  label: string;
  component: ReactNode;
}
