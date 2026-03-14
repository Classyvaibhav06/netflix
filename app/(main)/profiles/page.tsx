"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const PROFILES = [
  { id: 1, name: "Vaibhav", color: "bg-blue-500", icon: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" },
  { id: 2, name: "Kids", color: "bg-yellow-500", icon: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h821hyh1j7pf3.jpg" },
  { id: 3, name: "Guest", color: "bg-slate-700", icon: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" },
  { id: 4, name: "Family", color: "bg-purple-500", icon: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/bf6e4a33850498.56ba69ac3064f.png" },
  { id: 5, name: "Work", color: "bg-green-500", icon: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/64623633850498.56ba69ac2a6f7.png" },
]

export default function ProfilesPage() {
  const [hoveredProfile, setHoveredProfile] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center animate-fade-in relative overflow-hidden">
      {/* Centered Lighting effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E50914]/5 rounded-full blur-[120px] pointer-events-none" />

      <h1 className="text-white text-3xl md:text-5xl font-medium mb-12 tracking-tight z-10 transition-all duration-700">
        Who's watching?
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 max-w-[90vw] z-10">
        {PROFILES.map((profile) => (
          <Link
            key={profile.id}
            href="/home"
            className="group flex flex-col items-center gap-4"
            onMouseEnter={() => setHoveredProfile(profile.id)}
            onMouseLeave={() => setHoveredProfile(null)}
          >
            <div className="relative">
              {/* Profile Image Wrap */}
              <div className={`
                relative w-24 h-24 md:w-36 md:h-36 rounded-md overflow-hidden transition-all duration-300 transform
                border-2 border-transparent group-hover:border-white group-hover:scale-110 shadow-lg
              `}>
                <Image
                  src={profile.icon}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <span className={`
              text-[#808080] text-sm md:text-xl transition-colors duration-300
              group-hover:text-white
            `}>
              {profile.name}
            </span>
          </Link>
        ))}
      </div>

      <button className="mt-20 border border-[#808080] text-[#808080] px-6 py-2 uppercase tracking-[0.2em] text-sm md:text-lg hover:border-white hover:text-white transition-all duration-300 z-10">
        Manage Profiles
      </button>
    </div>
  )
}
