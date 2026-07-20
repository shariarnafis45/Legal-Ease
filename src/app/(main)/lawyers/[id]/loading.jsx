import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 lg:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-48 bg-gray-200 dark:bg-gray-800 rounded"></div>

        {/* Hero Section Skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
          <div className="flex-1 space-y-6 py-4">
            <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="flex gap-4">
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-800 rounded"></div>
            </div>
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
              <div className="h-12 w-32 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800 pb-2">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>)}
        </div>

        {/* Main Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 h-96 rounded-2xl p-8"></div>
          <div className="bg-white dark:bg-gray-900 h-80 rounded-2xl p-6"></div>
        </div>
      </div>
    </div>
  );
}