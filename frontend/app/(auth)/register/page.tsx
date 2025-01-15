"use client";
import AuthImagePattern from "@/app/components/Pattern";
import signupSchema from "@/app/validation/signup.schema";
import { Eye, EyeOff, Lock, Mail, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  type FormInterface = z.infer<typeof signupSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInterface>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<FormInterface> = async (data) => {
    await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          console.log("user created successfully");
          toast.success("User created successfully");
        },
        onError: () => {
          console.log("Error occurred while creating account");
          toast.error("Error occurred while creating account");
        },
      },
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  {...register("name")}
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <label>
                  <span className="text-red-500">{errors.name.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <label>
                  <span className="text-red-500">{errors.email.message}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {errors.password && (
                <label className="label">
                  <span className="font-medium text-red-500">
                    {errors.password.message}
                  </span>
                </label>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Create Account
            </button>

            <div className="text-center">
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link href="/signin" className="link link-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};
export default Register;
