"use client";

import useChatStore from "@/store/chat.store";
import ChatContainer from "../components/chatContainer";
import NoChatSelected from "../components/nochatSelected";
import Sidebar from "../components/sidebar";

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

        <div className=" hidden lg:block fixed right-0 mt-[6vh] p-5 inset-y-0  transform translate-x-0 w-80 bg-base-300 h-screen">
          <img
            src={selectedUser?.image || "/user-placeholder.png"}
            className=" rounded-full size-32 mx-auto mt-10"
          />

          <div className=" h-52 py-14 px-3 mx-auto bg-base-100 -mt-10 rounded-md">
            <h1 className=" text-center text-xl font-semibold text-white">
              {selectedUser?.name}
            </h1>
            <h1 className=" text-center text-xl font-semibold text-white">
              {selectedUser?.email}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
