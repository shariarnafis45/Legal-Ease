"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LuLayoutDashboard,
  LuBriefcase,
  LuUser,
  LuMessageSquare,
  LuLogOut,
  LuChevronRight,
  LuChevronsLeft,
} from "react-icons/lu";
import { FaBuildingColumns } from "react-icons/fa6";
import { useSidebar } from "@/app/context/SidebarContext";
import { authClient } from "@/lib/auth-client";

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen } =
    useSidebar();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname, setIsMobileOpen]);
  const { data: session } = authClient.useSession();
  const user = session?.user || null;

  const clientSidebarLinks = [
    {
      name: "Dashboard",
      href: "/dashboard/client",
      icon: LayoutDashboard,
    },
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
    {
      name: "Dashboard",
      href: "/dashboard/lawyer",
      icon: LayoutDashboard,
    },
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
    {
      name: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
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
    {
      name: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: BarChart3,
    },
  ];

  const sidebarLinksByRole = {
    client: clientSidebarLinks,
    lawyer: lawyerSidebarLinks,
    admin: adminSidebarLinks,
  };

  const navItems = sidebarLinksByRole[user?.userType || "client"];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen bg-white dark:bg-[#0B1324] border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 z-50
          ${isCollapsed ? "w-[80px]" : "w-[260px]"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div>
          {/* 🌟 Logo Section */}
          <div className="h-[80px] flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
            <Link href="/" className="flex items-center gap-3 overflow-hidden">
              <div className="min-w-[36px] h-9 bg-[#006F66] rounded-lg flex items-center justify-center text-white shadow-sm">
                <FaBuildingColumns size={18} />
              </div>
              {!isCollapsed && (
                <div className="whitespace-nowrap">
                  <h1 className="font-extrabold text-lg text-slate-900 dark:text-white leading-none tracking-tight">
                    LegalEase
                  </h1>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5 tracking-wide">
                    Your Legal Partner
                  </p>
                </div>
              )}
            </Link>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex p-1.5 text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg transition-colors"
            >
              <LuChevronsLeft
                size={20}
                className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/* 🌟 Navigation Links */}
          <nav className="p-4 space-y-2 mt-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 font-semibold group ${
                    isActive
                      ? "bg-[#006F66] text-white shadow-md dark:shadow-[0_4px_15px_rgba(0,111,102,0.4)]"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                  }`}
                  title={isCollapsed ? item.name : ""}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon size={20} className="shrink-0" />
                    {!isCollapsed && (
                      <span className="text-[14px] whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && isActive && (
                    <LuChevronRight
                      size={18}
                      className="text-white opacity-80"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 🌟 Logout Button */}
        <div className="p-4 mb-2">
          <button
            className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:border-rose-500/30 dark:hover:text-rose-400 transition-all duration-200 ${isCollapsed ? "justify-center px-0" : "justify-start"}`}
            title={isCollapsed ? "Logout" : ""}
          >
            <LuLogOut size={20} className="shrink-0" />
            {!isCollapsed && (
              <span className="text-[14px] whitespace-nowrap">Logout</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
