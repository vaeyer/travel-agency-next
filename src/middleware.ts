import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyJWT } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ['/purchase']

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    const token = request.cookies.get('token')?.value

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Verify the token
    const payload = verifyJWT(token)
    if (!payload) {
      // Redirect to login if token is invalid
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('token') // Clear invalid token
      return response
    }
  }

  // For auth pages, redirect to purchase if already logged in
  const authPages = ['/login', '/register']
  if (authPages.includes(pathname)) {
    const token = request.cookies.get('token')?.value
    if (token) {
      const payload = verifyJWT(token)
      if (payload) {
        return NextResponse.redirect(new URL('/purchase', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/purchase/:path*',
    '/login',
    '/register'
  ]
}