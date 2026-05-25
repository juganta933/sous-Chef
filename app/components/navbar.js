"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

import {
  ChefHat,
  Menu,
  X,
  Sparkles,
  LogOut,
} from "lucide-react"

const Navbar = () => {

  const router = useRouter()

  const [user, setUser] = useState(null)

  const [menuOpen, setMenuOpen] = useState(false)

  // Detect Logged In User
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser)

    })

    return () => unsubscribe()

  }, [])

  // Logout
  const handleLogout = async () => {

    try {

      await signOut(auth)

      router.push("/")

    } catch (error) {

      console.log(error.message)

    }
  }

  return (

    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4">

      {/* Glass Background */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-2xl border-b border-white/10"></div>

      {/* Orange Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[120px] bg-orange-500/20 blur-3xl"></div>

      {/* Main Navbar */}
      <div className="relative flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >

          {/* Logo Icon */}
          <div className="p-3 rounded-2xl bg-orange-500/20 border border-orange-400/20 shadow-[0_0_25px_rgba(255,140,0,0.3)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">

            <ChefHat className="w-6 h-6 text-orange-400" />

          </div>

          {/* Text */}
          <h1 className="text-3xl font-black tracking-tight text-white">

            Sous{" "}

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              Chef
            </span>

          </h1>

        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">

          {/* Home */}
          <button
            onClick={() => router.push("/")}
            className="relative text-gray-200 font-medium hover:text-orange-400 transition duration-300 group"
          >

            Home

            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>

          </button>

          {/* Recipes */}
          <button
            onClick={() => router.push("/recipes")}
            className="relative text-gray-200 font-medium hover:text-orange-400 transition duration-300 group"
          >

            Recipes

            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>

          </button>

          {/* Features */}
          <button
            onClick={() => router.push("/features")}
            className="relative text-gray-200 font-medium hover:text-orange-400 transition duration-300 group"
          >

            Features

            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>

          </button>

          {/* About */}
          <button
            onClick={() => router.push("/about")}
            className="relative text-gray-200 font-medium hover:text-orange-400 transition duration-300 group"
          >

            About

            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>

          </button>

        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">

          {user ? (

            <>

              {/* User Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl">

                <Sparkles className="w-4 h-4 text-orange-400" />

                <span className="text-gray-200 text-sm font-medium">

                  {user.displayName || user.email}

                </span>

              </div>

              {/* Dashboard */}
              <button
                onClick={() => router.push("/Dashboard")}
                className="group relative overflow-hidden px-6 py-3 rounded-2xl bg-orange-500 text-white font-semibold shadow-[0_0_30px_rgba(255,115,0,0.4)] hover:scale-105 hover:bg-orange-600 transition-all duration-500"
              >

                <span className="relative z-10">
                  Dashboard
                </span>

                {/* Shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition duration-1000"></span>

              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-gray-200 hover:border-red-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
              >

                <LogOut className="w-4 h-4" />

                Logout

              </button>

            </>

          ) : (

            <>

              {/* Login */}
              <button
                onClick={() => router.push("/auth")}
                className="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 text-gray-200 hover:border-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all duration-300"
              >

                Login

              </button>

              {/* Sign Up */}
              <button
                onClick={() => router.push("/auth")}
                className="group relative overflow-hidden px-6 py-3 rounded-2xl bg-orange-500 text-white font-semibold shadow-[0_0_30px_rgba(255,115,0,0.4)] hover:scale-105 hover:bg-orange-600 transition-all duration-500"
              >

                <span className="relative z-10">
                  Sign Up
                </span>

                {/* Shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition duration-1000"></span>

              </button>

            </>

          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >

          {menuOpen ? (
            <X className="w-8 h-8" />
          ) : (
            <Menu className="w-8 h-8" />
          )}

        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (

        <div className="md:hidden mt-5 p-6 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-5">

          {[
            { name: "Home", path: "/" },
            { name: "Recipes", path: "/recipes" },
            { name: "Features", path: "/features" },
            { name: "About", path: "/about" },
          ].map((item, index) => (

            <button
              key={index}
              onClick={() => {
                router.push(item.path)
                setMenuOpen(false)
              }}
              className="text-left text-gray-200 hover:text-orange-400 transition duration-300"
            >

              {item.name}

            </button>

          ))}

          <div className="border-t border-white/10 pt-4 flex flex-col gap-4">

            {user ? (

              <>

                <button
                  onClick={() => router.push("/Dashboard")}
                  className="w-full py-3 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition duration-300"
                >

                  Dashboard

                </button>

                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-2xl border border-red-400 text-red-400 hover:bg-red-500/10 transition duration-300"
                >

                  Logout

                </button>

              </>

            ) : (

              <>

                <button
                  onClick={() => router.push("/auth")}
                  className="w-full py-3 rounded-2xl border border-white/10 text-white hover:border-orange-400 hover:text-orange-300 transition duration-300"
                >

                  Login

                </button>

                <button
                  onClick={() => router.push("/auth")}
                  className="w-full py-3 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition duration-300"
                >

                  Sign Up

                </button>

              </>

            )}

          </div>

        </div>

      )}

    </nav>
  )
}

export default Navbar