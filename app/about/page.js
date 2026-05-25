"use client"

import React from "react"
import { ChefHat, Mic, MoonStar, Calculator } from "lucide-react"

const AboutPage = () => {
  return (

    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">

        {/* Small Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">

          <ChefHat className="w-4 h-4 text-orange-400" />

          <span className="text-sm text-gray-300 tracking-wide">
            Smart Cooking Experience
          </span>

        </div>

        {/* Heading */}
        <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight max-w-5xl">

          Cooking should feel effortless —
          not frustrating.

        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-2xl text-gray-300 leading-relaxed max-w-3xl">

          Sous Chef transforms any recipe into a clean,
          distraction-free, kitchen-safe cooking experience
          designed for real cooks in real kitchens.

        </p>

      </section>

      {/* Problem Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-28">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Voice Control */}
          <div className="group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-orange-500/10 hover:border-orange-400/30 transition-all duration-500 hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,140,0,0.3)]">

              <Mic className="w-8 h-8 text-orange-400" />

            </div>

            <h2 className="mt-6 text-2xl font-bold">
              The Dirty Hands Problem
            </h2>

            <p className="mt-4 text-gray-300 leading-relaxed">

              Cooking gets messy. Sous Chef uses the Web Speech API
              so users can simply say commands like
              “Next Step”, “Previous”, or “How Much Garlic?”
              without touching the screen.

            </p>

          </div>

          {/* Wake Lock */}
          <div className="group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-yellow-500/10 hover:border-yellow-400/30 transition-all duration-500 hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,200,0,0.3)]">

              <MoonStar className="w-8 h-8 text-yellow-300" />

            </div>

            <h2 className="mt-6 text-2xl font-bold">
              The Screen Sleep Problem
            </h2>

            <p className="mt-4 text-gray-300 leading-relaxed">

              No more unlocking your device with flour-covered hands.
              Sous Chef uses the Screen Wake Lock API to keep
              the screen awake while cooking mode is active.

            </p>

          </div>

          {/* Recipe Scaling */}
          <div className="group p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-orange-500/10 hover:border-orange-400/30 transition-all duration-500 hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,140,0,0.3)]">

              <Calculator className="w-8 h-8 text-orange-400" />

            </div>

            <h2 className="mt-6 text-2xl font-bold">
              The Math Problem
            </h2>

            <p className="mt-4 text-gray-300 leading-relaxed">

              Scaling recipes should not require mental math.
              Sous Chef instantly recalculates ingredient quantities
              when servings change — even fractions.

            </p>

          </div>

        </div>

      </section>

      {/* Vision Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-32 text-center">

        <div className="p-10 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl">

          <h2 className="text-4xl md:text-5xl font-black leading-tight">

            Built for real kitchens.
          </h2>

          <p className="mt-8 text-lg md:text-xl text-gray-300 leading-relaxed">

            Sous Chef is not just another recipe app.
            It is designed to remove friction from cooking
            and create a smoother, smarter, and more immersive
            culinary experience for everyone.

          </p>

        </div>

      </section>

    </main>
  )
}

export default AboutPage