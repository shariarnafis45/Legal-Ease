"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import Logo from "@/asset/logo.png";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCircleCheck,
  FaCircleXmark,
  FaXmark,
  FaRightToBracket,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/app/components/auth/GoogleSignInButton";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Custom Success Toast
  const showSuccessToast = (message) => {
    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white dark:bg-[#0B1324] shadow-2xl rounded-2xl pointer-events-auto flex border border-emerald-500/30 p-4 transition-all duration-300`}
        >
          <div className="flex items-start gap-3 w-full">
            <FaCircleCheck className="text-emerald-500 text-xl flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                Success
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
      ),
      { duration: 4000 },
    );
  };

  // Custom Error Toast
  const showErrorToast = (message) => {
    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"} max-w-md w-full bg-white dark:bg-[#0B1324] shadow-2xl rounded-2xl pointer-events-auto flex border border-rose-500/30 p-4 transition-all duration-300`}
        >
          <div className="flex items-start gap-3 w-full">
            <FaCircleXmark className="text-rose-500 text-xl flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                Action Failed
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
      ),
      { duration: 4000 },
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Better-Auth SignIn Logic
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        
      });

      if (data) {
        showSuccessToast("Welcome back! Redirecting to your dashboard...");

        setTimeout(() => {
          setIsLoading(false);
          router.push("/dashboard");
        }, 1500);
      }

      if (error) {
        showErrorToast(error.message || "Invalid email or password.");
        setIsLoading(false);
      }
    } catch (err) {
      showErrorToast("Network error. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden transition-colors duration-500 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-200 dark:from-[#0e172a] dark:via-[#050B14] dark:to-[#020617]">
      <Toaster position="top-center" />

      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-teal-400/20 dark:bg-teal-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten"></div>

      <div className="w-full max-w-md px-4 py-12 z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full bg-white/80 dark:bg-[#0B1324]/80 backdrop-blur-2xl rounded-[28px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] p-8 sm:p-10 border border-white/50 dark:border-slate-700/50 relative"
        >
          {/* Floating Logo Badge */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white dark:bg-black rounded-2xl flex items-center justify-center shadow-xl shadow-teal-500/20 border-[3px] border-white dark:border-[#0B1324] overflow-hidden group hover:scale-105 transition-transform duration-300">
            <Image
              src={Logo}
              alt="LegalEase Brand Logo"
              width={50}
              height={50}
            />
          </div>

          <div className="text-center mt-6 mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Sign in to continue to your LegalEase account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-[#030712]/50 border border-slate-200 dark:border-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] text-slate-800 dark:text-white transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-10 py-3.5 bg-slate-50/50 dark:bg-[#030712]/50 border border-slate-200 dark:border-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] text-slate-800 dark:text-white transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs font-semibold pt-1">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-400 cursor-pointer select-none hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-[#0F766E] focus:ring-[#0F766E]/20 accent-[#0F766E]"
                />
                <span>Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-[#0F766E] dark:text-teal-400 hover:text-[#0D635C] hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0F766E] hover:bg-[#0D635C] active:scale-[0.98] disabled:opacity-70 text-white font-bold text-sm py-4 rounded-xl transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <FaRightToBracket size={15} /> <span>Sign In</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Or
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
              </div>

             <GoogleSignInButton/>
            </div>

            <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 pt-2">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#0F766E] dark:text-teal-400 hover:underline font-bold"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}