import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoose"
import Movie from "@/models/Movie"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await connectDB()
    const movies = await Movie.find()
    return NextResponse.json(movies)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
  }
}