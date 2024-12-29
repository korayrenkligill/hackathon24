import { Badge } from "./Badge";

export type UserTypes = "young" | "community" | "company" | "organization";

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  userType: UserTypes;
  badges?: Badge[];
  point?: number;
  blogs?: any[];
  profileDetails?: any;
  otp?: string;
  otpExpiry?: string;
  createdAt?: string;
}
