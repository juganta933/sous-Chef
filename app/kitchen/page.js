"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

import annyang from "annyang";

import {
  ChefHat,
  Mic,
  MicOff,
  Flame,
  MoonStar,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function KitchenPage() {

  const [recipe, setRecipe] = useState(null);

  const [servings, setServings] = useState(4);

  const [currentStep, setCurrentStep] = useState(0);

  const [isStarted, setIsStarted] = useState(false);

  const [isListening, setIsListening] = useState(false);

  const [wakeLockEnabled, setWakeLockEnabled] = useState(true);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const wakeLockRef = useRef(null);

  // Load Recipe
  useEffect(() => {

    const data = localStorage.getItem("selectedRecipe");

    if (data) {

      const parsed = JSON.parse(data);

      setRecipe(parsed);

      setServings(parsed.servings);

    }

    return () => {

      if (annyang) {

        annyang.abort();

      }

    };

  }, []);

  // Mouse Tracking
  useEffect(() => {

    const moveCursor = (e) => {

      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

    };

    window.addEventListener("mousemove", moveCursor);

    return () =>
      window.removeEventListener("mousemove", moveCursor);

  }, []);

  // Next Step
  const handleNext = useCallback(() => {

    if (recipe) {

      setCurrentStep((s) =>
        Math.min(recipe.instructions.length - 1, s + 1)
      );

    }

  }, [recipe]);

  // Previous Step
  const handleBack = useCallback(() => {

    setCurrentStep((s) => Math.max(0, s - 1));

  }, []);

  // Start Kitchen Mode
  const startKitchenMode = async () => {

    setIsStarted(true);

    // Wake Lock
    if ("wakeLock" in navigator && wakeLockEnabled) {

      try {

        wakeLockRef.current =
          await navigator.wakeLock.request("screen");

      } catch (err) {

        console.error("WakeLock Error:", err);

      }

    }

    // Voice Commands
    if (annyang) {

      const commands = {

        next: handleNext,

        "next step": handleNext,

        back: handleBack,

        previous: handleBack,

        "previous step": handleBack,

      };

      annyang.addCommands(commands);

      annyang.addCallback("start", () =>
        setIsListening(true)
      );

      annyang.addCallback("end", () =>
        setIsListening(false)
      );

      annyang.addCallback("error", (err) => {

        console.error("Speech Error:", err);

        setIsListening(false);

      });

      annyang.start({

        autoRestart: true,

        continuous: false,

      });

    } else {

      alert(
        "Speech Recognition is not supported on this browser."
      );

    }

  };

  if (!recipe) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl font-bold">

        Loading Recipe...

      </div>

    );

  }

  // Start Screen
  if (!isStarted) {

    return (

      <main className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center px-6 cursor-none">

        {/* Mouse Light */}
        <div
          className="pointer-events-none fixed inset-0 z-[1]"
          style={{
            background: `radial-gradient(
              250px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(255,140,0,0.15),
              transparent 40%
            )`,
          }}
        ></div>

        {/* Knife Cursor */}
        <motion.div
          animate={{
            x: mousePosition.x - 20,
            y: mousePosition.y - 20,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
          className="pointer-events-none fixed top-0 left-0 z-[9999]"
        >

          <div className="absolute inset-0 w-16 h-16 bg-orange-500/30 rounded-full blur-2xl animate-pulse"></div>

          <div className="relative flex items-center justify-center rotate-45">

            <div className="w-10 h-[3px] bg-gradient-to-r from-gray-200 to-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>

            <div className="absolute right-[-8px] w-0 h-0 border-t-[6px] border-b-[6px] border-l-[12px] border-t-transparent border-b-transparent border-l-white"></div>

            <div className="absolute left-[-12px] w-5 h-3 bg-orange-500 rounded-l-full shadow-[0_0_15px_rgba(255,140,0,0.8)]"></div>

          </div>

        </motion.div>

        {/* Glow Effects */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl"></div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-2xl w-full p-12 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl text-center"
        >

          <div className="mx-auto w-28 h-28 rounded-3xl bg-orange-500/20 border border-orange-400/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,140,0,0.3)]">

            <ChefHat className="w-14 h-14 text-orange-400" />

          </div>

          <h1 className="mt-10 text-5xl font-black">

            Ready to Cook?

          </h1>

          <p className="mt-6 text-xl text-gray-300 leading-relaxed">

            Enter distraction-free kitchen mode
            with voice navigation and smart cooking tools.

          </p>

          <button
            onClick={startKitchenMode}
            className="group relative overflow-hidden mt-12 px-10 py-5 rounded-2xl bg-orange-500 text-white text-xl font-bold shadow-[0_0_40px_rgba(255,115,0,0.5)] hover:bg-orange-600 hover:scale-105 transition-all duration-500"
          >

            <span className="relative z-10 flex items-center gap-3">

              Start Kitchen Mode

              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition duration-300" />

            </span>

          </button>

        </motion.div>

      </main>

    );

  }

  const scalingFactor = servings / recipe.servings;

  return (

    <main className="relative min-h-screen overflow-hidden bg-black text-white cursor-none">

      {/* Mouse Light */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: `radial-gradient(
            250px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(255,140,0,0.12),
            transparent 40%
          )`,
        }}
      ></div>

      {/* Knife Cursor */}
      <motion.div
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
      >

        <div className="absolute inset-0 w-16 h-16 bg-orange-500/30 rounded-full blur-2xl animate-pulse"></div>

        <div className="relative flex items-center justify-center rotate-45">

          <div className="w-10 h-[3px] bg-gradient-to-r from-gray-200 to-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>

          <div className="absolute right-[-8px] w-0 h-0 border-t-[6px] border-b-[6px] border-l-[12px] border-t-transparent border-b-transparent border-l-white"></div>

          <div className="absolute left-[-12px] w-5 h-3 bg-orange-500 rounded-l-full shadow-[0_0_15px_rgba(255,140,0,0.8)]"></div>

        </div>

      </motion.div>

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">

              <Sparkles className="w-4 h-4 text-orange-400" />

              <span className="text-sm text-gray-300">
                Kitchen Safe Mode
              </span>

            </div>

            <h1 className="mt-5 text-4xl md:text-6xl font-black">

              {recipe.title}

            </h1>

          </div>

          <div className="flex items-center gap-4">

            <div className={`px-5 py-3 rounded-2xl border backdrop-blur-xl text-sm font-bold ${
              wakeLockEnabled
                ? "bg-green-500/10 border-green-400/20 text-green-300"
                : "bg-red-500/10 border-red-400/20 text-red-300"
            }`}>

              <div className="flex items-center gap-2">

                <MoonStar className="w-4 h-4" />

                WAKE LOCK

              </div>

            </div>

            <div className={`px-5 py-3 rounded-2xl border backdrop-blur-xl text-sm font-bold ${
              isListening
                ? "bg-green-500/10 border-green-400/20 text-green-300"
                : "bg-red-500/10 border-red-400/20 text-red-300"
            }`}>

              <div className="flex items-center gap-2">

                {isListening ? (
                  <Mic className="w-4 h-4" />
                ) : (
                  <MicOff className="w-4 h-4" />
                )}

                {isListening ? "MIC ACTIVE" : "MIC OFF"}

              </div>

            </div>

          </div>

        </div>

        {/* Ingredients & Steps */}
        <section className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Ingredients */}
          <div className="lg:col-span-1 p-8 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl">

            <h2 className="text-3xl font-black">
              Ingredients
            </h2>

            <div className="mt-8">

              <label className="text-sm text-gray-400 block mb-3">

                Adjust Servings

              </label>

              <input
                type="number"
                value={servings}
                onChange={(e) =>
                  setServings(
                    Math.max(
                      1,
                      parseInt(e.target.value) || 1
                    )
                  )
                }
                className="w-full px-5 py-4 rounded-2xl bg-black/30 border border-white/10 text-white outline-none focus:border-orange-400"
              />

            </div>

            <ul className="mt-8 space-y-4">

              {recipe.ingredients.map((ing, i) => (

                <li
                  key={i}
                  className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
                >

                  <span className="text-gray-200">

                    {ing.name}

                  </span>

                  <span className="font-bold text-orange-400">

                    {(ing.amount * scalingFactor).toFixed(2)}{" "}
                    {ing.unit}

                  </span>

                </li>

              ))}

            </ul>

          </div>

          {/* Steps */}
          <div className="lg:col-span-2">

            <div className="mb-6 flex items-center justify-between">

              <span className="text-orange-400 font-bold text-lg">

                Step {currentStep + 1} /{" "}
                {recipe.instructions.length}

              </span>

              <div className="w-40 h-2 rounded-full bg-white/10 overflow-hidden">

                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      ((currentStep + 1) /
                        recipe.instructions.length) *
                      100
                    }%`,
                  }}
                ></div>

              </div>

            </div>

            <AnimatePresence mode="wait">

              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden p-10 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl min-h-[320px] flex flex-col justify-between"
              >

                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-yellow-500/5"></div>

                <div className="relative z-10">

                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-400/20 text-orange-300 text-sm font-bold">

                    <Flame className="w-4 h-4" />

                    Cooking Instruction

                  </span>

                  <p className="mt-10 text-2xl md:text-3xl font-semibold leading-relaxed text-gray-100">

                    {recipe.instructions[currentStep]}

                  </p>

                </div>

                <div className="relative z-10 mt-12 flex items-center justify-between">

                  <button
                    onClick={handleBack}
                    className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300"
                  >

                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition duration-300" />

                    Previous

                  </button>

                  <button
                    onClick={handleNext}
                    className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-orange-500 text-white font-bold shadow-[0_0_30px_rgba(255,115,0,0.4)] hover:bg-orange-600 hover:scale-105 transition-all duration-500"
                  >

                    <span className="relative z-10 flex items-center gap-3">

                      Next Step

                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition duration-300" />

                    </span>

                  </button>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </section>

      </div>

    </main>

  );

}