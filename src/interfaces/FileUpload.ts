import { User } from "./User";

export interface FileUpload {
  user: User;
  filePath: string;
  fileType: string;
  createdAt?: string;
}
