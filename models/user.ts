import mongoose, { Schema, Document, Types } from "mongoose";
import { ICourse } from "./course"; // this import ensures registration


export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  coursesRegistered: Types.ObjectId[] | ICourse[];
  role: "ADMIN" | "USER"
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true }, // changed from phoneNumber to email
  name: { type: String, required: true },
  password: { type: String, required: true },
  coursesRegistered: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  role: { type:String, required: true , default : "USER"},
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);