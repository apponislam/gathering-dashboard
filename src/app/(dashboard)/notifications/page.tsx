"use client";

import type React from "react";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { SidebarTrigger } from "@/components/ui/sidebar";

const ITEMS_PER_PAGE = 5;

interface Notification {
    id: string;
    title: string;
    audience: string;
    sentDate: string;
    openRate: number;
    engagement: string;
}

export default function NotificationsComponent() {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        notificationType: "Event Alert",
        targetAudience: "All Users",
        scheduleForLater: false,
        date: "",
        time: "",
    });

    const [currentPage, setCurrentPage] = useState(1);

    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            title: "Event Reminder",
            audience: "All Users",
            sentDate: "2024-01-15",
            openRate: 75,
            engagement: "12%",
        },
        {
            id: "2",
            title: "New Feature Announcement",
            audience: "Active Users",
            sentDate: "2024-01-10",
            openRate: 60,
            engagement: "8%",
        },
        {
            id: "3",
            title: "Community Update",
            audience: "All Users",
            sentDate: "2023-12-20",
            openRate: 80,
            engagement: "15%",
        },
        {
            id: "4",
            title: "Holiday Greetings",
            audience: "All Users",
            sentDate: "2023-12-15",
            openRate: 90,
            engagement: "20%",
        },
        {
            id: "5",
            title: "Survey Invitation",
            audience: "Selected Users",
            sentDate: "2023-12-01",
            openRate: 50,
            engagement: "5%",
        },
        {
            id: "6",
            title: "Special Offer",
            audience: "Active Users",
            sentDate: "2023-11-25",
            openRate: 70,
            engagement: "18%",
        },
        {
            id: "7",
            title: "System Maintenance",
            audience: "All Users",
            sentDate: "2023-11-20",
            openRate: 85,
            engagement: "10%",
        },
    ]);

    const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);
    const paginatedNotifications = useMemo(() => {
        const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        return notifications.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    }, [currentPage, notifications]);

    const pageNumbers = useMemo(() => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }, [currentPage, totalPages]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string, field: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, scheduleForLater: checked }));
    };

    const handleSendNotification = () => {
        if (!formData.title.trim() || !formData.message.trim()) {
            alert("Please fill in title and message");
            return;
        }

        const newNotification: Notification = {
            id: String(notifications.length + 1),
            title: formData.title,
            audience: formData.targetAudience,
            sentDate: new Date().toISOString().split("T")[0],
            openRate: 0,
            engagement: "0%",
        };

        setNotifications((prev) => [newNotification, ...prev]);
        setFormData({
            title: "",
            message: "",
            notificationType: "Event Alert",
            targetAudience: "All Users",
            scheduleForLater: false,
            date: "",
            time: "",
        });
    };

    const handleClear = () => {
        setFormData({
            title: "",
            message: "",
            notificationType: "Event Alert",
            targetAudience: "All Users",
            scheduleForLater: false,
            date: "",
            time: "",
        });
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <div>
                <div className="flex items-center gap-2 mb-8">
                    <SidebarTrigger className="md:hidden block" />
                    <h1 className="text-3xl font-bold ">Notifications</h1>
                </div>
            </div>

            {/* Create Notification Form */}
            <div className="space-y-6 mb-8">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Create Notification</h2>
                    <div className="space-y-6">
                        {/* Title and Type Row */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input className="bg-[#E8E8F2]" id="title" name="title" placeholder="Enter notification title" value={formData.title} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notificationType">Notification Type</Label>
                                <Select value={formData.notificationType} onValueChange={(value) => handleSelectChange(value, "notificationType")}>
                                    <SelectTrigger id="notificationType" className="bg-[#E8E8F2] w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Event Alert">Event Alert</SelectItem>
                                        <SelectItem value="System Notice">System Notice</SelectItem>
                                        <SelectItem value="Promotion">Promotion</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" placeholder="Enter notification message" value={formData.message} onChange={handleInputChange} className="min-h-32 bg-[#E8E8F2]" />
                        </div>

                        {/* Target Audience */}
                        <div className="space-y-2">
                            <Label htmlFor="targetAudience">Target Audience</Label>
                            <Select value={formData.targetAudience} onValueChange={(value) => handleSelectChange(value, "targetAudience")}>
                                <SelectTrigger id="targetAudience" className="bg-[#E8E8F2] w-full md:w-60">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All Users">All Users</SelectItem>
                                    <SelectItem value="Active Users">Active Users</SelectItem>
                                    <SelectItem value="Event Organizers">Event Organizers</SelectItem>
                                    <SelectItem value="Selected Users">Selected Users</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Schedule Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Switch id="scheduleForLater" checked={formData.scheduleForLater} onCheckedChange={handleSwitchChange} />
                                <Label htmlFor="scheduleForLater">Schedule for later</Label>
                            </div>

                            {formData.scheduleForLater && (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Date</Label>
                                        <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} className="bg-[#E8E8F2]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="time">Time</Label>
                                        <Input id="time" name="time" type="time" value={formData.time} onChange={handleInputChange} className="bg-[#E8E8F2]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <Button onClick={handleSendNotification} className="bg-primary hover:bg-primary/90">
                                Send Notification
                            </Button>
                            <Button variant="outline" onClick={handleClear}>
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification History */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Notification History</h2>

                {/* Table */}
                <div className="rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold">Title</TableHead>
                                <TableHead className="font-semibold">Audience</TableHead>
                                <TableHead className="font-semibold">Sent Date</TableHead>
                                <TableHead className="font-semibold">Open Rate</TableHead>
                                <TableHead className="font-semibold">Engagement</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedNotifications.map((notification) => (
                                <TableRow key={notification.id}>
                                    <TableCell className="font-medium">{notification.title}</TableCell>
                                    <TableCell>{notification.audience}</TableCell>
                                    <TableCell className="text-muted-foreground">{notification.sentDate}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1 flex items-center gap-2">
                                            <Progress value={notification.openRate} className="h-2 bg-[#CFD4E8] [&>div]:bg-[#1238ED]" />

                                            <span className="text-sm text-muted-foreground">{notification.openRate}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{notification.engagement}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {paginatedNotifications.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, notifications.length)} of {notifications.length} notifications
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
