import axiosInstance from "@/lib/axios.config";
import { User } from "better-auth/types";
import toast from "react-hot-toast";
import { create } from "zustand";
import useCheckAuth from "./checkAuth";
import { Socket } from "socket.io-client";

interface messageInterface {
  id: number;
  senderId: string;
  receiverId: string;
  messageContent?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserWithBio extends User {
  bio?: string;
}

interface useChatInterface {
  isMessageSending: boolean;
  selectedUser: UserWithBio | null;
  users: User[];
  messages: messageInterface[];
  isMessageLoading: boolean;
  isUsersLoading: boolean;
  isSelectedUserLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (receiverId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => Promise<void>;
  sendChat: (textMessage: string, image?: string) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
}

const useChatStore = create<useChatInterface>((set, get) => ({
  isMessageSending: false,
  messages: [],
  selectedUser: null,
  users: [],
  isMessageLoading: false,
  isSelectedUserLoading: false,
  isUsersLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/user/all");
      set({ users: response.data.data });
      toast.success("Users fetched successfully");
    } catch {
      toast.error("Error fetching users");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  getMessages: async (receiverId: string) => {
    set({ isMessageLoading: true });
    try {
      const response = await axiosInstance.get(`/message/${receiverId}`);
      set({ messages: response.data.data });
      console.log("messages -----------------");
      console.log(get().messages);
    } catch {
      toast.error("Error fetching messages");
    } finally {
      set({ isMessageLoading: false });
    }
  },

  setSelectedUser: async (user: User | null) => {
    set({ isSelectedUserLoading: true });
    try {
      set({ selectedUser: user });
    } catch (error: unknown) {
      toast.error(error as string);
    } finally {
      set({ isSelectedUserLoading: false });
    }
  },

  sendChat: async (textMessage, image) => {
    set({ isMessageSending: true });
    try {
      const response = await axiosInstance.post(
        `/message/send/${get().selectedUser?.id}`,
        {
          textMessage,
          image,
        }
      );
      set({ messages: [...get().messages, response.data.newMessage] });
      console.log(response.data.newMessage);
      toast.success("message sent successfully");
    } catch {
    } finally {
      set({ isMessageSending: false });
    }
  },

  subscribeToMessages: () => {
    const selectedUser = get().selectedUser;
    if (!selectedUser) return;
    const socket = useCheckAuth.getState().socket as Socket;

    socket.on("newMessage", (newMessage: messageInterface) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser.id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useCheckAuth.getState().socket as Socket;
    socket.off("newMessage");
  },
}));

export default useChatStore;
