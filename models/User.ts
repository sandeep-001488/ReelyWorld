import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

export interface IUser {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type:Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>("User", UserSchema);

export default User;
