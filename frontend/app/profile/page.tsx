"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import useUserStore from "@/store/user.store";
import axios from "axios";
import { ArrowLeft, Camera, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const session = authClient.useSession();
  const { fetchUserData, user, isLoading } = useUserStore();
  const [isUploading, setIsUploading] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState(session?.data?.user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [imagePreview, setImagePreview] = useState(
    session?.data?.user?.image || ""
  );

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "");
      setImagePreview(user.image || "");
    }
  }, [user]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setIsUploading(true);
    try {
      const base64Image = await toBase64(file);
      setImagePreview(base64Image); // Set image preview immediately

      const response = await axios.patch(
        "http://localhost:3000/user",
        {
          image: base64Image,
          bio: bio,
          name: name,
        },
        {
          withCredentials: true,
        }
      );

      if (!response.data) {
        throw new Error("Failed to update avatar");
      }

      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error("Failed to update profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  // Convert image to base64
  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Sending data:", { name, bio }); // Log the data being sent

      const response = await axios.patch(
        "http://localhost:3000/user",
        {
          name,
          bio,
        },
        {
          withCredentials: true,
        }
      );

      if (!response.data) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully");
      fetchUserData(); // Refresh user data after successful update
    } catch (error) {
      console.error("Error updating profile:", error); // Log the error
      toast.error("Failed to update profile");
    }
  };

  if (!mounted || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
          <div className="p-8 border-b border-gray-100 dark:border-gray-700">
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
              className=" bg-indigo-500"
            >
              <ArrowLeft className=" size-14" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Profile Settings
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your profile and preferences
            </p>
          </div>
          <div className="p-8 space-y-10">
            {/* Profile Picture Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profile Picture
              </h2>
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {imagePreview ? (
                      <img
                        src={imagePreview || "/user-placeholder.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-14 h-14 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-2 right-2 p-2 bg-indigo-500 rounded-xl text-white cursor-pointer hover:bg-indigo-600 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={isUploading}
                    />
                    <Camera className="w-4 h-4" />
                  </label>
                </div>
              </div>
            </div>

            {/* Profile Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                  placeholder="Enter your name"
                />
              </div>

              {/* <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out"
                  placeholder="Tell us about yourself"
                  rows={4}
                />
              </div> */}

              <button
                type="submit"
                className="w-full px-4 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors transition-all duration-200 ease-in-out"
              >
                Save Changes
              </button>
            </form>

            {/* Appearance Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Appearance
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                    theme === "light"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                  } transition-all duration-200 ease-in-out`}
                >
                  <Sun className="w-5 h-5" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-colors ${
                    theme === "dark"
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                  } transition-all duration-200 ease-in-out`}
                >
                  <Moon className="w-5 h-5" />
                  <span>Dark</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
