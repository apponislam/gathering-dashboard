"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword_Form() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const handleSubmitEmail = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        console.log("Forgot password email:", data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        router.push("/auth/verify-otp");
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitEmail)} className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-4 md:mb-14">
                <h1 className="text-3xl font-medium text-left">Forgot Password</h1>
                <p className="mt-2 text-left">Secure access to system administration</p>
            </div>

            {/* Email Field */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email address</label>
                <input type="email" {...register("email")} placeholder="Enter your email" className="w-full px-4 py-3 border border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading} className="w-full bg-[#412667] font-bold rounded-[10px] text-white py-3 px-4 cursor-pointer hover:bg-[#412667] transition-colors disabled:opacity-50">
                {isLoading ? "Sending..." : "Next"}
            </button>
        </form>
    );
}
