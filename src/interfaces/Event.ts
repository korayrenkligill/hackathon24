import { Badge } from "./Badge";
import { User } from "./User";

export interface EventType {
  _id?: string;
  title: string;
  description: string;
  organizer: User;
  date: string;
  location: string;
  badge?: Badge;
  qrCode?: string;
  participants?: User[];
  approved?: boolean;
  createdAt?: string;
  image: string;
  fileName?: string;
}
