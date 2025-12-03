"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { TableCell } from "@/components/ui/table";

const ReviewReportedContent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleDismissReport = () => {
        // Handle dismiss report logic
        console.log("Report dismissed");
        handleClose();
    };

    const handleDeleteComment = () => {
        // Handle delete comment logic
        console.log("Comment deleted");
        handleClose();
    };

    return (
        <>
            {/* Review Button */}
            <TableCell>
                <Button variant="ghost" size="sm" className="text-[#4D5999] hover:text-[#4D5999] cursor-pointer" onClick={handleOpen}>
                    Review
                </Button>
            </TableCell>

            {/* Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Review Reported Content</DialogTitle>
                        <DialogDescription className="text-base">Review and manage reported content.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Reported Content Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Reported Content</h3>

                            <p className="text-foreground font-medium">Offensive language in comment section</p>
                        </div>

                        <Separator />

                        {/* Report Details Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Report Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Report ID</p>
                                    <p className="font-medium">#12345</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Content Type</p>
                                    <p className="font-medium">Comment</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Reported By</p>
                                    <p className="font-medium">Liam Carter</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Reason</p>
                                    <p className="font-medium text-red-600">Harassment</p>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* User Information Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">User Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">User ID</p>
                                    <p className="font-medium">#54321</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">Username</p>
                                    <p className="font-medium">Liam Carter</p>
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">liam.carter@email.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex flex-col sm:flex-row justify-end gap-3 ">
                        <Button variant="outline" className="text-[#4D5999] border-[#4D5999] hover:bg-[#4D5999]/10 " onClick={handleDismissReport}>
                            Dismiss Report
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteComment}>
                            Delete Comment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ReviewReportedContent;
