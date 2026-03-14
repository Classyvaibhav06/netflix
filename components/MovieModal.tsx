"use client"

import { X, Play, Plus, Check, ThumbsUp, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function MovieModal({ movie, onClose }: { movie: any; onClose: () => void }) {
  const [inList, setInList] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!movie) return null

  const handleToggleList = async () => {
    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: movie._id }),
    })
    if (res.ok) setInList(!inList)
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdropPath}`
  const matchPercent = 85 + Math.floor((movie.title?.charCodeAt(0) || 0) % 15)

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto pt-8 pb-12">
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#181818] w-[95%] max-w-[900px] rounded-lg overflow-hidden shadow-2xl z-10 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 w-9 h-9 bg-[#181818] rounded-full flex items-center justify-center hover:bg-[#303030] transition group"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Hero Section */}
        <div className="relative aspect-video w-full">
          {!imageLoaded && <div className="absolute inset-0 shimmer" />}
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            sizes="900px"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/20 to-transparent" />

          {/* Content over the hero */}
          <div className="absolute bottom-8 left-8 right-8 md:left-12 md:right-12 z-20">
            {/* Netflix badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#E50914] font-bold text-xl tracking-[0.15em]">N</span>
              <span className="text-[#999] text-[11px] font-semibold tracking-[0.3em] uppercase">F I L M</span>
            </div>

            <h2 className="font-bebas text-4xl md:text-6xl text-white drop-shadow-lg tracking-wide mb-4">
              {movie.title}
            </h2>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Play button */}
              <button
                onClick={() => movie.trailerUrl && window.open(movie.trailerUrl, "_blank")}
                className="btn-play px-6 md:px-8 py-2 md:py-2.5 text-base md:text-lg"
              >
                <Play className="w-6 h-6 fill-black" />
                Play
              </button>
              {/* Add to list */}
              <button onClick={handleToggleList} className="circle-btn w-10 h-10 md:w-11 md:h-11">
                {inList ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Plus className="w-5 h-5 text-white" />
                )}
              </button>
              {/* Thumbs up */}
              <button className="circle-btn w-10 h-10 md:w-11 md:h-11">
                <ThumbsUp className="w-4 h-4 text-white" />
              </button>

              {/* Volume - pushed right */}
              <div className="ml-auto flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="circle-btn w-10 h-10"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-8 md:px-12 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-6 md:gap-10 pt-2">
            {/* Left Column - Meta + Description */}
            <div>
              {/* Meta row */}
              <div className="flex items-center gap-2 text-sm mb-4 flex-wrap">
                <span className="match-score">{matchPercent}% Match</span>
                <span className="text-[#bcbcbc]">{movie.releaseYear}</span>
                <span className="maturity-badge">{movie.maturityRating}</span>
                <span className="text-[#bcbcbc]">{movie.duration}</span>
                <span className="border border-white/30 px-1.5 text-[10px] text-[#bcbcbc] tracking-wide">HD</span>
              </div>

              {/* Description */}
              <p className="text-[#d2d2d2] text-sm leading-[1.6] mb-4">
                {movie.description}
              </p>
            </div>

            {/* Right Column - Tags */}
            <div className="space-y-3 text-[13px]">
              <p>
                <span className="text-[#777]">Genre:&nbsp;</span>
                <span className="text-white hover:underline cursor-pointer">{movie.genre}</span>
              </p>
              <p>
                <span className="text-[#777]">This film is:&nbsp;</span>
                <span className="text-white">Exciting, Suspenseful</span>
              </p>
              <p>
                <span className="text-[#777]">Maturity rating:&nbsp;</span>
                <span className="maturity-badge mr-2">{movie.maturityRating}</span>
                <span className="text-white text-xs">recommended for ages 16+</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}