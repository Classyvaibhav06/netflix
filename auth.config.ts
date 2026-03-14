import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthRoute = nextUrl.pathname.startsWith("/sign-in") || nextUrl.pathname.startsWith("/sign-up")
      const isPublicRoute = nextUrl.pathname === "/" || isAuthRoute

      // Redirect authenticated users away from auth pages
      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/browse", nextUrl))
        }
        return true
      }

      // Allow all for now, or protect everything else
      if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/sign-in", nextUrl))
      }

      return true
    },
  },
} satisfies NextAuthConfig