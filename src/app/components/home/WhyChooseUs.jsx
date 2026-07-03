import React from "react";
import FeatureCard from "../shared/FeatureCard";


export default function WhyChooseUs() {
  const featuresData = [
    {
      title: "Verified Lawyers",
      description: "All lawyers are verified and experienced professionals.",
      iconName: "verified",
    },
    {
      title: "Secure Consultations",
      description: "Your privacy and case details are 100% protected.",
      iconName: "secure",
    },
    {
      title: "Transparent Pricing",
      description: "Clear and upfront pricing with no hidden charges.",
      iconName: "pricing",
    },
    {
      title: "Fast Response",
      description: "Get quick replies and book appointments easily.",
      iconName: "fast",
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto bg-slate-50/60 dark:bg-[#090f1c]/40 border-y border-slate-100 dark:border-slate-900/40 transition-colors duration-300">
      
      <div className="flex flex-col items-center justify-center text-center mb-12">
        <h2 className="font-syne text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Why Choose LegalEase
        </h2>
        <div className="h-0.5 w-12 bg-[#0F766E] dark:bg-teal-500 rounded-full mt-3 opacity-80" />
      </div>

      {/* Grid Rendering */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {featuresData.map((feature, index) => (
          <FeatureCard
            key={index} 
            feature={feature} 
            index={index} 
          />
        ))}
      </div>

    </section>
  );
}