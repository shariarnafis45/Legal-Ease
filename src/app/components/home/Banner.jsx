"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import {
  FaUserCheck,
  FaBriefcase,
  FaStar,
  FaScaleBalanced,
  FaShieldHalved,
  FaHandHoldingDollar,
  FaClock,
  FaGavel,
  FaBuildingShield,
  FaFileSignature,
  FaBuilding,
} from "react-icons/fa6";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Slide from "./BannerSlide";

export default function Banner() {
  const slides = [
    {
      id: 1,
      tag: "Trusted by Thousands",
      titleLight: "Find & Hire",
      titleTeal: "Expert Legal Counsel",
      desc: "Connect with verified lawyers and get the right legal help for your personal or corporate needs instantly.",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200",
      stats: [
        { count: "500+", label: "Verified Lawyers", icon: FaUserCheck },
        { count: "10K+", label: "Cases Solved", icon: FaBriefcase },
        { count: "4.9", label: "Client Rating", icon: FaStar },
      ],
      features: [
        { text: "Verified Lawyers", icon: FaUserCheck },
        { text: "Secure & Confidential", icon: FaShieldHalved },
        { text: "Affordable Pricing", icon: FaHandHoldingDollar },
        { text: "24/7 Support", icon: FaClock },
      ],
    },
    {
      id: 2,
      tag: "Corporate & Business Law",
      titleLight: "Protect Your",
      titleTeal: "Business Ventures",
      desc: "From startup incorporation to corporate litigation—hire elite business minds to secure your company’s legal health.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200",
      stats: [
        { count: "320+", label: "Corporate Experts", icon: FaBuildingShield },
        { count: "6K+", label: "Startups Protected", icon: FaBriefcase },
        { count: "5.0", label: "Success Rate", icon: FaStar },
      ],
      features: [
        { text: "NDA & IP Secure", icon: FaShieldHalved },
        { text: "Contract Audits", icon: FaFileSignature },
        { text: "Fixed Retainers", icon: FaHandHoldingDollar },
        { text: "Corporate Counsel", icon: FaScaleBalanced },
      ],
    },
    {
      id: 3,
      tag: "Family & Civil Law",
      titleLight: "Navigate Civil",
      titleTeal: "Matters With Care",
      desc: "Get trusted representation and empathetic counsel for sensitive family matters, estate planning, and asset division.",
      img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200", // Golden Scale focus
      stats: [
        { count: "150+", label: "Family Attorneys", icon: FaUserCheck },
        { count: "4.5K+", label: "Families Assisted", icon: FaBriefcase },
        { count: "4.8", label: "Empathy Rating", icon: FaStar },
      ],
      features: [
        { text: "100% Confidential", icon: FaShieldHalved },
        { text: "Mediation Experts", icon: FaScaleBalanced },
        { text: "Transparent Costs", icon: FaHandHoldingDollar },
        { text: "Urgent Consultation", icon: FaClock },
      ],
    },
    {
      id: 4,
      tag: "Real Estate & Property",
      titleLight: "Secure Property",
      titleTeal: "Deeds & Disputes",
      desc: "Avoid fraudulent land traps. Get your property verification, deed vetting, and registration supervised by expert property lawyers.",
      img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200", // Abstract Architectural Pillars
      stats: [
        { count: "200+", label: "Property Experts", icon: FaBuilding },
        { count: "8K+", label: "Deeds Verified", icon: FaFileSignature },
        { count: "4.9", label: "Trust Index", icon: FaStar },
      ],
      features: [
        { text: "Scam Protection", icon: FaShieldHalved },
        { text: "Deed Registration", icon: FaFileSignature },
        { text: "No Hidden Legalities", icon: FaHandHoldingDollar },
        { text: "On-Site Support", icon: FaClock },
      ],
    },
    {
      id: 5,
      tag: "Criminal Defense & Trial",
      titleLight: "Aggressive Trial",
      titleTeal: "Defense Attorneys",
      desc: "Get round-the-clock emergency legal defense and strong representation in court trials from seasoned defense specialists.",
      img: "https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?q=80&w=1200", // Courtroom Hammer focus
      stats: [
        { count: "90+", label: "Trial Lawyers", icon: FaGavel },
        { count: "3K+", label: "Acquittals/Bails", icon: FaScaleBalanced },
        { count: "4.9", label: "Defense Score", icon: FaStar },
      ],
      features: [
        { text: "Immediate Bail Help", icon: FaGavel },
        { text: "Constitutional Rights", icon: FaShieldHalved },
        { text: "Fixed Milestone Fees", icon: FaHandHoldingDollar },
        { text: "24/7 Criminal Line", icon: FaClock },
      ],
    },
  ];

  return (
    <div className="w-full py-6 px-4 sm:px-8 max-w-[1440px] mx-auto select-none group relative">
      <div className="relative w-full rounded-[32px] sm:rounded-[40px] overflow-hidden bg-gradient-to-br from-[#F3FAF8] via-[#FDFDFD] to-[#EAF4F2] dark:from-[#0b1329] dark:via-[#020617] dark:to-[#0f1b35] border border-slate-200/50 dark:border-slate-900/60 shadow-sm">
        <Swiper
          pagination={{
            clickable: true,
            el: ".banner-custom-dots",
          }}
          navigation={{
            nextEl: ".banner-btn-next",
            prevEl: ".banner-btn-prev",
          }}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Slide slide={slide} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="banner-custom-dots absolute inset-x-0 bottom-8 z-30 flex justify-center items-center gap-2.5 [&>.swiper-pagination-bullet]:w-2.5 [&>.swiper-pagination-bullet]:h-2.5 [&>.swiper-pagination-bullet]:bg-slate-300 dark:[&>.swiper-pagination-bullet]:bg-slate-700 [&>.swiper-pagination-bullet-active]:bg-[#0F766E] dark:[&>.swiper-pagination-bullet-active]:bg-teal-400 [&>.swiper-pagination-bullet-active]:w-7 [&>.swiper-pagination-bullet]:rounded-full [&>.swiper-pagination-bullet]:transition-all [&>.swiper-pagination-bullet]:duration-300 pointer-events-auto" />
      </div>

      {/* Floating Action Navigation Chevrons */}
      <button className="banner-btn-prev absolute left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-md hover:bg-white hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100 dark:bg-slate-900/90 dark:border-slate-800 dark:text-slate-300">
        <FaChevronLeft size={14} />
      </button>

      <button className="banner-btn-next absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 hidden md:flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-md hover:bg-white hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100 dark:bg-slate-900/90 dark:border-slate-800 dark:text-slate-300">
        <FaChevronRight size={14} />
      </button>
    </div>
  );
}
