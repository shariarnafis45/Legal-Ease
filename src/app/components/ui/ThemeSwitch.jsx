"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

 
  useEffect(() => {
    setMounted(true);
  }, []);

  
  if (!mounted) {
    return (
      <div className="h-9 w-16 rounded-full bg-slate-100/80 dark:bg-slate-900/50 border border-slate-200/40 dark:border-white/5 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
      aria-label="Toggle application theme color"
      className="
        relative flex h-9 w-16 cursor-pointer items-center rounded-full 
        bg-slate-100 p-1 select-none transition-colors duration-300
        border border-slate-200/80 dark:border-white/10 dark:bg-slate-900/60
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]/50
      "
    >
     
      <div className="absolute inset-0 flex items-center justify-between px-2.5 text-slate-400/80 dark:text-slate-600 pointer-events-none">
        <Sun size={13} className={`transition-opacity ${isDark ? "opacity-100" : "opacity-30"}`} />
        <Moon size={13} className={`transition-opacity ${isDark ? "opacity-30" : "opacity-100"}`} />
      </div>

      
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 26 }}
        animate={{ x: isDark ? 28 : 0 }}
        className="
          z-10 flex h-7 w-7 items-center justify-center rounded-full 
          bg-white shadow-sm border border-slate-200/50 
          dark:bg-[#020617] dark:border-white/10
        "
      >
       
        <motion.div
          key={isDark ? "dark-icon" : "light-icon"}
          initial={{ rotate: -60, scale: 0.7, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {isDark ? (
            <Moon size={14} className="text-[#F59E0B] fill-[#F59E0B]/10" />
          ) : (
            <Sun size={14} className="text-[#0F766E] fill-[#0F766E]/10" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}