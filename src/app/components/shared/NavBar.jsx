"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/asset/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Menu,
  X,
  LogOut,
  User,
  ShieldCheck,
  Briefcase,
  HelpCircle,
  LayoutDashboard,
} from "lucide-react";

import { drawerVariants, dropdownVariants } from "../animations/Animations";
import ThemeSwitch from "../ui/ThemeSwitch";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "Browse Lawyers", href: "/lawyers", active: false },
  ];

  const privateLinks = [
    { name: "My Profile", href: "/dashboard/profile", icon: User },
  ];
  const [open, setOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const { data: session } = authClient.useSession();
  const user = session?.user || null;

  const handleLogout = async () => {
    await authClient.signOut();

    toast.custom(
      (t) => (
        <div
          className={`max-w-md w-full bg-white dark:bg-[#0B1324] shadow-2xl rounded-2xl pointer-events-auto flex border border-emerald-500/30 p-4 transition-all duration-300 ease-in-out ${
            t.visible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="flex items-start gap-3 w-full">
            <ShieldCheck
              className="text-emerald-500 text-xl flex-shrink-0 mt-0.5"
              size={20}
            />

            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                Logged out successfully
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                See you again soon!
              </p>
            </div>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ),
      { duration: 2000 },
    );
  };
  const dashboardLinks = {
    client: "/dashboard/client",
    lawyer: "/dashboard/lawyer",
    admin: "/dashboard/admin",
  };

  if (user?.email) {
    privateLinks.push({
      name: "Dashboard",
      href: dashboardLinks[user?.userType || "client"],
      icon: LayoutDashboard,
    });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-[50] w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-white/5 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Brand Identity / Left Section */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-3 focus-visible:outline-none"
          >
            <div className="relative h-10 w-10  transition-transform duration-200 hover:scale-105">
              <Image
                src={Logo}
                alt="LegalEase Symbol Logo"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-syne text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                LegalEase
              </span>
              <span className="font-poppins text-[10px] font-medium tracking-wider text-slate-500 dark:text-slate-400">
                Your Legal Partner
              </span>
            </div>
          </Link>

          {/* Core Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 pl-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-poppins text-[13px] font-medium transition-colors relative py-2 focus-visible:outline-none ${
                  link.active
                    ? "text-[#0F766E] dark:text-teal-400 font-semibold"
                    : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-1">
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown size={12} className="opacity-70" />
                  )}
                </div>
                {link.active && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#0F766E] dark:bg-teal-400"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Search Engine Bar */}
          <div className="hidden md:flex max-w-sm flex-1 items-center px-2">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <Search
                  size={15}
                  className="text-slate-400 dark:text-slate-500"
                />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lawyers by name or specialization..."
                className="
                  w-full font-poppins text-xs rounded-xl border border-slate-200 bg-slate-50/50 
                  py-2.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 outline-none
                  transition-all duration-200
                  focus:border-[#0F766E]/40 focus:bg-white focus:ring-4 focus:ring-[#0F766E]/5
                  dark:border-white/10 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500
                  dark:focus:border-teal-500/40 dark:focus:bg-slate-950 dark:focus:ring-teal-500/5
                "
              />
            </div>
          </div>

          {/* Functional Actions Layout / Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeSwitch />
            <div className="h-5 w-px bg-slate-200 dark:bg-white/10" />

            {user ? (
              /* --- Profile Dropdown Trigger (Authenticated Layout View) --- */
              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setIsDropdownOpen(!isDropdownOpen)
                  }
                  className="
                    flex items-center gap-2.5 rounded-xl
                    border border-slate-200/80 bg-white/60 pl-2 pr-3 py-1.5 backdrop-blur-xl
                    transition-all duration-300 cursor-pointer select-none
                    hover:border-[#0F766E]/30 hover:bg-white
                    hover:shadow-[0_8px_25px_rgba(15,118,110,0.04)]
                    dark:border-white/5 dark:bg-slate-900/60 dark:hover:bg-slate-900
                  "
                >
                  <div className="relative h-8 w-8 overflow-hidden rounded-lg ring-2 ring-slate-100 dark:ring-slate-800">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0F766E] to-teal-600 font-poppins text-xs font-semibold text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="max-w-[90px] text-left">
                    <h4 className="truncate font-poppins text-xs font-semibold text-slate-900 dark:text-slate-100">
                      {user?.name}
                    </h4>
                  </div>

                  <ChevronDown
                    size={13}
                    className={`text-slate-400 dark:text-slate-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {/* Account Interaction Canvas Overlay Dropdown */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="
                        absolute right-0 top-full z-[999] mt-2.5 w-64 origin-top-right
                        rounded-2xl border border-slate-200/80 bg-white p-2
                        shadow-[0_20px_40px_rgba(15,118,110,0.08)] backdrop-blur-xl
                        dark:border-white/5 dark:bg-slate-950 dark:shadow-[0_25px_50px_rgba(0,0,0,0.4)]
                      "
                    >
                      <div className="mb-1.5 flex items-center gap-3 rounded-xl bg-slate-50 p-3 border border-slate-100 dark:border-white/[0.02] dark:bg-white/[0.02]">
                        <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                          {user?.image ? (
                            <Image
                              src={user.image}
                              alt={user.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0F766E] to-teal-600 font-poppins text-sm font-semibold text-white">
                              {user?.name?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate font-poppins text-xs font-bold text-slate-900 dark:text-white">
                            {user?.name}
                          </h3>
                          <p className="truncate font-poppins text-[11px] text-slate-400 dark:text-slate-500">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-0.5 flex flex-col">
                        {privateLinks.map((link, i) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={i}
                              href={link.href}
                              onClick={() => setIsDropdownOpen(false)}
                              className="
                                flex items-center gap-2.5 rounded-xl px-3 py-2.5
                                font-poppins text-xs font-medium text-slate-600 transition-colors
                                hover:bg-slate-50 hover:text-slate-950
                                dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white
                              "
                            >
                              <Icon
                                size={14}
                                className="text-slate-400 dark:text-slate-500"
                              />
                              {link.name}
                            </Link>
                          );
                        })}
                      </div>

                      <div className="my-1.5 h-px bg-slate-200/60 dark:bg-white/5" />

                      <button
                        onClick={handleLogout}
                        className="
                          flex h-9 w-full items-center justify-center gap-2 rounded-xl border-0
                          bg-red-500/[0.08] font-poppins text-xs font-semibold text-red-500
                          transition-all duration-200 hover:bg-red-500 hover:text-white
                        "
                      >
                        <LogOut size={13} />
                        Logout Profile
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* --- Neutral Actions Configuration (Guest Mode View) --- */
              <div className="flex items-center gap-2">
                <Link
                  href="/auth/signin"
                  className="rounded-xl px-4 py-2.5 font-poppins text-xs font-semibold text-slate-700 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="
                    inline-flex h-10 items-center justify-center rounded-xl bg-[#0F766E] px-5 
                    font-poppins text-xs font-semibold text-white transition-all duration-200
                    hover:bg-[#0b5953] hover:shadow-[0_4px_20px_rgba(15,118,110,0.25)] active:scale-[0.98]
                    dark:bg-teal-600 dark:hover:bg-teal-500
                  "
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Compact View Navigation Drawer Launcher (Mobile Interface Viewport) */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitch />
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle structural platform menu drawer"
              className="
                flex h-10 w-10 items-center justify-center rounded-xl
                border border-slate-200/80 bg-white text-slate-700 transition-all duration-200
                dark:border-white/10 dark:bg-slate-900 dark:text-white
              "
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile View System Navigation Drawer Overlay --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden overflow-hidden border-t border-slate-200/60 bg-white/95 dark:border-white/5 dark:bg-slate-950/95"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Internal Mobile Contextual Search Field Container */}
              <div className="relative w-full">
                <Search
                  size={14}
                  className="absolute left-3.5 top-3 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search lawyers..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 font-poppins text-xs dark:border-white/10 dark:bg-slate-900"
                />
              </div>

              {/* Dynamic User Profile Context Header */}
              {user && (
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200/60 dark:border-white/5">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0F766E] to-teal-600 font-poppins text-sm text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-poppins text-sm font-bold text-slate-900 dark:text-white">
                      {user?.name}
                    </h3>
                    <p className="truncate font-poppins text-xs text-slate-400 dark:text-slate-500">
                      {user?.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Base Platform Interfacing Links */}
              <div className="flex flex-col gap-1">
                <span className="px-3 mb-1 font-poppins text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Navigation
                </span>
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-2.5 font-poppins text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Secure Interface Switch Engine Controls */}
              {user ? (
                <div className="flex flex-col gap-1 pt-2 border-t border-slate-200/60 dark:border-white/5">
                  <span className="px-3 mb-1 font-poppins text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Account Dashboard
                  </span>
                  {privateLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-2.5 font-poppins text-xs font-medium text-slate-600 dark:text-slate-400 dark:hover:bg-white/5"
                    >
                      {link.name}
                    </Link>
                  ))}

                  <button
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 font-poppins text-xs font-semibold text-red-500"
                  >
                    <LogOut size={14} />
                    Logout Account
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
                  <Link
                    href="/auth/signin"
                    onClick={() => setOpen(false)}
                    className="rounded-xl py-2.5 text-center font-poppins text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setOpen(false)}
                    className="rounded-xl bg-[#0F766E] py-2.5 text-center font-poppins text-xs font-semibold text-white dark:bg-teal-600"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
