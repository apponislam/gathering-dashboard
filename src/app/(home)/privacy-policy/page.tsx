import React from "react";
import { Shield, Lock, Eye, RefreshCw, Mail, Globe, MapPin, Video } from "lucide-react";

export const metadata = {
    title: "Privacy Policy - Gathering",
    description: "Read the Privacy Policy for the Gathering platform and learn how we manage and protect your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-[#412667] mb-4">
                        <Shield className="h-6 w-6" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Last Updated: July 13, 2026. Learn how Gathering collects, uses, and protects your personal data when using our mobile application and dashboard.
                    </p>
                </div>

                {/* Key Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-[#412667]/5 text-[#412667] shrink-0">
                            <Lock className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-sm">Secure Storage</h3>
                            <p className="text-xs text-slate-500 mt-1">We employ industry-standard encryption to protect your data both in transit and at rest.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-[#1AA367]/5 text-[#1AA367] shrink-0">
                            <Eye className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-sm">Transparency</h3>
                            <p className="text-xs text-slate-500 mt-1">We do not sell your personal data. We only use it to enable core application features.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-start gap-4">
                        <div className="p-2.5 rounded-lg bg-cyan-500/5 text-cyan-600 shrink-0">
                            <RefreshCw className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-sm">Control</h3>
                            <p className="text-xs text-slate-500 mt-1">Easily request deletion of your account and all associated event files at any time.</p>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 sm:p-12 space-y-10 text-slate-700 leading-relaxed">
                    
                    {/* Introduction */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            1. Introduction
                        </h2>
                        <p className="text-slate-600">
                            Welcome to <strong>Gathering</strong>. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and web dashboard (collectively, the &quot;Service&quot;). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            2. Information We Collect
                        </h2>
                        <p className="text-slate-600 mb-4">
                            To deliver event organizing, sharing, and real-time collaboration features, we collect several types of data:
                        </p>
                        
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                                <div className="p-1.5 rounded-md bg-[#412667]/10 text-[#412667] shrink-0 mt-0.5">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 text-sm">Location Information</h4>
                                    <p className="text-sm text-slate-600 mt-1">
                                        We collect precise or approximate location data from your mobile device to show nearby events, map directions, and facilitate coordinates sharing. This feature utilizes <strong>Google Maps API</strong> integration.
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                                <div className="p-1.5 rounded-md bg-purple-100 text-[#412667] shrink-0 mt-0.5">
                                    <Video className="h-4 w-4" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900 text-sm">Media and Communication Streams</h4>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Our real-time group calls and broadcast events are powered by <strong>Agora</strong>. When using real-time calling or broadcast features, video/audio streams are processed temporarily to enable communication. We do not store recordings of calls unless explicitly requested by the event host.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 space-y-2 text-sm text-slate-600">
                            <p><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, profile picture, and phone number, which you provide voluntarily when creating an account or updating your profile.</p>
                            <p><strong>Event Data:</strong> Information you submit when creating, hosting, or attending events, including event titles, descriptions, schedules, locations, and chat room logs.</p>
                        </div>
                    </section>

                    {/* How We Use Your Information */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            3. How We Use Your Information
                        </h2>
                        <p className="text-slate-600 mb-3">
                            We use the information we collect to operate and improve the Gathering application, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-sm text-slate-600">
                            <li>Creating and managing your user profile and login sessions.</li>
                            <li>Enabling precise event localization, route navigation, and distance estimations.</li>
                            <li>Powering live communication features (voice chat, text messaging, screen sharing).</li>
                            <li>Sending notifications about upcoming events, schedule updates, or system announcements.</li>
                            <li>Preventing fraudulent behavior, spam, or terms of service violations.</li>
                        </ul>
                    </section>

                    {/* Third-Party Disclosures */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            4. Third-Party Integrations & Services
                        </h2>
                        <p className="text-slate-600 mb-4">
                            We share data with trusted third-party providers who perform services critical to our application functionality:
                        </p>
                        
                        <div className="overflow-hidden rounded-xl border border-slate-200 text-sm">
                            <table className="min-w-full divide-y divide-slate-200">
                                <thead className="bg-slate-50 text-slate-800 font-semibold">
                                    <tr>
                                        <th className="px-6 py-3 text-left">Service Provider</th>
                                        <th className="px-6 py-3 text-left">Purpose</th>
                                        <th className="px-6 py-3 text-left">Data Shared</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 bg-white text-slate-600">
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-slate-900">Google Maps SDK</td>
                                        <td className="px-6 py-4">Location mapping & event search</td>
                                        <td className="px-6 py-4">GPS coordinates, IP Address</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-slate-900">Agora SDK</td>
                                        <td className="px-6 py-4">Voice & Video communications</td>
                                        <td className="px-6 py-4">Temp audio/video streams, user IDs</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium text-slate-900">AWS / Cloud Hosting</td>
                                        <td className="px-6 py-4">Data storage and image hosting</td>
                                        <td className="px-6 py-4">User profiles, uploaded media files</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Data Security and Retention */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            5. Data Security & Retention
                        </h2>
                        <p className="text-slate-600">
                            We store your account and profile data for as long as your account remains active. Once you delete your account or submit a request for deletion, your data is permanently removed from our active production database. Backup copies of records may be retained for up to 30 days for system reliability, after which they are automatically overwritten.
                        </p>
                    </section>

                    {/* User Rights & Account Deletion */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            6. Your Rights & Account Deletion
                        </h2>
                        <p className="text-slate-600 mb-3">
                            You have rights to inspect, update, or permanently erase your personal records in Gathering. If you wish to delete your account, you can perform it directly in the App settings under "My Account", or submit a request online via our portal:
                        </p>
                        <div className="bg-purple-50/50 border border-[#412667]/10 p-4 rounded-2xl flex items-center justify-between flex-wrap gap-4 mt-4">
                            <div className="text-sm">
                                <span className="font-bold text-[#412667]">Online Deletion Form</span>
                                <p className="text-slate-500 mt-0.5">Submit an online deletion request for immediate processing.</p>
                            </div>
                            <a href="/delete-account" className="inline-flex items-center text-sm font-semibold text-[#412667] hover:text-[#321d50] hover:underline gap-1">
                                Go to Deletion Page &rarr;
                            </a>
                        </div>
                    </section>

                    {/* Contact Info */}
                    <section className="border-t border-slate-100 pt-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                            7. Contact Information
                        </h2>
                        <p className="text-slate-600 mb-4">
                            For comments, concerns, or requests regarding this Privacy Policy, please reach out to us at:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-150">
                                <Mail className="h-5 w-5 text-slate-400" />
                                <div>
                                    <span className="text-slate-400 block text-xs">Email Address</span>
                                    <a href="mailto:support@gatheringapp.com" className="text-[#412667] font-semibold hover:underline">
                                        support@gatheringapp.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-150">
                                <Globe className="h-5 w-5 text-slate-400" />
                                <div>
                                    <span className="text-slate-400 block text-xs">Website URL</span>
                                    <a href="https://gatheringapp.com" target="_blank" rel="noopener noreferrer" className="text-[#412667] font-semibold hover:underline">
                                        gatheringapp.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
