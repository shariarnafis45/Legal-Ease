"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  History,
  User,
  MessageSquare,
  ClipboardList,
  Scale,
  Users,
  Banknote,
  BarChart3,
} from "lucide-react";
import {
  LuLogOut,
  LuChevronRight,
  LuChevronsLeft,
  LuGlobe, // 🌟 Home Icon Added
} from "react-icons/lu";
import { FaBuildingColumns } from "react-icons/fa6";
import { useSidebar } from "@/app/context/SidebarContext";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } =
    useSidebar();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname, setIsMobileOpen]);

  const { data: session } = authClient.useSession();
  const user = session?.user || null;
  const userRole = user?.userType || "client";

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const clientSidebarLinks = [
    { name: "Dashboard", href: "/dashboard/client", icon: LayoutDashboard },
    {
      name: "Hiring History",
      href: "/dashboard/client/hiring-history",
      icon: History,
    },
    {
      name: "My Comments",
      href: "/dashboard/client/comments",
      icon: MessageSquare,
    },
    {
      name: "Update Profile",
      href: "/dashboard/client/update-profile",
      icon: User,
    },
  ];

  const lawyerSidebarLinks = [
    { name: "Dashboard", href: "/dashboard/lawyer", icon: LayoutDashboard },
    {
      name: "Hiring Requests",
      href: "/dashboard/lawyer/hiring-history",
      icon: ClipboardList,
    },
    {
      name: "Manage Services",
      href: "/dashboard/lawyer/manage-legal-profile",
      icon: Scale,
    },
  ];

  const adminSidebarLinks = [
    { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    {
      name: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: Users,
    },
    {
      name: "All Transactions",
      href: "/dashboard/admin/all-transactions",
      icon: Banknote,
    },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  ];

  const sidebarLinksByRole = {
    client: clientSidebarLinks,
    lawyer: lawyerSidebarLinks,
    admin: adminSidebarLinks,
  };

  const navItems = sidebarLinksByRole[userRole] || clientSidebarLinks;
  const baseDashboardUrl = `/dashboard/${userRole}`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen bg-white dark:bg-[#0B1324] border-r border-slate-200/80 dark:border-slate-800/60 flex flex-col transition-all duration-300 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-none
          ${isCollapsed ? "w-[80px]" : "w-[260px]"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* 1. Logo Section (Clicking this also goes to home) */}
        <div className="h-[80px] flex-shrink-0 flex items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800/60">
          <Link
            href="/"
            className="flex items-center gap-3 overflow-hidden group"
            title="Go to Homepage"
          >
            <div className="min-w-[36px] h-9 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <FaBuildingColumns size={16} />
            </div>
            {!isCollapsed && (
              <div className="whitespace-nowrap transition-opacity duration-300">
                <h1 className="font-extrabold text-xl text-slate-900 dark:text-white leading-none tracking-tight">
                  LegalEase
                </h1>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 tracking-widest uppercase">
                  Your Legal Partner
                </p>
              </div>
            )}
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors"
          >
            <LuChevronsLeft
              size={18}
              className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* 2. Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 custom-scrollbar">
          {navItems.map((item) => {
            const isRootLink = item.href === baseDashboardUrl;
            const isActive = isRootLink
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 font-medium group relative overflow-hidden ${
                  isActive
                    ? "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title={isCollapsed ? item.name : ""}
              >
                <div className="flex items-center gap-3.5 z-10">
                  <Icon
                    size={18}
                    className={`shrink-0 transition-colors ${
                      isActive
                        ? "text-teal-600 dark:text-teal-400"
                        : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="text-[14.5px] whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>

                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-600 dark:bg-teal-500 rounded-r-full" />
                )}

                {!isCollapsed && isActive && (
                  <LuChevronRight
                    size={16}
                    className="text-teal-600/50 dark:text-teal-400/50 z-10"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* 🌟 3. Bottom Actions (Home & Logout with Perfect Theme Support) */}
        <div className="flex-shrink-0 p-4 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/30 dark:bg-transparent flex flex-col gap-2.5">
          {/* Go to Home Button */}
          <Link
            href="/"
            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 shadow-sm transition-all duration-200 ${
              isCollapsed ? "justify-center" : "justify-start"
            }`}
            title={isCollapsed ? "Go to Home" : ""}
          >
            <LuGlobe
              size={18}
              className="shrink-0 text-slate-500 dark:text-slate-400"
            />
            {!isCollapsed && (
              <span className="text-[14px] whitespace-nowrap">Go to Home</span>
            )}
          </Link>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-100 dark:border-rose-500/20 hover:border-rose-200 dark:hover:border-rose-500/40 shadow-sm transition-all duration-200 ${
              isCollapsed ? "justify-center" : "justify-start"
            }`}
            title={isCollapsed ? "Sign Out" : ""}
          >
            <LuLogOut size={18} className="shrink-0" />
            {!isCollapsed && (
              <span className="text-[14px] whitespace-nowrap">Sign Out</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
