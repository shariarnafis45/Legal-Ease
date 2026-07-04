"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";



import { 
  FaScaleBalanced, 
  FaBuildingColumns, 
  FaPeopleGroup, 
  FaGlobe, 
  FaHouse, 
  FaBriefcase 
} from "react-icons/fa6";
import { hoverScale } from "../animations/Animations";


const iconMap = {
  criminal: FaScaleBalanced,
  corporate: FaBuildingColumns,
  family: FaPeopleGroup,
  immigration: FaGlobe,
  realestate: FaHouse,
  employment: FaBriefcase,
};

export default function CategoryCard({ category, index }) {
 
  const Icon = iconMap[category.iconName] || FaScaleBalanced;

  return (
    <motion.div
   
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.06 }}
      
     
      variants={hoverScale}
      whileHover="hover"
      whileTap="tap"
      className="w-full"
    >
      <Link 
        href={`/lawyers?specialization=${category.slug}`}
        className="
          group flex flex-col items-center justify-center text-center p-6 sm:p-8
          bg-white border border-slate-200/60 rounded-[24px] w-full min-h-[180px]
          dark:bg-[#0b1329] dark:border-slate-900/60 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)]
          hover:shadow-[0_20px_40px_-15px_rgba(15,118,110,0.06)] dark:hover:shadow-none
          transition-all duration-300 block
        "
      >
        
        {/* Category Outline Icon Container */}
        <div className="
          flex h-14 w-14 items-center justify-center rounded-2xl mb-5
          bg-slate-50 border border-slate-100/50 text-[#0F766E]
          dark:bg-slate-950 dark:border-slate-900 dark:text-teal-400
          transition-all duration-300 group-hover:scale-105
          group-hover:bg-[#EBF6F4] dark:group-hover:bg-teal-950/20
        ">
          <Icon size={20} className="stroke-[1.5]" />
        </div>

        {/* Category Title with Syne font */}
        <h3 className="font-syne text-xs sm:text-sm font-bold text-slate-800 dark:text-white tracking-tight group-hover:text-[#0F766E] dark:group-hover:text-teal-400 transition-colors duration-200">
          {category.name}
        </h3>

      </Link>
    </motion.div>
  );
}