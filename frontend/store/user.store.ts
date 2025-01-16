import { create } from "zustand";
import axios from "axios";

interface UserInterface {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

type useUserInterface = {
  user: UserInterface;
  fetchUserData: () => Promise<void>;
  resetUserData: () => void;
  isLoading: boolean;
};

const useUserStore = create<useUserInterface>((set) => ({
  user: {
    id: "",
    name: "",
    emailVerified: false,
    email: "",
    image: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  isLoading: false,
  fetchUserData: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get("http://localhost:3000/user", {
        withCredentials: true,
      });
      set(() => ({
        user: response.data,
      }));
    } catch {
      console.log("error");
    } finally {
      set({ isLoading: false });
    }
  },

  resetUserData: () => {
    set({
      user: {
        id: "",
        name: "",
        emailVerified: false,
        email: "",
        image: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  },
}));

export default useUserStore;
