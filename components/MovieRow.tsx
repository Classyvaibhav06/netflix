"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import MovieCard from "./MovieCard"

interface MovieRowProps {
  title: string
  movies: any[]
  onOpenModal: (movie: any) => void
  isPoster?: boolean
  isTop10?: boolean
}

export default function MovieRow({ title, movies, onOpenModal, isPoster = false, isTop10 = false }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const checkScrollPosition = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setShowLeftArrow(scrollLeft > 20)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20)
    }
  }

  useEffect(() => {
    checkScrollPosition()
    const ref = rowRef.current
    if (ref) {
      ref.addEventListener("scroll", checkScrollPosition)
      return () => ref.removeEventListener("scroll", checkScrollPosition)
    }
  }, [movies])

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollAmount = clientWidth * 0.85
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  if (!movies || movies.length === 0) return null

  return (
    <div
      className={`relative space-y-1 md:space-y-2 group/row transition-all duration-300 ${isHovering ? "z-[60]" : "z-20"}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Row Title */}
      <h2 className="px-4 md:px-[60px] text-sm md:text-base lg:text-[1.4rem] font-bold text-[#e5e5e5] hover:text-white transition cursor-pointer inline-flex items-center gap-1 group/title">
        {title}
        <span className="text-[#54b9c5] text-xs font-semibold opacity-0 group-hover/title:opacity-100 translate-x-0 group-hover/title:translate-x-1 transition-all duration-300 flex items-center gap-0.5">
          Explore All <ChevronRight className="w-3 h-3" />
        </span>
      </h2>

      {/* Row Container */}
      <div className="relative -mx-1 md:-mx-2">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll("left")}
            className={`absolute top-0 bottom-0 left-0 z-40 w-12 md:w-14 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </button>
        )}

        {/* Scrollable Movie Cards */}
        <div
          ref={rowRef}
          className="flex items-stretch gap-3 md:gap-4 overflow-x-scroll scrollbar-hide px-4 md:px-[60px] pt-6 pb-32 -mb-28 -mt-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {isTop10
            ? movies.slice(0, 10).map((movie, idx) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onOpenModal={onOpenModal}
                  rank={idx + 1}
                />
              ))
            : movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onOpenModal={onOpenModal}
                  isPoster={isPoster}
                />
              ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll("right")}
            className={`absolute top-0 bottom-0 right-0 z-40 w-12 md:w-14 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-opacity duration-300 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </button>
        )}
      </div>
    </div>
  )
}