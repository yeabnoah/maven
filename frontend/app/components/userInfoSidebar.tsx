"use client";

import useChatStore from "@/store/chat.store";
import useUserStore from "@/store/user.store";
import { ChevronDown, ImageIcon } from "lucide-react";
import { format } from "date-fns";

const UserInfoSidebar = () => {
  const { selectedUser, messages } = useChatStore();
  const { user } = useUserStore();

  // Extract shared images from messages and get only the file name
  const sharedImages = messages
    .filter((message) => message.image) // Filter messages with images
    .map((message) => {
      const imageUrl = message.image!;
      const fileName = imageUrl.split("/").pop(); // Extract the file name from the URL
      return fileName;
    });

  return (
    <div className="p-6 space-y-6">
      {/* General Info */}

      <div>
        <img
          className=" rounded-xl size-full image-full mx-auto"
          src={selectedUser?.image || "/user-placeholder.png"}
          alt={selectedUser?.name}
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">General Info</h3>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Email:</span>
            <span className="text-gray-900">
              {selectedUser?.email || "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Name:</span>
            <span className="text-gray-900">{selectedUser?.name || "N/A"}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Status:</span>
            <span className="text-green-500">Active User</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Member since:</span>
            <span className="text-gray-900">
              {format(new Date(user.createdAt), "MMMM d, yyyy")}
            </span>
          </div>
        </div>
      </div>

      {/* Shared Images */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Shared Images</h3>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
        <div className="space-y-3">
          {sharedImages.length > 0 ? (
            sharedImages.map((fileName, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <ImageIcon size={20} className="text-[#8B5CF6]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {fileName}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No images shared yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoSidebar;
