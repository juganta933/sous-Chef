"use client";

import { useEffect, useState } from "react";
import { ChefHat, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"


export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white cursor-none">
      
      {/* Custom Knife Cursor */}
      <div
        className="fixed z-[9999] pointer-events-none text-3xl rotate-45 transition-transform duration-75"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%) rotate(45deg)",
        }}
      >
        🔪
      </div>

      {/* Mouse Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(
            300px at ${position.x}px ${position.y}px,
            rgba(255,140,0,0.18),
            transparent 80%
          )`,
        }}
      />

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
          alt="Food Background"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-yellow-500/10" />
      </div>

      {/* Floating Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Main Content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen">

        {/* Badge */}
        <div className="mb-6 flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg hover:scale-110 hover:bg-orange-500/20 transition-all duration-500">
          
          <Sparkles className="text-orange-400 w-4 h-4 animate-pulse" />

          <span className="text-sm tracking-wide text-gray-100">
          The Smarter Way to Cook
          </span>

        </div>

        {/* Logo */}
        <div className="flex items-center gap-4 group">
          
          <div className="p-4 rounded-3xl bg-orange-500/20 border border-orange-400/30 shadow-[0_0_40px_rgba(255,140,0,0.4)] group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
            
            <ChefHat className="w-10 h-10 text-orange-400" />

          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight">
            Sous{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              Chef
            </span>
          </h1>

        </div>

        {/* Subtitle */}
        <p className="mt-8 max-w-2xl text-lg md:text-2xl text-gray-200 leading-relaxed">
          Discover delicious recipes, cook hands-free, and elevate your kitchen experience with smart cooking tools built for modern chefs.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-5">

          {/* Get Started */}
       <button
  onClick={() => {

    const user = auth.currentUser

    if (user) {

      router.push("/Dashboard")

    } else {

      router.push("/auth")

    }

  }}
  className="group relative overflow-hidden px-10 py-4 rounded-2xl bg-orange-500 text-white text-lg font-semibold shadow-[0_0_30px_rgba(255,115,0,0.5)] hover:scale-110 hover:-translate-y-1 hover:bg-orange-600 transition-all duration-500"
>

  <span className="relative z-10 flex items-center gap-2">

    Get Started

    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition duration-300" />

  </span>

  {/* Shine */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition duration-1000"></span>

</button>

          {/* Explore */}
       <button
  onClick={() => {

    const user = auth.currentUser

    if (user) {

      router.push("/recipes")

    } else {

      router.push("/auth")

    }

  }}
  className="px-10 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl text-lg font-medium text-gray-100 hover:bg-orange-500/20 hover:border-orange-400 hover:text-orange-300 hover:scale-110 hover:-translate-y-1 transition-all duration-500 shadow-xl"
>

  Explore Recipes

</button>
        </div>

        {/* Floating Cards */}
        <div className="hidden lg:flex absolute bottom-16 left-10 gap-4">

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl hover:-translate-y-3 hover:rotate-2 hover:bg-orange-500/20 transition-all duration-500">
            
            <p className="text-orange-300 text-sm">
              🔥 Trending
            </p>

            <h3 className="font-bold text-lg mt-1">
              Italian Pasta
            </h3>

          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl hover:-translate-y-3 hover:-rotate-2 hover:bg-yellow-500/20 transition-all duration-500">
            
            <p className="text-yellow-300 text-sm">
              ⭐ Featured
            </p>

            <h3 className="font-bold text-lg mt-1">
              Healthy Salads
            </h3>

          </div>

        </div>

      </section>
    </main>
  );
}