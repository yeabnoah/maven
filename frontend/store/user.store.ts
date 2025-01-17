import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

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
  uploadImage: (image: string) => Promise<void>; // Accept Base64 string
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
      console.log(`%%%%%%%%%%%%%%%%%%%%%%%`);
      console.log(response.data.data);
      set({ user: response.data.data });
    } catch {
      toast.error("Failed to fetch user data");
    } finally {
      set({ isLoading: false });
    }
  },

  uploadImage: async (base64Image: string) => {
    set({ isLoading: true });
    try {
      const response = await axios.patch(
        "http://localhost:3000/user",
        { image: base64Image },
        { withCredentials: true }
      );
      console.log(response.data.data);
      set({ user: response.data.data });
      toast.success("Profile image updated successfully");
    } catch {
      toast.error("Failed to update profile image");
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
