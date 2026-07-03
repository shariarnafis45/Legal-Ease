"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaUserCheck, FaArrowRight, FaLocationDot, FaBriefcase } from "react-icons/fa6";
import { hoverScale } from "../animations/Animations";


export default function LawyerCard({ lawyer, index }) {
  return (
    <motion.div
     
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
      
     
      variants={hoverScale}
      whileHover="hover"
      whileTap="tap"
      
      className="
        group relative flex flex-col bg-white border border-slate-200/60 p-6 rounded-[28px] w-full
        dark:bg-[#0b1329] dark:border-slate-900/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)]
        hover:shadow-[0_25px_50px_-12px_rgba(15,118,110,0.06)] dark:hover:shadow-none
        transition-colors duration-300
      "
    >
      
      {/* Top Header Row inside Card */}
      <div className="flex items-center justify-between w-full mb-5">
        {lawyer.verified ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF6F4] border border-teal-100/50 dark:bg-teal-950/40 dark:border-teal-900/30">
            <FaUserCheck className="text-[#0F766E] dark:text-teal-400 text-[10px]" />
            <span className="font-poppins text-[10px] font-bold text-[#0F766E] dark:text-teal-400 tracking-wide uppercase">
              Verified
            </span>
          </div>
        ) : (
          <div className="w-1" />
        )}

        {/* Hires Count Metric Tracker */}
        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-500 font-poppins text-[11px] font-semibold">
          <FaBriefcase size={10} className="text-slate-400" />
          <span>{lawyer.totalHires}+ Hires</span>
        </div>
      </div>

      {/* Main Identity Grid Structure */}
      <div className="flex items-center gap-5 w-full mb-6">
        <div className="relative w-20 h-20 shrink-0 rounded-full p-1 bg-gradient-to-b from-slate-100 to-transparent dark:from-slate-800">
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-950">
            <Image
              src={lawyer.image}
              alt={lawyer.name}
              fill
              sizes="80px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col text-left min-w-0">
          <h3 className="font-syne text-base font-bold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors duration-200 truncate">
            {lawyer.name}
          </h3>
          <span className="font-poppins text-xs font-semibold text-slate-400 dark:text-slate-500 truncate">
            {lawyer.specialization?.name}
          </span>
          {/* Location Badge */}
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-600 mt-1">
            <FaLocationDot size={9} className="text-slate-300 dark:text-slate-700" />
            <span className="font-poppins text-[10px] font-medium tracking-wide">{lawyer.location}</span>
          </div>
        </div>
      </div>

      {/* Bio excerpt */}
      <p className="font-poppins text-xs text-slate-400 dark:text-slate-500 leading-relaxed text-left line-clamp-2 mb-6">
        {lawyer.bio}
      </p>

      {/* Numerical Performance Score metrics line bar */}
      <div className="flex items-center justify-between w-full border-t border-b border-slate-100 dark:border-slate-900 py-3 mb-6 px-1">
        <div className="flex items-center gap-1">
          <FaStar className="text-[#F59E0B]" size={12} />
          <span className="font-poppins text-xs font-bold text-slate-700 dark:text-slate-300">
            {lawyer.rating}
          </span>
          <span className="font-poppins text-[11px] text-slate-400 dark:text-slate-500 font-medium">
            ({lawyer.totalReviews} reviews)
          </span>
        </div>
        <span className="font-poppins text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded-lg">
          {lawyer.experience} Years Exp
        </span>
      </div>

      {/* Price tag wrapper element */}
      <div className="flex items-baseline justify-between w-full mb-6 px-1">
        <span className="font-poppins text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Consultation Fee
        </span>
        <div className="flex items-baseline">
          <span className="font-syne text-xl font-extrabold text-slate-900 dark:text-white">
            ${lawyer.fee?.amount}
          </span>
          <span className="font-poppins text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            &nbsp;/ session
          </span>
        </div>
      </div>

      {/* Ultra Cool Inset Sliding Liquid Button Action Trigger */}
      <Link 
        href={`/lawyers/${lawyer._id}`}
        className="
          relative overflow-hidden w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
          border border-slate-200 dark:border-slate-800 font-poppins text-xs font-bold 
          text-slate-700 dark:text-slate-300 transition-all duration-300 z-10 mt-auto
          hover:border-[#0F766E] dark:hover:border-teal-500 hover:text-white
        "
      >
        <span className="absolute inset-y-0 left-0 w-full bg-[#0F766E] dark:bg-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out -z-10 rounded-[10px]" />
        <span className="group-hover:text-white">View Full Profile</span>
        <FaArrowRight 
          size={11} 
          className="transform transition-transform duration-300 group-hover:translate-x-1 text-slate-400 group-hover:text-white" 
        />
      </Link>

    </motion.div>
  );
}