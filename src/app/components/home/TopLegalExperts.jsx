import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import TopExpertCard from "../shared/TopExpertCard";
import { getCompleteLawyers } from "@/lib/api/lawyers";

export default async function TopLegalExperts() {
  const rawLawyersData = await getCompleteLawyers();
  const lawyersList = Array.isArray(rawLawyersData)
    ? rawLawyersData
    : rawLawyersData?.data && Array.isArray(rawLawyersData.data)
      ? rawLawyersData.data
      : [];

  const topExpertsData = lawyersList
    .filter((lawyer) => lawyer.completeProfile !== false)
    .sort((a, b) => {
      if ((b.totalHires || 0) !== (a.totalHires || 0)) {
        return (b.totalHires || 0) - (a.totalHires || 0);
      }

      return (b.rating || 0) - (a.rating || 0);
    })
    .slice(0, 3)
    .map((lawyer) => ({
      ...lawyer,

      _id:
        typeof lawyer._id === "object" && lawyer._id?.$oid
          ? lawyer._id.$oid
          : String(lawyer._id),
    }));

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto bg-white dark:bg-[#030712] transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 pb-2">
        <div className="flex flex-col text-left">
          <h2 className="font-syne text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Top Legal Experts
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1.5 font-medium">
            Most hired lawyers by our clients
          </p>
        </div>

        <Link
          href="/lawyers"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 font-poppins shrink-0 self-start sm:self-auto"
        >
          <span>View All</span>
          <FaArrowRight size={11} className="text-slate-400" />
        </Link>
      </div>

      {/* 3-Column Grid */}
      {topExpertsData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topExpertsData.map((lawyer, index) => (
            <TopExpertCard
              key={lawyer._id}
              lawyer={lawyer}
              index={index}
              rank={index + 1}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 font-poppins text-sm">
          No experts found at the moment.
        </div>
      )}
    </section>
  );
}
