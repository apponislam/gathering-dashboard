// "use client";

// import { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input"; // Assuming you have an Input component
// import { EVENTS_DATA } from "@/data/demoEvents";
// import Link from "next/link";
// import { SidebarTrigger } from "@/components/ui/sidebar";

// const ITEMS_PER_PAGE = 10;

// export default function Page() {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedStatus, setSelectedStatus] = useState("all");
//     const [selectedCategory, setSelectedCategory] = useState("all");
//     const [selectedDate, setSelectedDate] = useState("");

//     // Filter events based on selected filters
//     const filteredEvents = useMemo(() => {
//         return EVENTS_DATA.filter((event) => {
//             const statusMatch = selectedStatus === "all" || event.status === selectedStatus;
//             const categoryMatch = selectedCategory === "all" || event.category === selectedCategory;
//             const dateMatch = !selectedDate || event.date === selectedDate;
//             return statusMatch && categoryMatch && dateMatch;
//         });
//     }, [selectedStatus, selectedCategory, selectedDate]);

//     // Get unique categories and statuses for filters
//     const categories = ["all", ...new Set(EVENTS_DATA.map((e) => e.category))];
//     const statuses = ["all", ...new Set(EVENTS_DATA.map((e) => e.status))];

//     // Calculate pagination
//     const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
//     const paginatedEvents = useMemo(() => {
//         const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
//         return filteredEvents.slice(startIdx, startIdx + ITEMS_PER_PAGE);
//     }, [currentPage, filteredEvents]);

//     // Generate page numbers for pagination
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

//     const handleClearFilters = () => {
//         setSelectedStatus("all");
//         setSelectedCategory("all");
//         setSelectedDate("");
//         setCurrentPage(1);
//     };

//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case "Approved":
//                 return "bg-green-100 text-green-800";
//             case "Pending":
//                 return "bg-yellow-100 text-yellow-800";
//             case "Rejected":
//                 return "bg-red-100 text-red-800";
//             default:
//                 return "bg-gray-100 text-gray-800";
//         }
//     };

//     return (
//         <div className="">
//             <div className="">
//                 {/* Header */}
//                 <div className="flex items-center gap-2 mb-6">
//                     <SidebarTrigger className="md:hidden block" />
//                     <h1 className="text-3xl font-bold ">Events</h1>
//                 </div>

//                 {/* Filters */}
//                 <div className="flex flex-wrap gap-3 mb-6">
//                     <Select value={selectedStatus} onValueChange={setSelectedStatus}>
//                         <SelectTrigger className="w-32">
//                             <SelectValue placeholder="Status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {statuses.map((status) => (
//                                 <SelectItem key={status} value={status}>
//                                     {status === "all" ? "Status" : status}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>

//                     <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                         <SelectTrigger className="w-40">
//                             <SelectValue placeholder="Category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             {categories.map((category) => (
//                                 <SelectItem key={category} value={category}>
//                                     {category === "all" ? "Category" : category}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>

//                     <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="w-40" />

//                     <Button variant="outline" onClick={handleClearFilters}>
//                         Clear
//                     </Button>
//                 </div>

//                 {/* Table */}
//                 <Card className="overflow-hidden p-0">
//                     <div className="overflow-x-auto">
//                         <table className="w-full">
//                             <thead>
//                                 <tr className="border-b bg-muted/50">
//                                     <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Event</th>
//                                     <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
//                                     <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Organizer</th>
//                                     <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
//                                     <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
//                                     <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {paginatedEvents.map((event, index) => (
//                                     <tr key={event.id} className={`border-b ${index % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-muted/50 transition-colors`}>
//                                         <td className="px-6 py-4 text-sm font-medium text-foreground">{event.event}</td>
//                                         <td className="px-6 py-4 text-sm text-blue-600">{event.category}</td>
//                                         <td className="px-6 py-4 text-sm text-foreground">{event.organizer}</td>
//                                         <td className="px-6 py-4 text-sm text-foreground">{event.date}</td>
//                                         <td className="px-6 py-4">
//                                             <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(event.status)}`}>{event.status}</span>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <Link href={`/events/${event.id}`}>
//                                                 <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer">
//                                                     View
//                                                 </Button>
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </Card>

//                 {/* Pagination */}
//                 <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                     <div className="text-sm text-muted-foreground">
//                         Showing {paginatedEvents.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredEvents.length)} of {filteredEvents.length} events
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
//         </div>
//     );
// }

"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { EVENT_CATEGORIES, EVENT_STATUS, useGetEventsQuery } from "@/redux/features/events/eventsApi";

// Interface for API event data
interface ApiEvent {
    _id: string;
    title: string;
    description?: string;
    category: EVENT_CATEGORIES;
    status: EVENT_STATUS;
    startDate: string;
    endDate?: string;
    organizerId: {
        _id: string;
        name: string;
        email: string;
    };
    location?: {
        type: string;
        coordinates: [number, number];
    };
    address?: string;
    ticketsSold?: number;
    capacity?: number;
    ticketPrice?: number;
    images?: string[];
    tags?: string[];
}

// Local event interface for UI
interface LocalEvent {
    id: string;
    event: string;
    category: string;
    organizer: string;
    date: string;
    status: EVENT_STATUS;
}

// Convert API event to local event format
const convertApiEventToLocal = (apiEvent: ApiEvent): LocalEvent => {
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM dd, yyyy");
        } catch {
            return "N/A";
        }
    };

    return {
        id: apiEvent._id,
        event: apiEvent.title || "Untitled Event",
        category: apiEvent.category || "other",
        organizer: apiEvent.organizerId?.name || "Unknown Organizer",
        date: formatDate(apiEvent.startDate),
        status: apiEvent.status,
    };
};

// Pagination component with ... for many pages
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 4) {
            // Show all pages if total pages is 4 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            // Calculate start and end
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're at the beginning
            if (currentPage <= 2) {
                end = 3;
            }

            // Adjust if we're at the end
            if (currentPage >= totalPages - 1) {
                start = totalPages - 2;
            }

            // Add ellipsis after first page if needed
            if (start > 2) {
                pages.push("...");
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                if (i > 1 && i < totalPages) {
                    pages.push(i);
                }
            }

            // Add ellipsis before last page if needed
            if (end < totalPages - 1) {
                pages.push("...");
            }

            // Always show last page if there is more than 1 page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
            </Button>

            {getPageNumbers().map((page, index) =>
                page === "..." ? (
                    <Button key={`ellipsis-${index}`} variant="outline" disabled className="w-10 h-10">
                        ...
                    </Button>
                ) : (
                    <Button key={page} variant={currentPage === page ? "default" : "outline"} onClick={() => onPageChange(page as number)} className={`w-10 h-10 ${currentPage === page ? "bg-[#5C22BF] text-white border-[#5C22BF]" : ""}`}>
                        {page}
                    </Button>
                )
            )}

            <Button variant="outline" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </Button>
        </div>
    );
};

// Get category display name
const getCategoryDisplayName = (category: string): string => {
    const categoryMap: Record<string, string> = {
        [EVENT_CATEGORIES.MUSIC]: "Music",
        [EVENT_CATEGORIES.SPORTS]: "Sports",
        [EVENT_CATEGORIES.BUSINESS]: "Business",
        [EVENT_CATEGORIES.EDUCATION]: "Education",
        [EVENT_CATEGORIES.FOOD_DRINK]: "Food & Drink",
        [EVENT_CATEGORIES.ARTS_CULTURE]: "Arts & Culture",
        [EVENT_CATEGORIES.TECHNOLOGY]: "Technology",
        [EVENT_CATEGORIES.HEALTH_WELLNESS]: "Health & Wellness",
        [EVENT_CATEGORIES.ENTERTAINMENT]: "Entertainment",
        [EVENT_CATEGORIES.COMMUNITY]: "Community",
        [EVENT_CATEGORIES.FASHION]: "Fashion",
        [EVENT_CATEGORIES.TRAVEL]: "Travel",
        [EVENT_CATEGORIES.FAMILY]: "Family",
        [EVENT_CATEGORIES.CHARITY]: "Charity",
        [EVENT_CATEGORIES.RELIGIOUS]: "Religious",
        [EVENT_CATEGORIES.OTHER]: "Other",
    };

    return categoryMap[category] || category;
};

// Get all category options
const getCategoryOptions = () => {
    return [
        "all",
        EVENT_CATEGORIES.MUSIC,
        EVENT_CATEGORIES.SPORTS,
        EVENT_CATEGORIES.BUSINESS,
        EVENT_CATEGORIES.EDUCATION,
        EVENT_CATEGORIES.FOOD_DRINK,
        EVENT_CATEGORIES.ARTS_CULTURE,
        EVENT_CATEGORIES.TECHNOLOGY,
        EVENT_CATEGORIES.HEALTH_WELLNESS,
        EVENT_CATEGORIES.ENTERTAINMENT,
        EVENT_CATEGORIES.COMMUNITY,
        EVENT_CATEGORIES.FASHION,
        EVENT_CATEGORIES.TRAVEL,
        EVENT_CATEGORIES.FAMILY,
        EVENT_CATEGORIES.CHARITY,
        EVENT_CATEGORIES.RELIGIOUS,
        EVENT_CATEGORIES.OTHER,
    ];
};

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    // RTK Query hooks
    const {
        data: eventsData,
        isLoading,
        isError,
        refetch,
    } = useGetEventsQuery({
        page: currentPage,
        limit: 10,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        status: selectedStatus !== "all" ? (selectedStatus as EVENT_STATUS) : undefined,
        startDate: selectedDate || undefined,
        searchTerm: searchTerm || undefined,
    });

    // Get events data from API response
    const apiEvents = useMemo(() => {
        return eventsData?.data?.data || [];
    }, [eventsData]);
    const meta = eventsData?.data?.meta;

    // Convert API events to local events
    const localEvents = useMemo(() => {
        return apiEvents.map(convertApiEventToLocal);
    }, [apiEvents]);

    // Get category options
    const categoryOptions = getCategoryOptions();

    // Calculate pagination info
    const totalPages = meta?.totalPages || 1;
    const totalEvents = meta?.total || 0;
    const showingFrom = (currentPage - 1) * 10 + 1;
    const showingTo = Math.min(currentPage * 10, totalEvents);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Handle filter changes - reset to page 1
    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
        setCurrentPage(1);
    };

    const handleDateChange = (value: string) => {
        setSelectedDate(value);
        setCurrentPage(1);
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSelectedStatus("all");
        setSelectedCategory("all");
        setSelectedDate("");
        setSearchTerm("");
        setCurrentPage(1);
    };

    const getStatusColor = (status: EVENT_STATUS) => {
        switch (status) {
            case EVENT_STATUS.APPROVED:
                return "bg-green-100 text-green-800";
            case EVENT_STATUS.PENDING:
                return "bg-yellow-100 text-yellow-800";
            case EVENT_STATUS.REJECTED:
                return "bg-red-100 text-red-800";
            case EVENT_STATUS.PUBLISHED:
                return "bg-blue-100 text-blue-800";
            case EVENT_STATUS.ARCHIVED:
                return "bg-gray-100 text-gray-800";
            case EVENT_STATUS.COMPLETED:
                return "bg-purple-100 text-purple-800";
            case EVENT_STATUS.CANCELLED:
                return "bg-red-50 text-red-700";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusLabel = (status: EVENT_STATUS) => {
        switch (status) {
            case EVENT_STATUS.APPROVED:
                return "Approved";
            case EVENT_STATUS.PENDING:
                return "Pending";
            case EVENT_STATUS.REJECTED:
                return "Rejected";
            case EVENT_STATUS.PUBLISHED:
                return "Published";
            case EVENT_STATUS.ARCHIVED:
                return "Archived";
            case EVENT_STATUS.COMPLETED:
                return "Completed";
            case EVENT_STATUS.CANCELLED:
                return "Cancelled";
            default:
                return status;
        }
    };

    if (isError) {
        return (
            <div className="p-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>Failed to load events. Please try again.</AlertDescription>
                </Alert>
                <Button onClick={() => refetch()} className="mt-4">
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="">
            <div className="">
                {/* Header */}
                <div className="flex items-center gap-2 mb-6">
                    <SidebarTrigger className="md:hidden block" />
                    <h1 className="text-3xl font-bold ">Events</h1>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {/* Search Input */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input placeholder="Search events..." className="pl-10 w-48" value={searchTerm} onChange={(e) => handleSearchChange(e.target.value)} />
                    </div>

                    {/* Status Filter */}
                    <Select value={selectedStatus} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value={EVENT_STATUS.PENDING}>Pending</SelectItem>
                            <SelectItem value={EVENT_STATUS.APPROVED}>Approved</SelectItem>
                            <SelectItem value={EVENT_STATUS.PUBLISHED}>Published</SelectItem>
                            <SelectItem value={EVENT_STATUS.CANCELLED}>Cancelled</SelectItem>
                            <SelectItem value={EVENT_STATUS.ARCHIVED}>Archived</SelectItem>
                            <SelectItem value={EVENT_STATUS.COMPLETED}>Completed</SelectItem>
                            <SelectItem value={EVENT_STATUS.REJECTED}>Rejected</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Category Filter */}
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categoryOptions
                                .filter((cat) => cat !== "all")
                                .map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {getCategoryDisplayName(category)}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>

                    {/* Date Filter */}
                    <Input type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} className="w-40" />

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
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                            Loading events...
                                        </td>
                                    </tr>
                                ) : localEvents.length > 0 ? (
                                    localEvents.map((event: any, index: any) => (
                                        <tr key={event.id} className={`border-b ${index % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-muted/50 transition-colors`}>
                                            <td className="px-6 py-4 text-sm font-medium text-foreground">{event.event}</td>
                                            <td className="px-6 py-4 text-sm text-blue-600">{getCategoryDisplayName(event.category)}</td>
                                            <td className="px-6 py-4 text-sm text-foreground">{event.organizer}</td>
                                            <td className="px-6 py-4 text-sm text-foreground">{event.date}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(event.status)}`}>{getStatusLabel(event.status)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link href={`/events-management/${event.id}`}>
                                                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer">
                                                        View
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                                            No events found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Pagination */}
                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {showingFrom} to {showingTo} of {totalEvents} events
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
}
