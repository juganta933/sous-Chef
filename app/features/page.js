"use client"

import React from "react"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import {
  Mic,
  Hand,
  MoonStar,
  Calculator,
  ChefHat,
  Sparkles,
  ArrowRight,
} from "lucide-react"

const FeaturesPage = () => {
    const router = useRouter()
  return (

    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">

          <Sparkles className="w-4 h-4 text-orange-400" />

          <span className="text-sm text-gray-300 tracking-wide">
            Powerful Smart Features
          </span>

        </div>

        {/* Heading */}
        <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight max-w-5xl">

          Designed for a smarter
          cooking experience.

        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-2xl text-gray-300 leading-relaxed max-w-3xl">

          Sous Chef combines voice control, motion interaction,
          intelligent scaling, and distraction-free cooking tools
          into one seamless experience.

        </p>

      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Feature Card 1 */}
          <div className="group relative overflow-hidden p-10 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-orange-400/30 hover:bg-orange-500/10 transition-all duration-500 hover:-translate-y-2">

            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">

              <div className="w-20 h-20 rounded-3xl bg-orange-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(255,140,0,0.3)]">

                <Mic className="w-10 h-10 text-orange-400" />

              </div>

              <h2 className="mt-8 text-3xl font-black">
                Voice Commands
              </h2>

              <p className="mt-5 text-gray-300 leading-relaxed text-lg">

                Navigate recipes completely hands-free using
                natural voice commands like
                “Next Step”, “Previous”, or
                “Repeat Ingredients”.

              </p>

            </div>

          </div>

          {/* Feature Card 2 */}
          <div className="group relative overflow-hidden p-10 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-yellow-400/30 hover:bg-yellow-500/10 transition-all duration-500 hover:-translate-y-2">

            <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">

              <div className="w-20 h-20 rounded-3xl bg-yellow-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(255,200,0,0.3)]">

                <Hand className="w-10 h-10 text-yellow-300" />

              </div>

              <h2 className="mt-8 text-3xl font-black">
                Gesture Navigation
              </h2>

              <p className="mt-5 text-gray-300 leading-relaxed text-lg">

                Use hand gestures and motion detection
                to scroll recipes in the kitchen
                without touching your screen.

              </p>

            </div>

          </div>

          {/* Feature Card 3 */}
          <div className="group relative overflow-hidden p-10 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-orange-400/30 hover:bg-orange-500/10 transition-all duration-500 hover:-translate-y-2">

            <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">

              <div className="w-20 h-20 rounded-3xl bg-orange-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(255,140,0,0.3)]">

                <MoonStar className="w-10 h-10 text-orange-400" />

              </div>

              <h2 className="mt-8 text-3xl font-black">
                Screen Wake Lock
              </h2>

              <p className="mt-5 text-gray-300 leading-relaxed text-lg">

                Prevent your device from dimming or locking
                while cooking mode is active,
                keeping recipes visible at all times.

              </p>

            </div>

          </div>

          {/* Feature Card 4 */}
          <div className="group relative overflow-hidden p-10 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-yellow-400/30 hover:bg-yellow-500/10 transition-all duration-500 hover:-translate-y-2">

            <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">

              <div className="w-20 h-20 rounded-3xl bg-yellow-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(255,200,0,0.3)]">

                <Calculator className="w-10 h-10 text-yellow-300" />

              </div>

              <h2 className="mt-8 text-3xl font-black">
                Smart Recipe Scaling
              </h2>

              <p className="mt-5 text-gray-300 leading-relaxed text-lg">

                Instantly adjust ingredient quantities
                for different serving sizes with
                automatic fraction calculations.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-32">

        <div className="relative overflow-hidden p-12 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl text-center">

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10"></div>

          <div className="relative z-10">

            <div className="mx-auto w-24 h-24 rounded-3xl bg-orange-500/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,140,0,0.3)]">

              <ChefHat className="w-12 h-12 text-orange-400" />

            </div>

            <h2 className="mt-8 text-4xl md:text-5xl font-black leading-tight">

              Experience cooking
              without interruptions.

            </h2>

            <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">

              Sous Chef helps you stay focused on cooking
              while technology handles the distractions.

            </p>

            {/* CTA Button */}
           <button
  onClick={() => {

    const user = auth.currentUser

    if (user) {

      router.push("/Dashboard")

    } else {

      router.push("/auth")

    }

  }}
  className="group relative overflow-hidden mt-10 px-8 py-4 rounded-2xl bg-orange-500 text-white text-lg font-semibold shadow-[0_0_30px_rgba(255,115,0,0.5)] hover:bg-orange-600 hover:scale-105 transition-all duration-500"
>

  <span className="relative z-10 flex items-center gap-2">

    Try Sous Chef

    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />

  </span>

  {/* Shine */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition duration-1000"></span>

</button>

          </div>

        </div>

      </section>

    </main>
  )
}

export default FeaturesPage