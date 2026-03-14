"use client"

import Image from "next/image"
import { Play, Info, Volume2, VolumeX } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function HeroBanner({ movie, onOpenModal }: { movie: any; onOpenModal?: (movie: any) => void }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true
    // Staggered reveal animation
    const timer = setTimeout(() => {
      if (mountedRef.current) setShowContent(true)
    }, 300)
    return () => {
      mountedRef.current = false
      clearTimeout(timer)
    }
  }, [])

  if (!movie) return null

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdropPath}`

  return (
    <div className="relative h-[56.25vw] min-h-[450px] max-h-[90vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        {!imageLoaded && (
          <div className="absolute inset-0 shimmer" />
        )}
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          className={`object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          sizes="100vw"
        />

        {/* Gradient overlays - exactly like Netflix */}
        <div className="absolute inset-0 gradient-hero-left" />
        <div className="absolute inset-0 gradient-hero-bottom" />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div
        className={`absolute bottom-[35%] md:bottom-[30%] left-4 md:left-[60px] w-[90%] md:w-[45%] lg:w-[36%] space-y-4 z-10 transition-all duration-700 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Netflix "N" Series/Film badge */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[#E50914] font-bold text-lg tracking-[0.15em]">N</span>
          <span className="text-[#999] text-xs font-semibold tracking-[0.3em] uppercase">F I L M</span>
        </div>

        {/* Title */}
        <h1 className="font-bebas text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] text-white leading-[0.9] drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] tracking-wide">
          {movie.title}
        </h1>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-sm">
          <span className="match-score">98% Match</span>
          <span className="text-[#bcbcbc]">{movie.releaseYear}</span>
          <span className="maturity-badge">{movie.maturityRating}</span>
          <span className="text-[#bcbcbc]">{movie.duration}</span>
          <span className="border border-white/30 px-1.5 text-[10px] text-[#bcbcbc] tracking-wide">HD</span>
        </div>

        {/* Description */}
        <p className="text-[#d2d2d2] text-sm md:text-base leading-relaxed line-clamp-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
          {movie.description}
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-2 md:gap-3 pt-1">
          <button className="btn-play px-5 md:px-8 py-1.5 md:py-2.5 text-sm md:text-base">
            <Play className="w-5 h-5 md:w-6 md:h-6 fill-black" />
            <span className="ml-1">Play</span>
          </button>
          <button
            onClick={() => onOpenModal?.(movie)}
            className="btn-more-info px-4 md:px-7 py-1.5 md:py-2.5 text-sm md:text-base"
          >
            <Info className="w-5 h-5 md:w-6 md:h-6" />
            <span className="ml-1">More Info</span>
          </button>
        </div>
      </div>

      {/* Maturity + Volume control - bottom right like Netflix */}
      <div
        className={`absolute bottom-[35%] right-4 md:right-[60px] flex items-center gap-3 z-10 transition-all duration-700 delay-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="circle-btn w-9 h-9"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>
        <div className="bg-[#333]/80 border-l-[3px] border-white px-3 py-1 text-[0.8rem] text-white/90 font-medium">
          {movie.maturityRating || "TV-MA"}
        </div>
      </div>
    </div>
  )
}