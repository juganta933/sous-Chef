"use client"

import React from 'react'

const Page = () => {

  // Temporary user data
  // Later you can get this from Firebase Auth
  const user = {
    name: "Juganta"
  }

  return (

    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200">

      {/* Navbar */}
    

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          Welcome to <br />
          <span className="text-orange-500">Sous Chef</span>
        </h1>

        <p className="mt-6 max-w-2xl text-gray-600 text-lg md:text-xl">
          Your smart cooking companion for discovering recipes,
          organizing meals, and elevating your culinary journey.
        </p>

        <div className="mt-10 flex items-center gap-4">

          <button className="px-8 py-3 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition duration-300 shadow-lg text-lg font-semibold">
            Explore Recipes
          </button>

          <button className="px-8 py-3 rounded-2xl border border-gray-300 bg-white hover:border-orange-400 hover:text-orange-500 transition duration-300 text-lg font-semibold text-gray-700">
            Learn More
          </button>

        </div>

      </section>

    </main>
  )
}

export default Page