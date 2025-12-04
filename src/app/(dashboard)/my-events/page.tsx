"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import EventCard from "@/components/dashboard/my-events/EventCard";
import { CreateEventModal } from "@/components/dashboard/my-events/CreateEvent";

interface Event {
    id: string;
    title: string;
    category: string;
    description: string;
    date: string;
    time: string;
    location: string;
    sold: number;
    total: number;
    revenue: number;
    views: number;
    engagement: number;
    image: string;
    status: string;
}

const mockEvents: Event[] = [
    {
        id: "1",
        title: "Tech Conference 20",
        category: "Conference",
        description: "Annual technology conference featuring keynotes from industry leaders, workshops, and networking opportunities.",
        date: "8/22/2025",
        time: "09:00",
        location: "Convention Center, San Francisco",
        sold: 1650,
        total: 2000,
        revenue: 493350,
        views: 8920,
        engagement: 72,
        image: "/eventpicture.png",
        status: "published",
    },
    {
        id: "2",
        title: "Tech Conference 20",
        category: "Conference",
        description: "Annual technology conference featuring keynotes from industry leaders, workshops, and networking opportunities.",
        date: "8/22/2025",
        time: "09:00",
        location: "Convention Center, San Francisco",
        sold: 1650,
        total: 2000,
        revenue: 493350,
        views: 8920,
        engagement: 72,
        image: "/eventpicture.png",
        status: "published",
    },
    {
        id: "3",
        title: "Tech Conference 20",
        category: "Conference",
        description: "Annual technology conference featuring keynotes from industry leaders, workshops, and networking opportunities.",
        date: "8/22/2025",
        time: "09:00",
        location: "Convention Center, San Francisco",
        sold: 1650,
        total: 2000,
        revenue: 493350,
        views: 8920,
        engagement: 72,
        image: "/eventpicture.png",
        status: "draft",
    },
    {
        id: "4",
        title: "Tech Conference 20",
        category: "Conference",
        description: "Annual technology conference featuring keynotes from industry leaders, workshops, and networking opportunities.",
        date: "8/22/2025",
        time: "09:00",
        location: "Convention Center, San Francisco",
        sold: 1650,
        total: 2000,
        revenue: 493350,
        views: 8920,
        engagement: 72,
        image: "/eventpicture.png",
        status: "published",
    },
    {
        id: "5",
        title: "Tech Conference 20",
        category: "Conference",
        description: "Annual technology conference featuring keynotes from industry leaders, workshops, and networking opportunities.",
        date: "8/22/2025",
        time: "09:00",
        location: "Convention Center, San Francisco",
        sold: 1650,
        total: 2000,
        revenue: 493350,
        views: 8920,
        engagement: 72,
        image: "/eventpicture.png",
        status: "published",
    },
    {
        id: "6",
        title: "Tech Conference 20",
        category: "Conference",
        description: "Annual technology conference featuring keynotes from industry leaders, workshops, and networking opportunities.",
        date: "8/22/2025",
        time: "09:00",
        location: "Convention Center, San Francisco",
        sold: 1650,
        total: 2000,
        revenue: 493350,
        views: 8920,
        engagement: 72,
        image: "/eventpicture.png",
        status: "published",
    },
    {
        id: "7",
        title: "Tech Conference 20",
        category: "Conference",
        description: "Annual technology conference featuring keynotes from industry leaders, workshops, and networking opportunities.",
        date: "8/22/2025",
        time: "09:00",
        location: "Convention Center, San Francisco",
        sold: 1650,
        total: 2000,
        revenue: 493350,
        views: 8920,
        engagement: 72,
        image: "/eventpicture.png",
        status: "published",
    },
    {
        id: "8",
        title: "Tech Conference 20",
        category: "Conference",
        description: "Annual technology conference featuring keynotes from industry leaders, workshops, and networking opportunities.",
        date: "8/22/2025",
        time: "09:00",
        location: "Convention Center, San Francisco",
        sold: 1650,
        total: 2000,
        revenue: 493350,
        views: 8920,
        engagement: 72,
        image: "/eventpicture.png",
        status: "published",
    },
];

const ITEMS_PER_PAGE = 4;

export default function EventsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredEvents = useMemo(() => {
        return mockEvents.filter((event) => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === "all" || event.status === statusFilter;
            const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }, [searchTerm, statusFilter, categoryFilter]);

    const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Generate page numbers (same as your admin page - max 5 pages)
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

    // Reset to page 1 when filters change
    const handleFilterChange = (callback: () => void) => {
        setCurrentPage(1);
        callback();
    };

    return (
        <main>
            <div className=" mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-4xl font-bold text-foreground">My Events</h1>
                    <Button onClick={() => setIsOpen(true)} className="bg-[#5C22BF] hover:bg-[#5C22BF] text-white gap-2">
                        <Plus className="w-4 h-4" />
                        Create Event
                    </Button>
                </div>
                <CreateEventModal open={isOpen} onOpenChange={setIsOpen} />

                {/* Event count */}
                <div className="text-muted-foreground mb-8">
                    <p className="text-sm">
                        total <span className="font-bold">{filteredEvents.length}</span> events
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search events..." className="pl-10 bg-[#F3F3F5] border-border" value={searchTerm} onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))} />
                    </div>

                    <Select
                        value={statusFilter}
                        onValueChange={(value) => {
                            handleFilterChange(() => setStatusFilter(value));
                        }}
                    >
                        <SelectTrigger className="w-full md:w-40 bg-[#F3F3F5] border-border">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select
                        value={categoryFilter}
                        onValueChange={(value) => {
                            handleFilterChange(() => setCategoryFilter(value));
                        }}
                    >
                        <SelectTrigger className="w-full md:w-40 bg-[#F3F3F5] border-border">
                            <SelectValue placeholder="All Categorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categorie</SelectItem>
                            <SelectItem value="Conference">Conference</SelectItem>
                            <SelectItem value="Workshop">Workshop</SelectItem>
                            <SelectItem value="Webinar">Webinar</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {paginatedEvents.length > 0 ? (
                        paginatedEvents.map((event) => <EventCard key={event.id} event={event} />)
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-muted-foreground">No events found</p>
                        </div>
                    )}
                </div>

                {/* Pagination - EXACT SAME as your admin page */}
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
        </main>
    );
}
