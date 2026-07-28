"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Sparkles, Cpu, Lock, CheckCircle2 } from "lucide-react";

const loadingSteps = [
  "Initializing secure environment...",
  "Connecting to encrypted servers...",
  "Fetching legal records & profiles...",
  "Optimizing workspace...",
  "Almost ready...",
];

export default function Loading() {
  const [currentStep, setCurrentStep] = useState(0);

  // Rotate loading text messages smoothly
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1800);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-500 select-none">
      
      {/* 🌟 AMBIENT BACKGROUND GLOWS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-teal-500/20 to-indigo-500/20 dark:from-teal-500/15 dark:to-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-teal-400/10 dark:bg-teal-500/10 blur-[90px] rounded-full pointer-events-none" />

      {/* 📐 SUBTLE BACKGROUND GRID PATTERN */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 flex flex-col items-center px-4 max-w-md w-full text-center">

        {/* --- EYE-CATCHING MULTI-LAYER SPINNER --- */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-8">
          
          {/* Outer Rotating Glowing Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-teal-500/30 dark:border-teal-400/20"
          />

          {/* Fast Inner Reverse Spinner */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            className="absolute inset-2 sm:inset-3 rounded-full border-2 border-t-teal-600 border-r-transparent border-b-indigo-500 border-l-transparent dark:border-t-teal-400 dark:border-b-indigo-400"
          />

          {/* Pulsing Gradient Aura */}
          <motion.div
            animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute inset-4 rounded-full bg-gradient-to-br from-teal-500/20 to-indigo-500/20 dark:from-teal-400/20 dark:to-indigo-500/20 blur-md"
          />

          {/* Center Brand Icon Badge */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.92, 1, 0.92] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 shadow-xl flex items-center justify-center backdrop-blur-xl"
          >
            <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600 dark:text-teal-400 drop-shadow-[0_0_12px_rgba(20,184,166,0.5)]" />
          </motion.div>
        </div>

        {/* --- BRAND TITLE --- */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-teal-700 to-gray-800 dark:from-white dark:via-teal-300 dark:to-gray-300">
            LawyerHub
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800/50">
            PRO
          </span>
        </div>

        {/* --- ANIMATED STATUS TEXT --- */}
        <div className="h-8 my-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-teal-600 dark:text-teal-400 animate-pulse" />
              {loadingSteps[currentStep]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* --- INFINITE GLOWING PROGRESS BAR --- */}
        <div className="w-full bg-gray-200/80 dark:bg-gray-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-gray-300/40 dark:border-gray-700/50 shadow-inner my-4 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-teal-500 via-indigo-500 to-teal-400 rounded-full w-1/3 absolute left-0"
            animate={{
              x: ["-100%", "300%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* --- SECURITY BADGES --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-4 text-[11px] sm:text-xs font-medium text-gray-400 dark:text-gray-500"
        >
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> 256-bit SSL
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> End-to-End Secure
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Verified
          </span>
        </motion.div>

      </div>
    </div>
  );
}