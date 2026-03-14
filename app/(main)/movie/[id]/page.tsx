"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Play, Plus, Check, ThumbsUp, Share2, ArrowLeft, X } from "lucide-react"
import { useRouter } from "next/navigation"

function getYouTubeId(url: string): string | null {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function MovieDetail({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [inList, setInList] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/movies/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.id])

  const handleToggleList = async () => {
    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: movie._id }),
    })
    if (res.ok) setInList(!inList)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="w-12 h-12 border-[3px] border-[#E50914] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#141414] pt-24 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-lg">Movie not found.</p>
        <button onClick={() => router.back()} className="text-white hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    )
  }

  const matchPercent = 85 + Math.floor((movie.title?.charCodeAt(0) || 0) % 15)
  const youtubeId = getYouTubeId(movie.trailerUrl)

  return (
    <div className="min-h-screen bg-[#141414] pb-20">
      {/* Hero backdrop / Trailer player */}
      <div className="relative h-[55vh] md:h-[65vh] w-full">
        {isPlaying && youtubeId ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0&disablekb=1&iv_load_policy=3`}
              title={`${movie.title} Trailer`}
              className="absolute inset-0 w-full h-[150%] -top-[25%] pointer-events-none fade-in"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdropPath}`}
              alt={movie.title}
              fill
              className="object-cover"
              priority
            />
          </>
        )}

        <div className={`absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-black/30 pointer-events-none ${isPlaying ? "opacity-0" : ""}`} />
        <div className={`absolute inset-0 gradient-hero-left pointer-events-none ${isPlaying ? "opacity-0" : ""}`} />

        {/* Back button */}
        <button
          onClick={() => {
            if (isPlaying) {
              setIsPlaying(false)
            } else {
              router.back()
            }
          }}
          className="absolute top-20 md:top-24 left-4 md:left-[60px] z-20 circle-btn w-10 h-10"
        >
          {isPlaying ? <X className="w-5 h-5 text-white" /> : <ArrowLeft className="w-5 h-5 text-white" />}
        </button>

        {/* Content over backdrop */}
        <div className={`absolute bottom-[10%] left-4 md:left-[60px] z-10 w-[90%] md:w-[50%] lg:w-[40%] transition-opacity duration-300 ${isPlaying ? "opacity-0 pointer-events-none" : ""}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#E50914] font-bold text-xl tracking-[0.15em]">N</span>
            <span className="text-[#999] text-[11px] font-semibold tracking-[0.3em] uppercase">F I L M</span>
          </div>
          <h1 className="font-bebas text-5xl md:text-7xl text-white drop-shadow-lg tracking-wide mb-4">
            {movie.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <button
              onClick={() => {
                if (youtubeId) {
                  setIsPlaying(true)
                } else if (movie.trailerUrl) {
                  window.open(movie.trailerUrl, "_blank")
                }
              }}
              className="btn-play px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg"
            >
              <Play className="w-6 h-6 fill-black" />
              Play
            </button>
            <button onClick={handleToggleList} className="circle-btn w-10 h-10 md:w-11 md:h-11">
              {inList ? <Check className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
            </button>
            <button className="circle-btn w-10 h-10 md:w-11 md:h-11">
              <ThumbsUp className="w-4 h-4 text-white" />
            </button>
            <button className="circle-btn w-10 h-10 md:w-11 md:h-11">
              <Share2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-[60px] relative z-10 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 md:gap-12">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 text-sm mb-4 flex-wrap">
              <span className="match-score text-base">{matchPercent}% Match</span>
              <span className="text-[#bcbcbc]">{movie.releaseYear}</span>
              <span className="maturity-badge">{movie.maturityRating}</span>
              <span className="text-[#bcbcbc]">{movie.duration}</span>
              <span className="border border-white/30 px-1.5 text-[10px] text-[#bcbcbc] tracking-wide">HD</span>
            </div>
            <p className="text-[#d2d2d2] text-base md:text-lg leading-relaxed">
              {movie.description}
            </p>
          </div>

          {/* Right */}
          <div className="space-y-3 text-[14px]">
            <p>
              <span className="text-[#777]">Genre:&nbsp;</span>
              <span className="text-white hover:underline cursor-pointer">{movie.genre}</span>
            </p>
            <p>
              <span className="text-[#777]">This film is:&nbsp;</span>
              <span className="text-white">Suspenseful, Exciting, Dark</span>
            </p>
            <p>
              <span className="text-[#777]">Maturity rating:&nbsp;</span>
              <span className="maturity-badge mr-2">{movie.maturityRating}</span>
            </p>
            <p>
              <span className="text-[#777]">Year:&nbsp;</span>
              <span className="text-white">{movie.releaseYear}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}