"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { hoverScale } from "../animations/Animations";


export default function CTASection() {
  
  const textGroupVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto bg-white dark:bg-[#030712] transition-colors duration-300">
      
      {/* 🌟 Dual-Theme Optimized Premium Master Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative overflow-hidden w-full rounded-[24px] md:rounded-[32px] 
          
          /* ☀️ Light Mode Theme: Rich Vibrant Deep Teal Gradient */
          bg-gradient-to-r from-[#0A3A40] via-[#0F766E] to-[#115E59]
          
          /* 🌙 Dark Mode Theme: Smooth Dark Midnight Teal Gradient */
          dark:from-[#021114] dark:via-[#052327] dark:to-[#0B3731]
          
          py-12 px-8 md:py-16 md:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8
          shadow-[0_25px_60px_-25px_rgba(15,118,110,0.25)] dark:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]
          border border-teal-500/10 dark:border-teal-400/5
          transition-all duration-300
        "
      >
        
        {/* Left Side Content Column (Fully Animated Group) */}
        <motion.div 
          variants={textGroupVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col text-left max-w-xl z-10"
        >
          {/* Main Title */}
          <motion.h2 
            variants={textItemVariants}
            className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3"
          >
            Need Legal Help?
          </motion.h2>

          {/* Subtitle / Description */}
          <motion.p 
            variants={textItemVariants}
            className="font-poppins text-xs sm:text-sm text-teal-100/80 dark:text-slate-300/85 leading-relaxed font-medium mb-8"
          >
            Connect with trusted lawyers and book your consultation today.
          </motion.p>
          
          {/* Button Interactive Trigger */}
          <motion.div variants={textItemVariants} className="w-fit">
            <motion.div
              variants={hoverScale}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                href="/lawyers"
                className="
                  inline-flex items-center gap-2.5 px-6 py-3.5 
                  bg-white text-[#0A3A40] dark:bg-white dark:text-[#021114]
                  font-poppins text-[13px] font-bold rounded-xl
                  shadow-[0_4px_20px_rgba(0,0,0,0.06)] 
                  hover:shadow-[0_12px_25px_rgba(255,255,255,0.25)]
                  transition-all duration-300 group
                "
              >
                <span>Browse Lawyers</span>
                <FaArrowRight 
                  size={12} 
                  className="transform transition-transform duration-300 group-hover:translate-x-1 text-[#0F766E]" 
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 🏛️ Right Side Decorative Vectors & Grids (Animated) */}
        <div className="absolute right-0 bottom-0 top-0 w-full md:w-[50%] pointer-events-none overflow-hidden select-none hidden sm:block">
          
          {/* Matrix Dots Layer */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 0.15 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="absolute left-[10%] top-1/2 -translate-y-1/2 grid grid-cols-2 gap-2 text-white text-[5px]"
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>●</span>
            ))}
          </motion.div>

          {/* Dynamic SVG Wave Path Drawing Line */}
          <svg className="absolute inset-0 w-full h-full opacity-30 dark:opacity-40" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              d="M-50 180C50 140 100 60 250 110C350 140 380 50 450 20" 
              stroke="url(#ctaGlow)" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="ctaGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F766E" stopOpacity="0"/>
                <stop offset="50%" stopColor="#2DD4BF" stopOpacity="1"/>
                <stop offset="100%" stopColor="#14B8A6" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>

          {/* Masked Backdrop Judicial Scales Image Asset */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
              absolute inset-y-0 right-0 w-full bg-cover bg-right-bottom mix-blend-overlay
              opacity-25 dark:opacity-[0.14] filter contrast-125 dark:contrast-100
            "
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600')`,
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
            }}
          />

          {/* Ambient Blurred Radial Glow Orb */}
          <div className="absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-[#2DD4BF] dark:bg-[#0F766E] opacity-20 dark:opacity-30 blur-[80px]" />
        </div>

      </motion.div>
    </section>
  );
}