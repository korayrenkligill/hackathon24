import { Badge } from "./Badge";

export type UserTypes = "young" | "community" | "company" | "organization";

export interface User {
  name: string;
  email: string;
  password: string;
  userType: UserTypes;
  badges?: Badge[];
  point?: number;
  //   blogs?: blog;
  // profileDetails?: anlamadım
  otp?: string;
  otpExpiry?: string;
  createdAt?: string;
}
