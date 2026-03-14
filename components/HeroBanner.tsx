"use client"

import Image from "next/image"
import { Play, Info, Volume2, VolumeX } from "lucide-react"
import { useState, useEffect, useRef } from "react"

function getYouTubeId(url: string): string | null {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function HeroBanner({ movie, onOpenModal }: { movie: any; onOpenModal?: (movie: any) => void }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isActuallyPlaying, setIsActuallyPlaying] = useState(false)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
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
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (isHovered) {
      hoverTimerRef.current = setTimeout(() => {
        setIsActuallyPlaying(true)
      }, 2000)
    } else {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
      setIsActuallyPlaying(false)
    }
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current)
    }
  }, [isHovered])

  if (!movie) return null

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdropPath}`
  const youtubeId = getYouTubeId(movie.trailerUrl)

  return (
    <div 
      className="relative h-[56.25vw] min-h-[450px] max-h-[90vh] w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        {youtubeId && isActuallyPlaying ? (
          <div className="absolute inset-0 w-full h-[150%] -top-[25%] pointer-events-none fade-in">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&rel=0&modestbranding=1&showinfo=0&disablekb=1&iv_load_policy=3&start=6`}
              title={`${movie.title} Trailer`}
              className="w-full h-full pointer-events-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : (
          <>
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
          </>
        )}

        {/* Gradient overlays - exactly like Netflix */}
        <div className="absolute inset-0 gradient-hero-left" />
        <div className="absolute inset-0 gradient-hero-bottom" />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div
        className={`absolute bottom-[25%] md:bottom-[20%] left-4 md:left-[60px] w-[90%] md:w-[45%] lg:w-[40%] space-y-6 z-30 transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Cinematic Logo Badge */}
        <div className="flex items-center gap-2 animate-pulse-slow">
          <div className="w-6 h-10 bg-[#E50914] flex items-center justify-center font-bold text-white text-xl shadow-[0_0_15px_rgba(229,9,20,0.4)]">
            N
          </div>
          <span className="text-white/70 text-xs font-bold tracking-[0.4em] uppercase">S E R I E S</span>
        </div>

        {/* Cinematic Title */}
        <h1 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold text-white leading-[0.8] drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] tracking-tighter uppercase italic">
          {movie.title}
        </h1>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-4">
          <button className="flex items-center justify-center gap-3 px-8 py-3 bg-white text-black font-bold text-xl rounded hover:bg-white/80 transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl">
            <Play className="w-8 h-8 fill-black" />
            Play
          </button>
          <button
            onClick={() => onOpenModal?.(movie)}
            className="flex items-center justify-center gap-3 px-8 py-3 bg-white/20 text-white font-bold text-xl rounded backdrop-blur-md hover:bg-white/30 transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl border border-white/10"
          >
            <Info className="w-8 h-8" />
            More Info
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