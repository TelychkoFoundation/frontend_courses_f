import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      required: [true, "Telegram ID is required"],
      unique: true,
      index: true,
    },
    first_name: {
      type: String,
      required: [true, "First name is required"],
    },
    last_name: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
    photo_url: {
      type: String,
      required: false,
    },
    auth_date: {
      type: Number,
      required: [true, "Auth date is required"],
    },
    hash: {
      type: String,
      required: [true, "Hash is required"],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
