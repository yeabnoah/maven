import { ChevronDown, FileText, Link2 } from "lucide-react";

const UserInfoSidebarSkeleton = () => {
    return (
        <div className="h-full bg-white p-6 space-y-8">
            {/* User Info Skeleton */}
            <div className="text-center space-y-4">
                <div className="relative mx-auto">
                    <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse mx-auto" />
                    <div className="absolute bottom-0 right-4 w-5 h-5 bg-emerald-200 rounded-full ring-4 ring-white animate-pulse" />
                </div>
                <div className="space-y-2">
                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mx-auto" />
                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto" />
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="text-center space-y-1">
                        <div className="h-6 w-12 bg-gray-200 rounded animate-pulse mx-auto" />
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mx-auto" />
                    </div>
                ))}
            </div>

            {/* Shared Files Skeleton */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                    <ChevronDown className="w-4 h-4 text-gray-300" />
                </div>
                <div className="space-y-3">
                    {[...Array(2)].map((_, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-indigo-300" />
                            </div>
                            <div className="flex-1">
                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Shared Links Skeleton */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                    <ChevronDown className="w-4 h-4 text-gray-300" />
                </div>
                <div className="space-y-3">
                    {[...Array(2)].map((_, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                                <Link2 className="w-5 h-5 text-indigo-300" />
                            </div>
                            <div className="flex-1">
                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserInfoSidebarSkeleton; 