// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { EyeClosed, EyeOff } from "lucide-react";

// const resetPasswordSchema = z
//     .object({
//         newPassword: z.string().min(6, "Password must be at least 6 characters").max(50, "Password must be less than 50 characters"),
//         confirmPassword: z.string(),
//     })
//     .refine((data) => data.newPassword === data.confirmPassword, {
//         message: "Passwords don't match",
//         path: ["confirmPassword"],
//     });

// type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// export default function ResetPassword_Form() {
//     const [isLoading, setIsLoading] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<ResetPasswordFormData>({
//         resolver: zodResolver(resetPasswordSchema),
//         defaultValues: {
//             newPassword: "",
//             confirmPassword: "",
//         },
//     });

//     const handleResetPassword = async (data: ResetPasswordFormData) => {
//         setIsLoading(true);
//         console.log("Reset password data:", data);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         setIsLoading(false);
//     };

//     return (
//         <form onSubmit={handleSubmit(handleResetPassword)} className="w-full max-w-md">
//             {/* Header */}
//             <div className="text-center mb-4 md:mb-14">
//                 <h1 className="text-3xl font-medium text-left">Reset Password</h1>
//                 <p className="mt-2 text-left">Please set your Strong new password</p>
//             </div>

//             {/* New Password Field */}
//             <div className="mb-6">
//                 <label className="block text-sm font-medium mb-2">New password</label>
//                 <div className="relative">
//                     <input type={showNewPassword ? "text" : "password"} {...register("newPassword")} placeholder="Enter new password" className="w-full px-4 py-3 border border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
//                     <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
//                         {showNewPassword ? <EyeOff /> : <EyeClosed />}
//                     </button>
//                 </div>
//                 {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
//             </div>

//             {/* Confirm Password Field */}
//             <div className="mb-6">
//                 <label className="block text-sm font-medium mb-2">Confirm new password</label>
//                 <div className="relative">
//                     <input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} placeholder="Re-enter new password" className="w-full px-4 py-3 border border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
//                     <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
//                         {showConfirmPassword ? <EyeOff /> : <EyeClosed />}
//                     </button>
//                 </div>
//                 {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
//             </div>

//             {/* Set Button */}
//             <button type="submit" disabled={isLoading} className="w-full bg-[#412667] font-bold rounded-[10px] text-white py-3 px-4 cursor-pointer hover:bg-[#412667] transition-colors disabled:opacity-50">
//                 {isLoading ? "Setting..." : "Set"}
//             </button>
//         </form>
//     );
// }

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EyeClosed, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters").max(50, "Password must be less than 50 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword_Form() {
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPassword] = useResetPasswordMutation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const handleResetPassword = async (data: ResetPasswordFormData) => {
        setIsLoading(true);

        const toastId = toast.loading("Resetting password...");

        try {
            const response = await resetPassword({
                body: {
                    newPassword: data.newPassword,
                    confirmPassword: data.confirmPassword,
                },
                token: token,
            }).unwrap();

            if (response.success) {
                toast.success("Password reset successfully!");
                router.push("/auth/login");
            } else {
                toast.error(response.message || "Failed to reset password");
            }
        } catch (error: any) {
            console.error("Reset password failed:", error);
            toast.error(error?.data?.message || "Failed to reset password");
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleResetPassword)} className="w-full max-w-md">
            <div className="text-center mb-4 md:mb-14">
                <h1 className="text-3xl font-medium text-left">Reset Password</h1>
                <p className="mt-2 text-left">Please set your Strong new password</p>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">New password</label>
                <div className="relative">
                    <input type={showNewPassword ? "text" : "password"} {...register("newPassword")} placeholder="Enter new password" className="w-full px-4 py-3 border border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                        {showNewPassword ? <EyeOff /> : <EyeClosed />}
                    </button>
                </div>
                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Confirm new password</label>
                <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} {...register("confirmPassword")} placeholder="Re-enter new password" className="w-full px-4 py-3 border border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                        {showConfirmPassword ? <EyeOff /> : <EyeClosed />}
                    </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-[#412667] font-bold rounded-[10px] text-white py-3 px-4 cursor-pointer hover:bg-[#412667] transition-colors disabled:opacity-50">
                {isLoading ? "Setting..." : "Set"}
            </button>
        </form>
    );
}
