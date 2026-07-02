import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle visual theme orientation"
      className="
        flex h-9 w-9 items-center justify-center 
        rounded-full border border-slate-200/80 bg-white shadow-sm
        transition-all duration-300 ease-out
        hover:border-teal-600/30 hover:bg-slate-50
        dark:border-white/10 dark:bg-slate-900 dark:hover:bg-slate-800
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/50
      "
    >
      {darkMode ? (
        <Moon size={16} className="text-amber-500 transition-transform duration-300 rotate-0" />
      ) : (
        <Sun size={16} className="text-slate-600 transition-transform duration-300 hover:rotate-45" />
      )}
    </button>
  );
}