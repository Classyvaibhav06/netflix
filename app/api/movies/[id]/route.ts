import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoose"
import Movie from "@/models/Movie"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const movie = await Movie.findById(params.id)
    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }
    return NextResponse.json(movie)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 })
  }
}