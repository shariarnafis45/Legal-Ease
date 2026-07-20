
export default function LawyerCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full animate-pulse">
      <div className="flex items-start gap-4">
        {/* Profile Image Skeleton */}
        <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0"></div>
        
        {/* Name and Title Skeleton */}
        <div className="flex-1 space-y-3 py-1">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>

      {/* Specializations Tags Skeleton */}
      <div className="mt-5 flex gap-2 flex-wrap">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      </div>

      {/* Stats/Info Skeleton */}
      <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-50">
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="space-y-2 text-right">
          <div className="h-3 bg-gray-200 rounded w-12 ml-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-6 h-10 w-full bg-gray-200 rounded-xl"></div>
    </div>
  );
}