"use client";

import React, { useState } from "react";
import { HelpCircle, Mail, MessageSquare, Send, ChevronDown, ChevronUp, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        answer: "You can request account deletion directly from the mobile app by going to Profile > Settings > Account Deletion, or you can submit an online request through our Delete Account page. Once requested, your account and associated records will be permanently deleted within 24 hours."
    }
];

export default function SupportPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "general",
        message: ""
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setErrorMsg("Please fill in all required fields.");
            return;
        }

        setSubmitting(true);

        try {
            // Simulate API submission
            await new Promise(resolve => setTimeout(resolve, 1200));
            setSubmitSuccess(true);
            setFormData({ name: "", email: "", subject: "general", message: "" });
        } catch {
            setErrorMsg("Something went wrong. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-[#412667] mb-4">
                        <HelpCircle className="h-6 w-6" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                        App Support Center
                    </h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Need assistance with the Gathering app? Check our FAQs below or contact our team directly using the form.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: FAQs */}
                    <div className="lg:col-span-7 space-y-6">
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
                        <div className="bg-gradient-to-r from-[#412667] to-[#593985] text-white p-6 rounded-3xl shadow-sm mt-8">
                            <h3 className="font-bold text-lg">Direct Inquiries</h3>
                            <p className="text-sm text-purple-200 mt-1">Our support representatives are active 24/7 to resolve technical, safety, or administrative tickets.</p>
                            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#67E9F1]">
                                <Mail className="h-4 w-4" />
                                <a href="mailto:support@gatheringapp.com" className="hover:underline">support@gatheringapp.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">Submit a Ticket</h2>
                        <p className="text-sm text-slate-500 mb-6">Send us a message and we will respond within 12-24 hours.</p>

                        {submitSuccess ? (
                            <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-6 rounded-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
                                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                                    <CheckCircle className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Ticket Submitted!</h3>
                                    <p className="text-sm text-emerald-600 mt-1">We have received your support request and sent a confirmation email to your inbox.</p>
                                </div>
                                <Button 
                                    onClick={() => setSubmitSuccess(false)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white w-full rounded-xl"
                                >
                                    Submit Another Request
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {errorMsg && (
                                    <div className="bg-rose-50 border border-rose-100 text-rose-800 p-3.5 rounded-xl text-sm flex items-center gap-2 animate-in fade-in duration-200">
                                        <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#412667]/20 focus:border-[#412667] transition-all bg-slate-50/50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#412667]/20 focus:border-[#412667] transition-all bg-slate-50/50"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                        Query Category
                                    </label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#412667]/20 focus:border-[#412667] transition-all bg-slate-50/50"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="account">Account & Sign-In Issues</option>
                                        <option value="events">Event Coordination / Maps</option>
                                        <option value="av-stream">Video & Audio Calling</option>
                                        <option value="billing">Promotion & Billing</option>
                                        <option value="bug">Report a Bug / Technical Error</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                        Description
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Please provide details of your issue..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#412667]/20 focus:border-[#412667] transition-all bg-slate-50/50"
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-[#412667] hover:bg-[#321d50] text-white py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm font-semibold transition-all mt-2"
                                >
                                    {submitting ? (
                                        "Submitting..."
                                    ) : (
                                        <>
                                            Submit Ticket
                                            <Send className="h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
