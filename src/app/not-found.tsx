"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Minimal404() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-gray-50 to-white">
            <div className="max-w-md w-full text-center">
                {/* Gradient Circle */}
                <div className="relative mb-8">
                    <div className="w-40 h-40 mx-auto bg-linear-to-r from-[#412667] to-[#1AA367] rounded-full flex items-center justify-center">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                            <span className="text-4xl font-black bg-linear-to-r from-[#412667] to-[#1AA367] bg-clip-text text-transparent">404</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Lost in Space?</h1>
                <p className="text-gray-600 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>

                {/* Gradient Button */}
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-[#412667] to-[#1AA367] text-white font-medium rounded-lg hover:shadow-lg transition-shadow">
                    <ArrowLeft className="w-5 h-5" />
                    Return to Safety
                </Link>

                {/* Decorative line */}
                <div className="mt-12 relative">
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-linear-to-r from-[#67E9F1] via-[#24E795] to-transparent animate-slide" />
                    </div>
                </div>

                {/* Add this CSS for animation */}
                <style jsx>{`
                    @keyframes slide {
                        0% {
                            transform: translateX(-100%);
                        }
                        100% {
                            transform: translateX(300%);
                        }
                    }
                    .animate-slide {
                        animation: slide 2s linear infinite;
                    }
                `}</style>
            </div>
        </div>
    );
}
