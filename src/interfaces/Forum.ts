import { User } from "./User";

export interface Forum {
  title: string;
  content: string;
  author: User;
  comments: [
    {
      user: User;
      content: string;
      createdAt?: string;
    }
  ];
  likes: User[];
  tags: string[];
  createdAt?: string;
}
