"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Briefcase,
  DollarSign,
  MapPin,
  Clock,
  Sparkles,
  Camera,
  UploadCloud,
  Plus,
  Trash2,
  Edit3,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Scale,
  FileText,
  X,
  Star,
  Users,
  ArrowLeft,
  Check,
} from "lucide-react";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/components/shared/customToast";
import { updateProfile } from "@/lib/actions/user";

const SPECIALIZATIONS = [
  { name: "Intellectual Property", slug: "intellectual-property" },
  { name: "Corporate & Business Law", slug: "corporate-business-law" },
  { name: "Criminal Defense", slug: "criminal-defense" },
  { name: "Family & Divorce Law", slug: "family-divorce-law" },
  { name: "Real Estate Law", slug: "real-estate-law" },
  { name: "Cyber & Tech Law", slug: "cyber-tech-law" },
  { name: "Tax Law", slug: "tax-law" },
  { name: "Immigration Law", slug: "immigration-law" },
];

export default function ManageLegalProfileClient({ initialData }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  

  // Active Tab State (profile vs services)
  const [activeTab, setActiveTab] = useState("profile");

  // Main Lawyer Form State
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    image: initialData?.image || "",
    bio: initialData?.bio || "",
    specialization: initialData?.specialization || SPECIALIZATIONS[0],
    feeAmount: initialData?.fee?.amount || 100,
    feeCurrency: initialData?.fee?.currency || "USD",
    experience: initialData?.experience || 0,
    location: initialData?.location || "",
    status: initialData?.status || "Available",
  });

  // Services State (Table / List)
  const [services, setServices] = useState([
    {
      id: "srv-1",
      title: "Patent Application & Filing",
      category: "Intellectual Property",
      price: 350,
      duration: "3-5 Days",
      description: "Full preparation and submission of patent documents.",
    },
    {
      id: "srv-2",
      title: "Trademark Registration Consultation",
      category: "Intellectual Property",
      price: 200,
      duration: "1-2 Days",
      description: "Comprehensive search and filing guidance for trademarks.",
    },
  ]);

  // Modal State for Legal Service Add/Edit
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    category: formData.specialization.name,
    price: "",
    duration: "1-3 Days",
    description: "",
  });

  // Loading States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Specialization Change
  const handleSpecializationChange = (e) => {
    const selected = SPECIALIZATIONS.find((s) => s.slug === e.target.value);
    if (selected) {
      setFormData((prev) => ({ ...prev, specialization: selected }));
    }
  };

  // 🌟 ImgBB Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showErrorToast("Image size must be less than 5MB!");
      return;
    }

    setIsUploadingImage(true);
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      const imgbbAPIKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!imgbbAPIKey) {
        showErrorToast("ImgBB API key is missing in environment variables.");
        setIsUploadingImage(false);
        return;
      }

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
        showSuccessToast("Profile image uploaded successfully!");
      } else {
        showErrorToast("Failed to upload image to ImgBB.");
      }
    } catch (error) {
      showErrorToast("An error occurred during image upload.");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Save Legal Profile
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showErrorToast("Name cannot be empty!");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateProfile(initialData?.id, formData);
      await new Promise((resolve) => setTimeout(resolve, 1200));

      showSuccessToast("Legal profile updated successfully!");
      router.refresh();
    } catch (error) {
      showErrorToast("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🌟 Service CRUD Actions
  const handleOpenServiceModal = (service = null) => {
    if (service) {
      setEditingServiceId(service.id);
      setServiceForm({
        title: service.title,
        category: service.category,
        price: service.price,
        duration: service.duration,
        description: service.description,
      });
    } else {
      setEditingServiceId(null);
      setServiceForm({
        title: "",
        category: formData.specialization.name,
        price: "",
        duration: "1-3 Days",
        description: "",
      });
    }
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();

    if (!serviceForm.title.trim() || !serviceForm.price) {
      showErrorToast("Service title and price are required!");
      return;
    }

    if (editingServiceId) {
      // Update
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingServiceId
            ? { ...s, ...serviceForm, price: Number(serviceForm.price) }
            : s,
        ),
      );
      showSuccessToast("Service updated successfully!");
    } else {
      // Create
      const newService = {
        id: `srv-${Date.now()}`,
        ...serviceForm,
        price: Number(serviceForm.price),
      };
      setServices((prev) => [...prev, newService]);
      showSuccessToast("New service added successfully!");
    }

    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showSuccessToast("Service deleted successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 🌟 Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/lawyer"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              Legal Profile Management{" "}
              <Scale className="text-teal-600 dark:text-teal-400" size={26} />
            </h1>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
            Manage your legal specializations, consultation fees, and services
            offered.
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            {initialData?.rating || 4.6} ({initialData?.totalReviews || 0})
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 text-xs font-bold">
            <Users size={14} />
            {initialData?.totalHires || 0} Hires
          </div>
        </div>
      </div>

      {/* 🌟 Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3.5 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === "profile"
              ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <User size={18} /> Profile Overview & Info
        </button>
        <button
          onClick={() => setActiveTab("services")}
          className={`pb-3.5 text-sm font-bold flex items-center gap-2 transition-all relative ${
            activeTab === "services"
              ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Briefcase size={18} /> Manage Legal Services ({services.length})
        </button>
      </div>

      {/* 🌟 TAB 1: PROFILE OVERVIEW & FORM */}
      {activeTab === "profile" && (
        <form onSubmit={handleProfileSubmit} className="space-y-8">
          {/* Top Info Banner Card */}
          <div className="bg-white dark:bg-[#0B1324] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Image Upload Area */}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />

              <div
                className="relative group shrink-0 cursor-pointer"
                onClick={() =>
                  !isUploadingImage && fileInputRef.current?.click()
                }
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center transition-all group-hover:border-teal-500/50">
                  {formData.image && !previewError ? (
                    <Image
                      src={formData.image}
                      alt={formData.name || "Lawyer Avatar"}
                      fill
                      className={`object-cover transition-opacity ${
                        isUploadingImage ? "opacity-30" : "opacity-100"
                      }`}
                      onError={() => setPreviewError(true)}
                      unoptimized
                    />
                  ) : (
                    <User size={48} className="text-slate-400" />
                  )}

                  {isUploadingImage && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}

                  {!isUploadingImage && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <UploadCloud size={24} className="text-white mb-1" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                        Upload
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-1 right-1 p-2 bg-teal-600 text-white rounded-full shadow-md border-2 border-white dark:border-slate-800">
                  <Camera size={14} />
                </div>
              </div>

              {/* General Lawyer Details */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {formData.name || "Lawyer Name"}
                  </h2>
                  {initialData?.verified && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 size={13} /> Verified
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-semibold text-teal-600 dark:text-teal-400 flex items-center justify-center md:justify-start gap-1">
                  <Briefcase size={14} /> {formData.specialization.name}{" "}
                  Specialist
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
                  {formData.bio ||
                    "No biography provided yet. Add your professional summary below."}
                </p>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="bg-white dark:bg-[#0B1324] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
              <FileText
                className="text-teal-600 dark:text-teal-400"
                size={18}
              />{" "}
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <User size={14} /> Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  required
                />
              </div>

              {/* Email (Read-Only) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail size={14} /> Email Address (Immutable)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm font-medium cursor-not-allowed"
                />
              </div>

              {/* Specialization */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase size={14} /> Primary Specialization
                </label>
                <select
                  value={formData.specialization.slug}
                  onChange={handleSpecializationChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                >
                  {SPECIALIZATIONS.map((spec) => (
                    <option
                      key={spec.slug}
                      value={spec.slug}
                      className="dark:bg-slate-900"
                    >
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Status */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={14} /> Availability Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                >
                  <option value="Available" className="dark:bg-slate-900">
                    Available for Hire
                  </option>
                  <option value="Busy" className="dark:bg-slate-900">
                    Busy (Limited Cases)
                  </option>
                  <option value="On Leave" className="dark:bg-slate-900">
                    On Leave
                  </option>
                </select>
              </div>

              {/* Hourly Fee & Currency */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign size={14} /> Consultation Rate (Per Hour)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="feeAmount"
                    value={formData.feeAmount}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  />
                  <select
                    name="feeCurrency"
                    value={formData.feeCurrency}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="BDT">BDT (৳)</option>
                  </select>
                </div>
              </div>

              {/* Experience & Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    Experience (Yrs)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={14} /> Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  />
                </div>
              </div>
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Professional Bio & Summary
              </label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                placeholder="Write a brief professional summary about your legal practice..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || isUploadingImage}
                className="px-8 py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Saving
                    Changes...
                  </>
                ) : (
                  <>
                    <Check size={18} /> Save Profile Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* 🌟 TAB 2: MANAGE LEGAL SERVICES (TABLE & LIST) */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0B1324] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Offered Legal Services
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                These legal services will be displayed directly on your public
                details page.
              </p>
            </div>

            <button
              onClick={() => handleOpenServiceModal()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all self-start sm:self-auto"
            >
              <Plus size={16} /> Add New Service
            </button>
          </div>

          {/* Services Table Card */}
          <div className="bg-white dark:bg-[#0B1324] border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm overflow-hidden">
            {services.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Briefcase
                  size={40}
                  className="mx-auto text-slate-300 dark:text-slate-600"
                />
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">
                  No Legal Services Added Yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the button above to add custom legal services and
                  packages to your profile.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <th className="p-4 sm:p-5">Service Details</th>
                      <th className="p-4 sm:p-5">Category</th>
                      <th className="p-4 sm:p-5">Est. Time</th>
                      <th className="p-4 sm:p-5">Starting Price</th>
                      <th className="p-4 sm:p-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm font-medium">
                    {services.map((service) => (
                      <tr
                        key={service.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="p-4 sm:p-5 max-w-xs">
                          <p className="font-bold text-slate-900 dark:text-white">
                            {service.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                            {service.description}
                          </p>
                        </td>

                        <td className="p-4 sm:p-5">
                          <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {service.category}
                          </span>
                        </td>

                        <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-400 text-xs">
                          {service.duration}
                        </td>

                        <td className="p-4 sm:p-5 font-bold text-teal-600 dark:text-teal-400">
                          ${service.price}
                        </td>

                        <td className="p-4 sm:p-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenServiceModal(service)}
                              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              title="Edit Service"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteService(service.id)}
                              className="p-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                              title="Delete Service"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 🌟 ADD / EDIT SERVICE MODAL */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#0B1324] border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {editingServiceId
                  ? "Edit Legal Service"
                  : "Add New Legal Service"}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Service Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Trademark Registration Filing"
                  value={serviceForm.title}
                  onChange={(e) =>
                    setServiceForm({ ...serviceForm, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Starting Price ($)
                  </label>
                  <input
                    type="number"
                    placeholder="250"
                    value={serviceForm.price}
                    onChange={(e) =>
                      setServiceForm({ ...serviceForm, price: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Est. Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2-4 Business Days"
                    value={serviceForm.duration}
                    onChange={(e) =>
                      setServiceForm({
                        ...serviceForm,
                        duration: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Service Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide details about what is included in this service..."
                  value={serviceForm.description}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition-all shadow-md"
                >
                  {editingServiceId ? "Update Service" : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
