"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FaCircleXmark, FaXmark } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";


export default function GoogleSignInButton({
  text = "Continue with Google",
  callbackURL = "/",
}) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const showErrorToast = (message) => {
    toast.custom((t) => (
      <div
        className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white dark:bg-[#0B1324] shadow-2xl rounded-2xl pointer-events-auto flex border border-rose-500/30 p-4 transition-all duration-300`}
      >
        <div className="flex items-start gap-3 w-full">
          <FaCircleXmark className="text-rose-500 text-xl flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-slate-800 dark:text-white">
              Google Sign-In Failed
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

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackURL,
      });

      if (error) {
        showErrorToast(
          error.message || "Something went wrong with Google Sign-In.",
        );
        setIsGoogleLoading(false);
      }
    } catch (err) {
      showErrorToast("Network error. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={isGoogleLoading}
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
  );
}
