"use client";

import React from "react";
import { useGetTermsAndConditionQuery } from "@/redux/features/public/publicContentApi";
import { Loader2 } from "lucide-react";

export default function TermsOfServicePage() {
    const { data, isLoading, isError } = useGetTermsAndConditionQuery();

    const content = data?.data?.content;
    const updatedAt = data?.data?.updatedAt;

    return (
        <div className="bg-white min-h-screen py-16 px-6 sm:px-8 lg:px-12 text-slate-800">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="border-b border-slate-200 pb-8 mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        Terms of Service
                    </h1>
                    {updatedAt && (
                        <p className="mt-2 text-sm text-slate-500">
                            Last Updated:{" "}
                            {new Date(updatedAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-8 text-slate-700 leading-relaxed">
                    {isLoading && (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-[#412667]" />
                        </div>
                    )}

                    {isError && (
                        <div className="text-center py-20">
                            <p className="text-red-500 font-medium">
                                Failed to load Terms of Service. Please try again later.
                            </p>
                        </div>
                    )}

                    {!isLoading && !isError && content && (
                        <div
                            className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-a:text-purple-700 prose-a:hover:underline"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
