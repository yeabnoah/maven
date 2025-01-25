const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-3 ${idx % 2 === 0 ? "" : "flex-row-reverse"
            }`}
        >
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          </div>

          <div className={`flex flex-col ${idx % 2 === 0 ? "" : "items-end"} max-w-[70%]`}>
            {/* Name and time */}
            <div className={`flex items-center gap-2 mb-1 ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Message bubble */}
            <div
              className={`rounded-2xl p-4 ${idx % 2 === 0
                ? "bg-gray-100 rounded-tl-none"
                : "bg-indigo-50 rounded-tr-none"
                }`}
            >
              <div className="space-y-2">
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                {idx % 3 === 0 && (
                  <div className="h-32 w-48 mt-2 bg-gray-200 rounded-lg animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
