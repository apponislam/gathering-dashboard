"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { EVENTS_DATA } from "@/data/demoEvents";
import Link from "next/link";

const ITEMS_PER_PAGE = 10;

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedDate, setSelectedDate] = useState("");

    // Filter events based on selected filters
    const filteredEvents = useMemo(() => {
        return EVENTS_DATA.filter((event) => {
            const statusMatch = selectedStatus === "all" || event.status === selectedStatus;
            const categoryMatch = selectedCategory === "all" || event.category === selectedCategory;
            const dateMatch = !selectedDate || event.date === selectedDate;
            return statusMatch && categoryMatch && dateMatch;
        });
    }, [selectedStatus, selectedCategory, selectedDate]);

    // Get unique categories and statuses for filters
    const categories = ["all", ...new Set(EVENTS_DATA.map((e) => e.category))];
    const statuses = ["all", ...new Set(EVENTS_DATA.map((e) => e.status))];

    // Calculate pagination
    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
    const paginatedEvents = useMemo(() => {
        const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredEvents.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    }, [currentPage, filteredEvents]);

    // Generate page numbers for pagination
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

    const handleClearFilters = () => {
        setSelectedStatus("all");
        setSelectedCategory("all");
        setSelectedDate("");
        setCurrentPage(1);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Approved":
                return "bg-green-100 text-green-800";
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="">
            <div className="">
                {/* Header */}
                <h1 className="text-3xl font-bold mb-6">Events</h1>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status === "all" ? "Status" : status}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category === "all" ? "Category" : category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-40" />

                    <Button variant="outline" onClick={handleClearFilters}>
                        Clear
                    </Button>
                </div>

                {/* Table */}
                <Card className="overflow-hidden p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Event</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Organizer</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedEvents.map((event, index) => (
                                    <tr key={event.id} className={`border-b ${index % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-muted/50 transition-colors`}>
                                        <td className="px-6 py-4 text-sm font-medium text-foreground">{event.event}</td>
                                        <td className="px-6 py-4 text-sm text-blue-600">{event.category}</td>
                                        <td className="px-6 py-4 text-sm text-foreground">{event.organizer}</td>
                                        <td className="px-6 py-4 text-sm text-foreground">{event.date}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(event.status)}`}>{event.status}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/events/${event.id}`}>
                                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer">
                                                    View
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Pagination */}
                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {paginatedEvents.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredEvents.length)} of {filteredEvents.length} events
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
            </div>
        </div>
    );
}
