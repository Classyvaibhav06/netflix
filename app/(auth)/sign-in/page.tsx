"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)
    if (res?.error) {
      setError("Sorry, we can't find an account with this email address and password. Please try again.")
    } else {
      router.push("/browse")
      router.refresh()
    }
  }

  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-50 hidden sm:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/background.png" alt="bg" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-transparent to-black/60 hidden sm:block" />

      {/* Header */}
      <header className="relative z-10 px-6 md:px-10 lg:px-14 py-5">
        <Link href="/">
          <img src="/assets/logo.png" alt="Netflix Logo" className="w-28 md:w-36 lg:w-40" />
        </Link>
      </header>

      {/* Form */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-10">
        <div className="bg-black/75 sm:bg-black/75 p-12 sm:p-16 rounded w-full max-w-[450px] mx-4">
          <h1 className="text-[32px] font-bold text-white mb-7">Sign In</h1>

          {error && (
            <div className="bg-[#E87C03] text-white p-4 rounded text-[13px] mb-4 leading-relaxed">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="email"
                id="signin-email"
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-1.5 bg-[#333] rounded text-white text-base focus:outline-none focus:ring-1 focus:ring-white/50 border border-transparent focus:border-white/30 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="signin-email"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c8c8c] text-base transition-all pointer-events-none
                           peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-[#8c8c8c]
                           peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-[11px]"
              >
                Email or phone number
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="signin-password"
                placeholder=" "
                className="peer w-full px-4 pt-5 pb-1.5 bg-[#333] rounded text-white text-base focus:outline-none focus:ring-1 focus:ring-white/50 border border-transparent focus:border-white/30 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="signin-password"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c8c8c] text-base transition-all pointer-events-none
                           peer-focus:top-3 peer-focus:text-[11px] peer-focus:text-[#8c8c8c]
                           peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:text-[11px]"
              >
                Password
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#E50914] text-white font-bold p-3 rounded mt-2 hover:bg-[#F40612] transition disabled:opacity-60 disabled:cursor-not-allowed text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="flex items-center justify-between mt-3 text-[13px] text-[#b3b3b3]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-[#b3b3b3] bg-[#333] rounded" />
              Remember me
            </label>
            <a href="#" className="hover:underline">Need help?</a>
          </div>

          <div className="mt-16">
            <p className="text-[#737373] text-base">
              New to Netflix?{" "}
              <Link href="/sign-up" className="text-white hover:underline font-medium">
                Sign up now.
              </Link>
            </p>
            <p className="text-[#8c8c8c] text-[13px] mt-3 leading-relaxed">
              This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.{" "}
              <a href="#" className="text-[#0071EB] hover:underline">Learn more.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}