import React from "react";
import { Toaster } from "react-hot-toast";
import "../globals.css";

import { SidebarProvider } from "../context/SidebarContext";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Dashboard | LegalEase",
  description: "Manage your legal activities and hiring history.",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <ThemeProvider>
            <div className="flex h-screen w-full bg-[#F9FAFB] dark:bg-background overflow-hidden font-sans">
              <Toaster position="top-center" />

              {/* Sidebar Component */}
              <Sidebar />

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                <Header />

                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                  <div className="max-w-[1600px] mx-auto w-full">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </ThemeProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
