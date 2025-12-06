"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockReports } from "@/data/demoContent";
import ReviewReportedContent from "@/components/dashboard/content/ContentReviewModal";
import { SidebarTrigger } from "@/components/ui/sidebar";

const ITEMS_PER_PAGE = 10;

export default function ModerationPage() {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination
    const totalPages = Math.ceil(mockReports.length / ITEMS_PER_PAGE);
    const paginatedReports = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return mockReports.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage]);

    const pageNumbers = useMemo(() => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }, [totalPages]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <main className="flex flex-col gap-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="md:hidden block" />
                    <h1 className="text-3xl font-bold tracking-tight">Content Moderation</h1>
                </div>
                <p className="text-[#4D5999]">Review and moderate reported content</p>
            </div>

            {/* Moderation Metrics */}
            <div>
                <h2 className="mb-4 text-2xl font-bold">Moderation Metrics</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Pending Reports */}
                    <div className="border border-[#CFD4E8] rounded-md p-4">
                        <div className="pb-2">
                            <h3 className="font-medium text-[#0D0F1C]">Pending Reports</h3>
                        </div>
                        <div className="text-2xl font-bold">2</div>
                    </div>

                    {/* Resolved */}
                    <div className="border border-[#CFD4E8] rounded-md p-4">
                        <div className="pb-2">
                            <h3 className="font-medium text-[#0D0F1C]">Resolved</h3>
                        </div>
                        <div className="text-2xl font-bold">2</div>
                    </div>

                    {/* Dismissed */}
                    <div className="border border-[#CFD4E8] rounded-md p-4">
                        <div className="pb-2">
                            <h3 className="font-medium text-[#0D0F1C]">Dismissed</h3>
                        </div>
                        <div className="text-2xl font-bold">10</div>
                    </div>
                </div>
            </div>

            {/* Report Queue */}
            <div>
                <h2 className="mb-4 text-xl font-semibold">Report Queue</h2>
                <Card className="p-0">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Report ID</TableHead>
                                    <TableHead>Content Type</TableHead>
                                    <TableHead>Reported By</TableHead>
                                    <TableHead>Reported Content</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedReports.map((report) => (
                                    <TableRow key={report.id} className="text-[#4D5999]">
                                        <TableCell className="font-medium ">#{report.reportId}</TableCell>
                                        <TableCell>{report.contentType}</TableCell>
                                        <TableCell>{report.reportedBy}</TableCell>
                                        <TableCell>{report.reportedContent}</TableCell>
                                        <TableCell>{report.reason}</TableCell>
                                        {/* <TableCell>
                                            <Button variant="ghost" size="sm" className="text-[#4D5999] hover:text-[#4D5999] cursor-pointer">
                                                Review
                                            </Button>
                                        </TableCell> */}
                                        <ReviewReportedContent></ReviewReportedContent>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing {paginatedReports.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, mockReports.length)} of {mockReports.length} reports
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
        </main>
    );
}
