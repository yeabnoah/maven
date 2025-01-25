"use client";
import { authClient } from "@/lib/auth-client";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
  const router = useRouter();
  const session = authClient.useSession();
  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("successfully logged out.");
          router.push("/signin");
        },
        onError: () => {
          toast.error("error occurred while logging out.");
        },
      },
    });
  };

  return (
    <header className="fixed w-full top-0 z-40">
      <div className=" h-16 w-[98vw]">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              
              <h1 className="text-lg font-bold px-5 text-indigo-500 lg:text-white">Maven</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={"/settings"}
              className={`
              btn btn-sm gap-2 bg-indigo-500 text-white border border-indigo-500 hover:bg-indigo-400 hover:text-white hover:border-indigo-500 transition-colors
              
              `}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {session.data?.session && (
              <>
                <Link href={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
