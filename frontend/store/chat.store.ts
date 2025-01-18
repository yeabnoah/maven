import axiosInstance from "@/lib/axios.config";
import { User } from "better-auth/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface messageInterface {
  id: number;
  senderId: string;
  receiverId: string;
  messageContent?: string;
  image?: string;
}

interface useChatInterface {
  selectedUser: User | null;
  users: User[];
  messages: messageInterface[];
  isMessageLoading: boolean;
  isUsersLoading: boolean;
  isSelectedUserLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (receiverId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => Promise<void>;
  sendChat: (textMessage: string) => void;
}

const useChatStore = create<useChatInterface>((set, get) => ({
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
      // const currentMessages = get().messages;
      set({ messages: response.data.data });
      // toast.success("Messages fetched successfully");
      console.log("messages -----------------");
      // console.log(response.data.data);
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

  sendChat: (textMessage) => {
    console.log({
      textMessage,
    });
  },
}));

export default useChatStore;
