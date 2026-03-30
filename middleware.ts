import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = [
  '/',
  '/executive',
  '/legal', 
  '/finance',
  '/sales',
  '/master',
  '/engineering',
  '/estate',
  '/bank',
  '/notary',
  '/settings'
]

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ['/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get user from localStorage (client-side check will handle this properly)
  // For server-side, we'll check cookies in a real implementation
  const userCookie = request.cookies.get('user')
  const isAuthenticated = !!userCookie

  console.log('🔐 Middleware check:', { pathname, isAuthenticated })

  // Redirect to auth if trying to access protected route without authentication
  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    console.log('🚫 Redirecting to auth - Protected route:', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect to dashboard if already authenticated and trying to access auth routes
  if (authRoutes.includes(pathname) && isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    console.log('🏠 Redirecting to dashboard - Already authenticated')
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
