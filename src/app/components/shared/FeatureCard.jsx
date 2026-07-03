"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaShieldHalved, FaLock, FaTag, FaBoltLightning } from "react-icons/fa6";
import { hoverScale } from "../animations/Animations";


const iconMap = {
  verified: FaShieldHalved,
  secure: FaLock,
  pricing: FaTag,
  fast: FaBoltLightning,
};

export default function FeatureCard({ feature, index }) {
 
  const Icon = iconMap[feature.iconName] || FaShieldHalved;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
      
      variants={hoverScale}
      whileHover="hover"
      whileTap="tap"
      
      className="
        group flex flex-col items-center justify-center text-center p-8 sm:p-10
        bg-white border border-slate-200/60 rounded-[32px] w-full min-h-[260px]
        dark:bg-[#0b1329] dark:border-slate-900/60 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)]
        hover:shadow-[0_25px_50px_-15px_rgba(15,118,110,0.06)] dark:hover:shadow-none
        transition-colors duration-300
      "
    >
      {/* Icon Capsule */}
      <div className="
        flex h-16 w-16 items-center justify-center rounded-full mb-6
        bg-slate-50 border border-slate-100 text-[#0F766E]
        dark:bg-slate-950 dark:border-slate-900 dark:text-teal-400
        transition-all duration-300 group-hover:scale-105
        group-hover:border-teal-500/20 group-hover:bg-[#EBF6F4] dark:group-hover:bg-teal-950/20
      ">
        <Icon size={22} className="stroke-[2]" />
      </div>

      {/* Typography */}
      <h3 className="font-syne text-base font-bold text-slate-900 dark:text-white tracking-tight mb-2.5">
        {feature.title}
      </h3>
      
      <p className="font-poppins text-xs sm:text-[13px] text-slate-400 dark:text-slate-500 leading-relaxed max-w-[210px]">
        {feature.description}
      </p>

    </motion.div>
  );
}