"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

import {
  ChefHat,
  Search,
  Mic,
  Sparkles,
  ArrowRight,
  Flame,
  Clock3,
  Utensils,
} from "lucide-react";

const DashboardContent = () => {
  const searchParams = useSearchParams();
  const [userName, setUserName] = useState("")

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {

      if (user) {

        setUserName(user.displayName || user.email?.split("@")[0])

      }

    })

    return () => unsubscribe()

  }, [])

  const [dishName, setDishName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (query) => {

    if (!query.trim()) {

      setSuggestions([]);
      return;

    }

    try {

      const response = await fetch(

        `https://api.spoonacular.com/recipes/autocomplete?query=${query}&number=6&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`

      );

      const data = await response.json();

      setSuggestions(data);

    } catch (error) {

      console.log(error);

    }

  };

  // const [dishName, setDishName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {

    const recipeName = searchParams.get("recipe");

    if (recipeName) {

      setDishName(recipeName);

    }

  }, [searchParams]);

  const handleStartCooking = async () => {

    if (!dishName.trim()) return;

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        `/api/recipe?query=${encodeURIComponent(dishName)}`
      );

      const data = await response.json();

      if (!response.ok) {

        throw new Error(data.error || "Failed to find recipe.");

      }

      // Save Recipe
      localStorage.setItem("selectedRecipe", JSON.stringify(data));

      router.push("/kitchen");

    } catch (err) {

      setError(err.message);

      setLoading(false);

    }
  };

  return (

    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl"></div>

      {/* Floating Blur */}
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-orange-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24"
      >

        {/* Hero Section */}
        <div className="text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">

            <Sparkles className="w-4 h-4 text-orange-400" />

            <span className="text-sm text-gray-300 tracking-wide">
              AI Powered Kitchen Assistant
            </span>

          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">

            Hello,{" "}

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">

              Chef {userName || "Guest"}!

            </span>

          </h1>

          {/* Subtitle */}
          <p className="mt-8 text-lg md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">

            Search any recipe and transform it into
            a distraction-free cooking experience
            built for real kitchens.

          </p>

        </div>

        {/* Search Box */}
        <div className="mt-16 max-w-4xl mx-auto">

          <div className="relative overflow-hidden p-4 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_50px_rgba(255,140,0,0.1)]">

            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-4">

              {/* Input */}
              <div className="relative flex-1">

                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400" />

                <input
                  type="text"
                  placeholder="Search recipes like Pasta, Sushi, Curry..."
                  value={dishName}
                  onFocus={() => setShowSuggestions(true)}

                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  onChange={(e) => {

                    const value = e.target.value;

                    setDishName(value);

                    fetchSuggestions(value);

                    setShowSuggestions(true);

                  }}
                  className="w-full pl-14 pr-5 py-5 rounded-2xl bg-black/30 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 text-lg"
                />

                {showSuggestions && suggestions.length > 0 && (

                  <div className="absolute top-full left-0 mt-3 w-full rounded-2xl border border-white/10 bg-black/95 backdrop-blur-2xl shadow-2xl overflow-hidden z-50">

                    {suggestions.map((recipe) => (

                      <button
                        key={recipe.id}
                        onClick={() => {

                          setDishName(recipe.title);
                          setShowSuggestions(false);

                        }}
                        className="w-full text-left px-5 py-4 hover:bg-orange-500/20 transition-all duration-300 text-gray-200 border-b border-white/5"
                      >

                        {recipe.title}

                      </button>

                    ))}

                  </div>

                )}

              </div>

              {/* Button */}
              <button
                onClick={handleStartCooking}
                disabled={loading}
                className="group relative overflow-hidden px-8 py-5 rounded-2xl bg-orange-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(255,115,0,0.4)] hover:bg-orange-600 hover:scale-[1.02] transition-all duration-500 disabled:opacity-50"
              >

                <span className="relative z-10 flex items-center gap-2">

                  {loading ? "Finding..." : "Start Cooking"}

                  {!loading && (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />
                  )}

                </span>

                {/* Shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[200%] transition duration-1000"></span>

              </button>

            </div>

          </div>

          {/* Error */}
          {error && (

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-5 text-red-400 font-medium text-center"
            >

              {error}

            </motion.p>

          )}

        </div>

        {/* Feature Cards */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Voice Control */}
          <div className="group p-8 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-orange-500/10 hover:border-orange-400/30 transition-all duration-500 hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,140,0,0.3)]">

              <Mic className="w-8 h-8 text-orange-400" />

            </div>

            <h2 className="mt-6 text-2xl font-black">
              Voice Controlled
            </h2>

            <p className="mt-4 text-gray-300 leading-relaxed">

              Navigate recipes hands-free with
              smart voice commands while cooking.

            </p>

          </div>

          {/* Smart Scaling */}
          <div className="group p-8 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-yellow-500/10 hover:border-yellow-400/30 transition-all duration-500 hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,200,0,0.3)]">

              <Flame className="w-8 h-8 text-yellow-300" />

            </div>

            <h2 className="mt-6 text-2xl font-black">
              Smart Scaling
            </h2>

            <p className="mt-4 text-gray-300 leading-relaxed">

              Automatically adjust ingredients
              and servings instantly without manual math.

            </p>

          </div>

          {/* Kitchen Safe */}
          <div className="group p-8 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:bg-orange-500/10 hover:border-orange-400/30 transition-all duration-500 hover:-translate-y-2">

            <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,140,0,0.3)]">

              <Utensils className="w-8 h-8 text-orange-400" />

            </div>

            <h2 className="mt-6 text-2xl font-black">
              Kitchen Safe UI
            </h2>

            <p className="mt-4 text-gray-300 leading-relaxed">

              Distraction-free cooking mode designed
              specifically for real kitchen environments.

            </p>

          </div>

        </div>

        {/* Popular Searches */}
        <div className="mt-24">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="w-6 h-6 text-orange-400" />

            <h2 className="text-3xl font-black">
              Popular Searches
            </h2>

          </div>

          <div className="flex flex-wrap gap-4">

            {[
              "Creamy Pasta",
              "Chicken Curry",
              "Sushi",
              "Burger",
              "Pizza",
              "Healthy Salad",
            ].map((dish, index) => (

              <button
                key={index}
                onClick={() =>
                  router.push(`/Dashboard?recipe=${encodeURIComponent(dish)}`)
                }
                className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-200 hover:bg-orange-500/20 hover:border-orange-400 hover:text-orange-300 hover:scale-105 transition-all duration-300"
              >

                {dish}

              </button>

            ))}

          </div>

        </div>

      </motion.div>

    </main>
  );
};

const DashboardPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
};

export default DashboardPage;