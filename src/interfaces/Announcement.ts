import { User } from "./User";

export interface Announcement {
  title: string;
  content: string;
  image: string;
  organization: User;
  approved?: boolean;
  createdAt?: string;
}
