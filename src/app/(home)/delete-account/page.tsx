"use client";

import React, { useState } from "react";
import { UserX, AlertTriangle, CheckCircle, ArrowRight, ShieldAlert, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DeleteAccountPage() {
    const [formData, setFormData] = useState({
        email: "",
        reason: "no-longer-use",
        confirmCheckbox: false
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!formData.email.trim()) {
            setErrorMsg("Please enter your account email address.");
            return;
        }

        if (!formData.confirmCheckbox) {
            setErrorMsg("You must confirm that you understand the terms of account deletion.");
            return;
        }

        setSubmitting(true);

        try {
            // Simulate deletion request API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSubmitSuccess(true);
        } catch {
            setErrorMsg("Failed to submit request. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mb-4 border border-rose-100">
                        <UserX className="h-6 w-6" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                        Delete Account & Data
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-md mx-auto">
                        Submit a request to permanently erase your Gathering account and all associated personal data from our databases.
                    </p>
                </div>

                {submitSuccess ? (
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-8 text-center space-y-6 shadow-xs animate-in zoom-in-95 duration-200">
                        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                            <CheckCircle className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-slate-950">Verification Email Sent</h3>
                            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                To complete your deletion request, please click the confirmation link sent to <strong className="text-slate-900">{formData.email}</strong>.
                            </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs text-slate-500 text-left">
                            <strong>What happens next?</strong>
                            <ul className="list-disc pl-4 mt-1.5 space-y-1">
                                <li>Once verified, your account is immediately deactivated.</li>
                                <li>All events hosted, comments, and locations are deleted within 24 hours.</li>
                                <li>No further notifications will be sent to your email.</li>
                            </ul>
                        </div>
                        <Button asChild className="bg-[#412667] hover:bg-[#321d50] text-white w-full rounded-xl py-2.5">
                            <Link href="/" className="flex items-center justify-center gap-1.5">
                                Return to Portal
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                        {/* Warnings banner */}
                        <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl flex gap-3.5 items-start">
                            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="text-xs text-amber-800 leading-normal">
                                <span className="font-bold text-amber-950 block mb-0.5">Important: Deletion is Permanent</span>
                                This process will delete your profile records, events organized, group chat lists, and coordinate records. It cannot be undone or recovered under any circumstance.
                            </div>
                        </div>

                        {errorMsg && (
                            <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3.5 rounded-xl text-sm flex items-center gap-2 animate-in fade-in duration-200">
                                <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Account Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your-account@email.com"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#412667]/20 focus:border-[#412667] transition-all bg-slate-50/50"
                                        required
                                    />
                                    <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="reason" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                    Reason for leaving (Optional)
                                </label>
                                <select
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#412667]/20 focus:border-[#412667] transition-all bg-slate-50/50"
                                >
                                    <option value="no-longer-use">I no longer use this application</option>
                                    <option value="privacy-concerns">I have privacy concerns</option>
                                    <option value="too-many-notifications">Receiving too many emails/notifications</option>
                                    <option value="technical-issues">App does not work properly</option>
                                    <option value="other">Other reason</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <label className="flex items-start gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="confirmCheckbox"
                                        checked={formData.confirmCheckbox}
                                        onChange={handleChange}
                                        className="h-4 w-4 mt-0.5 rounded border-slate-300 text-[#412667] focus:ring-[#412667]/20 cursor-pointer"
                                        required
                                    />
                                    <span className="text-xs sm:text-sm text-slate-500 leading-normal">
                                        I understand that all of my events, comments, locations, and user records will be deleted permanently.
                                    </span>
                                </label>
                            </div>

                            <Button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm font-semibold transition-all mt-4"
                            >
                                {submitting ? "Processing..." : "Submit Deletion Request"}
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
