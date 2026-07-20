import LawyerCardSkeleton from "@/app/components/shared/LawyerCardSkeleton";

export default function LoadingLawyers() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="animate-pulse mb-8">
        <div className="h-10 bg-gray-200 rounded w-64 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-96"></div>
      </div>

      {/* Search & Filter Bar Skeleton */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 animate-pulse">
        <div className="h-12 bg-gray-200 rounded-xl flex-1"></div>
        <div className="h-12 w-full md:w-48 bg-gray-200 rounded-xl"></div>
      </div>

      {/* Grid of Skeleton Cards (Showing 6 dummy cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <LawyerCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}