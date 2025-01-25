"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const session = authClient.useSession();

  if (session.data?.session) {
    redirect("/dashboard");
  }

  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await authClient.signIn.email({
        email,
        password,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in successfully");
          },
          onError: () => {
            toast.error("Invalid email or password");
          },
        },
      });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      {/* Left Side - Image */}
      <div className="hidden lg:block relative w-1/2 bg-indigo-600 dark:bg-indigo-700">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-purple-600/90 backdrop-blur-sm dark:from-indigo-700/90 dark:to-purple-700/90" />
        <img
          src="/bg3.avif"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md space-y-6 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white">Welcome Back!</h2>
            <p className="text-lg text-indigo-100 dark:text-indigo-200">
              Sign in to continue your conversations and stay connected with
              your network.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <div className="lg:hidden inline-flex p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900 mb-2">
              <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Please enter your details to sign in
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="relative">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 dark:text-indigo-400 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember me
                </span>
              </label>
              <Link
                href="#"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleSignIn}
                disabled={loading}
                className="w-full px-4 py-2.5 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  authClient.signIn.social({
                    provider: "github",
                    fetchOptions: {
                      onSuccess: () => {
                        toast.success("Signed in successfully");
                      },
                      onError: () => {
                        toast.error("Invalid email or password");
                      },
                    },
                  })
                }
                className="w-full px-4 py-2.5 bg-gray-800 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
              >
                <FaGithub className="w-5 h-5" />
                Continue with GitHub
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don&api;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
