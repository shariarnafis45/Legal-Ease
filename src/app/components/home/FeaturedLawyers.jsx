import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import LawyerCard from "../shared/LawyersCard";
import { getCompleteLawyers } from "@/lib/api/lawyers";

export default async function FeaturedLawyers() {
  const featuredLawyersData = await getCompleteLawyers();

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto bg-white dark:bg-[#030712] transition-colors duration-300">
      {/* Top Header Row Panel matching layout parameters */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-2">
        <div className="flex flex-col text-left">
          <h2 className="font-syne text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Featured Lawyers
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1.5 font-medium">
            Handpicked legal experts for you
          </p>
        </div>

        <Link
          href="/lawyers"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 font-poppins shrink-0 self-start sm:self-auto"
        >
          <span>View All Lawyers</span>
          <FaArrowRight size={11} className="text-slate-400" />
        </Link>
      </div>

      {/* 3-COLUMN REUSABLE GRID (Server passing index data to handle client staggers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredLawyersData.slice(0, 6).map((lawyer, index) => (
          <LawyerCard key={lawyer._id} lawyer={lawyer} index={index} />
        ))}
      </div>
    </section>
  );
}
