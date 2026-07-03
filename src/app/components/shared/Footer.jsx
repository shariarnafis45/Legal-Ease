"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../../asset/logo.png";


import { 
  FaFacebook, 
  FaXTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaYoutube, 
  FaSpinner, 
  FaCircleCheck, 
  FaCircleExclamation 
} from "react-icons/fa6";

// Navigation Column Data
const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Browse Lawyers", href: "/lawyers" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contact" },
];

const resources = [
  { name: "Blog", href: "/blog" },
  { name: "FAQs", href: "/faqs" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Legal Resources", href: "/resources" },
];

const bottomLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Cookies Policy", href: "/cookies" },
];

const socialLinks = [
  { icon: FaFacebook, href: "https://facebook.com", label: "Facebook Page" },
  { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter Profile" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn Company Profile" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram Grid" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube Channel" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Invalid email format. Please check again.");
      return;
    }

    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <footer className="w-full bg-white text-slate-600 border-t border-slate-200/60 dark:bg-[#020617] dark:text-slate-300 dark:border-slate-900 font-poppins pt-16 pb-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Links Container Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200/60 dark:border-slate-900/60">
          
          {/* Brand Engine Info Section */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 focus-visible:outline-none">
              <div className="relative h-20 w-20 mt-2 -mr-5">
                <Image
                  src={Logo}
                  alt="LegalEase Identity Logo"
                  fill
                  className="object-contain dark:brightness-0 dark:invert"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-syne text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  LegalEase
                </span>
                <span className="text-[9px] font-medium tracking-wider text-slate-400 dark:text-slate-500">
                  Your Legal Partner
                </span>
              </div>
            </Link>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Connecting you with the right legal experts for all your legal needs.
            </p>

            {/* Social Media Micro-interaction Icons Layer */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="
                      flex h-8 w-8 items-center justify-center rounded-full 
                      bg-slate-50 border border-slate-200 text-slate-500
                      dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400
                      transition-colors duration-200 
                      hover:bg-[#0F766E] hover:text-white hover:border-[#0F766E]/30
                      dark:hover:bg-[#0F766E] dark:hover:text-white
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E]
                    "
                  >
                    <Icon size={14} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-syne text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-500 hover:text-[#0F766E] dark:text-slate-400 dark:hover:text-white transition-colors duration-200 block py-0.5 outline-none"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="font-syne text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Resources
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs">
              {resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-500 hover:text-[#0F766E] dark:text-slate-400 dark:hover:text-white transition-colors duration-200 block py-0.5 outline-none"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Functional Newsletter Segment */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="font-syne text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Newsletter
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Subscribe to get legal tips and updates.
            </p>

            <form onSubmit={handleSubscribe} className="relative w-full max-w-sm pt-1">
              <div className="
                flex rounded-xl overflow-hidden bg-slate-50 border border-slate-200 
                focus-within:border-[#0F766E]/50 focus-within:ring-4 focus-within:ring-[#0F766E]/5 
                dark:bg-slate-950 dark:border-slate-800 dark:focus-within:border-teal-500/50 dark:focus-within:ring-teal-500/5
                transition-all duration-200
              ">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if(status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email"
                  disabled={status === "loading"}
                  className="
                    w-full bg-transparent px-4 py-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 
                    outline-none border-none disabled:opacity-50
                  "
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="
                    inline-flex items-center justify-center bg-[#0F766E] px-5 py-3 
                    text-xs font-semibold text-white tracking-wide transition-all duration-200 
                    hover:bg-[#0b5953] active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none
                    dark:bg-teal-600 dark:hover:bg-teal-500
                  "
                >
                  {status === "loading" ? (
                    <FaSpinner size={14} className="animate-spin" />
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>

              {/* Success & Error Inline Validation Display feedback states */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 top-full mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                  >
                    <FaCircleCheck size={13} />
                    <span>Successfully subscribed to Newsletter!</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 top-full mt-2 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400"
                  >
                    <FaCircleExclamation size={13} />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        {/* Bottom Legal Credits Stack bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          <div>
            &copy; {new Date().getFullYear()} LegalEase. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            {bottomLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors duration-200 outline-none"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}