"use client";

import useChatStore from "@/store/chat.store";
// import useUserStore from "@/store/user.store";
import useCheckAuth from "@/store/checkAuth";
import { Menu, Users, X } from "lucide-react";
// import { User } from "lucide-react";
import { useEffect, useState } from "react";
import ChatContainer from "../components/chatContainer";
import NoChatSelected from "../components/nochatSelected";
import Sidebar from "../components/sidebar";
import UserInfoSidebar from "../components/userInfoSidebar";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  // const { user } = useUserStore();
  const { checkAuth, connectSocket } = useCheckAuth();
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  useEffect(() => {
    checkAuth();
    connectSocket();
  }, [checkAuth]);

  // Close sidebars when selecting a new user
  useEffect(() => {
    setShowLeftSidebar(false);
    setShowRightSidebar(false);
  }, [selectedUser]);

  return (
    <div className="bg-white h-screen flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 z-50">
        <button
          onClick={() => setShowLeftSidebar(!showLeftSidebar)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {showLeftSidebar ? (
            <X size={24} color="black" />
          ) : (
            <Menu size={24} color="black" />
          )}
        </button>
        <h1 className="text-lg font-semibold text-black">Maven Chat</h1>
        {selectedUser && (
          <button
            onClick={() => setShowRightSidebar(!showRightSidebar)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {showRightSidebar ? (
              <X size={24} color="black" />
            ) : (
              <Users size={24} color="black" />
            )}
          </button>
        )}
      </div>

      <div className="flex flex-1 h-[calc(100vh-0px)] relative">
        {/* Left Sidebar - sliding on mobile */}
        <div
          className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-gray-100 z-40 transition-transform duration-300 ease-in-out transform 
            ${showLeftSidebar ? "translate-x-0" : "-translate-x-full"} f
            md:translate-x-0 md:relative md:inset-auto`}
        >
          <div className="h-full pt-16 md:pt-0">
            <Sidebar />
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 min-w-0">
          <div className="h-full pt-16 md:pt-0">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>

        {/* Right Sidebar - sliding on mobile */}
        {selectedUser && (
          <div
            className={`fixed inset-y-0 right-0 w-72 bg-white border-l border-gray-100 z-40 transition-transform duration-300 ease-in-out transform
              ${showRightSidebar ? "translate-x-0" : "translate-x-full"}
              lg:translate-x-0 lg:relative lg:inset-auto lg:w-80`}
          >
            <div className="h-full pt-16 lg:pt-0 overflow-y-auto">
              <UserInfoSidebar />
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile when sidebars are open */}
      {(showLeftSidebar || showRightSidebar) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => {
            setShowLeftSidebar(false);
            setShowRightSidebar(false);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
