// app/lawyers/page.js
import React from "react";
import LawyersClientWrapper from "./LawyersClientWrapper";
import { getCompleteLawyers } from "@/lib/api/lawyers";

export const metadata = {
  title: "Browse Lawyers | LegalEase",
  description:
    "Explore verified legal experts and find the right lawyer for your needs.",
};

export default async function LawyersPage() {
  const lawyersData = await getCompleteLawyers();
  console.log(lawyersData);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
      <LawyersClientWrapper initialLawyers={lawyersData} />
    </main>
  );
}
