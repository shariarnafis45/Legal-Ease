import React from "react";
import Link from "next/link";
import { getClientHiringRequestHistory } from "@/lib/api/hire";
import { getUserSession } from "@/lib/core/session";
import {
  Briefcase,
  Clock,
  CreditCard,
  FileText,
  ArrowRight,
  Scale,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  XCircle,
} from "lucide-react";


const formatDate = (dateInput) => {
  if (!dateInput) return "N/A";
  const dateString =
    typeof dateInput === "object" && dateInput.$date
      ? dateInput.$date
      : dateInput;
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
};

export default async function ClientDashboardPage() {
  const user = await getUserSession();
  
  
  const hiringRequestHistory = (await getClientHiringRequestHistory(user?.id || user?._id)) || [];

  
  const activeHiringsCount = hiringRequestHistory.filter(
    (req) => req.status === "accepted" || req.status === "active"
  ).length;

  const pendingCount = hiringRequestHistory.filter(
    (req) => req.status === "pending"
  ).length;

  const totalSpent = hiringRequestHistory
    .filter((req) => req.paymentStatus === "paid")
    .reduce((sum, req) => sum + (req.fee || 0), 0);

  const totalRequests = hiringRequestHistory.length;

 
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  
  const stats = [
    {
      title: "Active Hirings",
      value: activeHiringsCount < 10 ? `0${activeHiringsCount}` : activeHiringsCount,
      icon: Briefcase,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-100 dark:border-blue-500/20",
    },
    {
      title: "Pending Requests",
      value: pendingCount < 10 ? `0${pendingCount}` : pendingCount,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-100 dark:border-amber-500/20",
    },
    {
      title: "Total Spent",
      value: `$${totalSpent}`,
      icon: CreditCard,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-50 dark:bg-teal-500/10",
      border: "border-teal-100 dark:border-teal-500/20",
    },
    {
      title: "Total Requests",
      value: totalRequests < 10 ? `0${totalRequests}` : totalRequests,
      icon: FileText,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-100 dark:border-purple-500/20",
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-24 sm:pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full overflow-hidden">
      
      {/* 🌟 1. Welcome Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 sm:gap-4 bg-white dark:bg-[#0B1324] p-5 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-teal-600/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="z-10 w-full">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">
              {user?.name?.split(" ")[0] || "Client"}!
            </span>{" "}
            👋
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            {today} • Here is what's happening today.
          </p>
        </div>

        <div className="z-10 w-full sm:w-auto mt-2 sm:mt-0">
          <Link
            href="/dashboard/client/hiring-history"
            className="flex sm:inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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
              className="bg-white dark:bg-[#0B1324] p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Left Side: Recent Hirings Table */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0B1324] rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col w-full">
          <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
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

          <div className="w-full overflow-x-auto">
            {hiringRequestHistory.length === 0 ? (
              <div className="p-10 sm:p-12 text-center">
                 <Briefcase size={40} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                 <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No Hirings Yet</h3>
                 <p className="text-sm text-slate-500 mt-1">You haven't hired any lawyer recently.</p>
              </div>
            ) : (
              <table className="w-full text-left whitespace-nowrap min-w-[550px] sm:min-w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/30 text-[11px] uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider border-b border-slate-100 dark:border-slate-800/60">
                  <tr>
                    <th className="px-4 py-3 sm:px-6 sm:py-4">Lawyer Info</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4">Date</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4">Status</th>
                    <th className="px-4 py-3 sm:px-6 sm:py-4">Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                  {hiringRequestHistory.slice(0, 4).map((hiring) => (
                    <tr
                      key={hiring._id?.$oid || hiring._id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"
                    >
                      <td className="px-4 py-3 sm:px-6 sm:py-4">
                        <p className="font-bold text-slate-800 dark:text-slate-200">
                          {hiring.lawyerName}
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {hiring.specialization}
                        </p>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 text-slate-600 dark:text-slate-300 font-medium text-xs">
                        {formatDate(hiring.createdAt)}
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4">
                        <span
                          className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 rounded-md text-[11px] sm:text-xs font-bold capitalize ${
                            hiring.status === "pending"
                              ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20"
                              : hiring.status === "accepted"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-500/20"
                              : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-100 dark:border-rose-500/20"
                          }`}
                        >
                          {hiring.status === "pending" && <AlertCircle size={12} />}
                          {hiring.status === "accepted" && <CheckCircle2 size={12} />}
                          {(hiring.status === "rejected" || hiring.status === "completed") && <XCircle size={12} />}
                          {hiring.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 sm:px-6 sm:py-4 font-bold text-slate-800 dark:text-slate-200">
                        ${hiring.fee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Side: Quick Support Card */}
        <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-center group w-full">
          {/* Decorative Background Circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-5 -mb-5"></div>

          <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 border border-white/20">
              <MessageSquare size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold mb-2 leading-tight">
              Need Legal
              <br />
              Assistance?
            </h3>
            <p className="text-teal-100 text-xs sm:text-sm font-medium mb-5 sm:mb-6">
              Our support team is available 24/7 to help you find the right
              lawyer.
            </p>
            <button className="w-full py-3 px-4 bg-white text-teal-800 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2 text-sm">
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}