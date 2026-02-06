'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

// Routes that don't require authentication
const publicRoutes = ['/sign-in', '/sign-up']

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      const isPublicRoute = publicRoutes.includes(pathname)

      if (!user && !isPublicRoute) {
        // User is not authenticated and trying to access protected route
        router.push('/sign-in')
      } else if (user && isPublicRoute) {
        // User is authenticated but trying to access auth pages
        router.push('/')
      }
    }
  }, [user, loading, pathname, router])

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1b0918]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on public route, show loading while redirecting
  const isPublicRoute = publicRoutes.includes(pathname)
  if (!user && !isPublicRoute) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1b0918]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  return children
}
