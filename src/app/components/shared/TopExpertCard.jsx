"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaArrowRight } from "react-icons/fa6";
import { hoverScale } from "../animations/Animations";


export default function TopExpertCard({ lawyer, index, rank }) {

  const medalStyles = {
    1: { bg: "bg-[#F59E0B]", border: "border-amber-400", shadow: "shadow-amber-500/20" },
    2: { bg: "bg-[#94A3B8]", border: "border-slate-300", shadow: "shadow-slate-400/20" },
    3: { bg: "bg-[#B45309]", border: "border-amber-700", shadow: "shadow-amber-800/20" },
  };

  const currentMedal = medalStyles[rank] || medalStyles[1];

  return (
    <motion.div
    
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.1 }}
      
   
      variants={hoverScale}
      whileHover="hover"
      whileTap="tap"
      
      className="
        group relative flex flex-col bg-white border border-slate-200/60 p-6 rounded-[28px] w-full
        dark:bg-[#0b1329] dark:border-slate-900/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)]
        hover:shadow-[0_25px_50px_-12px_rgba(15,118,110,0.05)] dark:hover:shadow-none
        transition-colors duration-300
      "
    >
      
      {/* 🏅 Premium Ranking Ribbon/Medal Badge */}
      <div className={`
        absolute -top-2 -left-2 z-20 flex h-9 w-9 items-center justify-center rounded-full font-syne text-sm font-extrabold text-white border-2 shadow-md
        ${currentMedal.bg} ${currentMedal.border} ${currentMedal.shadow}
      `}>
        {rank}
        {/* Ribbon Tail Effect */}
        <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-2 ${currentMedal.bg} clip-ribbon-tail -z-10 opacity-90`} />
      </div>

      {/* Main Column Split (Avatar & Core Info Grid) */}
      <div className="flex items-center gap-5 w-full mb-5">
        
        {/* Large Circular Profile Photo */}
        <div className="relative w-20 h-20 shrink-0 rounded-full bg-slate-50 dark:bg-slate-950 p-1 border border-slate-100 dark:border-slate-800">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={lawyer.image}
              alt={lawyer.name}
              fill
              sizes="80px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Name, Title & Hires Pill Counter Badge */}
        <div className="flex flex-col text-left min-w-0">
          <h3 className="font-syne text-base font-bold text-slate-900 dark:text-white tracking-tight truncate group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors duration-200">
            {lawyer.name}
          </h3>
          <span className="font-poppins text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5 truncate">
            {lawyer.specialization?.name}
          </span>
          
          {/* Distinct Highlighted Hires Metric Pill */}
          <div className="inline-flex items-center justify-center px-3 py-1 bg-[#EBF6F4] dark:bg-teal-950/40 rounded-lg border border-teal-100/30 w-fit mt-2.5">
            <span className="font-poppins text-[11px] font-bold text-[#0F766E] dark:text-teal-400 whitespace-nowrap">
              {lawyer.totalHires}+ Hires
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Counter Layer (Rating & Experience) */}
      <div className="flex items-center gap-6 w-full border-t border-slate-100 dark:border-slate-900/60 pt-4 mb-5 px-1">
        {/* Rating Block */}
        <div className="flex items-center gap-1.5">
          <FaStar className="text-[#F59E0B]" size={13} />
          <span className="font-poppins text-cedar text-xs font-bold text-slate-700 dark:text-slate-300">
            {lawyer.rating}
          </span>
          <span className="font-poppins text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            ({lawyer.totalReviews})
          </span>
        </div>

        {/* Experience Split Divider Line */}
        <div className="h-3 w-[1px] bg-slate-200 dark:bg-slate-800" />

        {/* Experience Metric Block */}
        <span className="font-poppins text-xs font-bold text-slate-600 dark:text-slate-400">
          {lawyer.experience}+ Yrs Exp
        </span>
      </div>

      {/* View Full Profile Action Navigation Trigger */}
      <Link 
        href={`/lawyers/${lawyer._id}`}
        className="
          relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
          border border-slate-200/80 dark:border-slate-800 font-poppins text-xs font-bold 
          text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-900/40 transition-all duration-300 mt-auto
          hover:border-[#0F766E] dark:hover:border-teal-500 hover:text-white group-hover:bg-transparent
        "
      >
        <span className="absolute inset-y-0 left-0 w-full bg-[#0F766E] dark:bg-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out -z-10 rounded-[10px]" />
        <span>View Profile</span>
        <FaArrowRight 
          size={11} 
          className="transform transition-transform duration-300 group-hover:translate-x-1 text-slate-400 group-hover:text-white" 
        />
      </Link>

    </motion.div>
  );
}