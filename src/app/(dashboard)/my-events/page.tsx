// "use client";

// import { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Plus, Search } from "lucide-react";
// import EventCard from "@/components/dashboard/my-events/EventCard";
// import { CreateEventModal } from "@/components/dashboard/my-events/CreateEvent";
// import { SidebarTrigger } from "@/components/ui/sidebar";
// import { useGetMyEventsQuery, EVENT_STATUS, EVENT_CATEGORIES } from "@/redux/features/events/eventsApi";

// const ITEMS_PER_PAGE = 4;

// export default function EventsPage() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [statusFilter, setStatusFilter] = useState("all");
//     const [categoryFilter, setCategoryFilter] = useState("all");
//     const [currentPage, setCurrentPage] = useState(1);

//     // Fetch events from API
//     const {
//         data: eventsData,
//         isLoading,
//         isError,
//         refetch,
//     } = useGetMyEventsQuery({
//         page: currentPage,
//         limit: ITEMS_PER_PAGE,
//         searchTerm: searchTerm || undefined,
//         status: statusFilter !== "all" ? (statusFilter as EVENT_STATUS) : undefined,
//         category: categoryFilter !== "all" ? categoryFilter : undefined,
//     });

//     console.log("API Response:", eventsData);

//     // Send raw API data to EventCard - NO TRANSFORMATION HERE
//     const events = useMemo(() => {
//         if (!eventsData?.data?.data) return [];
//         return eventsData.data.data; // Send raw API data
//     }, [eventsData]);

//     const meta = eventsData?.data?.meta;
//     const totalEvents = meta?.total || 0;
//     const totalPages = meta?.totalPages || 1;

//     // Generate page numbers
//     const pageNumbers = useMemo(() => {
//         const pages = [];
//         const maxPages = 5;
//         let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
//         const endPage = Math.min(totalPages, startPage + maxPages - 1);

//         if (endPage - startPage < maxPages - 1) {
//             startPage = Math.max(1, endPage - maxPages + 1);
//         }

//         for (let i = startPage; i <= endPage; i++) {
//             pages.push(i);
//         }
//         return pages;
//     }, [currentPage, totalPages]);

//     const handlePageChange = (page: number) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     // Reset to page 1 when filters change
//     const handleFilterChange = (callback: () => void) => {
//         setCurrentPage(1);
//         callback();
//     };

//     if (isLoading) {
//         return (
//             <main>
//                 <div className="mx-auto">
//                     <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between mb-2">
//                         <div className="flex items-center gap-2">
//                             <SidebarTrigger className="md:hidden block" />
//                             <h1 className="text-4xl font-bold text-foreground">My Events</h1>
//                         </div>
//                         <Button className="bg-[#5C22BF] hover:bg-[#5C22BF] text-white gap-2">
//                             <Plus className="w-4 h-4" />
//                             Create Event
//                         </Button>
//                     </div>
//                     <div className="text-center py-12">
//                         <p className="text-muted-foreground">Loading events...</p>
//                     </div>
//                 </div>
//             </main>
//         );
//     }

//     if (isError) {
//         return (
//             <main>
//                 <div className="mx-auto">
//                     <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between mb-2">
//                         <div className="flex items-center gap-2">
//                             <SidebarTrigger className="md:hidden block" />
//                             <h1 className="text-4xl font-bold text-foreground">My Events</h1>
//                         </div>
//                         <Button className="bg-[#5C22BF] hover:bg-[#5C22BF] text-white gap-2">
//                             <Plus className="w-4 h-4" />
//                             Create Event
//                         </Button>
//                     </div>
//                     <div className="text-center py-12">
//                         <p className=" text-red-500">Error loading events. Please try again.</p>
//                         <Button onClick={() => refetch()} variant="outline" className="mt-4">
//                             Retry
//                         </Button>
//                     </div>
//                 </div>
//             </main>
//         );
//     }

//     return (
//         <main>
//             <div className="mx-auto">
//                 {/* Header */}
//                 <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between mb-2">
//                     <div className="flex items-center gap-2">
//                         <SidebarTrigger className="md:hidden block" />
//                         <h1 className="text-4xl font-bold text-foreground">My Events</h1>
//                     </div>

//                     <Button onClick={() => setIsOpen(true)} className="bg-[#5C22BF] hover:bg-[#5C22BF] text-white gap-2">
//                         <Plus className="w-4 h-4" />
//                         Create Event
//                     </Button>
//                 </div>
//                 <CreateEventModal open={isOpen} onOpenChange={setIsOpen} />

//                 {/* Event count */}
//                 <div className="text-muted-foreground mb-8">
//                     <p className="text-sm">
//                         total <span className="font-bold">{totalEvents}</span> events
//                     </p>
//                 </div>

//                 {/* Filters and Search */}
//                 <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
//                     <div className="relative flex-1">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                         <Input placeholder="Search events..." className="pl-10 bg-[#F3F3F5] border-border" value={searchTerm} onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))} />
//                     </div>

//                     <Select
//                         value={statusFilter}
//                         onValueChange={(value) => {
//                             handleFilterChange(() => setStatusFilter(value));
//                         }}
//                     >
//                         <SelectTrigger className="w-full md:w-40 bg-[#F3F3F5] border-border">
//                             <SelectValue placeholder="All Status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All Status</SelectItem>
//                             {Object.values(EVENT_STATUS).map((status) => (
//                                 <SelectItem key={status} value={status}>
//                                     {status.charAt(0).toUpperCase() + status.slice(1)}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>

//                     <Select
//                         value={categoryFilter}
//                         onValueChange={(value) => {
//                             handleFilterChange(() => setCategoryFilter(value));
//                         }}
//                     >
//                         <SelectTrigger className="w-full md:w-40 bg-[#F3F3F5] border-border">
//                             <SelectValue placeholder="All Categories" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All Categories</SelectItem>
//                             {Object.values(EVENT_CATEGORIES).map((category) => {
//                                 // Format the category for display (e.g., "food_drink" → "Food Drink")
//                                 const formattedCategory = category
//                                     .split("_")
//                                     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                                     .join(" ");

//                                 return (
//                                     <SelectItem key={category} value={category}>
//                                         {formattedCategory}
//                                     </SelectItem>
//                                 );
//                             })}
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 {/* Events Grid - SEND RAW API DATA */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                     {events.length > 0 ? (
//                         events.map((event: any) => <EventCard key={event._id} event={event} />)
//                     ) : (
//                         <div className="col-span-full text-center py-12">
//                             <p className="text-muted-foreground">No events found</p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Pagination */}
//                 <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                     <div className="text-sm text-muted-foreground">
//                         Showing {events.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, totalEvents)} of {totalEvents} events
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         <Button variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//                             Previous
//                         </Button>
//                         {pageNumbers.map((page) => (
//                             <Button key={page} variant={currentPage === page ? "default" : "outline"} onClick={() => handlePageChange(page)} className={`w-10 h-10 ${currentPage === page ? "bg-[#5C22BF] text-white border-[#5C22BF]" : ""}`}>
//                                 {page}
//                             </Button>
//                         ))}
//                         <Button variant="outline" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//                             Next
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// }

"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import EventCard from "@/components/dashboard/my-events/EventCard";
import { CreateEventModal } from "@/components/dashboard/my-events/CreateEvent";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetMyEventsQuery, EVENT_STATUS, EVENT_CATEGORIES } from "@/redux/features/events/eventsApi";

const ITEMS_PER_PAGE = 4;

export default function EventsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch events from API
    const {
        data: eventsData,
        isLoading,
        isError,
        refetch,
    } = useGetMyEventsQuery({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        searchTerm: searchTerm || undefined,
        status: statusFilter !== "all" ? (statusFilter as EVENT_STATUS) : undefined,
        category: categoryFilter !== "all" ? categoryFilter : undefined,
    });

    console.log("API Response:", eventsData);

    // Send raw API data to EventCard
    const events = useMemo(() => {
        if (!eventsData?.data?.data) return [];
        return eventsData.data.data;
    }, [eventsData]);

    const meta = eventsData?.data?.meta;
    const totalEvents = meta?.total || 0;
    const totalPages = meta?.totalPages || 1;

    // Generate page numbers with ellipsis - FIXED VERSION
    const paginationItems = useMemo(() => {
        if (totalPages <= 1) return [1];

        const items = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages are less than max visible
            for (let i = 1; i <= totalPages; i++) {
                items.push(i);
            }
        } else {
            // Always show first page
            items.push(1);

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                startPage = 2;
                endPage = Math.min(4, totalPages - 1);
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                startPage = Math.max(2, totalPages - 3);
                endPage = totalPages - 1;
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                items.push("ellipsis-start");
            }

            // Add visible pages
            for (let i = startPage; i <= endPage; i++) {
                items.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                items.push("ellipsis-end");
            }

            // Always show last page
            if (totalPages > 1) {
                items.push(totalPages);
            }
        }

        return items.filter(
            (item, index, self) =>
                // Remove duplicates
                typeof item === "string" || self.indexOf(item) === index
        );
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

    if (isLoading) {
        return (
            <main>
                <div className="mx-auto">
                    <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="md:hidden block" />
                            <h1 className="text-4xl font-bold text-foreground">My Events</h1>
                        </div>
                        <Button className="bg-[#5C22BF] hover:bg-[#5C22BF] text-white gap-2">
                            <Plus className="w-4 h-4" />
                            Create Event
                        </Button>
                    </div>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Loading events...</p>
                    </div>
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main>
                <div className="mx-auto">
                    <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="md:hidden block" />
                            <h1 className="text-4xl font-bold text-foreground">My Events</h1>
                        </div>
                        <Button className="bg-[#5C22BF] hover:bg-[#5C22BF] text-white gap-2">
                            <Plus className="w-4 h-4" />
                            Create Event
                        </Button>
                    </div>
                    <div className="text-center py-12">
                        <p className=" text-red-500">Error loading events. Please try again.</p>
                        <Button onClick={() => refetch()} variant="outline" className="mt-4">
                            Retry
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="md:hidden block" />
                        <h1 className="text-4xl font-bold text-foreground">My Events</h1>
                    </div>

                    <Button onClick={() => setIsOpen(true)} className="bg-[#5C22BF] hover:bg-[#5C22BF] text-white gap-2">
                        <Plus className="w-4 h-4" />
                        Create Event
                    </Button>
                </div>
                <CreateEventModal open={isOpen} onOpenChange={setIsOpen} />

                {/* Event count */}
                <div className="text-muted-foreground mb-8">
                    <p className="text-sm">
                        total <span className="font-bold">{totalEvents}</span> events
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
                            {Object.values(EVENT_STATUS).map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={categoryFilter}
                        onValueChange={(value) => {
                            handleFilterChange(() => setCategoryFilter(value));
                        }}
                    >
                        <SelectTrigger className="w-full md:w-40 bg-[#F3F3F5] border-border">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {Object.values(EVENT_CATEGORIES).map((category) => {
                                // Format the category for display (e.g., "food_drink" → "Food Drink")
                                const formattedCategory = category
                                    .split("_")
                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(" ");

                                return (
                                    <SelectItem key={category} value={category}>
                                        {formattedCategory}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {events.length > 0 ? (
                        events.map((event: any) => <EventCard key={event._id} event={event} />)
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-muted-foreground">No events found</p>
                        </div>
                    )}
                </div>

                {/* Pagination with ellipsis */}
                {totalPages > 1 && (
                    <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="text-sm text-muted-foreground">
                            Showing {events.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, totalEvents)} of {totalEvents} events
                        </div>
                        <div className="flex flex-wrap gap-1">
                            <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                <ChevronLeft className="w-4 h-4" />
                            </Button>

                            {paginationItems.map((item, index) => {
                                if (item === "ellipsis-start" || item === "ellipsis-end") {
                                    return (
                                        <Button key={`${item}-${index}`} variant="outline" size="icon" disabled className="w-10 h-10">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    );
                                }

                                return (
                                    <Button key={`page-${item}`} variant={currentPage === item ? "default" : "outline"} onClick={() => handlePageChange(item as number)} className={`w-10 h-10 ${currentPage === item ? "bg-[#5C22BF] text-white border-[#5C22BF]" : ""}`}>
                                        {item}
                                    </Button>
                                );
                            })}

                            <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
