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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="w-12 h-12 border-[3px] border-[#E50914] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#141414] pt-20 md:pt-24 px-4 md:px-[60px] pb-20">
      <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">My List</h1>

      {watchlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full border-2 border-[#808080] flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <p className="text-[#808080] text-lg mb-2">You haven&apos;t added any titles to your list yet.</p>
          <p className="text-[#808080] text-sm">
            Add movies and shows to your list so you can easily find them later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 md:gap-2">
          {watchlist.filter(Boolean).map((movie) => (
            <div key={movie._id} className="w-full">
              <MovieCard movie={movie} onOpenModal={setSelectedMovie} />
            </div>
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  )
}