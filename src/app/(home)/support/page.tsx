"use client";

import React, { useState } from "react";
import { HelpCircle, Mail, MessageSquare, ChevronDown, ChevronUp, Phone } from "lucide-react";

const faqs = [
    {
        question: "How do I create an event in Gathering?",
        answer: "To create an event, open the Gathering mobile app or log into your web dashboard. Navigate to the 'Events' tab, click on the '+' icon or 'Create Event' button, fill in the event details (title, location, description, date/time), and invite your guests. You can pin a specific location on the map via Google Maps."
    },
    {
        question: "Why does the app request permission to access my location?",
        answer: "Gathering uses your location to show local events happening around you, calculate distances and routing directions, and allow event hosts to share real-time meeting coordinates. Location access can be toggled on or off in your phone's settings under Gathering permissions."
    },
    {
        question: "I am having trouble with audio or video calls. How do I fix it?",
        answer: "Our real-time streaming is powered by Agora. If you experience connection issues or audio/video failure, please check that you have a stable network connection, ensure camera/microphone permissions are enabled for Gathering in your device settings, and close other background apps that might be using the camera or mic."
    },
    {
        question: "How can I permanently delete my account and data?",
        answer: "You can request account deletion directly from the mobile app by going to Profile > Settings > Account Deletion. Once requested, your account and associated records will be permanently deleted within 24 hours."
    }
];

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-[#412667] mb-4">
                        <HelpCircle className="h-6 w-6" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                        App Support Center
                    </h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Need assistance with the Gathering app? Check our frequently asked questions below or contact us via email.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-5 w-5 text-[#1AA367]" />
                        <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-200">
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50/50 transition-colors"
                                >
                                    <span className="font-semibold text-slate-900 text-sm sm:text-base pr-4">
                                        {faq.question}
                                    </span>
                                    {openFaq === idx ? (
                                        <ChevronUp className="h-5 w-5 text-[#412667] shrink-0" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                                    )}
                                </button>
                                
                                {openFaq === idx && (
                                    <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base border-t border-slate-100/60 bg-slate-50/30 animate-in fade-in duration-200">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Extra Support Box */}
                    <div className="bg-gradient-to-r from-[#412667] to-[#593985] text-white p-6 rounded-3xl shadow-sm mt-8 text-center">
                        <h3 className="font-bold text-lg">Direct Support Inquiry</h3>
                        <p className="text-sm text-purple-200 mt-1">Our support representatives are active 24/7 to resolve technical, safety, or administrative tickets.</p>
                        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-base font-semibold text-[#67E9F1]">
                            <div className="flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                <a href="mailto:gatheringllc1@gmail.com" className="hover:underline">gatheringllc1@gmail.com</a>
                            </div>
                            <span className="hidden sm:inline text-purple-300">|</span>
                            <div className="flex items-center gap-2">
                                <Phone className="h-5 w-5" />
                                <a href="tel:+19725617918" className="hover:underline">+1 (972) 561-7918</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
