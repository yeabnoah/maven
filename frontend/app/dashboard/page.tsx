"use client";

import useChatStore from "@/store/chat.store";
import ChatContainer from "../components/chatContainer";
import NoChatSelected from "../components/nochatSelected";
import Sidebar from "../components/sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex h-full">
        {/* Mobile menu button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-base-100 shadow-lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={24} />
        </button>

        {/* Sidebar */}
        <div
          className={`fixed lg:static inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-80 bg-base-100 h-full`}
        >
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <div className="h-full max-w-6xl mx-auto">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
