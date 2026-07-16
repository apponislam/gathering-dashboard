"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Loader2, Shield, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    useGetPrivacyPolicyQuery,
    useGetTermsAndConditionQuery,
    useCreateOrUpdatePublicContentMutation,
} from "@/redux/features/public/publicContentApi";

// Dynamically import JoditEditor to prevent SSR "document is not defined" issues in Next.js
const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
    loading: () => (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-200 rounded-2xl bg-slate-50 gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-[#4F46E5]" />
            <p className="text-sm text-slate-500 font-medium">Loading Editor...</p>
        </div>
    ),
});

export default function PrivacyTermsPage() {
    const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");
    const [isEditing, setIsEditing] = useState(false);

    // Fetch queries
    const {
        data: privacyData,
        isLoading: isPrivacyLoading,
        isError: isPrivacyError,
        refetch: refetchPrivacy,
    } = useGetPrivacyPolicyQuery();

    const {
        data: termsData,
        isLoading: isTermsLoading,
        isError: isTermsError,
        refetch: refetchTerms,
    } = useGetTermsAndConditionQuery();

    // Update mutation
    const [updateContent, { isLoading: isUpdating }] = useCreateOrUpdatePublicContentMutation();

    // Editor refs to solve Jodit cursor jumping issues in React 19
    const editorRef = useRef<any>(null);
    const contentRef = useRef("");

    // Identify active data
    const activeData = activeTab === "privacy" ? privacyData : termsData;
    const initialContent = activeData?.data?.content || "";
    const isLoading = activeTab === "privacy" ? isPrivacyLoading : isTermsLoading;
    const isError = activeTab === "privacy" ? isPrivacyError : isTermsError;

    // Reset current editor content when data or tab changes
    useEffect(() => {
        contentRef.current = initialContent;
    }, [initialContent, activeTab]);

    // Custom configuration for Jodit editor - omitting files, photos, videos upload
    const joditConfig = useMemo(
        () => ({
            readonly: false,
            placeholder: "Start typing your content here...",
            height: 480,
            theme: "default",
            toolbarButtonSize: "middle" as const,
            // Exclude image, video, file, uploader tools from toolbar
            buttons: [
                "source",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "|",
                "superscript",
                "subscript",
                "|",
                "ul",
                "ol",
                "|",
                "outdent",
                "indent",
                "|",
                "font",
                "fontsize",
                "brush",
                "paragraph",
                "|",
                "align",
                "undo",
                "redo",
                "|",
                "hr",
                "eraser",
                "copyformat",
                "|",
                "symbol",
                "fullsize",
                "print",
            ],
            buttonsMD: [
                "source",
                "bold",
                "italic",
                "underline",
                "|",
                "ul",
                "ol",
                "|",
                "paragraph",
                "undo",
                "redo",
                "|",
                "fullsize",
            ],
            buttonsSM: ["source", "bold", "italic", "|", "ul", "ol", "|", "undo", "redo", "|", "fullsize"],
            buttonsXS: ["bold", "italic", "|", "undo", "redo"],
            // Disable native image/video upload plugins to block any uploading logic
            disablePlugins: ["image", "video", "file", "uploader", "add-new-line"],
            uploader: {
                insertImageAsBase64URI: false,
            },
        }),
        []
    );

    const handleSave = async () => {
        const finalContent = contentRef.current;
        if (!finalContent || !finalContent.trim()) {
            toast.error("Content cannot be empty.");
            return;
        }

        try {
            const payload = {
                content: finalContent,
                type: activeTab === "privacy" ? "privacy-policy" : "terms-and-condition",
            };

            const response = await updateContent(payload).unwrap();
            if (response.success) {
                toast.success(
                    `${activeTab === "privacy" ? "Privacy Policy" : "Terms & Conditions"} updated successfully!`
                );
                setIsEditing(false);
            } else {
                toast.error(response.message || "Failed to save changes.");
            }
        } catch (err: any) {
            console.error("Save error:", err);
            toast.error(err?.data?.message || "An error occurred while saving.");
        }
    };

    const handleRetry = () => {
        if (activeTab === "privacy") {
            refetchPrivacy();
        } else {
            refetchTerms();
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="md:hidden block mr-2" />
                    <Shield className="h-7 w-7 text-[#4F46E5]" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Privacy & Terms Settings</h1>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 mb-8 w-fit gap-2">
                <button
                    onClick={() => {
                        setActiveTab("privacy");
                        setIsEditing(false);
                    }}
                    className={`pb-3 px-6 text-sm font-semibold border-b-2 transition-all duration-200 cursor-pointer ${
                        activeTab === "privacy"
                            ? "border-[#4F46E5] text-[#4F46E5]"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                    Privacy Policy
                </button>
                <button
                    onClick={() => {
                        setActiveTab("terms");
                        setIsEditing(false);
                    }}
                    className={`pb-3 px-6 text-sm font-semibold border-b-2 transition-all duration-200 cursor-pointer ${
                        activeTab === "terms"
                            ? "border-[#4F46E5] text-[#4F46E5]"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                    Terms & Conditions
                </button>
            </div>

            {/* Main Area */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white border border-slate-200 rounded-2xl shadow-sm gap-3">
                    <Loader2 className="h-10 w-10 animate-spin text-[#4F46E5]" />
                    <p className="text-slate-500 font-medium text-sm">Retrieving content from API...</p>
                </div>
            ) : isError ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm gap-4 text-center px-6">
                    <p className="text-red-500 font-semibold text-lg">Failed to retrieve content</p>
                    <p className="text-slate-500 text-sm max-w-md">
                        There was an error communicating with the server. Please check your connection and try again.
                    </p>
                    <Button onClick={handleRetry} className="bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-full px-6">
                        Retry Loading
                    </Button>
                </div>
            ) : !isEditing ? (
                /* VIEW / PREVIEW MODE */
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-slate-100 bg-slate-50">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">
                                Current {activeTab === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
                            </h2>
                            {activeData?.data?.updatedAt && (
                                <p className="text-[12px] text-slate-500 mt-1">
                                    Last Updated:{" "}
                                    {new Date(activeData.data.updatedAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                asChild
                                variant="outline"
                                className="border-slate-300 hover:bg-slate-100 text-slate-700 rounded-full px-6 font-medium cursor-pointer"
                            >
                                <a
                                    href={activeTab === "privacy" ? "/privacy-policy" : "/terms-of-service"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View Live
                                </a>
                            </Button>
                            <Button
                                onClick={() => setIsEditing(true)}
                                className="bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-full px-6 font-medium cursor-pointer"
                            >
                                Edit Content
                            </Button>
                        </div>
                    </div>
                    <div className="p-6 sm:p-8">
                        {initialContent ? (
                            <div
                                className="rich-content max-w-none text-slate-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: initialContent }}
                            />
                        ) : (
                            <div className="text-center py-12 text-slate-400 italic">
                                No content created yet. Click the &quot;Edit Content&quot; button above to create one.
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* EDIT MODE */
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-4 p-6 border-b border-slate-100 bg-slate-50">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">
                                Edit {activeTab === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
                            </h2>
                            <p className="text-xs text-slate-500 mt-1">
                                Format using the toolbar options below. Uploading images/videos is disabled.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                onClick={() => setIsEditing(false)}
                                variant="outline"
                                className="border-slate-300 hover:bg-slate-100 text-slate-700 rounded-full px-6 font-medium cursor-pointer"
                                disabled={isUpdating}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-full px-6 font-medium cursor-pointer"
                                disabled={isUpdating}
                            >
                                {isUpdating ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6">
                        <JoditEditor
                            key={activeTab}
                            ref={editorRef}
                            value={initialContent}
                            config={joditConfig}
                            onChange={(newVal) => {
                                contentRef.current = newVal;
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
