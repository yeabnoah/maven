"use client";

import { authClient } from "@/lib/auth-client";
import useChatStore from "@/store/chat.store";
import useCheckAuth from "@/store/checkAuth";
import { LogOut, Moon, Search, Sun, User, Users } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SidebarSkeleton from "./sidebarScheleton";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const { getUsers, users, isUsersLoading, setSelectedUser, selectedUser } =
    useChatStore();
  const { onlineUsers } = useCheckAuth();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const session = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => (showOnlineOnly ? onlineUsers.includes(user.id) : true))
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleLogout = async () => {
    await authClient.signOut();
  };

  if (!isUsersLoading && users.length === 0) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full bg-white dark:bg-gray-800 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Contacts
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {onlineUsers.length - 1} online
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>

        {/* Filter */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => setShowOnlineOnly(!showOnlineOnly)}
            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              showOnlineOnly ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                showOnlineOnly ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Show online only
          </span>
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                selectedUser?.id === user.id
                  ? "bg-indigo-50 dark:bg-indigo-500/10"
                  : ""
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                {onlineUsers.includes(user.id) && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    12:00
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        {/* Profile Section */}
        <div onClick={() => router.push("/profile")} className="cursor-pointer">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {session.data?.user?.image ? (
                  <img
                    src={session.data.user.image}
                    alt={session.data.user.name || ""}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {session.data?.user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {session.data?.user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Theme Toggle and Logout Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
