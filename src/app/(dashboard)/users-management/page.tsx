// "use client";

// import { useState, useMemo } from "react";
// import { Search, MoreHorizontal, Eye, CheckCircle, Trash2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { IUser, MOCK_USERS } from "@/data/demoUsers";
// import { SidebarTrigger } from "@/components/ui/sidebar";

// const ITEMS_PER_PAGE = 10;

// function StatusBadge({ status }: { status: "Active" | "Pending" | "Suspended" }) {
//     const variants = {
//         Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
//         Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
//         Suspended: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
//     };
//     return <Badge className={variants[status]}>{status}</Badge>;
// }

// function RoleBadge({ role }: { role: "User" | "organizer" | "Admin" }) {
//     const variants = {
//         User: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
//         organizer: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
//         Admin: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
//     };
//     return (
//         <Badge variant="secondary" className={variants[role]}>
//             {role}
//         </Badge>
//     );
// }

// export default function Page() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [selectedRole, setSelectedRole] = useState<string>("all");
//     const [selectedStatus, setSelectedStatus] = useState<string>("all");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const filteredUsers = useMemo(() => {
//         return MOCK_USERS.filter((user) => {
//             const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
//             const matchesRole = selectedRole === "all" || user.role === selectedRole;
//             const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
//             return matchesSearch && matchesRole && matchesStatus;
//         });
//     }, [searchTerm, selectedRole, selectedStatus]);

//     const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
//     const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

//     const handleViewDetails = (user: IUser) => {
//         setSelectedUser(user);
//         setIsModalOpen(true);
//     };

//     const handleApprove = (user: IUser) => {
//         console.log("Approve user:", user);
//         setIsModalOpen(false);
//     };

//     const handleDelete = (user: IUser) => {
//         console.log("Delete user:", user);
//         setIsModalOpen(false);
//     };

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

//     return (
//         <div className="">
//             <div className="">
//                 {/* Header */}
//                 <div className="mb-8">
//                     <div className="flex items-center gap-2 mb-6">
//                         <SidebarTrigger className="md:hidden block" />
//                         <h1 className="text-3xl md:text-4xl font-bold text-foreground ">User Management</h1>
//                     </div>

//                     {/* Search and Filters */}

//                     <div className="relative flex-1 mb-4">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
//                         <Input
//                             placeholder="Search users"
//                             className="pl-10 bg-[#E8E8F2]"
//                             value={searchTerm}
//                             onChange={(e) => {
//                                 setSearchTerm(e.target.value);
//                                 setCurrentPage(1);
//                             }}
//                         />
//                     </div>

//                     <div className="flex items-center gap-4">
//                         {/* Role Filter */}
//                         <Select
//                             value={selectedRole}
//                             onValueChange={(value) => {
//                                 setSelectedRole(value);
//                                 setCurrentPage(1);
//                             }}
//                         >
//                             <SelectTrigger className="w-full md:w-40 bg-[#E8E8F2]">
//                                 <SelectValue placeholder="All Roles" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="all">All Roles</SelectItem>
//                                 <SelectItem value="User">Users</SelectItem>
//                                 <SelectItem value="organizer">Organizers</SelectItem>
//                                 <SelectItem value="Admin">Admins</SelectItem>
//                             </SelectContent>
//                         </Select>

//                         {/* Status Filter */}
//                         <Select
//                             value={selectedStatus}
//                             onValueChange={(value) => {
//                                 setSelectedStatus(value);
//                                 setCurrentPage(1);
//                             }}
//                         >
//                             <SelectTrigger className="w-full md:w-40 bg-[#E8E8F2]">
//                                 <SelectValue placeholder="All Status" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="all">All Status</SelectItem>
//                                 <SelectItem value="Active">Active</SelectItem>
//                                 <SelectItem value="Pending">Pending</SelectItem>
//                                 <SelectItem value="Suspended">Suspended</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </div>

//                 {/* User Table */}
//                 <div className="rounded-lg border border-border bg-card">
//                     <Table>
//                         <TableHeader>
//                             <TableRow>
//                                 <TableHead>Name</TableHead>
//                                 <TableHead>Join date</TableHead>
//                                 <TableHead>Role</TableHead>
//                                 <TableHead>Status</TableHead>
//                                 <TableHead>Events</TableHead>
//                                 <TableHead className="w-12">Actions</TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {paginatedUsers.length > 0 ? (
//                                 paginatedUsers.map((user) => (
//                                     <TableRow key={user.id}>
//                                         <TableCell className="font-medium">{user.name}</TableCell>
//                                         <TableCell>{user.joinDate}</TableCell>
//                                         <TableCell>
//                                             <RoleBadge role={user.role} />
//                                         </TableCell>
//                                         <TableCell>
//                                             <StatusBadge status={user.status} />
//                                         </TableCell>
//                                         <TableCell>{user.eventsCreated}</TableCell>
//                                         <TableCell>
//                                             <DropdownMenu>
//                                                 <DropdownMenuTrigger asChild>
//                                                     <Button variant="ghost" size="icon" className="h-8 w-8">
//                                                         <MoreHorizontal className="h-4 w-4" />
//                                                     </Button>
//                                                 </DropdownMenuTrigger>
//                                                 <DropdownMenuContent align="end">
//                                                     <DropdownMenuItem onClick={() => handleViewDetails(user)}>
//                                                         <Eye className="mr-2 h-4 w-4" />
//                                                         View Details
//                                                     </DropdownMenuItem>
//                                                     <DropdownMenuItem onClick={() => handleApprove(user)}>
//                                                         <CheckCircle className="mr-2 h-4 w-4" />
//                                                         Active
//                                                     </DropdownMenuItem>
//                                                     <DropdownMenuItem onClick={() => handleDelete(user)} className="text-destructive">
//                                                         <Trash2 className="mr-2 h-4 w-4" />
//                                                         Delete User
//                                                     </DropdownMenuItem>
//                                                 </DropdownMenuContent>
//                                             </DropdownMenu>
//                                         </TableCell>
//                                     </TableRow>
//                                 ))
//                             ) : (
//                                 <TableRow>
//                                     <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                                         No users found
//                                     </TableCell>
//                                 </TableRow>
//                             )}
//                         </TableBody>
//                     </Table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                     <div className="text-sm text-muted-foreground">
//                         Showing {paginatedUsers.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
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

//             {/* User Details Modal */}
//             {selectedUser && (
//                 <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//                     <DialogContent className="max-w-md">
//                         <DialogHeader>
//                             <DialogTitle>User Details</DialogTitle>
//                             <DialogDescription>View and manage user information and permissions</DialogDescription>
//                         </DialogHeader>

//                         <div className="space-y-4 py-4 grid grid-cols-2">
//                             <div>
//                                 <p className="text-sm font-medium text-muted-foreground">Name</p>
//                                 <p className="text-base font-medium">{selectedUser.name}</p>
//                             </div>

//                             <div>
//                                 <p className="text-sm font-medium text-muted-foreground">Role</p>
//                                 <RoleBadge role={selectedUser.role} />
//                             </div>

//                             <div>
//                                 <p className="text-sm font-medium text-muted-foreground">Status</p>
//                                 <StatusBadge status={selectedUser.status} />
//                             </div>

//                             <div>
//                                 <p className="text-sm font-medium text-muted-foreground">Join Date</p>
//                                 <p className="text-base font-medium">{selectedUser.joinDate}</p>
//                             </div>

//                             <div>
//                                 <p className="text-sm font-medium text-muted-foreground">Events Created</p>
//                                 <p className="text-base font-medium">{selectedUser.eventsCreated}</p>
//                             </div>
//                         </div>

//                         {/* <DialogFooter className="flex gap-2">
//                             <Button variant="outline" onClick={() => setIsModalOpen(false)}>
//                                 Cancel
//                             </Button>
//                             <Button variant="default" onClick={() => handleApprove(selectedUser)}>
//                                 Approve
//                             </Button>
//                             <Button variant="destructive" onClick={() => handleDelete(selectedUser)}>
//                                 Delete
//                             </Button>
//                         </DialogFooter> */}
//                     </DialogContent>
//                 </Dialog>
//             )}
//         </div>
//     );
// }

"use client";

import { useState, useMemo } from "react";
import { Search, MoreHorizontal, Eye, CheckCircle, Trash2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGetUsersQuery, useUpdateUserStatusMutation, USER_STATUS } from "@/redux/features/user/userApi";

// Define user interface based on API response
interface ApiUser {
    _id: string;
    name: string;
    email: string;
    role: "user" | "organizer" | "admin";
    status: USER_STATUS;
    eventCount: number;
    createdAt: string;
}

// Local user interface for UI compatibility
interface LocalUser {
    id: string;
    name: string;
    email: string;
    role: "User" | "organizer" | "Admin" | "super_admin";
    status: USER_STATUS;
    eventsCreated: number;
    joinDate: string;
}

function StatusBadge({ status }: { status: USER_STATUS }) {
    const variants = {
        [USER_STATUS.ACTIVE]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
        [USER_STATUS.INACTIVE]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        [USER_STATUS.DELETED]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };

    const statusLabels = {
        [USER_STATUS.ACTIVE]: "Active",
        [USER_STATUS.INACTIVE]: "Inactive",
        [USER_STATUS.DELETED]: "Deleted",
    };

    return <Badge className={variants[status]}>{statusLabels[status]}</Badge>;
}

function RoleBadge({ role }: { role: "User" | "organizer" | "Admin" | "user" | "organizer" | "admin" | "super_admin" }) {
    const roleMap = {
        user: "User",
        admin: "Admin",
        super_admin: "super_admin",
    } as const;

    const displayRole = role in roleMap ? roleMap[role as keyof typeof roleMap] : role;

    const variants = {
        User: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        organizer: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        Admin: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
        user: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        admin: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
        super_admin: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    };

    return (
        <Badge variant="secondary" className={variants[displayRole]}>
            {displayRole}
        </Badge>
    );
}

// Convert API user to local user format
const convertApiUserToLocal = (apiUser: ApiUser): LocalUser => {
    const roleMap: Record<string, "User" | "organizer" | "Admin" | "super_admin"> = {
        user: "User",
        organizer: "organizer",
        admin: "Admin",
        super_admin: "super_admin",
    };

    // Format date
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM dd, yyyy");
        } catch {
            return "N/A";
        }
    };

    return {
        id: apiUser._id,
        name: apiUser.name || "Unnamed User",
        email: apiUser.email,
        role: roleMap[apiUser.role] || "User",
        status: apiUser.status,
        eventsCreated: apiUser.eventCount || 0,
        joinDate: formatDate(apiUser.createdAt),
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

export default function Page() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<LocalUser | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // RTK Query hooks
    const {
        data: usersData,
        isLoading,
        isError,
        refetch,
    } = useGetUsersQuery({
        page: currentPage,
        limit: 10,
        role: selectedRole !== "all" ? selectedRole : undefined,
        status: selectedStatus !== "all" ? (selectedStatus as USER_STATUS) : undefined,
        searchTerm: searchTerm || undefined,
    });

    const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

    // Convert API data to local users
    const localUsers = useMemo(() => {
        if (!usersData?.data) return [];
        return usersData.data.map(convertApiUserToLocal);
    }, [usersData]);

    // Calculate pagination info
    const totalPages = usersData?.meta?.totalPages || 1;
    const totalUsers = usersData?.meta?.total || 0;
    const showingFrom = (currentPage - 1) * 10 + 1;
    const showingTo = Math.min(currentPage * 10, totalUsers);

    // Handle status updates
    const handleStatusUpdate = async (userId: string, newStatus: USER_STATUS) => {
        try {
            await updateUserStatus({
                id: userId,
                status: newStatus,
            }).unwrap();

            // Refetch users to get updated data
            refetch();

            // Close modal if it's open
            if (selectedUser?.id === userId) {
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Failed to update user status:", error);
        }
    };

    const handleViewDetails = (user: LocalUser) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const toggleActiveStatus = async (user: LocalUser) => {
        const newStatus = user.status === USER_STATUS.ACTIVE ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE;
        await handleStatusUpdate(user.id, newStatus);
    };

    const handleDelete = async (user: LocalUser) => {
        await handleStatusUpdate(user.id, USER_STATUS.DELETED);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Handle filter changes - reset to page 1
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleRoleChange = (value: string) => {
        setSelectedRole(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (value: string) => {
        setSelectedStatus(value);
        setCurrentPage(1);
    };

    if (isError) {
        return (
            <div className="p-8">
                <Alert variant="destructive">
                    <Trash2 className="h-4 w-4" />
                    <AlertDescription>Failed to load users. Please try again.</AlertDescription>
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
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-6">
                        <SidebarTrigger className="md:hidden block" />
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">User Management</h1>
                    </div>

                    {/* Search and Filters */}
                    <div className="relative flex-1 mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input placeholder="Search users" className="pl-10 bg-[#E8E8F2]" value={searchTerm} onChange={(e) => handleSearchChange(e.target.value)} />
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Role Filter */}
                        <Select value={selectedRole} onValueChange={handleRoleChange}>
                            <SelectTrigger className="w-full md:w-40 bg-[#E8E8F2]">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="user">Users</SelectItem>
                                <SelectItem value="organizer">Organizers</SelectItem>
                                <SelectItem value="admin">Admins</SelectItem>
                                <SelectItem value="super_admin">Super Admins</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Status Filter */}
                        <Select value={selectedStatus} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-full md:w-40 bg-[#E8E8F2]">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value={USER_STATUS.ACTIVE}>Active</SelectItem>
                                <SelectItem value={USER_STATUS.INACTIVE}>Inactive</SelectItem>
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
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8">
                                        Loading users...
                                    </TableCell>
                                </TableRow>
                            ) : localUsers.length > 0 ? (
                                localUsers.map((user: any) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            <div>
                                                <div>{user.name}</div>
                                                <div className="text-xs text-muted-foreground">{user.email}</div>
                                            </div>
                                        </TableCell>
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
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isUpdating}>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => toggleActiveStatus(user)} disabled={user.status === USER_STATUS.DELETED}>
                                                        {user.status === USER_STATUS.ACTIVE ? (
                                                            <>
                                                                <XCircle className="mr-2 h-4 w-4" />
                                                                Make Inactive
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                                Make Active
                                                            </>
                                                        )}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(user)} className="text-destructive" disabled={user.status === USER_STATUS.DELETED}>
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
                        Showing {showingFrom} to {showingTo} of {totalUsers} users
                    </div>

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>

            {/* User Details Modal - Simple version */}
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
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
