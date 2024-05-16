import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  availableMoney: number;
  purchasedItems: string[];
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  availableMoney: {
    type: Number,
    default: 5000,
  },
  purchasedItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
      default: [],
    },
  ],
});

export const UserModel = model<IUser>("user", UserSchema);
