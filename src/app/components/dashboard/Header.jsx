"use client";

import React from "react";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { useSidebar } from "@/app/context/SidebarContext";
import ThemeSwitch from "../ui/ThemeSwitch";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Header() {
  const { setIsMobileOpen } = useSidebar();
  
  // Fetch Logged-in User Data
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Avatar Fallback logic
  const avatarUrl = user?.image || `https://ui-avatars.com/api/?name=${user?.name || "User"}&background=0F766E&color=fff&bold=true`;

  return (
    <header className="h-[80px] bg-white/80 dark:bg-[#0B1324]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/60 flex items-center justify-between px-4 sm:px-8 z-30 sticky top-0 transition-colors duration-300">
      
      {/* Left Side: Mobile Menu */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <FiMenu size={22} />
        </button>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3 sm:gap-6 ml-auto">
        
        {/* Search Input (Premium Soft UI) */}
        <div className="relative hidden lg:block w-[280px]">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-12 py-2 bg-slate-100/70 dark:bg-slate-900/50 border border-transparent focus:border-teal-600/20 dark:focus:border-teal-500/20 rounded-full text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-4 focus:ring-teal-600/5 transition-all placeholder:text-slate-400 font-medium"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded text-[10px] text-slate-400 font-bold shadow-sm">⌘</kbd>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded text-[10px] text-slate-400 font-bold shadow-sm">K</kbd>
          </div>
        </div>

        {/* Notifications & Theme Switch */}
        <div className="flex items-center gap-3 border-r border-slate-200 dark:border-slate-800 pr-4 sm:pr-6">
          <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <FiBell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#0B1324]"></span>
          </button>
          <ThemeSwitch />
        </div>

        {/* 🌟 3. Clean Static Profile Display (No Dropdown) */}
        <div className="flex items-center gap-3 pl-1 select-none">
          <Image 
            src={avatarUrl} 
            alt={user?.name || "User"}
            className="w-9 h-9 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700/50"
            width={50}
            height={50}
          />
          <div className="hidden sm:block text-left">
            <p className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight">
              {user?.name || "Loading..."}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium capitalize mt-0.5">
              {user?.userType || "User"}
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}