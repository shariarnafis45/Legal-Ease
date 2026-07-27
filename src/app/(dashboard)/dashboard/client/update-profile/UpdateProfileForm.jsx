"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  ShieldCheck,
  ArrowLeft,
  Loader2,
  Sparkles,
  Camera,
  CheckCircle2,
  UploadCloud,
} from "lucide-react";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/components/shared/customToast";
import { updateProfile } from "@/lib/actions/user";
import { useRouter } from "next/navigation";

export default function UpdateProfileForm({ initialUser }) {
  const [formData, setFormData] = useState({
    name: initialUser?.name || "",
    image: initialUser?.image || "",
  });

  const [loading, setLoading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const router = useRouter();

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showErrorToast("Image size must be less than 5MB");
      return;
    }

    setIsUploadingImage(true);
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      const imgbbAPIKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        {
          method: "POST",
          body: imageFormData,
        },
      );

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.data.url }));
        setPreviewError(false);
        showSuccessToast("Profile photo uploaded successfully!");
      } else {
        showErrorToast("Failed to upload image to ImgBB.");
      }
    } catch (error) {
      showErrorToast("An error occurred while uploading the image.");
    } finally {
      setIsUploadingImage(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showErrorToast("Full name cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      await updateProfile(initialUser?.id, formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showSuccessToast("Your profile has been updated successfully!");
      router.refresh();
    } catch (error) {
      showErrorToast(
        error?.message || "Failed to update profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 🌟 Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard/client"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-[#0B1324] border border-slate-200/80 dark:border-slate-800/60 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-100 dark:border-teal-500/20">
          <Sparkles size={14} /> Profile Settings
        </span>
      </div>

      {/* 🌟 Main Card Container */}
      <div className="bg-white dark:bg-[#0B1324] border border-slate-100 dark:border-slate-800/60 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="mb-8 pb-6 border-b border-slate-100 dark:border-slate-800/60">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Edit Profile
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Update your personal details and public profile picture.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 🌟 Profile Picture Upload Section (ImgBB) */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/40 rounded-2xl">
            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />

            {/* Avatar Circle (Clickable) */}
            <div
              className="relative group shrink-0 cursor-pointer"
              onClick={() => !isUploadingImage && fileInputRef.current?.click()}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-md bg-slate-200 dark:bg-slate-700 relative flex items-center justify-center transition-all group-hover:border-teal-500/50">
                {/* Image or Placeholder */}
                {formData.image && !previewError ? (
                  <Image
                    src={formData.image}
                    alt={formData.name || "User Avatar"}
                    fill
                    className={`object-cover transition-opacity duration-300 ${isUploadingImage ? "opacity-40" : "opacity-100"}`}
                    onError={() => setPreviewError(true)}
                    unoptimized
                  />
                ) : (
                  <User
                    size={40}
                    className="text-slate-400 dark:text-slate-500"
                  />
                )}

                {/* Uploading Overlay */}
                {isUploadingImage && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}

                {/* Hover Overlay */}
                {!isUploadingImage && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <UploadCloud size={24} className="text-white mb-1" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      Upload
                    </span>
                  </div>
                )}
              </div>

              {/* Floating Camera Badge */}
              <div className="absolute bottom-0 right-0 p-2 bg-teal-600 text-white rounded-full shadow-lg border-2 border-white dark:border-slate-800 transform group-hover:scale-110 transition-transform">
                <Camera size={14} />
              </div>
            </div>

            {/* Avatar Info */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                Profile Avatar
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                Click the avatar to upload a new photo. We recommend using a
                square image (e.g., 500x500px). Maximum file size is 5MB.
              </p>
              <button
                type="button"
                onClick={() =>
                  !isUploadingImage && fileInputRef.current?.click()
                }
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline mt-1 inline-block"
              >
                Choose new image
              </button>
            </div>
          </div>

          {/* 🌟 Form Fields Grid */}
          <div className="grid grid-cols-1 gap-6">
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User size={16} className="text-teal-600 dark:text-teal-400" />{" "}
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-600 transition-all placeholder:text-slate-400"
                required
              />
            </div>

            {/* Email Field (Read-Only) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail size={16} className="text-slate-400" /> Email Address
                </label>
                {initialUser?.emailVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={13} /> Verified
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={initialUser?.email || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium text-sm cursor-not-allowed select-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                  Read Only
                </span>
              </div>
            </div>

            {/* Account Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Account Type
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize mt-0.5">
                    {initialUser?.userType || "Client"}
                  </p>
                </div>
                <ShieldCheck
                  className="text-teal-600 dark:text-teal-400"
                  size={22}
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Profile Status
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {initialUser?.completeProfile ? "Complete" : "Incomplete"}
                  </p>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${initialUser?.completeProfile ? "bg-emerald-500" : "bg-amber-500"}`}
                />
              </div>
            </div>
          </div>

          {/* 🌟 Submit Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex justify-end">
            <button
              type="submit"
              disabled={loading || isUploadingImage}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
