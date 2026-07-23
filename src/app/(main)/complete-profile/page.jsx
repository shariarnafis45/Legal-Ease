"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Camera,
  User,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  FileText,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { updateLawyerProfile } from "@/lib/actions/user";
import { authClient } from "@/lib/auth-client";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/components/shared/customToast";

const SPECIALIZATIONS = [
  "Corporate Law",
  "Criminal Defense",
  "Family Law",
  "Intellectual Property",
  "Real Estate Law",
  "Immigration Law",
  "Employment Law",
  "Tax Law",
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

export default function CompleteProfile() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user || null;
  const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    image: user?.image || "",
    location: "",
    specializationName: "",
    experience: "",
    feeAmount: "",
    bio: "",
    status: "Available",
  });

  useEffect(() => {
    if (!isPending && user) {
      if (user.userType === "client") {
        router.push("/");
      } else if (user.completeProfile) {
        router.push(`/lawyers/${user.id}`);
      }
    }
  }, [isPending, user, router]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: tempUrl }));

    setIsUploading(true);
    const imgData = new FormData();
    imgData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: imgData,
        },
      );
      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
        showSuccessToast("success", "Profile photo uploaded!");
      }
    } catch (error) {
      showErrorToast("error", "Failed to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      showErrorToast("error", "Please upload a profile photo.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      image: formData.image,
      completeProfile: true,
      specialization: {
        name: formData.specializationName,
        slug: formData.specializationName.toLowerCase().replace(/ /g, "-"),
      },
      bio: formData.bio,
      fee: { amount: Number(formData.feeAmount), currency: "USD" },
      experience: Number(formData.experience),
      location: formData.location,
      status: formData.status,
    };

    try {
      await updateLawyerProfile(user?.id, payload);
      showSuccessToast("success", "Profile setup complete!");

      router.push(`/lawyers/${user?.id}`);
    } catch (error) {
      showErrorToast("error", "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (
    isPending ||
    (user && (user.userType === "client" || user.completeProfile))
  ) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#050B14] flex items-center justify-center">
        <Loader2
          className="animate-spin text-[#0F766E] dark:text-teal-400"
          size={40}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-[#050B14] relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-[#0F766E]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] dark:text-teal-400 font-poppins text-xs font-semibold tracking-wide uppercase">
            Account Setup
          </div>
          <h1 className="font-syne text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Craft Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] to-teal-400">
              Professional Identity
            </span>
          </h1>
          <p className="font-poppins text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Your profile is your digital handshake. Complete the details below
            to stand out and attract the right clients.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/60 dark:border-white/5 rounded-[2rem] shadow-2xl overflow-hidden"
        >
          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="p-8 md:p-12"
          >
            {/* Image Upload Section */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center mb-12"
            >
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`h-36 w-36 rounded-full overflow-hidden border-[6px] shadow-xl relative bg-slate-100 dark:bg-slate-950 transition-all ${
                    !formData.image
                      ? "border-red-400/50"
                      : "border-white dark:border-slate-800"
                  }`}
                >
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300 dark:text-slate-600">
                      <User size={56} strokeWidth={1.5} />
                    </div>
                  )}

                  <AnimatePresence>
                    {isUploading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-sm"
                      >
                        <Loader2
                          className="animate-spin text-white"
                          size={28}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <label className="absolute bottom-1 right-1 h-12 w-12 bg-gradient-to-tr from-[#0F766E] to-teal-500 hover:to-teal-400 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-teal-500/30 transition-transform active:scale-95">
                  <Camera size={20} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              {!formData.image && (
                <p className="text-red-500 text-xs mt-3 font-medium">
                  Profile photo is required
                </p>
              )}
            </motion.div>

            {/* Form Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Adv. Robert Downey"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 font-poppins text-sm focus:bg-white focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 outline-none transition-all dark:border-white/5 dark:bg-slate-950/50 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                  Location
                </label>
                <div className="relative group">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="New York, USA"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 font-poppins text-sm focus:bg-white focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 outline-none transition-all dark:border-white/5 dark:bg-slate-950/50 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                  Specialization
                </label>
                <div className="relative group">
                  <Briefcase
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors"
                    size={18}
                  />
                  <select
                    name="specializationName"
                    required
                    value={formData.specializationName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 font-poppins text-sm appearance-none focus:bg-white focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 outline-none transition-all dark:border-white/5 dark:bg-slate-950/50 dark:text-white dark:focus:bg-slate-900 cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Core Expertise
                    </option>
                    {SPECIALIZATIONS.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                  Experience (Years)
                </label>
                <div className="relative group">
                  <Clock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors"
                    size={18}
                  />
                  <input
                    type="number"
                    min="0"
                    name="experience"
                    required
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g. 10"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 font-poppins text-sm focus:bg-white focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 outline-none transition-all dark:border-white/5 dark:bg-slate-950/50 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                  Hourly Fee (USD)
                </label>
                <div className="relative group">
                  <DollarSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0F766E] transition-colors"
                    size={18}
                  />
                  <input
                    type="number"
                    min="1"
                    name="feeAmount"
                    required
                    value={formData.feeAmount}
                    onChange={handleInputChange}
                    placeholder="150"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 font-poppins text-sm focus:bg-white focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 outline-none transition-all dark:border-white/5 dark:bg-slate-950/50 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </motion.div>

              {/* ✨ Premium Animated Status Toggle ✨ */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                  Current Status
                </label>
                <div className="flex p-1.5 bg-slate-100/80 dark:bg-slate-950/80 rounded-2xl border border-slate-200/50 dark:border-white/5 relative">
                  {["Available", "Busy"].map((statusOption) => {
                    const isActive = formData.status === statusOption;
                    return (
                      <button
                        key={statusOption}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, status: statusOption })
                        }
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-poppins font-medium z-10 transition-colors duration-300 ${
                          isActive
                            ? statusOption === "Available"
                              ? "text-emerald-700 dark:text-emerald-300"
                              : "text-amber-700 dark:text-amber-300"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                        }`}
                      >
                        {statusOption === "Available" ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <XCircle size={16} />
                        )}
                        {statusOption}

                        {/* Active Indicator Background */}
                        {isActive && (
                          <motion.div
                            layoutId="status-indicator"
                            className={`absolute inset-y-1.5 w-[calc(50%-6px)] rounded-xl shadow-sm ${
                              statusOption === "Available"
                                ? "bg-white dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 left-1.5"
                                : "bg-white dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 right-1.5"
                            } -z-10`}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-2 md:col-span-2"
              >
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                  Professional Bio
                </label>
                <div className="relative group">
                  <FileText
                    className="absolute left-4 top-4 text-slate-400 group-focus-within:text-[#0F766E] transition-colors"
                    size={18}
                  />
                  <textarea
                    name="bio"
                    required
                    rows="4"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your expertise, achievements, and how you help clients... (Make it compelling!)"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 font-poppins text-sm focus:bg-white focus:border-[#0F766E] focus:ring-4 focus:ring-[#0F766E]/10 outline-none resize-none transition-all dark:border-white/5 dark:bg-slate-950/50 dark:text-white dark:focus:bg-slate-900"
                  />
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-12">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full relative overflow-hidden group flex items-center justify-center gap-2 bg-[#0F766E] text-white py-4.5 rounded-2xl font-poppins font-bold shadow-[0_10px_40px_-10px_rgba(15,118,110,0.5)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />

                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Finalizing Profile...
                  </>
                ) : (
                  "Save & Launch Profile"
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
