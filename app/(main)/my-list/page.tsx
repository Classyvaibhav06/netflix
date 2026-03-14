"use client"

import { useEffect, useState } from "react"
import MovieCard from "@/components/MovieCard"
import MovieModal from "@/components/MovieModal"

export default function MyList() {
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/watchlist")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setWatchlist(data.map((item) => item.movieId).filter(Boolean))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleRemove = (movieId: string) => {
    setWatchlist((prev) => prev.filter((movie) => movie._id !== movieId))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-[3px] border-[#E50914] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-32 px-4 md:px-12 pb-20 font-display">
      {/* Hero Title Section */}
      <div className="mb-10 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">My List</h1>
        <div className="stitch-title-underline"></div>
      </div>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
          {/* Cinematic Empty State Icon */}
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 bg-[#E50914]/10 rounded-full blur-2xl"></div>
            <div className="relative w-full h-full rounded-full border border-white/10 flex items-center justify-center bg-black/60 shadow-2xl backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                <path d="M12 2v20M5 12h14" className="rotate-45 origin-center" />
                <rect width="18" height="18" x="3" y="3" rx="2" />
              </svg>
            </div>
          </div>
          <h2 className="text-white text-2xl font-bold mb-3">Your list is empty.</h2>
          <p className="text-[#808080] max-w-md mx-auto mb-10 leading-relaxed">
            Add movies and TV shows to keep track of what you want to watch. 
            Everything you add will show up right here.
          </p>
          <button 
            onClick={() => window.location.href = "/"}
            className="btn-play px-8 py-3 text-lg hover:scale-105 transition-transform"
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12">
          {watchlist.filter(Boolean).map((movie) => (
            <MovieCard 
              key={movie._id} 
              movie={movie} 
              onOpenModal={setSelectedMovie} 
              isPoster={true} 
              showRemove={true}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}