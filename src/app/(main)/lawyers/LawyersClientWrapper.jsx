"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  FaChevronRight, FaSearch, FaChevronDown, FaCheck, 
  FaBriefcase, FaRegClock, FaMoneyBillWave, FaBalanceScale 
} from "react-icons/fa";
import { BiBadgeCheck } from "react-icons/bi";
import { FiSliders, FiRefreshCcw } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import LawyerCard from "@/app/components/shared/LawyersCard";


export default function LawyersClientWrapper({ initialLawyers }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [specialization, setSpecialization] = useState("Select Specialization");
  const [availability, setAvailability] = useState([]);
  const [experience, setExperience] = useState([]);
  const [maxFee, setMaxFee] = useState(500);

  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const specRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (specRef.current && !specRef.current.contains(event.target)) setIsSpecOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const specializationsList = ["Corporate Law", "Family Law", "Criminal Law", "Real Estate Law", "Immigration Law", "Employment Law"];

  // Filter Logic
  const filteredLawyers = useMemo(() => {
    let result = [...(initialLawyers || [])];

    if (searchQuery) {
      result = result.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer?.specialization?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (specialization !== "Select Specialization") {
      result = result.filter((lawyer) => lawyer?.specialization?.name === specialization);
    }
    
    // Fixed Availability Filter 
    if (availability.length > 0) {
      result = result.filter((lawyer) => 
        availability.includes(lawyer.status) || availability.includes(lawyer.availability)
      );
    }

    if (experience.length > 0) {
      result = result.filter((lawyer) => {
        const exp = lawyer.experience || 0;
        if (experience.includes("0 - 2 Years") && exp <= 2) return true;
        if (experience.includes("3 - 5 Years") && exp >= 3 && exp <= 5) return true;
        if (experience.includes("5+ Years") && exp > 5) return true;
        return false;
      });
    }

    result = result.filter((lawyer) => (lawyer?.fee?.amount || 0) <= maxFee);

    return result;
  }, [initialLawyers, searchQuery, specialization, availability, experience, maxFee, sortBy]);

  const resetFilters = () => {
    setSpecialization("Select Specialization");
    setAvailability([]);
    setExperience([]);
    setMaxFee(500);
    setSearchQuery("");
  };

  const toggleExperience = (range) => {
    setExperience((prev) => 
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  // Availability Toggle Handler
  const toggleAvailability = (status) => {
    setAvailability((prev) => 
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  return (
    <div className="w-full bg-[#f8fafc] dark:bg-[#0b1120] min-h-screen pb-20 font-sans transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full pt-8 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 mb-8 rounded-b-[2.5rem] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] dark:shadow-none">
        
        <div className="absolute top-0 right-0 w-[600px] h-[300px] bg-gradient-to-bl from-teal-50/80 to-transparent dark:from-teal-900/10 rounded-bl-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[200px] bg-gradient-to-tr from-slate-50 to-transparent dark:from-slate-800/20 rounded-tr-full pointer-events-none -z-10" />
        
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Left Text Content */}
          <div className="max-w-xl z-10">
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-5 gap-2 font-medium uppercase tracking-wider">
              <Link href="/" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Home</Link>
              <FaChevronRight size={8} />
              <span className="text-teal-600 dark:text-teal-400 font-bold">Browse Lawyers</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight leading-tight">
              Explore Top <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Legal Experts</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-md">
              Find the right lawyer for your needs. Filter by specialization, experience, and book your consultation instantly.
            </p>
          </div>

          {/* Right Custom Vector Illustration (Built with CSS & React Icons) */}
          <div className="hidden md:flex w-full max-w-[420px] h-[200px] relative rounded-[2.5rem] overflow-hidden shadow-xl shadow-teal-900/10 dark:shadow-black/50 border-[6px] border-white dark:border-slate-800 z-10 items-center justify-center bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700">
            
            {/* Abstract light flares for 3D depth */}
            <div className="absolute top-[-50px] left-[-30px] w-[150px] h-[150px] bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-[-50px] right-[-30px] w-[180px] h-[180px] bg-black/20 rounded-full blur-2xl pointer-events-none"></div>
            
            {/* Minimal Scale Icon representing Legal System */}
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 text-white/90 drop-shadow-2xl"
            >
              <FaBalanceScale className="text-8xl" />
            </motion.div>

            {/* Note: If you want to use the EXACT image from your screenshot later, 
                just remove everything inside this <div> and uncomment the img tag below: */}
            {/* <img src="/images/your-hero-image.png" alt="Legal Experts" className="w-full h-full object-cover" /> */}
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
        
        {/* --- GLOBAL SEARCH & SORT BAR --- */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-slate-800/80 p-2 flex flex-col sm:flex-row items-center justify-between">
          
          <div className="flex-1 flex items-center px-4 w-full">
            <FaSearch className="text-slate-400 shrink-0" size={16} />
            <input 
              type="text" 
              placeholder="Search lawyers by name, specialization or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-4 py-2.5 bg-transparent text-sm text-slate-800 dark:text-slate-200 focus:outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto px-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">Sort By:</span>
              <div className="relative w-full sm:w-[160px]">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2 focus:outline-none cursor-pointer appearance-none border border-slate-200 dark:border-slate-700"
                >
                  <option value="Newest">Newest</option>
                  <option value="Rating">Highest Rating</option>
                  <option value="PriceLow">Price: Low to High</option>
                </select>
                <FaChevronDown size={10} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            
            <button className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <FiSliders size={18} />
            </button>
          </div>
        </div>

        {/* --- MAIN CONTENT (Sidebar + Grid) --- */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* --- SIDEBAR FILTERS --- */}
          <aside className="w-full lg:w-[280px] shrink-0 bg-white dark:bg-slate-900 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800/80 p-6 sticky top-6">
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Filters</h2>
              <button onClick={resetFilters} className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline">
                Reset All
              </button>
            </div>

            {/* Specialization Filter */}
            <div className="mb-8" ref={specRef}>
              <div className="flex items-center gap-2 mb-3">
                <BiBadgeCheck className="text-slate-400 text-lg" />
                <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Specialization</label>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSpecOpen(!isSpecOpen)}
                  className="w-full flex items-center justify-between bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-sm transition-all"
                >
                  <span className="truncate">{specialization}</span>
                  <FaChevronDown size={10} className="text-slate-400 shrink-0" />
                </button>
                <AnimatePresence>
                  {isSpecOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden py-1"
                    >
                      {specializationsList.map((spec) => (
                        <li
                          key={spec}
                          onClick={() => { setSpecialization(spec); setIsSpecOpen(false); }}
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex justify-between items-center transition-colors"
                        >
                          {spec}
                          {specialization === spec && <FaCheck size={10} className="text-teal-600" />}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Availability Filter (FIXED: Added onChange to inputs) */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <FaRegClock className="text-slate-400" />
                <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Availability</label>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Available", status: "Available", color: "bg-emerald-500" },
                  { label: "Busy", status: "Busy", color: "bg-rose-500" }
                ].map((item) => (
                  <label key={item.status} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={availability.includes(item.status)}
                      onChange={() => toggleAvailability(item.status)}
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      availability.includes(item.status) ? "bg-teal-600 border-teal-600" : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-teal-500"
                    }`}>
                      {availability.includes(item.status) && <FaCheck size={8} className="text-white" />}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 flex items-center gap-2 transition-colors">
                      {item.label} <span className={`w-2 h-2 rounded-full ${item.color} inline-block`}></span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Consultation Fee Filter */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FaMoneyBillWave className="text-slate-400" />
                <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Consultation Fee</label>
              </div>
              <div className="px-1">
                <input 
                  type="range" min="10" max="500" step="10" value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">
                  <span>$10</span>
                  <span>$500+</span>
                </div>
                <div className="mt-3 bg-slate-50 dark:bg-slate-800 py-2 rounded-lg text-center text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                  Up to ${maxFee}{maxFee === 500 ? "+" : ""}
                </div>
              </div>
            </div>

            {/* Experience Filter */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FaBriefcase className="text-slate-400" />
                <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">Experience</label>
              </div>
              <div className="space-y-3">
                {["0 - 2 Years", "3 - 5 Years", "5+ Years"].map((range) => (
                  <label key={range} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={experience.includes(range)}
                      onChange={() => toggleExperience(range)}
                    />
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                      experience.includes(range) ? "bg-teal-600 border-teal-600" : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-teal-500"
                    }`}>
                      {experience.includes(range) && <FaCheck size={8} className="text-white" />}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                      {range}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button 
              onClick={resetFilters}
              className="w-full py-2.5 mt-2 flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <FiRefreshCcw /> Reset Filters
            </button>

          </aside>

          {/* --- RIGHT SIDE GRID --- */}
          <div className="flex-1 w-full">
            {filteredLawyers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLawyers.map((lawyer, index) => (
                  <LawyerCard key={lawyer._id} lawyer={lawyer} index={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <FaSearch className="text-slate-300 dark:text-slate-500 text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Lawyers Found</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
                  We couldn't find any lawyers matching your exact filters. Try adjusting them to see more results.
                </p>
                <button onClick={resetFilters} className="mt-6 px-6 py-2 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors">
                  Clear Filters
                </button>
              </div>
            )}
            
            {/* Pagination Placeholder */}
            {filteredLawyers.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-12 mb-5">
                <button className="px-3 py-1.5 text-sm font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1 disabled:opacity-50" disabled>
                  <FaChevronRight className="rotate-180" size={10} /> Previous
                </button>
                <div className="flex gap-1.5">
                  <button className="w-8 h-8 rounded-full bg-teal-600 text-white text-sm font-bold shadow-md shadow-teal-600/20">1</button>
                  <button className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">2</button>
                  <button className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">3</button>
                </div>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  Next <FaChevronRight size={10} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}