"use client";

import { useState, useMemo } from "react";
import { Search, MoreHorizontal, Eye, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IUser, MOCK_USERS } from "@/data/demoUsers";
import { SidebarTrigger } from "@/components/ui/sidebar";

const ITEMS_PER_PAGE = 10;

function StatusBadge({ status }: { status: "Active" | "Pending" | "Suspended" }) {
    const variants = {
        Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        Suspended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return <Badge className={variants[status]}>{status}</Badge>;
}

function RoleBadge({ role }: { role: "User" | "organizer" | "Admin" }) {
    const variants = {
        User: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        organizer: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        Admin: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    };
    return (
        <Badge variant="secondary" className={variants[role]}>
            {role}
        </Badge>
    );
}

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredUsers = useMemo(() => {
        return MOCK_USERS.filter((user) => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = selectedRole === "all" || user.role === selectedRole;
            const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [searchTerm, selectedRole, selectedStatus]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleViewDetails = (user: IUser) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleApprove = (user: IUser) => {
        console.log("Approve user:", user);
        setIsModalOpen(false);
    };

    const handleDelete = (user: IUser) => {
        console.log("Delete user:", user);
        setIsModalOpen(false);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="">
            <div className="">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <SidebarTrigger className="md:hidden block" />
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground ">User Management</h1>
                    </div>

                    {/* Search and Filters */}

                    <div className="relative flex-1 mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            placeholder="Search users"
                            className="pl-10 bg-[#E8E8F2]"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Role Filter */}
                        <Select
                            value={selectedRole}
                            onValueChange={(value) => {
                                setSelectedRole(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-full md:w-40 bg-[#E8E8F2]">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="User">Users</SelectItem>
                                <SelectItem value="organizer">Organizers</SelectItem>
                                <SelectItem value="Admin">Admins</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Status Filter */}
                        <Select
                            value={selectedStatus}
                            onValueChange={(value) => {
                                setSelectedStatus(value);
                                setCurrentPage(1);
                            }}
                        >
                            <SelectTrigger className="w-full md:w-40 bg-[#E8E8F2]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* User Table */}
                <div className="rounded-lg border border-border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Join date</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Events</TableHead>
                                <TableHead className="w-12">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedUsers.length > 0 ? (
                                paginatedUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.joinDate}</TableCell>
                                        <TableCell>
                                            <RoleBadge role={user.role} />
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={user.status} />
                                        </TableCell>
                                        <TableCell>{user.eventsCreated}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleApprove(user)}>
                                                        <CheckCircle className="mr-2 h-4 w-4" />
                                                        Approve
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(user)} className="text-destructive">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete User
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm text-muted-foreground">
                        Showing {paginatedUsers.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
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

            {/* User Details Modal */}
            {selectedUser && (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                            <DialogDescription>View and manage user information and permissions</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4 grid grid-cols-2">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Name</p>
                                <p className="text-base font-medium">{selectedUser.name}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Role</p>
                                <RoleBadge role={selectedUser.role} />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <StatusBadge status={selectedUser.status} />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                                <p className="text-base font-medium">{selectedUser.joinDate}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Events Created</p>
                                <p className="text-base font-medium">{selectedUser.eventsCreated}</p>
                            </div>
                        </div>

                        <DialogFooter className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="default" onClick={() => handleApprove(selectedUser)}>
                                Approve
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(selectedUser)}>
                                Delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
