"use client";

import useChatStore from "@/store/chat.store";
// import useUserStore from "@/store/user.store";
import useCheckAuth from "@/store/checkAuth";
// import { User } from "lucide-react";
import { useEffect } from "react";
import ChatContainer from "../components/chatContainer";
import NoChatSelected from "../components/nochatSelected";
import Sidebar from "../components/sidebar";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  // const { user } = useUserStore();
  const { checkAuth, connectSocket } = useCheckAuth();

  useEffect(() => {
    checkAuth();
    connectSocket();
  }, [checkAuth]);

  return (
    <div className="bg-white">
      <div className="flex">
        <div className={`fixed inset-y-0 left-0 transform translate-x-0`}>
          <Sidebar />
        </div>
        <div className="flex-1 lg:ml-72 lg:mr-80">
          {/* <Navbar /> */}
          <div className="h-full mx-auto">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
