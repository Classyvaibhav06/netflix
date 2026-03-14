"use client"

import { X, Play, Plus, Check, ThumbsUp, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

function getYouTubeId(url: string): string | null {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return match ? match[1] : null
}

export default function MovieModal({ movie, onClose }: { movie: any; onClose: () => void }) {
  const [inList, setInList] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [similarMovies, setSimilarMovies] = useState<any[]>([])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    
    // Fetch similar movies for "More Like This"
    fetch("/api/movies")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Just grab some random ones excluding current
          const filtered = data.filter(m => m._id !== movie._id).slice(0, 6)
          setSimilarMovies(filtered)
        }
      })

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [movie._id])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    
    const timer = setTimeout(() => {
      setIsPlaying(true)
    }, 2000)

    return () => {
      window.removeEventListener("keydown", handleEsc)
      clearTimeout(timer)
    }
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
  const youtubeId = getYouTubeId(movie.trailerUrl)

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto pt-8 pb-12 px-4 scrim-overlay backdrop-blur-sm transition-all duration-300">
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#181818] w-full max-w-[950px] rounded-lg overflow-hidden shadow-2xl z-10 animate-fade-in border border-white/5">
        {/* Close Button - Stitch style */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[60] size-10 bg-[#181818]/80 hover:bg-[#303030] rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Section */}
        <div className="relative aspect-video w-full group">
          {isPlaying && youtubeId ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden z-10">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&rel=0&modestbranding=1&showinfo=0&disablekb=1&iv_load_policy=3&start=6`}
                title={`${movie.title} Trailer`}
                className="absolute inset-0 w-full h-[150%] -top-[25%] pointer-events-none fade-in"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          ) : (
            <>
              {!imageLoaded && <div className="absolute inset-0 shimmer" />}
              <Image
                src={backdropUrl}
                alt={movie.title}
                fill
                className={`object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
                sizes="950px"
              />
            </>
          )}

          {/* Hero Gradient - Stitch refined */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/10 to-transparent z-20 pointer-events-none" />
          
          {/* Action Row Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-30">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl mb-8 tracking-tighter uppercase italic">
              {movie.title}
            </h1>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(true)}
                className="flex items-center justify-center gap-2 px-8 py-2.5 bg-white text-black font-bold text-lg rounded hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
              >
                <Play className="w-6 h-6 fill-black" />
                Play
              </button>
              
              <button 
                onClick={handleToggleList} 
                className="flex items-center justify-center size-11 rounded-full border-2 border-slate-400 bg-black/40 text-white hover:border-white transition-all duration-200"
              >
                {inList ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
              
              <button className="flex items-center justify-center size-11 rounded-full border-2 border-slate-400 bg-black/40 text-white hover:border-white transition-all duration-200">
                <ThumbsUp className="w-5 h-5" />
              </button>

              <div className="ml-auto">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="size-11 rounded-full border-2 border-slate-400 bg-black/40 text-white hover:border-white transition-all duration-200 flex items-center justify-center"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - Two Column Layout */}
        <div className="px-8 md:px-12 py-10">
          <div className="grid grid-cols-12 gap-12 pt-2">
            {/* Left Column: Description & Metadata */}
            <div className="col-span-12 md:col-span-8 space-y-6">
              <div className="flex items-center gap-2 text-sm font-medium flex-wrap">
                <span className="match-score text-green-500 font-bold">{matchPercent}% Match</span>
                <span className="text-[#bcbcbc]">{movie.releaseYear}</span>
                <span className="maturity-badge">{movie.maturityRating}</span>
                <span className="text-[#bcbcbc]">{movie.duration}</span>
                <div className="flex items-center gap-1">
                  <span className="px-1 border border-white/30 text-[8px] rounded-sm text-[#bcbcbc]">HD</span>
                  <span className="px-1 border border-white/30 text-[8px] rounded-sm text-[#bcbcbc]">4K</span>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed text-slate-200 font-display">
                {movie.description}
              </p>
            </div>

            {/* Right Column: Mini Metadata */}
            <div className="col-span-12 md:col-span-4 space-y-4 text-sm font-display">
              <div className="flex flex-wrap gap-1">
                <span className="text-[#777]">Cast:</span>
                <span className="text-slate-200 hover:underline cursor-pointer">Julianne Moore, Oscar Isaac, Steven Yeun</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-[#777]">Genres:</span>
                <span className="text-slate-200 hover:underline cursor-pointer">{movie.genre}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="text-[#777]">This movie is:</span>
                <span className="text-slate-200">Mind-bending, Gritty, Suspenseful</span>
              </div>
            </div>
          </div>

          {/* More Like This Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-white tracking-tight italic">More Like This</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {similarMovies.length > 0 ? (
                similarMovies.map((similar) => (
                  <div key={similar._id} className="bg-[#232323] rounded-md overflow-hidden flex flex-col group cursor-pointer transition-transform duration-300 hover:scale-[1.02] shadow-xl border border-white/5">
                    <div className="relative aspect-video w-full">
                       <Image
                          src={`https://image.tmdb.org/t/p/w500${similar.backdropPath}`}
                          alt={similar.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 300px"
                       />
                       <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="size-8 rounded-full bg-black/60 border border-white/40 flex items-center justify-center hover:bg-black/90">
                            <Plus className="w-4 h-4 text-white" />
                          </button>
                       </div>
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[#46d369] text-sm font-bold">{80 + Math.floor(Math.random() * 20)}% Match</span>
                        <div className="flex items-center gap-2">
                          <span className="maturity-badge !text-[9px] !leading-none px-1 py-0.5">{similar.maturityRating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-[#bcbcbc] line-clamp-3 leading-relaxed">
                        {similar.description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                // Skeleton/Loading states
                [...Array(6)].map((_, i) => (
                  <div key={i} className="bg-[#232323] rounded-md overflow-hidden animate-pulse aspect-video"></div>
                ))
              )}
            </div>
          </div>

          {/* Modal Footer - About Section */}
          <div className="mt-20 border-t border-white/10 pt-10 pb-8">
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-wider text-[#777]">
              About <span className="text-white">{movie.title}</span>
            </h3>
            <div className="space-y-4 text-sm max-w-2xl">
              <div className="flex gap-4">
                <span className="text-[#777] min-w-[100px]">Director:</span>
                <span className="text-slate-200">Denis Villeneuve</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[#777] min-w-[100px]">Cast:</span>
                <span className="text-slate-200 leading-relaxed">Julianne Moore, Oscar Isaac, Steven Yeun, Florence Pugh, Mahershala Ali, Lakeith Stanfield, Ana de Armas</span>
              </div>
              <div className="flex gap-4">
                <span className="text-[#777] min-w-[100px]">Maturity Rating:</span>
                <div className="flex flex-col gap-1">
                   <span className="maturity-badge w-fit">{movie.maturityRating}</span>
                   <span className="text-[#bcbcbc] text-xs">Recommended for mature audiences.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}