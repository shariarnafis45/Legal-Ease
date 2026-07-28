"use client";

import React, { useState } from "react";
import {
  Check,
  X,
  User,
  Mail,
  Clock,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/components/shared/customToast";
import { updateHiringStatus } from "@/lib/actions/hire";

const formatDate = (dateInput) => {
  if (!dateInput) return "N/A";
  const dateString =
    typeof dateInput === "object" && dateInput?.$date
      ? dateInput.$date
      : dateInput;
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
};

const getStatusString = (statusInput) => {
  if (!statusInput) return "pending";
  if (typeof statusInput === "object") {
    return statusInput.status || "pending";
  }
  return String(statusInput);
};

export default function LawyerHiringHistoryWrapper({ initialRequests = [] }) {
  const [requests, setRequests] = useState(initialRequests);
  const [processingId, setProcessingId] = useState(null);

  const acceptStatus = { status: "accepted" };
  const rejectStatus = { status: "rejected" };

  // 🌟 Accept Request Handler
  const handleAccept = async (id, clientId, lawyerId, clientName) => {
    setProcessingId(id);
    try {
      const response = await updateHiringStatus(
        clientId,
        lawyerId,
        acceptStatus,
      );

      setRequests((prev) =>
        prev.map((req) => {
          const reqId = req._id?.$oid || req._id || req.id;
          return String(reqId) === String(id)
            ? { ...req, status: "accepted" }
            : req;
        }),
      );

      showSuccessToast(
        `Hiring request from ${clientName || "client"} has been accepted.`,
      );
    } catch (error) {
      console.error("Error accepting request:", error);
      showErrorToast("Failed to accept request. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  // 🌟 Reject Request Handler
  const handleReject = async (id, clientId, lawyerId, clientName) => {
    setProcessingId(id);
    try {
      await updateHiringStatus(clientId, lawyerId, rejectStatus);

      setRequests((prev) =>
        prev.map((req) => {
          const reqId = req._id?.$oid || req._id || req.id;
          return String(reqId) === String(id)
            ? { ...req, status: "rejected" }
            : req;
        }),
      );

      showErrorToast(
        `Hiring request from ${clientName || "client"} has been rejected.`,
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
      showErrorToast("Failed to reject request. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full overflow-hidden pb-24">
      {/* 🌟 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#0B1324] p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-teal-600/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
            Hiring Requests
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Manage your legal service requests from clients.
          </p>
        </div>
        <div className="z-10 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
          <Briefcase className="text-teal-600 dark:text-teal-400" size={20} />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Requests
            </span>
            <span className="text-lg font-bold text-slate-900 dark:text-white leading-none">
              {requests.length}
            </span>
          </div>
        </div>
      </div>

      {/* 🌟 2. Table Section */}
      <div className="bg-white dark:bg-[#0B1324] rounded-3xl border border-slate-100 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col w-full">
        <div className="w-full overflow-x-auto">
          {requests.length === 0 ? (
            <div className="p-12 sm:p-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                <Clock
                  size={32}
                  className="text-slate-300 dark:text-slate-600"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
                No Requests Found
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm">
                You don't have any hiring requests at the moment. New requests
                will appear here.
              </p>
            </div>
          ) : (
            <table className="w-full text-left whitespace-nowrap min-w-[800px]">
              <thead className="bg-slate-50 dark:bg-slate-800/30 text-[11px] uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider border-b border-slate-100 dark:border-slate-800/60">
                <tr>
                  <th className="px-6 py-5">Client Info</th>
                  <th className="px-6 py-5">Service & Fee</th>
                  <th className="px-6 py-5">Request Date</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {requests.map((req, index) => {
                  const rawReqId = req._id?.$oid || req._id || req.id || index;
                  const reqId = String(rawReqId);
                  const currentStatus = getStatusString(req.status);
                  const isProcessing = String(processingId) === reqId;

                  return (
                    <tr
                      key={reqId}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"
                    >
                      {/* Client Info Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-500/10 flex items-center justify-center border border-teal-100 dark:border-teal-500/20 flex-shrink-0">
                            <User
                              size={18}
                              className="text-teal-600 dark:text-teal-400"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white text-base">
                              {req.clientName || "Unknown Client"}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                              <Mail size={12} />
                              {req.clientEmail || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Service & Fee Column */}
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-700 dark:text-slate-200">
                          {req.specialization || "General Legal"}
                        </p>
                        <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                          Fee: ${req.fee || 0}{" "}
                          <span className="text-slate-400 dark:text-slate-500 font-medium">
                            (
                            {typeof req.paymentStatus === "object"
                              ? req.paymentStatus.status
                              : req.paymentStatus || "Unpaid"}
                            )
                          </span>
                        </p>
                      </td>

                      {/* Request Date Column */}
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium text-sm">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-slate-400" />
                          {formatDate(req.createdAt)}
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold capitalize border ${
                            currentStatus === "pending"
                              ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20"
                              : currentStatus === "accepted"
                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                                : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20"
                          }`}
                        >
                          {currentStatus === "pending" && (
                            <AlertCircle size={14} />
                          )}
                          {currentStatus === "accepted" && (
                            <CheckCircle2 size={14} />
                          )}
                          {currentStatus === "rejected" && (
                            <XCircle size={14} />
                          )}
                          {currentStatus}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 text-right">
                        {currentStatus === "pending" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                handleReject(
                                  reqId,
                                  req.clientId,
                                  req.lawyerId,
                                  req.clientName,
                                )
                              }
                              disabled={isProcessing}
                              className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 dark:hover:border-rose-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Reject Request"
                            >
                              {isProcessing ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <X size={16} />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleAccept(
                                  reqId,
                                  req.clientId,
                                  req.lawyerId,
                                  req.clientName,
                                )
                              }
                              disabled={isProcessing}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                              {isProcessing ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <Check size={16} />
                              )}
                              Accept
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 italic">
                            Action completed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
