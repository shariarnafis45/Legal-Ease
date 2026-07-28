import React from "react";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";
import { getLawyerHiringRequestHistory } from "@/lib/api/hire";
import {
  Briefcase,
  Users,
  Star,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  CalendarDays,
  ShieldCheck,
  Scale,
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

export default async function LawyerDashboard() {
  const user = await getUserSession();

  const hiringRequestHistory =
    (await getLawyerHiringRequestHistory(user?.id)) || [];

  const pendingRequests = hiringRequestHistory.filter(
    (req) => req.status === "pending",
  ).length;
  const activeCases = hiringRequestHistory.filter(
    (req) => req.status === "accepted",
  ).length;
  const totalEarnings = hiringRequestHistory
    .filter((req) => req.paymentStatus === "paid")
    .reduce((sum, req) => sum + (req.fee || 0), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 🌟 Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Welcome back, {user?.name?.split(" ")[0] || "Counsel"}{" "}
            <Scale className="text-teal-600 dark:text-teal-400" size={26} />
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Here is what's happening with your legal practice today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {user?.verified && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold">
              <ShieldCheck size={14} /> Verified Profile
            </div>
          )}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
              user?.status === "Available"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${user?.status === "Available" ? "bg-emerald-500" : "bg-amber-500"}`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${user?.status === "Available" ? "bg-emerald-500" : "bg-amber-500"}`}
              ></span>
            </span>
            {user?.status || "Available"}
          </div>
        </div>
      </div>

      {/* 🌟 KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Stat 1: Pending Requests */}
        <div className="bg-white dark:bg-[#0B1324] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Pending Requests
            </h3>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Clock size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {pendingRequests}
            </span>
            <span className="text-xs font-semibold text-amber-500">
              Requires Action
            </span>
          </div>
        </div>

        {/* Stat 2: Active Cases / Hires */}
        <div className="bg-white dark:bg-[#0B1324] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Total Hires
            </h3>
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
              <Users size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {user?.totalHires || 0}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Lifetime
            </span>
          </div>
        </div>

        {/* Stat 3: Total Earnings */}
        <div className="bg-white dark:bg-[#0B1324] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Est. Earnings
            </h3>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {totalEarnings > 0 ? `$${totalEarnings}` : "$0"}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              From Paid Requests
            </span>
          </div>
        </div>

        {/* Stat 4: Rating */}
        <div className="bg-white dark:bg-[#0B1324] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between pb-4">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400">
              Client Rating
            </h3>
            <div className="p-2 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
              <Star size={20} className="fill-orange-500/20" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {user?.rating || "0.0"}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              ({user?.totalReviews || 0} Reviews)
            </span>
          </div>
        </div>
      </div>

      {/* 🌟 Recent Hiring Requests Section */}
      <div className="bg-white dark:bg-[#0B1324] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase
                className="text-teal-600 dark:text-teal-400"
                size={20}
              />{" "}
              Recent Hiring Requests
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Review and manage consultation requests from clients.
            </p>
          </div>
          <Link
            href="/dashboard/lawyer/hiring-history"
            className="inline-flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            View All Requests <ArrowRight size={14} />
          </Link>
        </div>

        {/* Table/List Area */}
        {hiringRequestHistory.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarDays
                size={28}
                className="text-slate-400 dark:text-slate-500"
              />
            </div>
            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
              No requests yet
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't received any hiring requests from clients yet. When
              they book your services, they will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="p-5">Client Info</th>
                  <th className="p-5">Case / Specialization</th>
                  <th className="p-5">Fee</th>
                  <th className="p-5">Date</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-right">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm font-medium">
                {hiringRequestHistory.slice(0, 5).map((request) => (
                  <tr
                    key={request._id?.$oid || request._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="p-5">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {request.clientName}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {request.clientEmail}
                      </p>
                    </td>

                    <td className="p-5">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {request.specialization}
                      </span>
                    </td>

                    <td className="p-5 font-bold text-slate-900 dark:text-white">
                      ${request.fee}
                    </td>

                    <td className="p-5 text-slate-600 dark:text-slate-400 text-xs flex items-center gap-1.5 mt-2.5">
                      <CalendarDays size={14} className="text-slate-400" />
                      {formatDate(request.createdAt)}
                    </td>

                    <td className="p-5">
                      {request.status === "pending" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <Clock size={12} /> Pending
                        </span>
                      )}
                      {request.status === "accepted" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 size={12} /> Accepted
                        </span>
                      )}
                      {request.status === "rejected" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          <XCircle size={12} /> Rejected
                        </span>
                      )}
                    </td>

                    <td className="p-5 text-right">
                      {request.paymentStatus === "paid" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                          Unpaid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
