"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    // Your sign in logic here
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center rounded-md bg-white text-black backdrop-blur-2xl bg-white/8 ">
      <Image
        src="/bg3.avif"
        className="absolute inset-0 w-full h-full object-cover p-2 rounded-xl"
        alt="computer"
        layout="fill"
        priority
      />

      <div className=" relative flex justify-between items-center backdrop-blur-3xl w-[99vw] mx-auto my-auto h-[98vh] p-10 rounded-md">
        <div className="space-y-8 flex justify-center items-center min-h-[98vh] bg-white ">
          <div className="space-y-6 p-8 w-[30vw] bg-white rounded-none ">
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
                  className="w-full py-3 border border-gray-300 rounded-none text-gray-700 focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
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
                    className="w-full py-3 border border-gray-300 rounded-none text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 rounded-none -translate-y-1/2 text-gray-500 hover:text-indigo-600"
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
              className="w-full py-3 rounded-none text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
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
              className="w-full py-3 rounded-none bg-white  border-gray-300 text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-300"
              onClick={() => {}}
            >
              <FaGoogle />
              Log in with Google
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

        <div className=" text-center">
          <div className="space-y-2 text-center">
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
  );
}
