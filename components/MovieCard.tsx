"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Play, Plus, Check, ChevronDown, ThumbsUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface MovieCardProps {
  movie: any
  onOpenModal: (movie: any) => void
  isPoster?: boolean
  rank?: number
}

export default function MovieCard({ movie, onOpenModal, isPoster = false, rank }: MovieCardProps) {
  const router = useRouter()
  const [inList, setInList] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const backdropUrl = `https://image.tmdb.org/t/p/w780${movie.backdropPath}`
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.posterPath}`

  const handleToggleList = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const res = await fetch("/api/watchlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ movieId: movie._id }),
    })
    if (res.ok) {
      setInList(!inList)
    }
  }

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => setIsHovered(true), 300)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsHovered(false)
  }

  // Random match percentage for visual authenticity
  const matchPercent = 85 + Math.floor((movie.title?.charCodeAt(0) || 0) % 15)

  if (rank !== undefined) {
    // Top 10 Card Layout
    return (
      <div
        className="relative flex items-end min-w-[200px] md:min-w-[300px] cursor-pointer group shrink-0"
        onClick={() => onOpenModal(movie)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Big number */}
        <div className="top10-number select-none pr-0 -mr-4 relative z-0 flex-shrink-0">
          {rank}
        </div>
        {/* Poster */}
        <div className="relative w-[120px] md:w-[160px] aspect-[2/3] rounded overflow-hidden z-10 transition-transform duration-300 group-hover:scale-105 shadow-lg">
          {!imageLoaded && <div className="absolute inset-0 shimmer rounded" />}
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            sizes="160px"
          />
        </div>
      </div>
    )
  }

  if (isPoster) {
    // Netflix Originals tall poster card
    return (
      <div
        className="relative min-w-[130px] md:min-w-[200px] cursor-pointer group shrink-0"
        onClick={() => onOpenModal(movie)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[2/3] w-full rounded-[4px] overflow-hidden transition-transform duration-300 group-hover:scale-105 shadow-lg bg-[#1a1a1a]">
          {!imageLoaded && <div className="absolute inset-0 shimmer" />}
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 130px, 200px"
          />
        </div>
      </div>
    )
  }

  // Standard landscape backdrop card
  return (
    <div
      className="relative min-w-[230px] md:min-w-[300px] cursor-pointer group shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal(movie)}
    >
      <div className="relative aspect-video w-full rounded-[4px] overflow-hidden bg-[#1a1a1a] transition-all duration-300 group-hover:rounded-b-none group-hover:scale-105 group-hover:z-50 group-hover:shadow-[0_-5px_26px_6px_rgba(0,0,0,0.8)]">
        {!imageLoaded && <div className="absolute inset-0 shimmer" />}
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 230px, 300px"
        />
      </div>

      {/* Hover expanded info panel (Netflix-style dropdown under card) */}
      <div
        className={`absolute top-full left-0 right-0 bg-[#181818] rounded-b-md shadow-[0_10px_26px_6px_rgba(0,0,0,0.8)] z-50 transform origin-top transition-all duration-300 group-hover:scale-105 ${
          isHovered ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* We counter-scale the content slightly so text doesn't look stretched */}
        <div className="p-3 pt-2.5 transition-transform duration-300 group-hover:scale-[0.952]">
          {/* Action buttons row */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              {/* Play */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/movie/${movie._id}`)
                }}
                className="circle-btn-white w-8 h-8 md:w-9 md:h-9"
              >
                <Play className="w-4 h-4 text-black fill-black ml-0.5" />
              </button>
              {/* Add to list */}
              <button onClick={handleToggleList} className="circle-btn w-8 h-8 md:w-9 md:h-9">
                {inList ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Plus className="w-4 h-4 text-white" />
                )}
              </button>
              {/* Thumbs up */}
              <button className="circle-btn w-8 h-8 md:w-9 md:h-9">
                <ThumbsUp className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            {/* Expand modal */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onOpenModal(movie)
              }}
              className="circle-btn w-8 h-8 md:w-9 md:h-9"
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Movie meta */}
          <div className="flex items-center gap-2 text-[12px] mb-1.5 flex-wrap">
            <span className="match-score text-[13px]">{matchPercent}% Match</span>
            <span className="maturity-badge">{movie.maturityRating}</span>
            <span className="text-[#bcbcbc]">{movie.duration}</span>
            <span className="border border-white/30 px-1 text-[9px] text-[#bcbcbc]">HD</span>
          </div>

          {/* Genre tags */}
          <div className="flex items-center gap-1 text-[11px] text-[#bcbcbc]">
            <span>{movie.genre}</span>
            <span className="text-[#646464]">•</span>
            <span>{movie.releaseYear}</span>
          </div>
        </div>
      </div>
    </div>
  )
}