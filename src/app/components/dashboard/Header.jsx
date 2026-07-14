"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FiSearch, FiBell, FiMenu, FiHelpCircle } from "react-icons/fi";
import { LuChevronDown, LuLogOut, LuUser } from "react-icons/lu";
import { useSidebar } from "@/app/context/SidebarContext";
import ThemeSwitch from "../ui/ThemeSwitch";

export default function Header() {
  const pathname = usePathname();
  const { setIsMobileOpen } = useSidebar();
  
  // 🌟 Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentUser = {
    name: "John Anderson",
    email: "john.anderson@example.com",
    role: "Client",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d", 
  };

  return (
    <header className="h-[80px] bg-white dark:bg-[#0B1324] border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between px-4 sm:px-8 z-10 sticky top-0 transition-colors duration-300">
      
      {/* 🌟 Left Side: Mobile Menu */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* 🌟 Right Side Actions */}
      <div className="flex items-center gap-3 sm:gap-5 ml-auto">
        
        {/* Search Input (Pure Tailwind) */}
        <div className="relative hidden lg:block w-[300px]">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-12 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#006F66]/30 focus:border-[#006F66] transition-all placeholder:text-slate-400"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] text-slate-400 font-bold shadow-sm">⌘</kbd>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] text-slate-400 font-bold shadow-sm">K</kbd>
          </div>
        </div>

        {/* Notifications & Theme Switch */}
        <div className="flex items-center gap-2 sm:gap-4 border-r border-slate-200 dark:border-slate-800 pr-4 sm:pr-5">
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-[#0B1324]"></span>
          </button>
          <ThemeSwitch />
        </div>

        {/* 🌟 Custom Profile Dropdown (No HeroUI) */}
        <div className="relative" ref={dropdownRef}>
          <div 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity select-none"
          >
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight flex items-center gap-1">
                {currentUser.name}
                <LuChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                {currentUser.role}
              </p>
            </div>
          </div>

          {/* Dropdown Menu Box */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#0B1324] border border-slate-100 dark:border-slate-800 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] py-2 z-50 origin-top-right animate-in fade-in zoom-in duration-200">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Signed in as</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{currentUser.email}</p>
              </div>
              
              <div className="px-1.5">
                <Link href="/dashboard/client/profile" className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors">
                  <LuUser size={16} /> Update Profile
                </Link>
                
                <Link href="#" className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors">
                  <FiHelpCircle size={16} /> Help & Feedback
                </Link>
              </div>

              <div className="px-1.5 mt-1 border-t border-slate-100 dark:border-slate-800/80 pt-1">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors">
                  <LuLogOut size={16} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}