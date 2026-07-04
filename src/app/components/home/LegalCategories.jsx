import React from "react";
import CategoryCard from "./CategoryCard";


export default function LegalCategories() {
 
  const categoriesData = [
    {
      name: "Criminal Law",
      slug: "criminal-law",
      iconName: "criminal",
    },
    {
      name: "Corporate Law",
      slug: "corporate-law",
      iconName: "corporate",
    },
    {
      name: "Family Law",
      slug: "family-law",
      iconName: "family",
    },
    {
      name: "Immigration Law",
      slug: "immigration-law",
      iconName: "immigration",
    },
    {
      name: "Real Estate Law",
      slug: "real-estate-law",
      iconName: "realestate",
    },
    {
      name: "Employment Law",
      slug: "employment-law",
      iconName: "employment",
    }
  ];

  return (
    
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto bg-slate-50/60 dark:bg-[#090f1c]/40 border-y border-slate-100 dark:border-slate-900/40 transition-colors duration-300">
      
      {/* Centered Headers Layout */}
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <h2 className="font-syne text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Legal Categories
        </h2>
        <p className="font-poppins text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-1.5 font-medium">
          Explore lawyers by your legal needs
        </p>
      </div>

      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5">
        {categoriesData.map((category, index) => (
          <CategoryCard
            key={index} 
            category={category} 
            index={index} 
          />
        ))}
      </div>

    </section>
  );
}