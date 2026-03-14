// models/Movie.ts
import mongoose, { Schema, Document, models } from "mongoose"

export interface IMovie extends Document {
  title: string
  description: string
  genre: string
  posterPath: string
  backdropPath: string
  trailerUrl: string
  releaseYear: number
  duration: string
  maturityRating: string
  isFeatured: boolean
}

const MovieSchema = new Schema<IMovie>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    posterPath: { type: String, required: true },
    backdropPath: { type: String, required: true },
    trailerUrl: { type: String, required: true },
    releaseYear: { type: Number },
    duration: { type: String },
    maturityRating: { type: String },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default models.Movie || mongoose.model<IMovie>("Movie", MovieSchema)