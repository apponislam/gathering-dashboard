"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assuming you have Button component
import { EVENTS_DATA } from "@/data/demoEvents";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

export default function OrganizerEventsPage() {
    const [currentPage, setCurrentPage] = useState(1);

    // Get upcoming events
    const upcomingEvents = useMemo(() => {
        const today = new Date().toISOString().split("T")[0];
        return EVENTS_DATA.filter((event) => event.date >= today).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, []);

    // Calculate pagination
    const totalPages = Math.ceil(upcomingEvents.length / ITEMS_PER_PAGE);
    const paginatedEvents = useMemo(() => {
        const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        return upcomingEvents.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    }, [currentPage, upcomingEvents]);

    // Generate page numbers for pagination (same as yours)
    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxPages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
        const endPage = Math.min(totalPages, startPage + maxPages - 1);

        if (endPage - startPage < maxPages - 1) {
            startPage = Math.max(1, endPage - maxPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }, [currentPage, totalPages]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <Card className="p-6">
            {/* Title and Subtitle */}
            <div className="mb-6">
                <h1 className="text-lg font-bold text-[#0D121C]">Upcoming Events</h1>
                <p className="text-sm text-[#64748B] mt-1">Next events scheduled</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Event</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedEvents.length > 0 ? (
                            paginatedEvents.map((event) => (
                                <tr key={event.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-900">{event.event}</td>
                                    <td className="px-6 py-4 text-sm text-blue-600">{event.category}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{event.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded ${event.status === "Approved" ? "bg-green-100 text-green-800" : event.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{event.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/events/${event.id}`}>
                                            <button className="text-sm text-blue-600 hover:text-blue-800">View</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No upcoming events
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination - Exact same as yours */}
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing {paginatedEvents.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, upcomingEvents.length)} of {upcomingEvents.length} events
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </Button>
                    {pageNumbers.map((page) => (
                        <Button key={page} variant={currentPage === page ? "default" : "outline"} onClick={() => handlePageChange(page)} className={`w-10 h-10 ${currentPage === page ? "bg-[#5C22BF] text-white border-[#5C22BF]" : ""}`}>
                            {page}
                        </Button>
                    ))}
                    <Button variant="outline" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </Button>
                </div>
            </div>
        </Card>
    );
}
