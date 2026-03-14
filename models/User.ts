// models/User.ts
import mongoose, { Schema, Document, models } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  image?: string
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
  },
  { timestamps: true }
)

export default models.User || mongoose.model<IUser>("User", UserSchema)