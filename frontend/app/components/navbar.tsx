"use client";

import { MessageSquare } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 z-50">
      <div className="h-full px-4 flex items-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Maven</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
