"use client"

import React, { useState } from 'react'
import { useRouter } from "next/navigation"

import { auth } from "@/lib/firebase"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth"

import {
  ChefHat,
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Flame,
  ShieldCheck,
} from "lucide-react"

const Page = () => {

  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  // Google Login
  const handleGoogleLogin = async () => {

    setError("")
    setMessage("")

    try {

      const provider = new GoogleAuthProvider()

      const result =
        await signInWithPopup(auth, provider)

      console.log(result.user)

      setMessage("Successfully logged in with Google.")

      setTimeout(() => {
        router.push("/Dashboard")
      }, 1000)

    } catch (error) {

      setError(error.message)
    }
  }

  // Login
  const handleLogin = async (e) => {

    e.preventDefault()

    setError("")
    setMessage("")

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

      console.log(userCredential.user)

      setMessage("Successfully logged into your account.")

      setTimeout(() => {
        router.push("/Dashboard")
      }, 1000)

    } catch (error) {

      if (error.code === "auth/invalid-credential") {

        setError("Incorrect email or password.")

      } else if (error.code === "auth/user-not-found") {

        setError("No account found with this email.")

      } else {

        setError("Login failed. Please try again.")
      }
    }
  }

  // Signup
  const handleSignup = async (e) => {

    e.preventDefault()

    setError("")
    setMessage("")

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

      console.log(userCredential.user)

      setMessage("Your account has been created successfully.")

      setTimeout(() => {
        router.push("/Dashboard")
      }, 1000)

    } catch (error) {

      if (error.code === "auth/email-already-in-use") {

        setError("An account with this email already exists.")

      } else if (error.code === "auth/weak-password") {

        setError("Password should be at least 6 characters.")

      } else {

        setError("Signup failed. Please try again.")
      }
    }
  }

  return (

    <main className="relative min-h-screen overflow-y-auto overflow-x-hidden bg-black text-white flex items-center justify-center px-6 py-10">

      {/* Background Glow */}
      <div className="pointer-events-none absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl"></div>

      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl"></div>

      <div className="pointer-events-none absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      {/* Knife Cursor Glow */}
      <div className="pointer-events-none fixed inset-0 z-0"></div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(255,115,0,0.15)]">

        {/* Left Side */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 border-r border-white/10 overflow-hidden">

          {/* Glow */}
          <div className="pointer-events-none absolute top-0 left-0 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>

          <div className="relative z-10">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-400/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,115,0,0.4)]">

                <ChefHat className="w-7 h-7 text-orange-400" />

              </div>

              <div>

                <h1 className="text-3xl font-black">
                  Sous <span className="text-orange-400">Chef</span>
                </h1>

                <p className="text-gray-400 text-sm">
                  Smart Cooking Experience
                </p>

              </div>

            </div>

            {/* Hero Text */}
            <div className="mt-20">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">

                <Sparkles className="w-4 h-4 text-orange-400" />

                <span className="text-sm text-gray-300">
                  AI Powered Kitchen Assistant
                </span>

              </div>

              <h2 className="mt-8 text-5xl font-black leading-tight">

                Cook smarter.
                <br />
                Stay focused.

              </h2>

              <p className="mt-6 text-lg text-gray-300 leading-relaxed">

                Voice controlled recipes, smart ingredient scaling,
                kitchen-safe mode, and a distraction-free experience
                designed for real chefs.

              </p>

            </div>

          </div>

          {/* Bottom Features */}
          <div className="relative z-10 grid grid-cols-2 gap-4 mt-16">

            <div className="p-5 rounded-3xl bg-white/5 border border-white/10">

              <Flame className="w-8 h-8 text-orange-400" />

              <h3 className="mt-4 font-bold text-lg">
                Smart Scaling
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Instantly adjust servings without math.
              </p>

            </div>

            <div className="p-5 rounded-3xl bg-white/5 border border-white/10">

              <ShieldCheck className="w-8 h-8 text-yellow-300" />

              <h3 className="mt-4 font-bold text-lg">
                Kitchen Safe
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                No sleep mode while cooking.
              </p>

            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="relative p-8 md:p-12">

          {/* Floating Glow */}
          <div className="pointer-events-none absolute top-10 right-10 w-40 h-40 bg-orange-500/10 blur-3xl rounded-full"></div>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">

            <ChefHat className="w-10 h-10 text-orange-400" />

            <h1 className="text-4xl font-black">
              Sous <span className="text-orange-400">Chef</span>
            </h1>

          </div>

          {/* Toggle */}
          <div className="relative z-10 flex w-full p-1.5 rounded-2xl bg-white/5 border border-white/10">

            <button
              type="button"
              onClick={() => {
                setIsLogin(true)
                setError("")
                setMessage("")
              }}
              className={`w-1/2 h-12 flex items-center justify-center rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                isLogin
                  ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(255,115,0,0.4)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLogin(false)
                setError("")
                setMessage("")
              }}
              className={`w-1/2 h-12 flex items-center justify-center rounded-xl font-bold transition-all duration-300 cursor-pointer ${
                !isLogin
                  ? "bg-orange-500 text-white shadow-[0_0_30px_rgba(255,115,0,0.4)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Sign Up
            </button>

          </div>

          {/* Heading */}
          <div className="mt-10">

            <h2 className="text-4xl font-black">

              {isLogin
                ? "Welcome Back Chef"
                : "Create Your Account"}

            </h2>

            <p className="mt-3 text-gray-400">

              {isLogin
                ? "Login to continue your cooking journey."
                : "Join Sous Chef and cook smarter today."}

            </p>

          </div>

          {/* Form */}
          <form
            onSubmit={isLogin ? handleLogin : handleSignup}
            className="mt-10 space-y-5"
          >

            {/* Error */}
            {error && (
              <div className="px-5 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300">
                {error}
              </div>
            )}

            {/* Success */}
            {message && (
              <div className="px-5 py-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-300">
                {message}
              </div>
            )}

            {/* Email */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-300">
                Email Address
              </label>

              <div className="relative">

                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                />

              </div>

            </div>

            {/* Password */}
            <div>

              <label className="block mb-2 text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">

                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-14 py-4 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition duration-300"
                >

                  {showPassword
                    ? <EyeOff className="w-5 h-5" />
                    : <Eye className="w-5 h-5" />}

                </button>

              </div>

            </div>

            {/* Forgot Password */}
            {isLogin && (
              <div className="text-right">

                <button
                  type="button"
                  className="text-sm text-orange-400 hover:text-orange-300 transition duration-300"
                >
                  Forgot Password?
                </button>

              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="group relative overflow-hidden w-full py-4 rounded-2xl bg-orange-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(255,115,0,0.4)] hover:bg-orange-600 hover:scale-[1.02] transition-all duration-500"
            >

              <span className="relative z-10 flex items-center justify-center gap-2">

                {isLogin ? "Login" : "Create Account"}

                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />

              </span>

              {/* Shine */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition duration-1000"></span>

            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-[1px] bg-white/10"></div>

            <span className="text-gray-500 text-sm">
              OR CONTINUE WITH
            </span>

            <div className="flex-1 h-[1px] bg-white/10"></div>

          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 text-white font-semibold backdrop-blur-xl hover:border-orange-400/30"
          >

            Continue with Google

          </button>

        </div>

      </div>

    </main>
  )
}

export default Page