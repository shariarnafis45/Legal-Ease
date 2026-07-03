import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import LawyerCard from "../shared/LawyersCard";


export default function FeaturedLawyers() {
  const featuredLawyersData = [
    {
      _id: "684b9d8c123456781",
      name: "John Anderson",
      email: "john@example.com",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400",
      specialization: { name: "Corporate Law", slug: "corporate-law" },
      bio: "Experienced corporate lawyer helping businesses with global contracts, financial compliance, and legal asset advisory scaling setup.",
      fee: { amount: 150, currency: "USD" },
      experience: 8,
      rating: 4.9,
      totalReviews: 120,
      totalHires: 380,
      location: "New York, USA",
      verified: true
    },
    {
      _id: "684b9d8c123456782",
      name: "Sarah Mitchell",
      email: "sarah@example.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400",
      specialization: { name: "Family Law", slug: "family-law" },
      bio: "Compassionate family counsel specializing in complex mediation, asset division, and swift child custody protection frameworks.",
      fee: { amount: 120, currency: "USD" },
      experience: 6,
      rating: 4.8,
      totalReviews: 98,
      totalHires: 240,
      location: "Chicago, USA",
      verified: true
    },
    {
      _id: "684b9d8c123456783",
      name: "Michael Brown",
      email: "michael@example.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400",
      specialization: { name: "Criminal Law", slug: "criminal-law" },
      bio: "Aggressive state and federal criminal defense trial lawyer with an elite track record handling high-stakes defense cases.",
      fee: { amount: 180, currency: "USD" },
      experience: 10,
      rating: 4.9,
      totalReviews: 150,
      totalHires: 410,
      location: "Los Angeles, USA",
      verified: true
    },
    {
      _id: "684b9d8c123456784",
      name: "Emily Johnson",
      email: "emily@example.com",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400",
      specialization: { name: "Immigration Law", slug: "immigration-law" },
      bio: "Assisting international individuals and corporate enterprises navigate complex visa structures and citizenship pathways.",
      fee: { amount: 130, currency: "USD" },
      experience: 5,
      rating: 4.7,
      totalReviews: 86,
      totalHires: 190,
      location: "Miami, USA",
      verified: true
    },
    {
      _id: "684b9d8c123456785",
      name: "David Wilson",
      email: "david@example.com",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
      specialization: { name: "Real Estate Law", slug: "real-estate" },
      bio: "Property compliance supervisor auditing deeds, commercial zoning laws, and preventing multi-million real estate fraud gaps.",
      fee: { amount: 140, currency: "USD" },
      experience: 7,
      rating: 4.8,
      totalReviews: 110,
      totalHires: 310,
      location: "Houston, USA",
      verified: false
    },
    {
      _id: "684b9d8c123456786",
      name: "Lisa Martinez",
      email: "lisa@example.com",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400",
      specialization: { name: "Employment Law", slug: "employment-law" },
      bio: "Dedicated advocate enforcing modern labor compliance, corporate workplace rights audits, and compensation panels.",
      fee: { amount: 120, currency: "USD" },
      experience: 9,
      rating: 4.9,
      totalReviews: 130,
      totalHires: 290,
      location: "Boston, USA",
      verified: true
    }
  ];

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
        {featuredLawyersData.map((lawyer, index) => (
          <LawyerCard
            key={lawyer._id} 
            lawyer={lawyer} 
            index={index} 
          />
        ))}
      </div>

    </section>
  );
}