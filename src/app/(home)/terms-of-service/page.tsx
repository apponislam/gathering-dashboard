import React from "react";
import { FileText, Award, AlertTriangle, Scale, Mail, Info } from "lucide-react";

export const metadata = {
    title: "Terms of Service - Gathering",
    description: "Read the Terms of Service for using the Gathering platform, including event guidelines and community guidelines.",
};

export default function TermsOfServicePage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-[#412667] mb-4">
                        <FileText className="h-6 w-6" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                        Terms of Service
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Last Updated: July 13, 2026. Please read these terms carefully before using the Gathering mobile app and platform.
                    </p>
                </div>

                {/* Terms Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-[#412667]/5 text-[#412667] shrink-0">
                            <Scale className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-sm">Agreement</h3>
                            <p className="text-xs text-slate-500 mt-1">By accessing our application, you agree to comply with our platform terms.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-[#1AA367]/5 text-[#1AA367] shrink-0">
                            <Award className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-sm">UGC Moderation</h3>
                            <p className="text-xs text-slate-500 mt-1">Harassment, abuse, or inappropriate content will lead to immediate ban.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-amber-500/5 text-amber-600 shrink-0">
                            <AlertTriangle className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-sm">Liability</h3>
                            <p className="text-xs text-slate-500 mt-1">Gathering hosts third-party events. We are not liable for direct event outcomes.</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 sm:p-12 space-y-10 text-slate-700 leading-relaxed">
                    
                    {/* Acceptance of Terms */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-slate-600">
                            By installing, registering, or using the Gathering mobile application, web dashboard, or associated services (the &quot;Platform&quot;), you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Gathering Inc. If you do not agree to these terms, you must not use or download our Platform.
                        </p>
                    </section>

                    {/* Eligibility and Account */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            2. Account Eligibility & Registration
                        </h2>
                        <p className="text-slate-600">
                            You must be at least 13 years of age (or the minimum legal age in your country) to create an account on Gathering. When creating an account, you represent and warrant that all information provided is accurate and truthful. You are responsible for safeguarding your login credentials and for any activities that occur under your account.
                        </p>
                    </section>

                    {/* User-Generated Content and Moderation */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            3. User-Generated Content & Moderation (UGC)
                        </h2>
                        <div className="bg-red-50/50 border border-red-200/80 p-5 rounded-2xl mb-4">
                            <h4 className="text-red-800 font-semibold text-sm flex items-center gap-2 mb-1">
                                <Info className="h-4 w-4" />
                                App Store Compliance - Zero Tolerance Policy
                            </h4>
                            <p className="text-xs text-red-700 leading-normal">
                                Gathering does not tolerate objectionable, offensive, or abusive content. Harassing behavior, graphic violence, pornography, hate speech, or promotion of illegal events will lead to immediate account suspension and a potential permanent ban.
                            </p>
                        </div>
                        <p className="text-slate-600 mb-3">
                            When organizing events or posting comments, pictures, or maps, you agree that you will not post content that is illegal, defamatory, invasive of privacy, or infringing on copyright. By uploading content, you grant Gathering a worldwide, non-exclusive, royalty-free license to distribute, render, and display your content to other users on the platform.
                        </p>
                        <p className="text-slate-600">
                            We provide robust in-app tools allowing users to flag offensive content and block abusive users. Flagged content is reviewed by our moderation team within 24 hours. Offensive items will be removed, and offending accounts suspended immediately.
                        </p>
                    </section>

                    {/* Event Organization & Participation */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            4. Event Organization Guidelines
                        </h2>
                        <p className="text-slate-600">
                            Gathering provides tools to plan events, assign locations, coordinate groups, and chat. Organizers are solely responsible for compliance with local regulations, permits, and safety guidelines for any physical events they organize. Gathering is not responsible or liable for any disputes, cancellations, injuries, or issues occurring at physical gatherings created via the Platform.
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            5. Intellectual Property Rights
                        </h2>
                        <p className="text-slate-600">
                            The Platform UI designs, graphics, branding, logos, underlying source code, database structures, and platform components are the proprietary property of Gathering Inc. and are protected by intellectual property and copyright laws. You are granted a limited, personal, non-transferable, and revocable license to access the Platform solely for personal, non-commercial use.
                        </p>
                    </section>

                    {/* Termination */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            6. Account Termination
                        </h2>
                        <p className="text-slate-600">
                            We reserve the right to suspend or terminate your account and block access to our Platform at our sole discretion, without notice or liability, for conduct that violates these Terms or is harmful to other users, our business interests, or the community.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            7. Disclaimer of Warranties & Limitation of Liability
                        </h2>
                        <p className="text-slate-600 text-sm">
                            THE PLATFORM IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. GATHERING INC. EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL GATHERING INC., ITS DIRECTORS, OR ITS EMPLOYEES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE PLATFORM OR PARTICIPATION IN PHYSICAL EVENTS.
                        </p>
                    </section>

                    {/* Contact Info */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            8. Contact Us
                        </h2>
                        <p className="text-slate-600 mb-4">
                            If you have questions or clarifications regarding our Terms of Service, please write to us at:
                        </p>
                        <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-150 text-sm max-w-sm">
                            <Mail className="h-5 w-5 text-slate-400" />
                            <div>
                                <span className="text-slate-400 block text-xs">Email Address</span>
                                <a href="mailto:support@gatheringapp.com" className="text-[#412667] font-semibold hover:underline">
                                    support@gatheringapp.com
                                </a>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
