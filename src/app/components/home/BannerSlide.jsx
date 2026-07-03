"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight, FaPlay } from "react-icons/fa6";

export default function Slide({ slide }) {
  return (
    // FIX 2 (Margin Adjust): pb-24 এবং lg:pb-28 ব্যবহার করা হয়েছে যেন নিচের ডটসগুলোর জন্য পর্যাপ্ত জায়গা থাকে এবং কন্টেন্ট ওভারল্যাপ না হয়।
    <div className="relative w-full min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] flex items-center px-6 sm:px-16 lg:px-24 pt-12 pb-24 lg:pt-14 lg:pb-28">
      
      <div className="absolute top-0 left-0 w-[50%] h-full bg-radial from-teal-100/30 via-transparent to-transparent pointer-events-none dark:from-teal-950/10" />

      {/* ================= HIGH END IMAGE BLENDING ================= */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] h-full pointer-events-none z-0 overflow-hidden">
        <div className="relative w-full h-full opacity-[0.15] md:opacity-[0.25] lg:opacity-100 transition-all duration-500">
          <Image
            src={slide.img}
            alt={slide.titleLight}
            fill
            priority
            /* FIX 1 (Image Top Gap): object-contain বাদ দিয়ে object-cover দেওয়া হয়েছে যেন ইমেজটি সম্পূর্ণ হাইট কভার করে এবং উপরে কোনো সাদা ফাঁকা জায়গা না থাকে। */
            className="object-cover object-right mix-blend-multiply dark:mix-blend-lighten"
          />
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#F3FAF8] via-[#F3FAF8]/90 to-transparent hidden lg:block dark:from-[#020617] dark:via-[#020617]/90" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F4FAF9] via-[#F4FAF9]/60 to-transparent dark:from-[#020617]" />
        </div>
      </div>

      {/* Main Grid Content (Left text + Middle Cards) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 items-center relative z-10">
        
        {/* Left Side Content */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E4F3F0] border border-teal-200/50 dark:bg-teal-950/50 dark:border-teal-900/40 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400 animate-pulse" />
            <span className="font-poppins text-[10px] font-bold tracking-wider uppercase text-[#0F766E] dark:text-teal-400">
              {slide.tag}
            </span>
          </div>

          <h1 className="font-syne text-4xl sm:text-5xl lg:text-[48px] xl:text-[56px] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5">
            {slide.titleLight} <br />
            <span className="text-[#0F766E] dark:text-teal-400">{slide.titleTeal}</span>
          </h1>

          <p className="font-poppins text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md sm:max-w-xl leading-relaxed mb-8">
            {slide.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link 
              href="/lawyers"
              className="inline-flex items-center gap-2 bg-[#0F766E] hover:bg-[#0b5953] text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-teal-800/20 active:scale-[0.97] font-poppins"
            >
              <span>Browse Lawyers</span>
              <FaArrowRight size={11} />
            </Link>
            
            <Link 
              href="/how-it-works"
              className="inline-flex items-center gap-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 text-xs font-bold px-5 py-3.5 rounded-xl transition-all duration-300 shadow-sm font-poppins"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 dark:bg-slate-800 text-[#0F766E] dark:text-teal-400">
                <FaPlay size={6} className="ml-0.5" />
              </div>
              <span>How It Works</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-5 border-t border-slate-200 dark:border-slate-800 w-full max-w-xl">
            {slide.features.map((feat, index) => {
              const FeatIcon = feat.icon;
              return (
                <div key={index} className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                  <FeatIcon size={12} className="text-[#0F766E] dark:text-teal-400 shrink-0" />
                  <span className="font-poppins text-[11px] font-semibold tracking-wide">{feat.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Middle Floating Cards */}
        <div className="col-span-1 lg:col-span-3 flex flex-col sm:grid sm:grid-cols-3 lg:flex lg:flex-col gap-3.5 justify-center items-start w-full lg:pl-4 xl:pl-8">
          {slide.stats.map((stat, i) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                className="
                  w-full lg:max-w-[230px] flex items-center gap-4 p-4 rounded-2xl 
                  bg-white/70 border border-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.02)]
                  dark:bg-slate-900/60 dark:border-slate-800/40 transition-shadow duration-300 hover:shadow-xl hover:shadow-teal-900/5
                "
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E4F3F0] dark:bg-slate-950 text-[#0F766E] dark:text-teal-400 border border-teal-100/30 dark:border-slate-800/50">
                  <StatIcon size={16} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-syne text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-none mb-1 truncate">
                    {stat.count}
                  </span>
                  <span className="font-poppins text-[10px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 tracking-wide truncate">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="hidden lg:block lg:col-span-3 xl:col-span-2" />

      </div>
    </div>
  );
}