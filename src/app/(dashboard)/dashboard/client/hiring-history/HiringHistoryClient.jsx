"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
  Scale,
  Calendar,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export default function HiringHistoryClient({ initialData }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const renderStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 border border-yellow-200 dark:border-yellow-800/50">
            <Clock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case "accepted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500 border border-green-200 dark:border-green-800/50">
            <CheckCircle className="w-3.5 h-3.5" /> Accepted
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500 border border-red-200 dark:border-red-800/50">
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            {status}
          </span>
        );
    }
  };

  if (!initialData || initialData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-12 text-center flex flex-col items-center justify-center">
        <Scale className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Hiring History Found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          You haven't requested to hire any lawyer yet.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      {/* 
        --- DESKTOP TABLE VIEW ---
      
      */}
      <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="p-5 font-medium">Lawyer Details</th>
                <th className="p-5 font-medium">Specialization</th>
                <th className="p-5 font-medium">Date</th>
                <th className="p-5 font-medium">Fee</th>
                <th className="p-5 font-medium">Status</th>
                <th className="p-5 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {initialData.map((item) => (
                <motion.tr
                  variants={itemVariants}
                  key={item._id}
                  className="hover:bg-gray-50/30 dark:hover:bg-gray-800/30 transition-colors group"
                >
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {item.lawyerName}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.lawyerEmail}
                      </span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Briefcase className="w-4 h-4 text-teal-600 dark:text-teal-500" />
                      {item.specialization}
                    </div>
                  </td>
                  <td className="p-5 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="p-5 font-medium text-gray-900 dark:text-white">
                    ${item.fee}
                  </td>
                  <td className="p-5">{renderStatusBadge(item.status)}</td>
                  <td className="p-5 text-right">
                    {item.status === "accepted" &&
                    item.paymentStatus === "unpaid" ? (
                      <form action="/api/payment" method="POST">
                        <input
                          value={item.lawyerName}
                          name="name"
                          type="hidden"
                        />
                        <input value={item.fee} name="amount" type="hidden" />
                        <input
                          value={item.lawyerId}
                          name="lawyerId"
                          type="hidden"
                        />
                        <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow active:scale-95">
                          <CreditCard className="w-4 h-4" /> Pay Now
                        </button>
                      </form>
                    ) : item.paymentStatus === "paid" ? (
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 dark:text-teal-400">
                        <CheckCircle className="w-4 h-4" /> Paid
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                        {item.status === "pending"
                          ? "Awaiting Response"
                          : "No Action"}
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 
        --- MOBILE CARD VIEW ---
        
      */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {initialData.map((item) => (
          <motion.div
            variants={itemVariants}
            key={item._id}
            className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                  {item.lawyerName}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {item.specialization}
                </p>
              </div>
              {renderStatusBadge(item.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Fee
                </p>
                <p className="font-bold text-gray-900 dark:text-white">
                  ${item.fee}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Date
                </p>
                <p className="font-medium text-gray-800 dark:text-gray-200">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end items-center">
              {item.status === "accepted" && item.paymentStatus === "unpaid" ? (
                <Link
                  href={`/dashboard/user/checkout/${item._id}`}
                  className="w-full"
                >
                  <button className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition shadow-sm">
                    <CreditCard className="w-4 h-4" /> Pay Now
                  </button>
                </Link>
              ) : item.paymentStatus === "paid" ? (
                <span className="w-full flex justify-center items-center gap-1.5 py-2 text-sm font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
                  <CheckCircle className="w-4 h-4" /> Payment Completed
                </span>
              ) : (
                <span className="text-sm text-gray-400 w-full text-center py-2">
                  {item.status === "pending"
                    ? "Awaiting lawyer's response..."
                    : "Request Closed"}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
