import React from "react";

export const metadata = {
    title: "Privacy Policy - Gathering",
    description: "Read the Privacy Policy for the Gathering platform and learn how we manage and protect your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white min-h-screen py-16 px-6 sm:px-8 lg:px-12 text-slate-800">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="border-b border-slate-200 pb-8 mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                        Privacy Policy
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Last Updated: July 13, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8 text-slate-700 leading-relaxed">
                    
                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            1. Introduction
                        </h2>
                        <p>
                            Welcome to Gathering. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and web dashboard (collectively, the &quot;Service&quot;).
                        </p>
                        <p className="mt-3">
                            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            2. Information We Collect
                        </h2>
                        <p>
                            To deliver event organizing, sharing, and real-time collaboration features, we collect several types of data:
                        </p>
                        
                        <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">
                            Personal Data
                        </h3>
                        <p>
                            Personally identifiable information, such as your name, email address, profile picture, and phone number, which you provide voluntarily when creating an account or updating your profile.
                        </p>

                        <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">
                            Location Information
                        </h3>
                        <p>
                            We collect precise or approximate location data from your mobile device to show nearby events, map directions, and facilitate coordinates sharing. This feature utilizes Google Maps API integration.
                        </p>

                        <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">
                            Media and Communication Streams
                        </h3>
                        <p>
                            Our real-time group calls and broadcast events are powered by Agora SDK. When using real-time calling or broadcast features, video/audio streams are processed temporarily to enable communication. We do not store recordings of calls unless explicitly requested by the event host.
                        </p>

                        <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">
                            Event and Usage Data
                        </h3>
                        <p>
                            Information you submit when creating, hosting, or attending events, including event titles, descriptions, schedules, locations, and chat room logs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            3. How We Use Your Information
                        </h2>
                        <p>
                            We use the information we collect to operate and improve the Gathering application, including:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2">
                            <li>Creating and managing your user profile and login sessions.</li>
                            <li>Enabling precise event localization, route navigation, and distance estimations.</li>
                            <li>Powering live communication features (voice chat, text messaging, screen sharing).</li>
                            <li>Sending notifications about upcoming events, schedule updates, or system announcements.</li>
                            <li>Preventing fraudulent behavior, spam, or terms of service violations.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            4. Third-Party Integrations & Services
                        </h2>
                        <p>
                            We share data with trusted third-party providers who perform services critical to our application functionality:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-3">
                            <li>
                                <strong>Google Maps SDK:</strong> Used for location mapping, geocoding, and nearby event searches. We share GPS coordinates and basic device IP addresses to retrieve map assets.
                            </li>
                            <li>
                                <strong>Agora SDK:</strong> Powering our live voice and video communications. Temporary audio and video stream packages are routed through Agora servers to establish stable real-time calls.
                            </li>
                            <li>
                                <strong>AWS / Cloud Hosting:</strong> Used for secure database storage, asset hosting (such as user-uploaded profile pictures and event images), and server execution.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            5. Data Security and Retention
                        </h2>
                        <p>
                            We store your account and profile data for as long as your account remains active. Once you delete your account or submit a request for deletion, your data is permanently removed from our active production database. Backup copies of records may be retained for up to 30 days for system reliability, after which they are automatically overwritten.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            6. Your Rights & Account Deletion
                        </h2>
                        <p>
                            You have the right to access, inspect, update, or permanently erase your personal records in Gathering. If you wish to delete your account, you can perform it directly in the App settings under &quot;My Account&quot;, or contact us at <a href="mailto:support@gatheringapp.com" className="text-purple-700 hover:underline">support@gatheringapp.com</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">
                            7. Contact Information
                        </h2>
                        <p>
                            For comments, concerns, or requests regarding this Privacy Policy, please reach out to us at:
                        </p>
                        <ul className="list-none mt-2 space-y-1">
                            <li>
                                <strong>Email:</strong> <a href="mailto:support@gatheringapp.com" className="text-purple-700 hover:underline">support@gatheringapp.com</a>
                            </li>
                            <li>
                                <strong>Website:</strong> <a href="https://gatheringapp.com" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline">gatheringapp.com</a>
                            </li>
                        </ul>
                    </section>

                </div>
            </div>
        </div>
    );
}
