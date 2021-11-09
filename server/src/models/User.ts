import mongoose from "mongoose";

type UserDocument = mongoose.Document & {
  username: string;
  password: string;
};

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", UserSchema);
