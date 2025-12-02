"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

// Define schema - NO NAME FIELD
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters").max(50, "Password must be less than 50 characters"),
    rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login_Form() {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const handleLogin = async (data: LoginFormData) => {
        setIsLoading(true);
        console.log("Login data:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-md">
            {/* Login Title */}
            <div className="text-center mb-4 md:mb-14">
                <h1 className="text-3xl font-medium text-left">Login</h1>
                <p className="mt-2 text-left">Enter your Credentials to access your dashboard</p>
            </div>

            {/* Email Field */}
            <div className="mb-6">
                <label className="block  text-sm font-medium mb-2">Email address</label>
                <input type="email" {...register("email")} placeholder="Enter your email" className="w-full px-4 py-3 border border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            {/* Password Field */}
            <div className="mb-6">
                <label className="block  text-sm font-medium mb-2">Password</label>
                <input type="password" {...register("password")} placeholder="Enter your password" className="w-full px-4 py-3 border border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember Me with Forgot Password */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <input type="checkbox" id="rememberMe" {...register("rememberMe")} className="h-4 w-4 rounded border-[#D9D9D9] accent-[#412667] cursor-pointer" />
                    <label htmlFor="rememberMe" className="ml-2  text-sm">
                        Remember for 30 days
                    </label>
                </div>
                <Link href="/auth/forgot-password" className="text-[#0C2A92] text-sm font-medium hover:underline cursor-pointer">
                    forgot password?
                </Link>
            </div>

            {/* Login Button */}
            <button type="submit" disabled={isLoading} className="w-full bg-[#412667] font-bold rounded-[10px] text-white py-3 px-4  cursor-pointer hover:bg-[#412667] transition-colors disabled:opacity-50">
                {isLoading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
