"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

const otpSchema = z.object({
    otp1: z.string().length(1, "Required"),
    otp2: z.string().length(1, "Required"),
    otp3: z.string().length(1, "Required"),
    otp4: z.string().length(1, "Required"),
    otp5: z.string().length(1, "Required"),
    otp6: z.string().length(1, "Required"),
});

type OTPFormData = z.infer<typeof otpSchema>;

export default function OTPVerify_Form() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [countdown, setCountdown] = useState(30);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<OTPFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            otp5: "",
            otp6: "",
        },
    });

    const handleSubmitOTP = async (data: OTPFormData) => {
        setIsLoading(true);
        const otp = Object.values(data).join("");
        console.log("OTP submitted:", otp);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof OTPFormData, nextField?: keyof OTPFormData) => {
        const value = e.target.value;
        setValue(fieldName, value);

        if (value && nextField) {
            document.getElementById(nextField)?.focus();
        }
    };

    const handleResendCode = () => {
        setCanResend(false);
        setCountdown(30);

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        router.push("/auth/reset-password");
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitOTP)} className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-4 md:mb-14">
                <h1 className="text-3xl font-medium text-left">OTP Verify</h1>
                <p className="mt-2 text-left">Please check your email We sent there 6 digit code</p>
            </div>

            {/* OTP Fields */}
            <div className="mb-8">
                <div className="flex justify-between gap-2 mb-2">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} className="flex-1">
                            <input id={`otp${num}`} type="text" maxLength={1} {...register(`otp${num}` as keyof OTPFormData)} onChange={(e) => handleInputChange(e, `otp${num}` as keyof OTPFormData, num < 6 ? (`otp${num + 1}` as keyof OTPFormData) : undefined)} className="w-full h-14 text-center text-xl border border-[#D9D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-sm text-red-500">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div key={num} className="flex-1 text-center">
                            {errors[`otp${num}` as keyof OTPFormData] && "•"}
                        </div>
                    ))}
                </div>
            </div>

            {/* Resend Code */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">Don&apos;t receive any code?</p>
                <button type="button" onClick={handleResendCode} disabled={!canResend} className={`text-sm font-medium ${canResend ? "text-[#0C2A92] hover:underline" : "text-gray-400"}`}>
                    {canResend ? "Resend" : `Resend in ${countdown}s`}
                </button>
            </div>

            {/* Verify Button */}
            <button type="submit" disabled={isLoading} className="w-full bg-[#412667] font-bold rounded-[10px] text-white py-3 px-4 cursor-pointer hover:bg-[#412667] transition-colors disabled:opacity-50">
                {isLoading ? "Verifying..." : "Verify email"}
            </button>
        </form>
    );
}
