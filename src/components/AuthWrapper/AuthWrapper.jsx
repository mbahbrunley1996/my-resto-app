'use client'

import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import NavbarComponent from '@/components/Navbar/NavbarComponent'

// Routes that don't require authentication
const publicRoutes = ['/sign-in', '/sign-up']

// Routes that should not show the navbar
const noNavbarRoutes = ['/sign-in', '/sign-up', '/admin']

export default function AuthWrapper({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isPublicRoute = publicRoutes.includes(pathname)
  const isAdminRoute = pathname.startsWith('/admin')
  const shouldHideNavbar = noNavbarRoutes.some(route => pathname.startsWith(route))

  useEffect(() => {
    if (!loading) {
      // Skip auth check for admin route
      if (isAdminRoute) return
      
      if (!user && !isPublicRoute) {
        // User is not authenticated and trying to access protected route
        router.push('/sign-in')
      } else if (user && isPublicRoute) {
        // User is authenticated but trying to access auth pages
        router.push('/')
      }
    }
  }, [user, loading, pathname, router, isPublicRoute, isAdminRoute])

  // Show loading spinner while checking auth state
  if (loading && !isAdminRoute) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1b0918]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on public route or admin route, show loading while redirecting
  if (!user && !isPublicRoute && !isAdminRoute) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1b0918]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Only show navbar on protected routes (when user is authenticated) and not admin */}
      {!shouldHideNavbar && <NavbarComponent />}
      {children}
    </>
  )
}
