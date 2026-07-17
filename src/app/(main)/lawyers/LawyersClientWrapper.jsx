"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { FaChevronRight, FaSearch, FaSlidersH, FaChevronDown, FaCheck } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import LawyerCard from "@/app/components/shared/LawyersCard";


// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function LawyersClientWrapper({ initialLawyers }) {
  // State for filtering & searching
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [specialization, setSpecialization] = useState("All");
  const [availability, setAvailability] = useState([]);
  const [experience, setExperience] = useState([]);
  const [maxFee, setMaxFee] = useState(500);

  // UI States
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  
  const specRef = useRef(null);

  // Close custom dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (specRef.current && !specRef.current.contains(event.target)) {
        setIsSpecOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const specializationsList = [
    "All",
    "Corporate Law",
    "Family Law",
    "Criminal Law",
    "Real Estate Law",
    "Immigration Law",
    "Employment Law",
  ];

  // Filter & Sort Logic
  const filteredLawyers = useMemo(() => {
    let result = [...initialLawyers];

    if (searchQuery) {
      result = result.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.specialization.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (specialization !== "All") {
      result = result.filter((lawyer) => lawyer.specialization.name === specialization);
    }
    if (availability.length > 0) {
      result = result.filter((lawyer) => availability.includes(lawyer.status));
    }
    if (experience.length > 0) {
      result = result.filter((lawyer) => {
        if (experience.includes("0-2") && lawyer.experience <= 2) return true;
        if (experience.includes("3-5") && lawyer.experience >= 3 && lawyer.experience <= 5) return true;
        if (experience.includes("5+") && lawyer.experience > 5) return true;
        return false;
      });
    }
    result = result.filter((lawyer) => lawyer.fee.amount <= maxFee);

    if (sortBy === "Newest") {
      result.sort((a, b) => new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime());
    } else if (sortBy === "Price (Low to High)") {
      result.sort((a, b) => a.fee.amount - b.fee.amount);
    } else if (sortBy === "Price (High to Low)") {
      result.sort((a, b) => b.fee.amount - a.fee.amount);
    }

    return result;
  }, [initialLawyers, searchQuery, specialization, availability, experience, maxFee, sortBy]);

  // Handlers
  const toggleAvailability = (status) => {
    setAvailability((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const toggleExperience = (range) => {
    setExperience((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const resetFilters = () => {
    setSpecialization("All");
    setAvailability([]);
    setExperience([]);
    setMaxFee(500);
    setSearchQuery("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="w-full"
    >
      {/* --- HERO SECTION --- */}
      <section className="w-full bg-white dark:bg-[#0a0f1c] border-b border-slate-200 dark:border-slate-800/60 pt-10 pb-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-50/80 dark:from-teal-900/10 to-transparent pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-6 gap-2 font-medium"
          >
            <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Home</Link>
            <FaChevronRight size={10} />
            <span className="text-slate-900 dark:text-slate-200">Browse Lawyers</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight leading-tight">
              Find Your Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Expert</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Explore our curated list of verified legal professionals. Filter by expertise, experience, and availability to find your perfect match.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <button 
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 text-sm font-semibold shadow-sm active:scale-95 transition-transform"
          >
            <FaSlidersH /> {isMobileFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* --- SIDEBAR FILTERS (Sticky) --- */}
        <aside className={`w-full lg:w-[300px] shrink-0 flex-col gap-6 ${isMobileFilterOpen ? 'flex' : 'hidden lg:flex'}`}>
          <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-sm sticky top-24">
            
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800/60">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h2>
              <button 
                onClick={resetFilters}
                className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* Custom Specialization Dropdown */}
            <div className="mb-8" ref={specRef}>
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">
                Specialization
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSpecOpen(!isSpecOpen)}
                  className="w-full flex items-center justify-between bg-slate-50 dark:bg-[#030712] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500/30 transition-all"
                >
                  {specialization === "All" ? "All Specializations" : specialization}
                  <motion.div animate={{ rotate: isSpecOpen ? 180 : 0 }}>
                    <FaChevronDown size={12} className="text-slate-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isSpecOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden"
                    >
                      {specializationsList.map((spec) => (
                        <li
                          key={spec}
                          onClick={() => {
                            setSpecialization(spec);
                            setIsSpecOpen(false);
                          }}
                          className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center justify-between ${
                            specialization === spec 
                            ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-semibold" 
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                          }`}
                        >
                          {spec === "All" ? "All Specializations" : spec}
                          {specialization === spec && <FaCheck size={12} />}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">
                Availability
              </label>
              <div className="space-y-4">
                {[
                  { label: "Available", status: "Available", color: "bg-emerald-500" },
                  { label: "Busy", status: "Busy", color: "bg-rose-500" }
                ].map((item) => (
                  <label key={item.status} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                      availability.includes(item.status) 
                      ? "bg-teal-600 border-teal-600" 
                      : "border-slate-300 dark:border-slate-600 group-hover:border-teal-500"
                    }`}>
                      {availability.includes(item.status) && <FaCheck size={10} className="text-white" />}
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 flex items-center gap-2">
                      {item.label} <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Consultation Fee Slider */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">
                Max Consultation Fee
              </label>
              <div className="flex items-center justify-between text-sm font-semibold text-teal-600 dark:text-teal-400 mb-3 bg-teal-50 dark:bg-teal-900/20 px-3 py-1.5 rounded-lg w-fit">
                ${maxFee}{maxFee === 500 ? "+" : ""}
              </div>
              <input 
                type="range" 
                min="10" 
                max="500" 
                step="10"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-600 hover:accent-teal-500 transition-all"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                <span>$10</span>
                <span>$500+</span>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-2">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">
                Experience
              </label>
              <div className="space-y-4">
                {["0-2 Years", "3-5 Years", "5+ Years"].map((range) => {
                  const val = range.split(" ")[0];
                  return (
                    <label key={range} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                        experience.includes(val) 
                        ? "bg-teal-600 border-teal-600" 
                        : "border-slate-300 dark:border-slate-600 group-hover:border-teal-500"
                      }`}>
                        {experience.includes(val) && <FaCheck size={10} className="text-white" />}
                      </div>
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200">
                        {range}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>
        </aside>

        {/* --- MAIN GRID AREA --- */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Top Bar (Search & Sort) */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-2 pl-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm"
          >
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md flex items-center">
              <FaSearch className="absolute left-3 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by name, specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-transparent text-sm font-medium text-slate-900 dark:text-slate-100 focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 w-full sm:w-auto border-t sm:border-t-0 border-slate-100 dark:border-slate-800 pt-3 sm:pt-0 sm:pl-4 sm:border-l pr-2">
              <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort:</span>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-800 dark:text-slate-200 rounded-lg px-4 py-2.5 focus:outline-none cursor-pointer appearance-none pr-8 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <option value="Newest">Newest</option>
                  <option value="Price (Low to High)">Price: Low to High</option>
                  <option value="Price (High to Low)">Price: High to Low</option>
                </select>
                <FaChevronDown size={10} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Cards Dynamic Grid */}
          {filteredLawyers.length > 0 ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredLawyers.map((lawyer, index) => (
                <motion.div key={lawyer._id} variants={itemVariants} layout>
                  <LawyerCard lawyer={lawyer} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 bg-white/50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <FaSearch className="text-slate-400 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Experts Found</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-md">
                We couldn't find any lawyers matching your exact criteria. Try tweaking your filters or search terms.
              </p>
              <button 
                onClick={resetFilters}
                className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-600/20"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}

          {/* Pagination Structure */}
          {filteredLawyers.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center items-center gap-2 mt-10 pt-10 border-t border-slate-200/80 dark:border-slate-800"
            >
              <button className="px-4 py-2 text-sm font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-50 transition-colors" disabled>
                &lt; Prev
              </button>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((page) => (
                  <button 
                    key={page}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                      page === 1 
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20' 
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <span className="text-slate-400 px-1 font-bold">...</span>
                <button className="w-10 h-10 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  20
                </button>
              </div>
              <button className="px-4 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Next &gt;
              </button>
            </motion.div>
          )}

        </div>
      </section>
    </motion.div>
  );
}