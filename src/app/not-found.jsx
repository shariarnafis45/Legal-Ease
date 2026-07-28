"use client";

import React from "react";
import Link from "next/link";
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Home, FileQuestion, Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden transition-colors duration-500 select-none px-4">
      {/* 🌟 AMBIENT BACKGROUND GLOWS (Theme Aware) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-tr from-rose-500/10 to-teal-500/10 dark:from-rose-500/10 dark:to-teal-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-teal-500/10 dark:bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* 📐 SUBTLE BACKGROUND GRID PATTERN */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full">
        {/* Floating Animated Icon */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative flex items-center justify-center mb-6"
        >
          <div className="absolute inset-0 bg-rose-500/20 dark:bg-rose-500/20 blur-xl rounded-full" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl flex items-center justify-center backdrop-blur-xl rotate-12">
            <FileQuestion className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 dark:text-rose-400 drop-shadow-md" />
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-400 dark:from-white dark:to-gray-700 drop-shadow-sm"
        >
          404
        </motion.h1>

        {/* Error Badge & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center gap-4 -mt-4 sm:-mt-8 mb-6"
        >
          <span className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 uppercase tracking-widest flex items-center gap-2">
            <Search className="w-3.5 h-3.5" /> Page Not Found
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">
            Lost in the Legal Archives?
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md px-4 leading-relaxed">
            The document, profile, or page you are looking for might have been
            removed, renamed, or is temporarily unavailable.
          </p>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto px-6"
        >
          {/* Go Back Button */}
          <button
            onClick={() => router.back()}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold transition-all shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>

          {/* Go Home Button */}
          <Link href="/" className="w-full sm:w-auto">
            <div className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-500 hover:to-indigo-500 text-white font-semibold transition-all shadow-[0_4px_14px_0_rgba(13,148,136,0.39)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] hover:-translate-y-0.5">
              <Home className="w-4 h-4 transition-transform group-hover:scale-110" />
              Back to Home
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 text-xs text-gray-400 dark:text-gray-500 font-medium">
        © {new Date().getFullYear()} LawyerHub. All rights reserved.
      </div>
    </div>
  );
}
