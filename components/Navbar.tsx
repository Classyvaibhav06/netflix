"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, Bell, ChevronDown, LogOut, X } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

const NAV_LINKS = [
  { label: "Home", href: "/home" },
  { label: "TV Shows", href: "/tv" },
  { label: "Movies", href: "/movies" },
  { label: "New & Popular", href: "/new" },
  { label: "My List", href: "/my-list" },
  { label: "Browse by Languages", href: "/languages" },
]

const PROFILE_AVATARS = [
  { color: "bg-[#E50914]", label: "" },
  { color: "bg-[#0072CE]", label: "" },
  { color: "bg-[#46D369]", label: "" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const searchRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-[60px] h-[41px] md:h-[68px]">
        {/* Left Section */}
        <div className="flex items-center gap-5 lg:gap-10">
          <Link href="/home" className="shrink-0">
            <img
              src="/assets/logo.png"
              alt="Netflix"
              className="h-5 md:h-[25px] lg:h-7 transition-opacity hover:opacity-80"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-[#e5e5e5] hover:text-[#b3b3b3] transition-colors duration-400 font-normal"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Browse Dropdown */}
          <div className="lg:hidden relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-1 text-[13px] text-white font-medium"
            >
              Browse
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileMenuOpen && (
              <div className="absolute top-10 left-0 bg-black/95 border border-gray-800 rounded py-2 w-56 animate-fade-in">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-[#e5e5e5] hover:text-white hover:bg-white/5 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search */}
          <div className="relative flex items-center">
            {isSearchOpen ? (
              <div className="flex items-center bg-black/85 border border-white/70 animate-fade-in">
                <Search className="w-4 h-4 text-white ml-2.5" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Titles, people, genres"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-white text-sm px-2 py-1.5 w-[180px] md:w-[250px] focus:outline-none placeholder:text-gray-400"
                />
                <button onClick={() => { setIsSearchOpen(false); setSearchQuery("") }} className="pr-2">
                  <X className="w-4 h-4 text-white/70 hover:text-white" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-[#b3b3b3] transition"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Notification Bell */}
          <button className="text-white hover:text-[#b3b3b3] transition relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E50914] rounded-full text-[8px] flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-8 h-8 rounded overflow-hidden bg-[#E50914]">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "Profile"}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm font-bold text-white">
                    {session?.user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white transition-transform duration-200 hidden md:block ${
                  isMenuOpen ? "rotate-180" : "group-hover:rotate-180"
                }`}
              />
            </button>

            {isMenuOpen && (
              <div className="absolute top-[52px] right-0 w-[220px] bg-black/[0.93] border border-gray-700/50 rounded-sm py-0 shadow-2xl animate-fade-in z-[110]">
                {/* Arrow */}
                <div className="absolute -top-[7px] right-6 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[7px] border-b-white/90" />
                
                {/* Profile section */}
                <div className="py-3 border-b border-gray-700/50">
                  <Link href="/profiles" className="flex items-center gap-3 px-3 py-2 hover:underline cursor-pointer transition group">
                    <div className="w-8 h-8 rounded bg-blue-500 overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[13px] text-white">Vaibhav</span>
                  </Link>
                </div>

                {/* Menu items */}
                <div className="py-3 border-b border-gray-700/50">
                  <Link href="/profiles" className="block w-full text-left px-3 py-1.5 text-[13px] text-[#b3b3b3] hover:text-white hover:underline transition">
                    Manage Profiles
                  </Link>
                  <button className="w-full text-left px-3 py-1.5 text-[13px] text-[#b3b3b3] hover:text-white hover:underline transition">
                    Account
                  </button>
                  <button className="w-full text-left px-3 py-1.5 text-[13px] text-[#b3b3b3] hover:text-white hover:underline transition">
                    Help Centre
                  </button>
                </div>

                {/* Sign out */}
                <div className="py-3">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-center px-3 py-1.5 text-[13px] text-[#b3b3b3] hover:text-white hover:underline transition"
                  >
                    Sign out of Netflix
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}