import { Search, Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full bg-white flex flex-col">
      {/* Header Skeleton */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-300" />
            </div>
            <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-14 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Search Skeleton */}
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-300" />
          </div>
          <div className="w-full h-10 bg-gray-100 rounded-lg animate-pulse" />
        </div>

        {/* Filter Skeleton */}
        <div className="mt-3 flex items-center gap-2">
          <div className="w-10 h-5 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Contact List Skeleton */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {skeletonContacts.map((_, idx) => (
            <div
              key={idx}
              className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                {idx % 3 === 0 && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-200 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="flex items-center gap-2">
                  {idx % 2 === 0 && (
                    <div className="h-4 w-4 bg-indigo-200 rounded animate-pulse" />
                  )}
                  <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
