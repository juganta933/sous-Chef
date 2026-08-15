"use client"

import React from "react"
import { ChefHat, Mail } from "lucide-react"

const Footer = () => {
  return (

    <footer className="relative overflow-hidden border-t border-white/10 bg-black/50 backdrop-blur-2xl text-white">

      {/* Glow Effects */}
      <div className="absolute left-0 top-0 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>

      <div className="absolute right-0 bottom-0 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8">

        {/* Left Side */}
        <div>

          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">

            <div className="p-3 rounded-2xl bg-orange-500/20 border border-orange-400/20 shadow-[0_0_25px_rgba(255,140,0,0.3)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">

              <ChefHat className="w-6 h-6 text-orange-400" />

            </div>

            <h2 className="text-4xl font-black tracking-tight">

              Sous{" "}

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
                Chef
              </span>

            </h2>

          </div>

          {/* Description */}
          <p className="mt-4 text-gray-300 max-w-md leading-relaxed">

            Making cooking smarter, easier, and more enjoyable
            with modern AI-powered recipe experiences.

          </p>

        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end gap-4">

          {/* Contact Button */}
        <a
  href="https://instagram.com/jugantakaushik_official"
  target="_blank"
  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-orange-500/20 hover:border-orange-400 hover:scale-105 transition-all duration-300"
>

  <Mail className="w-5 h-5 text-orange-300" />

  <span className="text-gray-200 font-medium">
    Contact Us
  </span>

</a>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
           © 2026 Sous Chef. Designed & Developed by Juganta Kaushik Boruah.
          </p>

        </div>

      </div>

    </footer>
  )
}

export default Footer