import React from "react";

export const metadata = {
    title: "Terms of Service - Gathering",
    description: "Read the Terms of Service for using the Gathering platform, including event guidelines and community guidelines.",
};

export default function TermsOfServicePage() {
    return (
        <div className="bg-white min-h-screen py-16 px-6 sm:px-8 lg:px-12 text-slate-800">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="border-b border-slate-200 pb-8 mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        Terms of Service
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Last Updated: July 13, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8 text-slate-700 leading-relaxed">
                    
                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By installing, registering, or using the Gathering mobile application, web dashboard, or associated services (the &quot;Platform&quot;), you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Gathering Inc. If you do not agree to these terms, you must not use or download our Platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            2. Account Eligibility & Registration
                        </h2>
                        <p>
                            You must be at least 13 years of age (or the minimum legal age in your country) to create an account on Gathering. When creating an account, you represent and warrant that all information provided is accurate and truthful. You are responsible for safeguarding your login credentials and for any activities that occur under your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            3. User-Generated Content & Moderation (UGC)
                        </h2>
                        <p>
                            Gathering does not tolerate objectionable, offensive, or abusive content. Harassing behavior, graphic violence, pornography, hate speech, or promotion of illegal events will lead to immediate account suspension and a potential permanent ban.
                        </p>
                        <p className="mt-3">
                            When organizing events or posting comments, pictures, or maps, you agree that you will not post content that is illegal, defamatory, invasive of privacy, or infringing on copyright. By uploading content, you grant Gathering a worldwide, non-exclusive, royalty-free license to distribute, render, and display your content to other users on the platform.
                        </p>
                        <p className="mt-3">
                            We provide robust in-app tools allowing users to flag offensive content and block abusive users. Flagged content is reviewed by our moderation team within 24 hours. Offensive items will be removed, and offending accounts suspended immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            4. Event Organization Guidelines
                        </h2>
                        <p>
                            Gathering provides tools to plan events, assign locations, coordinate groups, and chat. Organizers are solely responsible for compliance with local regulations, permits, and safety guidelines for any physical events they organize. Gathering is not responsible or liable for any disputes, cancellations, injuries, or issues occurring at physical gatherings created via the Platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            5. Intellectual Property Rights
                        </h2>
                        <p>
                            The Platform UI designs, graphics, branding, logos, underlying source code, database structures, and platform components are the proprietary property of Gathering Inc. and are protected by intellectual property and copyright laws. You are granted a limited, personal, non-transferable, and revocable license to access the Platform solely for personal, non-commercial use.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            6. Account Termination
                        </h2>
                        <p>
                            We reserve the right to suspend or terminate your account and block access to our Platform at our sole discretion, without notice or liability, for conduct that violates these Terms or is harmful to other users, our business interests, or the community.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            7. Disclaimer of Warranties & Limitation of Liability
                        </h2>
                        <p className="text-sm">
                            THE PLATFORM IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. GATHERING INC. EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. IN NO EVENT SHALL GATHERING INC., ITS DIRECTORS, OR ITS EMPLOYEES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE PLATFORM OR PARTICIPATION IN PHYSICAL EVENTS.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            8. Contact Us
                        </h2>
                        <p>
                            If you have questions or clarifications regarding our Terms of Service, please write to us at:
                        </p>
                        <ul className="list-none mt-2 space-y-1">
                            <li>
                                <strong>Email:</strong> <a href="mailto:support@gatheringapp.com" className="text-purple-700 hover:underline">support@gatheringapp.com</a>
                            </li>
                        </ul>
                    </section>

                </div>
            </div>
        </div>
    );
}
