"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Briefcase,
  Heart,
  MessageSquare,
  Share2,
  Shield,
  Award,
  BookOpen,
  ChevronRight,
  X,
  Lock,
} from "lucide-react";
import { redirect } from "next/navigation";

export default function LawyerDetailsClient({ lawyer, user }) {
  const [activeTab, setActiveTab] = useState("about");
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  

  const joinedDate = new Date(lawyer.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleHireClick = () => {
    if (!user) {
      alert("Please login to hire a lawyer!");
      return;
    }
    setIsHireModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 dark:text-gray-400 mb-6 gap-2 items-center">
          <span className="hover:text-teal-600 cursor-pointer">Home</span>{" "}
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-teal-600 cursor-pointer">
            Browse Lawyers
          </span>{" "}
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-gray-200 font-medium">
            {lawyer.name}
          </span>
        </nav>

        {/* --- HERO SECTION --- */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row gap-8 relative">
          {/* Left: Image */}
          <div className="relative w-full lg:w-80 h-[400px] rounded-2xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
            <Image
              src={lawyer.image}
              alt={lawyer.name}
              fill
              className="object-cover"
            />
            <button className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md text-gray-400 hover:text-red-500 transition">
              <Heart className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
              {lawyer.verified && (
                <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                  <Shield className="w-4 h-4 text-green-600" /> Verified Lawyer
                </span>
              )}
              <span className="bg-white text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                <span
                  className={`w-2 h-2 rounded-full ${lawyer.status === "Available" ? "bg-green-500" : "bg-red-500"}`}
                ></span>
                {lawyer.status}
              </span>
            </div>
          </div>

          {/* Center: Info */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {lawyer.name}
              </h1>
              {lawyer.verified && (
                <CheckCircle className="w-6 h-6 text-teal-600" />
              )}
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {lawyer.specialization?.name} Specialist
            </p>

            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 px-2 py-1 rounded">
                <Star className="w-4 h-4 fill-current" />{" "}
                <span className="font-bold">{lawyer.rating}</span> (
                {lawyer.totalReviews} Reviews)
              </div>
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                <Briefcase className="w-4 h-4" /> {lawyer.experience}+ Years
                Experience
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-400" />{" "}
                <strong>${lawyer.fee?.amount}</strong> / Consultation
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" /> {lawyer.location}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl">
              {lawyer.bio}
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleHireClick}
                className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition shadow-sm"
              >
                <Calendar className="w-5 h-5" /> Hire Lawyer
              </button>
              <button className="border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <MessageSquare className="w-5 h-5" /> Message
              </button>
            </div>
          </div>
        </div>

        {/* --- TABS NAVIGATION --- */}
        <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800 mt-10 px-4 overflow-x-auto">
          {["About", "Experience", "Reviews", "Availability"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`pb-4 font-medium text-base whitespace-nowrap transition-colors relative ${
                activeTab === tab.toLowerCase()
                  ? "text-teal-700 dark:text-teal-400"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {tab}
              {activeTab === tab.toLowerCase() && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-700 dark:bg-teal-400 rounded-t-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* --- MAIN CONTENT & SIDEBAR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* ABOUT TAB */}
                {activeTab === "about" && (
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      About {lawyer.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                      {lawyer.bio}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="p-5 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/30">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                          <BookOpen className="w-5 h-5 text-teal-600" />{" "}
                          Specialization
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {lawyer.specialization?.name}
                        </p>
                      </div>
                      <div className="p-5 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50/50 dark:bg-gray-800/30">
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                          <Award className="w-5 h-5 text-teal-600" />{" "}
                          Performance
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {lawyer.totalHires} Total Hires • {lawyer.rating}{" "}
                          Average Rating
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* EXPERIENCE TAB */}
                {activeTab === "experience" && (
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                      Professional Experience
                    </h2>
                    <div className="relative border-l-2 border-teal-100 dark:border-teal-900/50 ml-3 space-y-8">
                      {/* Demo Experience Item */}
                      <div className="relative pl-6">
                        <div className="absolute w-4 h-4 bg-teal-600 rounded-full -left-[9px] top-1 border-4 border-white dark:border-gray-900"></div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {lawyer.specialization?.name} Lawyer
                        </h3>
                        <p className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-2">
                          Independent Practice • 2020 - Present
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Successfully handled over {lawyer.totalHires} cases
                          specializing in {lawyer.specialization?.name}.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* REVIEWS & COMMENT TAB */}
                {activeTab === "reviews" && (
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-center mb-8">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Client Reviews
                      </h2>
                      {!user ? (
                        <button className="flex items-center gap-2 text-sm border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                          <Lock className="w-4 h-4" /> Login to Write a Review
                        </button>
                      ) : (
                        <span className="text-sm text-teal-600 font-medium">
                          You can leave a review
                        </span>
                      )}
                    </div>

                    {/* Review Form (Only visible if logged in) */}
                    {user && (
                      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                        <textarea
                          placeholder="Write your experience with this lawyer..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          className="w-full bg-transparent border-0 focus:ring-0 resize-none h-20 text-gray-900 dark:text-white placeholder-gray-400"
                        />
                        <div className="flex justify-between items-center mt-2 border-t border-gray-200 dark:border-gray-700 pt-3">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer transition"
                              />
                            ))}
                          </div>
                          <button className="bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-800">
                            Post Review
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Demo Review List */}
                    <div className="space-y-6">
                      <div className="border-b border-gray-100 dark:border-gray-800 pb-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                              John Anderson{" "}
                              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">
                                Verified Client
                              </span>
                            </h4>
                            <div className="flex gap-1 mt-1 text-yellow-400">
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                              <Star className="w-3 h-3 fill-current" />
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">
                            May 20, 2026
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Excellent service! {lawyer.name} was incredibly
                          supportive and professional. Highly recommended for{" "}
                          {lawyer.specialization?.name} issues.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* AVAILABILITY TAB */}
                {activeTab === "availability" && (
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Availability
                      </h2>
                      <span className="text-sm text-teal-600 cursor-pointer font-medium hover:underline">
                        View Full Calendar
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["Mon", "Tue", "Wed", "Thu"].map((day, idx) => (
                        <div
                          key={day}
                          className={`p-4 rounded-xl border text-center ${idx === 2 ? "border-teal-600 bg-teal-50/30 dark:bg-teal-900/10" : "border-gray-200 dark:border-gray-800"}`}
                        >
                          {idx === 2 && (
                            <span className="bg-teal-600 text-white text-[10px] px-2 py-0.5 rounded-full absolute -mt-7 ml-[-15px]">
                              Today
                            </span>
                          )}
                          <p className="font-bold text-gray-900 dark:text-white">
                            {day}
                          </p>
                          <p className="text-xs text-gray-500 mb-3">
                            2{idx + 5} May
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            9:00 AM - 5:00 PM
                          </p>
                          <span className="text-[11px] font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                            Available
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-6 text-center">
                      All times are shown in your local timezone.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDEBAR (Sticky) */}
          <div className="space-y-6 lg:sticky lg:top-8 self-start">
            {/* Action Box */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Hire Request
              </h3>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${lawyer.fee?.amount}
                </span>
                <span className="text-gray-500 dark:text-gray-400 pb-1">
                  / Consultation
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${lawyer.status === "Available" ? "bg-green-500" : "bg-red-500"}`}
                ></span>
                <span
                  className={`text-sm font-medium ${lawyer.status === "Available" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {lawyer.status === "Available"
                    ? "Available Now"
                    : "Currently Busy"}
                </span>
              </div>

              <button
                onClick={handleHireClick}
                disabled={lawyer.status !== "Available"}
                className="w-full bg-teal-700 disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white py-3.5 rounded-xl font-bold hover:bg-teal-800 transition mb-4 flex justify-center items-center gap-2"
              >
                {lawyer.status !== "Available" ? (
                  "Unavailable"
                ) : (
                  <>
                    <Calendar className="w-4 h-4" /> Hire Lawyer
                  </>
                )}
              </button>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <p className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-teal-600" /> Secure payment
                  powered by Stripe
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600" /> Instant
                  confirmation
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" /> Cancel anytime
                </p>
              </div>
            </div>

            {/* Info Summary Box */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Professional Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-50 dark:border-gray-800/50">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Date Joined
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {joinedDate}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50 dark:border-gray-800/50">
                  <span className="text-gray-500 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Experience
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {lawyer.experience}+ Years
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> Response Time
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Within 2 Hours
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- HIRE REQUEST MODAL --- */}
      <AnimatePresence>
        {isHireModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHireModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl relative z-10 overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Confirm Hire Request
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      You are requesting to hire {lawyer.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsHireModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition bg-gray-50 dark:bg-gray-800 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Consultation Fee
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${lawyer.fee?.amount}
                    </span>
                  </div>
                  <hr className="my-3 border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white">
                      Total Due
                    </span>
                    <span className="font-bold text-teal-700 dark:text-teal-400 text-lg">
                      ${lawyer.fee?.amount}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsHireModalOpen(false)}
                    className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    Cancel
                  </button>
                  <form action="/api/payment" method="POST">
                    <input type="hidden" value={lawyer.name} name="name" />
                    <input type="hidden" value={lawyer._id} name="lawyerId" />
                    <input
                      type="hidden"
                      value={lawyer.fee.amount}
                      name="amount"
                    />
                    <button className="flex-1 px-4 py-3 bg-teal-700 text-white rounded-xl font-medium hover:bg-teal-800 transition shadow-sm">
                      Send Request
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
