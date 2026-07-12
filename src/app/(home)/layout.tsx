"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Shield, FileText, HelpCircle, UserX, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: "Support", href: "/support", icon: HelpCircle },
        { name: "Privacy Policy", href: "/privacy-policy", icon: Shield },
        { name: "Terms of Service", href: "/terms-of-service", icon: FileText },
        { name: "Delete Account", href: "/delete-account", icon: UserX },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#412667] to-[#593985] text-white shadow-md shadow-purple-950/20 group-hover:scale-105 transition-all">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold tracking-tight text-[#412667]">
                                        Gathering
                                    </span>
                                    <span className="text-[10px] font-semibold tracking-wider text-[#1AA367] uppercase -mt-1">
                                        App Portal
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-6">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors hover:text-[#412667] ${
                                        isActive(item.href)
                                            ? "text-[#412667] underline decoration-[#1AA367] decoration-2 underline-offset-8 font-semibold"
                                            : "text-slate-600"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Call to Action */}
                        <div className="hidden md:flex items-center gap-4">
                            <Button asChild className="bg-[#412667] hover:bg-[#321d50] text-white rounded-xl shadow-sm transition-all duration-200 hover:translate-x-0.5">
                                <Link href="/" className="flex items-center gap-1">
                                    Dashboard
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex md:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#412667]/20"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                <span className="sr-only">Open main menu</span>
                                {mobileMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Panel */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner animate-in slide-in-from-top-4 duration-200">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                                        isActive(item.href)
                                            ? "bg-[#412667]/5 text-[#412667]"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-[#412667]"
                                    }`}
                                >
                                    <Icon className={`h-5 w-5 ${isActive(item.href) ? "text-[#1AA367]" : "text-slate-400"}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="pt-4 border-t border-slate-100 px-3">
                            <Button asChild className="w-full bg-[#412667] hover:bg-[#321d50] text-white rounded-lg flex items-center justify-center gap-1">
                                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                                    Go to Dashboard
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-slate-800 pb-8 mb-8">
                        <div>
                            <Link href="/" className="flex items-center gap-2 group mb-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#412667] to-[#593985] text-white shadow-md">
                                    <Calendar className="h-4 w-4" />
                                </div>
                                <span className="text-lg font-bold tracking-tight text-white">
                                    Gathering
                                </span>
                            </Link>
                            <p className="text-sm text-slate-400 max-w-xs">
                                The ultimate platform for managing, organizing, and connecting at local events.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm hover:text-white transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                        <div className="md:text-right">
                            <p className="text-sm text-slate-500">
                                Need direct support?
                            </p>
                            <Link href="/support" className="text-sm font-semibold text-[#67E9F1] hover:underline">
                                contact@gatheringapp.com
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
                        <p>© {new Date().getFullYear()} Gathering Inc. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link href="/privacy-policy" className="hover:text-slate-400">Privacy Policy</Link>
                            <span>•</span>
                            <Link href="/terms-of-service" className="hover:text-slate-400">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
