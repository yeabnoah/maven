"use client";

import useChatStore from "@/store/chat.store";
import useUserStore from "@/store/user.store";
import { ChevronDown, FileText, Link2, Share2 } from "lucide-react";
import { format } from "date-fns";

const UserInfoSidebar = () => {
  const { selectedUser } = useChatStore();
  const { user } = useUserStore();

  return (
    <div className="p-6 space-y-6">
      {/* General Info */}
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

      {/* Shared Files */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Shared Files</h3>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-[#8B5CF6]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                Presentation.pdf
              </p>
              <p className="text-xs text-gray-500">2.5 MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">Shared Links</h3>
          <ChevronDown size={16} className="text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Link2 size={20} className="text-[#8B5CF6]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Project Demo</p>
              <p className="text-xs text-gray-500">demo.example.com</p>
            </div>
            <Share2 size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoSidebar;
