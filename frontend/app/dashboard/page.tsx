"use client";

import useChatStore from "@/store/chat.store";
import ChatContainer from "../components/chatContainer";
import NoChatSelected from "../components/nochatSelected";
import Sidebar from "../components/sidebar";
import { MessageSquare, User } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className=" bg-base-200">
      <div className="flex">
        <div className={` fixed inset-y-0 left-0 transform translate-x-0`}>
          <Sidebar />
        </div>

        <div className="flex-1 lg:ml-72 lg:mr-80">
          <div className="h-full mx-auto">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>

        <div className="hidden lg:block mt-[6vh] fixed right-0 text-white top-0 bottom-0 w-80 bg-base-100 shadow-lg p-6 overflow-y-auto">
          {selectedUser ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedUser.image || "/user-placeholder.png"}
                  alt={selectedUser.name}
                  className="rounded-full w-16 h-16 object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {selectedUser.name}
                  </h2>
                  <p className="text-sm text-white">{selectedUser.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-gray-400" />
                  <span className="text-white">Bio</span>
                </div>
                <p className="text-sm text-white bg-base-300 p-3 rounded-lg">
                  {selectedUser.bio || "No bio available"}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare size={20} className="text-gray-400" />
                  <span className="text-white">Recent Activity</span>
                </div>
                {/* <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Last seen: 2 hours ago</li>
                  <li>• Messages: 152</li>
                  <li>• Joined: Jan 15, 2024</li>
                </ul> */}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No user selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
