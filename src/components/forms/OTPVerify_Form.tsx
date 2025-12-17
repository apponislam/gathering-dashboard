// "use client";

// import React, { useState, useRef } from "react";
// import { useForm, useWatch } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useRouter } from "next/navigation";

// const otpSchema = z.object({
//     otp1: z.string().length(1, "Required"),
//     otp2: z.string().length(1, "Required"),
//     otp3: z.string().length(1, "Required"),
//     otp4: z.string().length(1, "Required"),
//     otp5: z.string().length(1, "Required"),
//     otp6: z.string().length(1, "Required"),
// });

// type OTPFormData = z.infer<typeof otpSchema>;

// export default function OTPVerify_Form() {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);
//     const [canResend, setCanResend] = useState(false);
//     const [countdown, setCountdown] = useState(30);

//     const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//         setValue,
//     } = useForm<OTPFormData>({
//         resolver: zodResolver(otpSchema),
//         defaultValues: {
//             otp1: "",
//             otp2: "",
//             otp3: "",
//             otp4: "",
//             otp5: "",
//             otp6: "",
//         },
//     });

//     // Use useWatch instead of watch
//     const otpValues = useWatch({
//         control,
//         defaultValue: {
//             otp1: "",
//             otp2: "",
//             otp3: "",
//             otp4: "",
//             otp5: "",
//             otp6: "",
//         },
//     });

//     const handleSubmitOTP = async (data: OTPFormData) => {
//         setIsLoading(true);
//         const otp = Object.values(data).join("");
//         console.log("OTP submitted:", otp);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         setIsLoading(false);
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//         const value = e.target.value;
//         const fieldName = `otp${index + 1}` as keyof OTPFormData;

//         // If user pastes 6 digits
//         if (value.length === 6 && /^\d+$/.test(value)) {
//             const digits = value.split("");
//             digits.forEach((digit, i) => {
//                 const digitFieldName = `otp${i + 1}` as keyof OTPFormData;
//                 setValue(digitFieldName, digit, { shouldValidate: true });
//                 if (inputRefs[i].current) {
//                     inputRefs[i].current!.value = digit;
//                 }
//             });
//             inputRefs[5].current?.focus();
//             return;
//         }

//         // Handle single digit input
//         if (value.length === 1 && /^\d$/.test(value)) {
//             setValue(fieldName, value, { shouldValidate: true });

//             // Move to next input
//             if (index < 5 && value) {
//                 setTimeout(() => {
//                     inputRefs[index + 1].current?.focus();
//                 }, 0);
//             }
//         } else if (value.length === 0) {
//             // Handle backspace
//             setValue(fieldName, "", { shouldValidate: true });
//         } else {
//             // Clear if invalid input
//             setValue(fieldName, "", { shouldValidate: true });
//             e.target.value = "";
//         }
//     };

//     const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//         e.preventDefault();
//         const pastedData = e.clipboardData.getData("text").trim();

//         if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
//             const digits = pastedData.split("");
//             digits.forEach((digit, i) => {
//                 const fieldName = `otp${i + 1}` as keyof OTPFormData;
//                 setValue(fieldName, digit, { shouldValidate: true });
//                 if (inputRefs[i].current) {
//                     inputRefs[i].current!.value = digit;
//                 }
//             });
//             setTimeout(() => {
//                 inputRefs[5].current?.focus();
//             }, 0);
//         }
//     };

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//         const fieldName = `otp${index + 1}` as keyof OTPFormData;
//         const currentValue = otpValues[fieldName];

//         if (e.key === "Backspace" && !currentValue && index > 0) {
//             setTimeout(() => {
//                 inputRefs[index - 1].current?.focus();
//             }, 0);
//         }
//     };

//     const handleResendCode = () => {
//         setCanResend(false);
//         setCountdown(30);

//         const timer = setInterval(() => {
//             setCountdown((prev) => {
//                 if (prev <= 1) {
//                     clearInterval(timer);
//                     setCanResend(true);
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);
//     };

//     const handleVerify = () => {
//         // Check if all OTP fields are filled
//         const isComplete = Object.values(otpValues).every((value) => value && value.length === 1);

//         if (isComplete) {
//             setIsLoading(true);
//             setTimeout(() => {
//                 setIsLoading(false);
//                 router.push("/auth/reset-password");
//             }, 1000);
//         } else {
//             alert("Please enter all 6 digits of the OTP");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(handleSubmitOTP)} className="w-full max-w-md">
//             {/* Header */}
//             <div className="text-center mb-4 md:mb-14">
//                 <h1 className="text-3xl font-medium text-left">OTP Verify</h1>
//                 <p className="mt-2 text-left">Please check your email We sent there 6 digit code</p>
//             </div>

//             {/* OTP Fields */}
//             <div className="mb-3 md:mb-8">
//                 <div className="flex justify-center gap-2 mb-2">
//                     {[0, 1, 2, 3, 4, 5].map((index) => (
//                         <div key={index} className="flex-1 flex justify-center">
//                             <input
//                                 id={`otp${index + 1}`}
//                                 type="text"
//                                 inputMode="numeric"
//                                 pattern="[0-9]*"
//                                 maxLength={6}
//                                 ref={inputRefs[index]}
//                                 onPaste={handlePaste}
//                                 onChange={(e) => handleInputChange(e, index)}
//                                 onKeyDown={(e) => handleKeyDown(e, index)}
//                                 value={otpValues[`otp${index + 1}` as keyof OTPFormData] || ""}
//                                 className="w-10 h-10 md:w-14 md:h-14 text-center text-xl border border-[#412667] text-[#412667] rounded-md focus:outline-none focus:ring-2 focus:ring-[#412667]"
//                             />
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex justify-between text-sm text-red-500">
//                     {[1, 2, 3, 4, 5, 6].map((num) => (
//                         <div key={num} className="flex-1 text-center">
//                             {errors[`otp${num}` as keyof OTPFormData] && "•"}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Resend Code */}
//             <div className="flex justify-between items-center mb-6">
//                 <p className="text-sm text-gray-600">Don&apos;t receive any code?</p>
//                 <button type="button" onClick={handleResendCode} disabled={!canResend} className={`text-sm font-medium ${canResend ? "text-[#0C2A92] hover:underline" : "text-gray-400"}`}>
//                     {canResend ? "Resend" : `Resend in ${countdown}s`}
//                 </button>
//             </div>

//             {/* Verify Button */}
//             <button type="button" onClick={handleVerify} disabled={isLoading} className="w-full bg-[#412667] font-bold rounded-[10px] text-white py-3 px-4 cursor-pointer hover:bg-[#412667] transition-colors disabled:opacity-50">
//                 {isLoading ? "Verifying..." : "Verify email"}
//             </button>
//         </form>
//     );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useResendOtpMutation, useVerifyAccountMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

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
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [isLoading, setIsLoading] = useState(false);
    const [resendCountdown, setResendCountdown] = useState(0);
    const [verifyAccount] = useVerifyAccountMutation();
    const [resendOtp] = useResendOtpMutation();

    const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const {
        control,
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

    const otpValues = useWatch({
        control,
        defaultValue: {
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            otp5: "",
            otp6: "",
        },
    });

    // Countdown timer for resend
    useEffect(() => {
        if (resendCountdown > 0) {
            const timer = setTimeout(() => {
                setResendCountdown(resendCountdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCountdown]);

    // Check if email exists
    useEffect(() => {
        if (!email) {
            toast.error("Email is missing. Please go back and enter your email again.");
            router.push("/auth/forgot-password");
        }
    }, [email, router]);

    const handleSubmitOTP = async (data: OTPFormData) => {
        setIsLoading(true);
        const otp = Object.values(data).join("");

        const toastId = toast.loading("Verifying OTP...");

        try {
            const response = await verifyAccount({
                email: email,
                oneTimeCode: otp,
            }).unwrap();

            if (response.success && response.data?.token) {
                toast.success("OTP verified successfully!");
                router.push(`/auth/reset-password?token=${response.data.token}`);
            } else {
                toast.error(response.message || "OTP verification failed");
            }
        } catch (error: any) {
            console.error("OTP verification failed:", error);
            toast.error(error?.data?.message || "OTP verification failed");
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        const fieldName = `otp${index + 1}` as keyof OTPFormData;

        if (value.length === 6 && /^\d+$/.test(value)) {
            const digits = value.split("");
            digits.forEach((digit, i) => {
                const digitFieldName = `otp${i + 1}` as keyof OTPFormData;
                setValue(digitFieldName, digit, { shouldValidate: true });
                if (inputRefs[i].current) {
                    inputRefs[i].current!.value = digit;
                }
            });
            inputRefs[5].current?.focus();
            return;
        }

        if (value.length === 1 && /^\d$/.test(value)) {
            setValue(fieldName, value, { shouldValidate: true });

            if (index < 5 && value) {
                setTimeout(() => {
                    inputRefs[index + 1].current?.focus();
                }, 0);
            }
        } else if (value.length === 0) {
            setValue(fieldName, "", { shouldValidate: true });
        } else {
            setValue(fieldName, "", { shouldValidate: true });
            e.target.value = "";
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
            const digits = pastedData.split("");
            digits.forEach((digit, i) => {
                const fieldName = `otp${i + 1}` as keyof OTPFormData;
                setValue(fieldName, digit, { shouldValidate: true });
                if (inputRefs[i].current) {
                    inputRefs[i].current!.value = digit;
                }
            });
            setTimeout(() => {
                inputRefs[5].current?.focus();
            }, 0);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const fieldName = `otp${index + 1}` as keyof OTPFormData;
        const currentValue = otpValues[fieldName];

        if (e.key === "Backspace" && !currentValue && index > 0) {
            setTimeout(() => {
                inputRefs[index - 1].current?.focus();
            }, 0);
        }
    };

    const handleResendCode = async () => {
        if (!email || resendCountdown > 0) {
            return;
        }

        try {
            const response = await resendOtp({
                email: email,
                authType: "resetPassword",
            }).unwrap();

            if (response.success) {
                toast.success("OTP resent successfully!");
                setResendCountdown(30); // Start 30-second countdown
            } else {
                toast.error(response.message || "Failed to resend OTP");
            }
        } catch (error: any) {
            console.error("Resend OTP failed:", error);
            toast.error(error?.data?.message || "Failed to resend OTP");
        }
    };

    const handleVerify = () => {
        const isComplete = Object.values(otpValues).every((value) => value && value.length === 1);

        if (isComplete) {
            handleSubmit(handleSubmitOTP)();
        } else {
            toast.error("Please enter all 6 digits of the OTP");
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitOTP)} className="w-full max-w-md">
            <div className="text-center mb-4 md:mb-14">
                <h1 className="text-3xl font-medium text-left">OTP Verify</h1>
                <p className="mt-2 text-left">Please check your email We sent there 6 digit code</p>
            </div>

            <div className="mb-3 md:mb-8">
                <div className="flex justify-center gap-2 mb-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                        <div key={index} className="flex-1 flex justify-center">
                            <input
                                id={`otp${index + 1}`}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                ref={inputRefs[index]}
                                onPaste={handlePaste}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                value={otpValues[`otp${index + 1}` as keyof OTPFormData] || ""}
                                className="w-10 h-10 md:w-14 md:h-14 text-center text-xl border border-[#412667] text-[#412667] rounded-md focus:outline-none focus:ring-2 focus:ring-[#412667]"
                            />
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

            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">Don&apos;t receive any code?</p>
                <button type="button" onClick={handleResendCode} disabled={resendCountdown > 0} className={`text-sm font-medium cursor-pointer ${resendCountdown === 0 ? "text-[#0C2A92] hover:underline" : "text-gray-400"}`}>
                    {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend"}
                </button>
            </div>

            <button type="button" onClick={handleVerify} disabled={isLoading} className="w-full bg-[#412667] font-bold rounded-[10px] text-white py-3 px-4 cursor-pointer hover:bg-[#412667] transition-colors disabled:opacity-50">
                {isLoading ? "Verifying..." : "Verify email"}
            </button>
        </form>
    );
}
