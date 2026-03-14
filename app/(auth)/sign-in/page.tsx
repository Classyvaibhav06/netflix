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
      router.push("/home")
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

          <div className="flex items-center gap-3 my-4 text-[#737373] text-sm">
            <div className="flex-1 h-[1px] bg-[#333]"></div>
            <span>OR</span>
            <div className="flex-1 h-[1px] bg-[#333]"></div>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-medium p-3 rounded transition text-base"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          <div className="flex items-center justify-between mt-5 text-[13px] text-[#b3b3b3]">
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