// lib/user.ts
import connectDB from "./mongoose"
import User from "../models/User"

export async function getUserByEmail(email: string) {
  await connectDB()
  const user = await User.findOne({ email }).lean()
  return user as any
}