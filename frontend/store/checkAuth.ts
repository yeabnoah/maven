import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import useUserStore from "./user.store";
import { authClient } from "@/lib/auth-client";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

interface CheckAuthInterface {
  checkAuth: () => void;
  socket: null | Socket;
  onlineUsers: string[];
  connectSocket: () => Promise<void>;
  disconnectSocket: () => void;
  isCheckingAuth: boolean;
}

const useCheckAuth = create<CheckAuthInterface>((set, get) => ({
  checkAuth: () => {
    set({ isCheckingAuth: true });
    try {
      const session = authClient.useSession();

      if (session.data?.user) {
        get().connectSocket();
      }
    } catch (error) {
      console.log("Error in checkAuth:", error);
      get().disconnectSocket();
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  socket: null,
  onlineUsers: [],

  connectSocket: async () => {
    const user = useUserStore.getState().user;
    const userAnother = (await authClient.getSession()).data?.user.id;
    if (!user || get().socket?.connected) return;

    const socket = io(socketUrl, {
      query: {
        userId: userAnother,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
  isCheckingAuth: false,
}));

export default useCheckAuth;
