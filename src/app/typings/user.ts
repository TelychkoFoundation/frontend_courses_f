// import { Document } from "mongoose";

export interface ITelegramUserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

// export interface IUserDatabaseData extends ITelegramUserData, Document {
//   createdAt?: Date;
//   updatedAt?: Date;
// }
