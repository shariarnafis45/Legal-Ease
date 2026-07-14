"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import Logo from "@/asset/logo.png";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCircleCheck,
  FaRegCircle,
  FaGavel,
  FaCircleXmark,
  FaXmark,
} from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/app/components/auth/GoogleSignInButton";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "client",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const criteria = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[^A-Za-z0-9]/.test(formData.password),
  };

  const score = Object.values(criteria).filter(Boolean).length;

  const getStrengthUI = () => {
    if (formData.password.length === 0)
      return {
        label: "None",
        color: "text-slate-400",
        bars: 0,
        barColor: "bg-slate-200 dark:bg-slate-800",
      };
    if (score <= 2)
      return {
        label: "Weak",
        color: "text-rose-500",
        bars: 1,
        barColor: "bg-rose-500",
      };
    if (score <= 4)
      return {
        label: "Good",
        color: "text-amber-500",
        bars: 3,
        barColor: "bg-amber-500",
      };
    return {
      label: "Strong",
      color: "text-emerald-500",
      bars: 4,
      barColor: "bg-emerald-500",
    };
  };

  const strengthUI = getStrengthUI();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showErrorToast("Passwords do not match! Please check again.");
      return;
    }

    if (score < 5) {
      showErrorToast("Please meet all password strength requirements.");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        userType: formData.userType,
      });
      if (data) {
        showSuccessToast("Account created successfully! Welcome to LegalEase.");

        setTimeout(() => {
          setIsLoading(false);
          router.push("/");
        }, 1500);
      }
      if (error) {
        showErrorToast(
          error.message || "Something went wrong during registration.",
        );
        setIsLoading(false);
        return;
      }
    } catch (err) {
      showErrorToast("Network error. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden transition-colors duration-500 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-200 dark:from-[#0e172a] dark:via-[#050B14] dark:to-[#020617]">
      <Toaster position="top-center" />

      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-teal-400/20 dark:bg-teal-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten"></div>

      <div className="w-full max-w-xl px-4 py-12 z-10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full bg-white/80 dark:bg-[#0B1324]/80 backdrop-blur-2xl rounded-[28px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] p-8 sm:p-10 border border-white/50 dark:border-slate-700/50 relative"
        >
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
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Join LegalEase and connect with trusted legal professionals.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 👤 Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-[#030712]/50 border border-slate-200 dark:border-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] text-slate-800 dark:text-white transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* 📧 Email Address */}
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

            {/* 🔒 Passwords Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                    placeholder="Password"
                    className="w-full pl-11 pr-10 py-3.5 bg-slate-50/50 dark:bg-[#030712]/50 border border-slate-200 dark:border-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] text-slate-800 dark:text-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    {showPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Confirm
                </label>
                <div className="relative group">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Password"
                    className="w-full pl-11 pr-10 py-3.5 bg-slate-50/50 dark:bg-[#030712]/50 border border-slate-200 dark:border-slate-800 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 focus:border-[#0F766E] text-slate-800 dark:text-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 🛡️ Real-time Strength Tracker */}
            <div className="bg-slate-50 dark:bg-[#030712]/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span className="text-slate-500 dark:text-slate-400">
                  Security Level
                </span>
                <span
                  className={`transition-colors duration-300 ${strengthUI.color}`}
                >
                  {strengthUI.label}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 h-1.5 mb-3">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className={`h-full rounded-full transition-all duration-500 ${index <= strengthUI.bars ? strengthUI.barColor : "bg-slate-200 dark:bg-slate-800"}`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <FaCircleCheck
                    className={
                      criteria.length
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-700"
                    }
                  />{" "}
                  <span>8+ Chars</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaCircleCheck
                    className={
                      criteria.uppercase
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-700"
                    }
                  />{" "}
                  <span>Uppercase</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaCircleCheck
                    className={
                      criteria.lowercase
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-700"
                    }
                  />{" "}
                  <span>Lowercase</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FaCircleCheck
                    className={
                      criteria.number
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-700"
                    }
                  />{" "}
                  <span>Number</span>
                </div>
                <div className="flex items-center gap-1.5 col-span-2">
                  <FaCircleCheck
                    className={
                      criteria.special
                        ? "text-emerald-500"
                        : "text-slate-300 dark:text-slate-700"
                    }
                  />{" "}
                  <span>Special Char (!@#$)</span>
                </div>
              </div>
            </div>

            {/* 👥 Role Selection (Fixed Light/Dark Theme) */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                I am signing up as
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* Client Box */}
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, userType: "client" }))
                  }
                  className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 overflow-hidden group
                    ${
                      formData.userType === "client"
                        ? "border-[#0F766E] bg-teal-50 dark:bg-teal-900/20 shadow-md shadow-teal-500/10"
                        : "border-slate-100 dark:border-slate-800 bg-white dark:bg-[#050B14] hover:border-slate-300 dark:hover:border-slate-700"
                    }
                  `}
                >
                  {formData.userType === "client" && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#0F766E]/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2"></div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${formData.userType === "client" ? "bg-[#0F766E] text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`}
                    >
                      <FaUser size={14} />
                    </div>
                    {formData.userType === "client" ? (
                      <FaCircleCheck className="text-[#0F766E] text-lg" />
                    ) : (
                      <FaRegCircle className="text-slate-300 dark:text-slate-700 text-lg" />
                    )}
                  </div>
                  <p
                    className={`font-bold text-sm ${formData.userType === "client" ? "text-[#0F766E] dark:text-teal-400" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Client
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-1 leading-snug">
                    Hire lawyers & get consultations.
                  </p>
                </div>

                {/* Lawyer Box */}
                <div
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, userType: "lawyer" }))
                  }
                  className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 overflow-hidden group
                    ${
                      formData.userType === "lawyer"
                        ? "border-[#0F766E] bg-teal-50 dark:bg-teal-900/20 shadow-md shadow-teal-500/10"
                        : "border-slate-100 dark:border-slate-800 bg-white dark:bg-[#050B14] hover:border-slate-300 dark:hover:border-slate-700"
                    }
                  `}
                >
                  {formData.userType === "lawyer" && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#0F766E]/10 rounded-full blur-xl translate-x-1/2 -translate-y-1/2"></div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${formData.userType === "lawyer" ? "bg-[#0F766E] text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`}
                    >
                      <FaGavel size={16} />
                    </div>
                    {formData.userType === "lawyer" ? (
                      <FaCircleCheck className="text-[#0F766E] text-lg" />
                    ) : (
                      <FaRegCircle className="text-slate-300 dark:text-slate-700 text-lg" />
                    )}
                  </div>
                  <p
                    className={`font-bold text-sm ${formData.userType === "lawyer" ? "text-[#0F766E] dark:text-teal-400" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Lawyer
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-1 leading-snug">
                    Offer services & manage clients.
                  </p>
                </div>
              </div>
            </div>

            {/* 🚀 Actions */}
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
                    {" "}
                    <FaUser size={14} /> <span>Create Account</span>{" "}
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
              <GoogleSignInButton />
            </div>

            <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 pt-2">
              Already a member?{" "}
              <Link
                href="/auth/signin"
                className="text-[#0F766E] dark:text-teal-400 hover:underline font-bold"
              >
                Sign In
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
