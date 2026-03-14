import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoose"
import Watchlist from "@/models/Watchlist"
import { auth } from "@/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await connectDB()
    const watchlist = await Watchlist.find({ userId: session.user.id }).populate("movieId")
    return NextResponse.json(watchlist)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch watchlist" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { movieId } = await req.json()
    await connectDB()

    const exists = await Watchlist.findOne({ userId: session.user.id, movieId })
    if (exists) {
      await Watchlist.deleteOne({ _id: exists._id })
      return NextResponse.json({ message: "Removed from watchlist" })
    } else {
      await Watchlist.create({ userId: session.user.id, movieId })
      return NextResponse.json({ message: "Added to watchlist" })
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle watchlist" }, { status: 500 })
  }
}