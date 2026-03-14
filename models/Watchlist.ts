// models/Watchlist.ts
import mongoose, { Schema, Document, models } from "mongoose"

export interface IWatchlist extends Document {
  userId: string
  movieId: mongoose.Types.ObjectId
}

const WatchlistSchema = new Schema<IWatchlist>(
  {
    userId: { type: String, required: true },
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
  },
  { timestamps: true }
)

export default models.Watchlist || mongoose.model<IWatchlist>("Watchlist", WatchlistSchema)