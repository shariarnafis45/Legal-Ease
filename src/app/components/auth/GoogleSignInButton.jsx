"use client";

import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import {
  FaCircleXmark,
  FaXmark,
  FaUserTie,
  FaUser,
  FaCircleCheck,
} from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { updateUserType } from "@/lib/actions/user";

export default function GoogleSignInButton({ text = "Continue with Google" }) {
  const router = useRouter();

  // States for Button & Auth
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [userSession, setUserSession] = useState(null);

  // States for Modal
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (session?.user) {
          setUserSession(session.user);

          if (session.user.userType || session.user.role) {
            router.push("/");
          } else {
            setShowRoleModal(true);
          }
        }
      } catch (error) {
        console.error("Session check failed", error);
      }
    };
    checkUserSession();
  }, [router]);

  const showCustomToast = (message, type = "error") => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white dark:bg-[#0B1324] shadow-2xl rounded-2xl pointer-events-auto flex border ${
          type === "success" ? "border-[#0F766E]/30" : "border-rose-500/30"
        } p-4 transition-all duration-300`}
      >
        <div className="flex items-start gap-3 w-full">
          {type === "success" ? (
            <FaCircleCheck className="text-[#0F766E] text-xl flex-shrink-0 mt-0.5" />
          ) : (
            <FaCircleXmark className="text-rose-500 text-xl flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-slate-800 dark:text-white">
              {type === "success" ? "Success" : "Error"}
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {message}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <FaXmark size={16} />
          </button>
        </div>
      </div>
    ));
  };

  // 3. Handle Google Click
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.href,
      });

      if (error) {
        showCustomToast(
          error.message || "Something went wrong with Google Sign-In.",
          "error",
        );
        setIsGoogleLoading(false);
      }
    } catch (err) {
      showCustomToast("Network error. Please try again.", "error");
      setIsGoogleLoading(false);
    }
  };

  // 4. Handle Role Submission
  const handleRoleSubmit = async () => {
    if (!selectedRole) return;
    setIsUpdatingRole(true);

    try {
      const { data: session } = await authClient.getSession();
      const userId = session?.user.id;

      const result = await updateUserType(userId, selectedRole);

      showCustomToast("Account setup complete!", "success");

      setShowRoleModal(false);
      await authClient.getSession({ forceRefresh: true });
      window.location.href = "/";
    } catch (error) {
      showCustomToast("Failed to update role. Try again.", "error");
    } finally {
      setIsUpdatingRole(false);
    }
  };

  // 5. Handle Sign Out
  const handleCancelAndSignOut = async () => {
    try {
      await authClient.signOut();
      setShowRoleModal(false);
      setUserSession(null);
      showCustomToast("Signed out successfully.", "success");
    } catch (error) {
      showCustomToast("Failed to sign out.", "error");
    }
  };

  return (
    <>
      {/* --- GOOGLE BUTTON --- */}
      <button
        type="button"
        disabled={isGoogleLoading || showRoleModal}
        onClick={handleGoogleSignIn}
        className="w-full bg-white dark:bg-[#050B14] hover:bg-slate-50 dark:hover:bg-[#0a1222] text-slate-700 dark:text-slate-200 font-bold text-sm py-3.5 border border-slate-200 dark:border-slate-800 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
      >
        {isGoogleLoading ? (
          <span className="w-5 h-5 border-2 border-[#0F766E] border-t-transparent rounded-full animate-spin"></span>
        ) : (
          <FcGoogle size={20} />
        )}
        <span>{isGoogleLoading ? "Connecting..." : text}</span>
      </button>

      {/* --- ROLE SELECTION MODAL --- */}
      {showRoleModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6">
          <div className="bg-white dark:bg-[#0B1324] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-enter relative">
            <div className="p-6 sm:p-8 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Join as a Client or Lawyer?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                To complete your profile, please tell us how you plan to use
                this platform.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {/* Client Button */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("client")}
                  className={`relative p-5 sm:p-6 rounded-2xl border-2 transition-all flex flex-row sm:flex-col items-center text-left sm:text-center gap-4 group ${
                    selectedRole === "client"
                      ? "border-[#0F766E] bg-teal-50 dark:bg-teal-900/20 ring-1 ring-[#0F766E]"
                      : "border-slate-200 dark:border-slate-800 hover:border-[#0F766E]/50 hover:bg-slate-50 dark:hover:bg-[#0a1222]"
                  }`}
                >
                  {selectedRole === "client" && (
                    <FaCheckCircle className="absolute top-4 right-4 text-[#0F766E] text-lg animate-enter" />
                  )}

                  <div
                    className={`p-4 rounded-full transition-colors flex-shrink-0 ${
                      selectedRole === "client"
                        ? "bg-[#0F766E] text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-[#0F766E]/10 group-hover:text-[#0F766E]"
                    }`}
                  >
                    <FaUser size={24} className="sm:text-[28px]" />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-base sm:text-lg ${selectedRole === "client" ? "text-[#0F766E]" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      I'm a Client
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      I am looking for legal help
                    </p>
                  </div>
                </button>

                {/* Lawyer Button */}
                <button
                  type="button"
                  onClick={() => setSelectedRole("lawyer")}
                  className={`relative p-5 sm:p-6 rounded-2xl border-2 transition-all flex flex-row sm:flex-col items-center text-left sm:text-center gap-4 group ${
                    selectedRole === "lawyer"
                      ? "border-[#0F766E] bg-teal-50 dark:bg-teal-900/20 ring-1 ring-[#0F766E]"
                      : "border-slate-200 dark:border-slate-800 hover:border-[#0F766E]/50 hover:bg-slate-50 dark:hover:bg-[#0a1222]"
                  }`}
                >
                  {selectedRole === "lawyer" && (
                    <FaCheckCircle className="absolute top-4 right-4 text-[#0F766E] text-lg animate-enter" />
                  )}

                  <div
                    className={`p-4 rounded-full transition-colors flex-shrink-0 ${
                      selectedRole === "lawyer"
                        ? "bg-[#0F766E] text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-[#0F766E]/10 group-hover:text-[#0F766E]"
                    }`}
                  >
                    <FaUserTie size={24} className="sm:text-[28px]" />
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-base sm:text-lg ${selectedRole === "lawyer" ? "text-[#0F766E]" : "text-slate-700 dark:text-slate-300"}`}
                    >
                      I'm a Lawyer
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      I want to offer services
                    </p>
                  </div>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                disabled={!selectedRole || isUpdatingRole}
                onClick={handleRoleSubmit}
                className="w-full bg-[#0F766E] hover:bg-[#0d635c] text-white font-bold text-sm sm:text-base py-3.5 sm:py-4 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
              >
                {isUpdatingRole ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Complete Setup"
                )}
              </button>

              {/* Escape Hatch / Sign Out */}
              <button
                type="button"
                onClick={handleCancelAndSignOut}
                className="mt-6 text-xs sm:text-sm font-medium text-slate-400 hover:text-rose-500 transition-colors underline underline-offset-2"
              >
                Wrong account? Cancel and Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
