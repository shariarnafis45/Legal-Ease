"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  Clock,
  CreditCard,
  FileText,
  ArrowRight,
  Scale,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const ClientDashboard = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mock Data for Stats
  const stats = [
    {
      title: "Active Hirings",
      value: "03",
      icon: Briefcase,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-100 dark:border-blue-500/20",
    },
    {
      title: "Pending Requests",
      value: "01",
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-100 dark:border-amber-500/20",
    },
    {
      title: "Total Spent",
      value: "$450",
      icon: CreditCard,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-100 dark:border-teal-500/20",
    },
    {
      title: "Documents",
      value: "12",
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-100 dark:border-purple-500/20",
    },
  ];

  // Mock Data for Recent Activity
  const recentHirings = [
    {
      id: 1,
      lawyer: "Zainab Yusuf",
      type: "Cyber Law",
      date: "Jul 26, 2026",
      status: "Pending",
      amount: "$140",
    },
    {
      id: 2,
      lawyer: "Lisa Jenkins",
      type: "Employment Law",
      date: "Jul 20, 2026",
      status: "Active",
      amount: "$100",
    },
    {
      id: 3,
      lawyer: "Robert Fox",
      type: "Corporate Law",
      date: "Jul 15, 2026",
      status: "Completed",
      amount: "$350",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 🌟 1. Welcome Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#0B1324] p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-teal-600/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
              Shariar!
            </span>{" "}
            👋
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {today} • Here is what's happening with your legal cases today.
          </p>
        </div>

        <div className="z-10">
          <Link
            href="/dashboard/client/hiring-history"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Find a Lawyer <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* 🌟 2. Stats Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-[#0B1324] p-6 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.border} border transition-colors duration-300`}
                >
                  <Icon
                    size={22}
                    className={`${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🌟 3. Bottom Layout: Recent Hirings & Quick Connect */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Recent Hirings Table (Takes 2 columns on Large screens) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0B1324] rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale size={20} className="text-teal-600 dark:text-teal-400" />{" "}
              Recent Hirings
            </h2>
            <Link
              href="/dashboard/client/hiring-history"
              className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-800/30 text-xs uppercase text-slate-500 dark:text-slate-400 font-semibold">
                <tr>
                  <th className="px-6 py-4">Lawyer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {recentHirings.map((hiring) => (
                  <tr
                    key={hiring.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {hiring.lawyer}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {hiring.type}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                      {hiring.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                          hiring.status === "Pending"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20"
                            : hiring.status === "Active"
                              ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20"
                              : "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20"
                        }`}
                      >
                        {hiring.status === "Pending" && (
                          <AlertCircle size={12} />
                        )}
                        {hiring.status === "Completed" && (
                          <CheckCircle2 size={12} />
                        )}
                        {hiring.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">
                      {hiring.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Quick Support Card */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-center group">
          {/* Decorative Background Circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-5 -mb-5"></div>

          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20">
              <MessageSquare size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-extrabold mb-2 leading-tight">
              Need Legal
              <br />
              Assistance?
            </h3>
            <p className="text-teal-100 text-sm font-medium mb-6">
              Our support team is available 24/7 to help you find the right
              lawyer.
            </p>
            <button className="w-full py-3 px-4 bg-white text-teal-800 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import { MessageSquare } from "lucide-react";

export default ClientDashboard;
