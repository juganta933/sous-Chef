"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"

import {
    ChefHat,
    Clock3,
    Flame,
    Star,
} from "lucide-react"

const recipes = [
    {
        title: "Creamy Italian Pasta",
        image:
            "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1974&auto=format&fit=crop",
        time: "25 mins",
        difficulty: "Easy",
        rating: "4.9",
    },
    {
        title: "Grilled Steak",
        image:
            "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1974&auto=format&fit=crop",
        time: "40 mins",
        difficulty: "Medium",
        rating: "4.8",
    },
    {
        title: "Healthy Salad Bowl",
        image:
            "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop",
        time: "15 mins",
        difficulty: "Easy",
        rating: "4.7",
    },
    {
        title: "Classic Burger",
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop",
        time: "30 mins",
        difficulty: "Medium",
        rating: "4.9",
    },
    {
        title: "Sushi Delight",
        image:
            "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1974&auto=format&fit=crop",
        time: "50 mins",
        difficulty: "Hard",
        rating: "4.8",
    },
    {
        title: "Chocolate Pancakes",
        image:
            "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=1974&auto=format&fit=crop",
        time: "20 mins",
        difficulty: "Easy",
        rating: "5.0",
    },
]

const RecipesPage = () => {

    const router = useRouter()
    return (

        <main className="relative min-h-screen overflow-hidden bg-black text-white">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-3xl"></div>

            {/* Hero Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">

                    <ChefHat className="w-4 h-4 text-orange-400" />

                    <span className="text-sm text-gray-300 tracking-wide">
                        Delicious Recipes Collection
                    </span>

                </div>

                {/* Heading */}
                <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight max-w-5xl">

                    Explore mouth-watering
                    recipes from around the world.

                </h1>

                {/* Subtitle */}
                <p className="mt-8 text-lg md:text-2xl text-gray-300 leading-relaxed max-w-3xl">

                    Discover trending dishes, restaurant-style meals,
                    healthy options, and chef-inspired recipes
                    curated for every food lover.

                </p>

            </section>

            {/* Recipe Cards */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    {recipes.map((recipe, index) => (

                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl hover:border-orange-400/30 transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
                        >

                            {/* Floating Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-yellow-500/0 group-hover:from-orange-500/10 group-hover:to-yellow-500/10 transition-all duration-500"></div>

                            {/* Recipe Image */}
                            <div className="relative overflow-hidden h-72">

                                <img
                                    src={recipe.image}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* Rating */}
                                <div className="absolute top-5 right-5 flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">

                                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />

                                    <span className="text-sm font-medium">
                                        {recipe.rating}
                                    </span>

                                </div>

                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-6">

                                <h2 className="text-2xl font-black group-hover:text-orange-300 transition duration-300">

                                    {recipe.title}

                                </h2>

                                {/* Info */}
                                <div className="mt-5 flex items-center justify-between">

                                    {/* Time */}
                                    <div className="flex items-center gap-2 text-gray-300">

                                        <Clock3 className="w-4 h-4 text-orange-400" />

                                        <span className="text-sm">
                                            {recipe.time}
                                        </span>

                                    </div>

                                    {/* Difficulty */}
                                    <div className="flex items-center gap-2 text-gray-300">

                                        <Flame className="w-4 h-4 text-yellow-300" />

                                        <span className="text-sm">
                                            {recipe.difficulty}
                                        </span>

                                    </div>

                                </div>

                                {/* Button */}
                                <button
                                    onClick={() => {

                                        const user = auth.currentUser

                                        if (user) {

                                            router.push(
                                                `/Dashboard?recipe=${encodeURIComponent(recipe.title)}`
                                            )

                                        } else {

                                            router.push("/auth")

                                        }

                                    }}
                                    className="group/button relative overflow-hidden mt-6 w-full py-4 rounded-2xl bg-orange-500 text-white font-semibold shadow-[0_0_30px_rgba(255,115,0,0.4)] hover:bg-orange-600 transition-all duration-500 hover:scale-[1.02]"
                                >

                                    <span className="relative z-10">
                                        View Recipe
                                    </span>

                                    {/* Shine */}
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover/button:translate-x-[200%] transition duration-1000"></span>

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

        </main>
    )
}

export default RecipesPage