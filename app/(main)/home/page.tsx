"use client"

import { useEffect, useState, useMemo } from "react"
import HeroBanner from "@/components/HeroBanner"
import MovieRow from "@/components/MovieRow"
import MovieModal from "@/components/MovieModal"

export default function Home() {
  const [movies, setMovies] = useState<any[]>([])
  const [watchlist, setWatchlist] = useState<any[]>([])
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/movies").then((res) => res.json()),
      fetch("/api/watchlist")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) return data.map((item) => item.movieId).filter(Boolean)
          return []
        })
        .catch(() => []),
    ]).then(([movieData, watchlistData]) => {
      setMovies(movieData)
      setWatchlist(watchlistData)
      setLoading(false)
    })
  }, [])

  // Build category rows like Netflix
  const { featured, rows } = useMemo(() => {
    if (movies.length === 0) return { featured: null, rows: [] }

    const featured = movies.find((m) => m.isFeatured) || movies[0]

    // Collect all unique genres
    const genreMap = new Map<string, any[]>()
    movies.forEach((m) => {
      const genre = m.genre || "Other"
      if (!genreMap.has(genre)) genreMap.set(genre, [])
      genreMap.get(genre)!.push(m)
    })

    // Shuffle helper
    const shuffle = (arr: any[]) => [...arr].sort(() => Math.random() - 0.5)

    // Build Netflix-style category rows
    const rows: { title: string; movies: any[]; isPoster?: boolean; isTop10?: boolean }[] = []

    // 1. Trending Now (all movies, shuffled)
    rows.push({ title: "Trending Now", movies: shuffle(movies) })

    // 2. Top 10 in India Today
    rows.push({ title: "Top 10 in India Today", movies: shuffle(movies).slice(0, 10), isTop10: true })

    // 3. Netflix Originals (poster style, shuffled selection)
    rows.push({ title: "Only on Netflix", movies: shuffle(movies), isPoster: true })

    // 4. My List (if any)
    if (watchlist.length > 0) {
      rows.push({ title: "My List", movies: watchlist })
    }

    // 5. Genre-based rows
    const genreRowTitles: Record<string, string> = {
      Action: "Action & Adventure",
      Comedy: "Comedies",
      Drama: "Award-Winning Dramas",
      Thriller: "Thrillers",
      "Sci-Fi": "Sci-Fi & Fantasy",
      Horror: "Horror Movies",
      Romance: "Romantic Movies",
    }

    genreMap.forEach((genreMovies, genre) => {
      if (genreMovies.length >= 2) {
        rows.push({
          title: genreRowTitles[genre] || genre,
          movies: shuffle(genreMovies),
        })
      }
    })

    // 6. Continue Watching (simulated with random picks)
    rows.splice(1, 0, {
      title: "Continue Watching for You",
      movies: shuffle(movies).slice(0, 8),
    })

    // 7. New Releases
    const newReleases = [...movies]
      .filter((m) => m.releaseYear >= 2016)
      .sort((a, b) => b.releaseYear - a.releaseYear)
    if (newReleases.length >= 2) {
      rows.push({ title: "New Releases", movies: newReleases })
    }

    // 8. Popular on Netflix
    rows.push({ title: "Popular on Netflix", movies: shuffle(movies) })

    // 9. Watch it again
    rows.push({ title: "Watch It Again", movies: shuffle(movies).slice(0, 6) })

    return { featured, rows }
  }, [movies, watchlist])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-[3px] border-[#E50914] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center gap-4">
        <div className="text-[#E50914] text-6xl font-bold">N</div>
        <p className="text-gray-400 text-lg">No movies found. Try seeding the database.</p>
      </div>
    )
  }

  return (
    <main className="bg-[#141414] pb-32 min-h-screen">
      <HeroBanner movie={featured} onOpenModal={setSelectedMovie} />

      {/* Movie Rows - overlapping hero bottom like Netflix */}
      <div className="-mt-[6vw] relative z-20 space-y-2 md:space-y-6">
        {rows.map((row) => (
          <MovieRow
            key={row.title}
            title={row.title}
            movies={row.movies}
            onOpenModal={setSelectedMovie}
            isPoster={row.isPoster}
            isTop10={row.isTop10}
          />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-20 pb-10 px-4 md:px-[60px]">
        <div className="max-w-[980px] mx-auto">
          <div className="flex gap-4 mb-5">
            <a href="#" className="text-[#808080] hover:text-[#b3b3b3] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="#" className="text-[#808080] hover:text-[#b3b3b3] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="text-[#808080] hover:text-[#b3b3b3] transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2.5 text-[13px] text-[#808080] mb-6">
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Audio Description</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Help Centre</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Gift Cards</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Media Centre</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Investor Relations</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Jobs</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Terms of Use</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Privacy</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Legal Notices</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Cookie Preferences</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Corporate Information</a>
            <a href="#" className="hover:text-[#b3b3b3] hover:underline transition">Contact Us</a>
          </div>

          <button className="text-[#808080] text-[13px] border border-[#808080] px-2 py-1 hover:text-white hover:border-white transition mb-5">
            Service Code
          </button>

          <p className="text-[#808080] text-[11px]">© 1997-2024 Netflix, Inc.</p>
        </div>
      </footer>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </main>
  )
}