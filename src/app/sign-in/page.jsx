'use client'

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { ImSpinner2 } from "react-icons/im"

const SignInPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
    const { signIn, signInWithGoogle, signInWithGithub } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            await signIn(email, password)
            router.push("/")
        } catch (error) {
            console.error("Sign in error:", error)
            switch (error.code) {
                case "auth/user-not-found":
                    setError("No account found with this email.")
                    break
                case "auth/wrong-password":
                    setError("Incorrect password.")
                    break
                case "auth/invalid-email":
                    setError("Invalid email address.")
                    break
                case "auth/invalid-credential":
                    setError("Invalid email or password.")
                    break
                default:
                    setError("Failed to sign in. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setError("")
        setLoading(true)
        try {
            await signInWithGoogle()
            router.push("/")
        } catch (error) {
            console.error("Google sign in error:", error)
            setError("Failed to sign in with Google.")
        } finally {
            setLoading(false)
        }
    }

    const handleGithubSignIn = async () => {
        setError("")
        setLoading(true)
        try {
            await signInWithGithub()
            router.push("/")
        } catch (error) {
            console.error("GitHub sign in error:", error)
            setError("Failed to sign in with GitHub.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Image */}
            <div 
                className="hidden lg:flex lg:w-1/2 relative"
                style={{
                    backgroundImage: "url('/hero/hero-2.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />
                
                {/* Content on image */}
                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
                    <Link href="/" className="group flex flex-col items-center mb-8">
                        <span className="text-2xl md:text-3xl font-serif font-light tracking-[0.3em] uppercase text-white">
                            THE <span className="text-amber-500 font-bold">ESSENCE</span>
                        </span>
                    </Link>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
                        Welcome Back
                    </h2>
                    <p className="text-gray-300 text-lg max-w-md">
                        Experience culinary excellence where timeless recipes meet modern elegance.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#1b0918] px-6 py-12">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-10">
                        <Link href="/" className="inline-block">
                            <span className="text-xl font-serif font-light tracking-[0.3em] uppercase text-white">
                                THE <span className="text-amber-500 font-bold">ESSENCE</span>
                            </span>
                        </Link>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-serif text-white mb-3">
                            Sign In
                        </h1>
                        <p className="text-gray-400 text-sm tracking-wide">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-400 text-xs tracking-[0.15em] uppercase mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                disabled={loading}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition duration-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs tracking-[0.15em] uppercase mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                disabled={loading}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition duration-300"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-4 rounded-lg tracking-wider uppercase text-sm transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <ImSpinner2 className="animate-spin h-5 w-5" />
                                    Signing In...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-8">
                        <div className="flex-1 border-t border-white/10"></div>
                        <span className="px-4 text-gray-500 text-xs tracking-widest uppercase">Or continue with</span>
                        <div className="flex-1 border-t border-white/10"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex gap-4">
                        <button
                            disabled={loading}
                            onClick={handleGoogleSignIn}
                            className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-amber-500/50 text-white py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FcGoogle className="text-xl" />
                            <span className="text-sm font-medium">Google</span>
                        </button>
                        <button
                            disabled={loading}
                            onClick={handleGithubSignIn}
                            className="flex-1 flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-amber-500/50 text-white py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FaGithub className="text-xl" />
                            <span className="text-sm font-medium">GitHub</span>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center mt-8 text-gray-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/sign-up" className="text-amber-500 hover:text-amber-400 font-medium transition duration-300">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignInPage
