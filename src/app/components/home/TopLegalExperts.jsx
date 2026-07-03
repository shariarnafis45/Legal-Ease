import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import TopExpertCard from "../shared/TopExpertCard";


export default function TopLegalExperts() {
  const topExpertsData = [
    {
      _id: "684b9d8c123456783",
      name: "Michael Brown",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
      specialization: { name: "Criminal Law", slug: "criminal-law" },
      experience: 10,
      rating: 4.9,
      totalReviews: 150,
      totalHires: 520, // Most Hired
    },
    {
      _id: "684b9d8c123456786",
      name: "Lisa Martinez",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
      specialization: { name: "Employment Law", slug: "employment-law" },
      experience: 9,
      rating: 4.8,
      totalReviews: 130,
      totalHires: 410, // Second
    },
    {
      _id: "684b9d8c123456781",
      name: "John Anderson",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
      specialization: { name: "Corporate Law", slug: "corporate-law" },
      experience: 8,
      rating: 4.9,
      totalReviews: 120,
      totalHires: 380,
    },
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto bg-white dark:bg-[#030712] transition-colors duration-300">
      {/* Upper Panel Header Section matching image_3a993e.png */}
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

      {/* Perfect 3-Column Grid Arrangement */}
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
    </section>
  );
}
