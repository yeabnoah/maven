"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation/";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  const session = authClient.useSession();

  if (session.data?.session) {
    redirect("/dashboard");
  }

  const handleSignIn = async () => {
    setLoading(true);

    await authClient.signIn.email({
      email,
      password,
      // callbackURL: "/dashboard",
      fetchOptions: {
        onSuccess: () => {
          console.log("LoggedIn successfully");
          toast.success("LoggedIn successfully");
        },
        onError: () => {
          console.log("Error occurred while logging in");
          toast.error("Error occurred while logging in");
        },
      },
    });

    setLoading(false);
  };

  return (
    <div className="min-h-screen px-3 w-screen flex items-center gap-3 rounded-md bg-white text-black backdrop-blur-2xl bg-white/8">
      <Navbar />
      <div className=" hidden lg:flex w-[70vw] min-h-screen items-center justify-center rounded-md bg-white text-black backdrop-blur-2xl bg-white/8 ">
        <Image
          src="/bg3.avif"
          className="absolute inset-0 w-full h-full object-cover p-2 rounded-xl"
          alt="computer"
          layout="fill"
          priority
        />

        <div className=" relative flex justify-center items-center backdrop-blur-3xl w-full h-[98vh] p-10 rounded-md">
          <div className=" text-left">
            <div className="space-y-2 text-left">
              <h1 className="text-5xl font-bold text-white tracking-tight text-center">
                Welcome!
              </h1>
              <p className="text-xl text-white">
                Log in to Maven to continue to the Chat.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-8 flex-1 bg-white  flex justify-center items-center min-h-screen">
        <div className="space-y-6 p-8 w-96 rounded-md bg-white border-[0.8px] border-black/5 ">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-sm text-gray-700 font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-5 rounded-md border border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="password"
                className="text-sm text-gray-700 font-medium"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-5 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button
            className="w-full py-5 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Log in"}
          </Button>

          <div className="flex items-center justify-center">
            <span className="w-full border-t border-gray-300"></span>
            <span className="absolute px-2 text-gray-400 bg-white text-xs uppercase">
              Or
            </span>
          </div>

          <Button
            className="w-full py-5 rounded-md bg-white border border-gray-300 text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300"
            onClick={async () => {
              await authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard",
              });
            }}
          >
            <FaGoogle />
            Log in with GitHub
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
