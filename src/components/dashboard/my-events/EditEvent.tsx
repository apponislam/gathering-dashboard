"use client";

import type React from "react";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

interface EditEventModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditEventModal({ open, onOpenChange }: EditEventModalProps) {
    const [formData, setFormData] = useState({
        eventTitle: "",
        description: "",
        category: "",
        status: "",
        location: "",
        date: "",
        time: "",
        capacity: "",
        ticketPrice: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                // 5MB limit
                alert("File size must be less than 5MB");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview("");
    };

    const handleSubmit = async () => {
        // Basic validation
        const requiredFields = ["eventTitle", "description", "category", "location", "date", "time", "capacity", "ticketPrice"];
        const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
            return;
        }

        const eventData = {
            ...formData,
            imageFile,
            capacity: parseInt(formData.capacity),
            ticketPrice: parseFloat(formData.ticketPrice),
        };

        console.log("Event data:", eventData);
        // TODO: Add API call here for UPDATE
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            eventTitle: "",
            description: "",
            category: "",
            status: "",
            location: "",
            date: "",
            time: "",
            capacity: "",
            ticketPrice: "",
        });
        setImageFile(null);
        setImagePreview("");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={resetForm}>
            <DialogContent className="sm:max-w-[500px] p-0">
                {/* ONLY THESE 2 LINES ARE DIFFERENT */}
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle className="text-xl font-semibold">Edit Event</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">Update your event details below.</p>
                </DialogHeader>

                <div className="px-6 space-y-4">
                    {/* Event Title */}
                    <div className="space-y-2">
                        <Label htmlFor="eventTitle" className="text-sm">
                            Event Title <span className="text-destructive">*</span>
                        </Label>
                        <Input id="eventTitle" placeholder="Enter event title" value={formData.eventTitle} onChange={handleInputChange} />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm">
                            Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea id="description" placeholder="Describe your event..." value={formData.description} onChange={handleInputChange} className="min-h-20" />
                    </div>

                    {/* Category and Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm">
                                Category <span className="text-destructive">*</span>
                            </Label>
                            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                                <SelectTrigger id="category" className="w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="conference">Conference</SelectItem>
                                    <SelectItem value="workshop">Workshop</SelectItem>
                                    <SelectItem value="music">Music</SelectItem>
                                    <SelectItem value="tech">Tech</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-sm">
                                Status <span className="text-destructive">*</span>
                            </Label>
                            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                                <SelectTrigger id="status" className="w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm">
                            Location <span className="text-destructive">*</span>
                        </Label>
                        <Input id="location" placeholder="Enter venue or address" value={formData.location} onChange={handleInputChange} />
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-sm">
                                Date <span className="text-destructive">*</span>
                            </Label>
                            <Input id="date" type="date" value={formData.date} onChange={handleInputChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="time" className="text-sm">
                                Time <span className="text-destructive">*</span>
                            </Label>
                            <Input id="time" type="time" value={formData.time} onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* Capacity and Ticket Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="capacity" className="text-sm">
                                Capacity <span className="text-destructive">*</span>
                            </Label>
                            <Input id="capacity" placeholder="100" type="number" min="1" value={formData.capacity} onChange={handleInputChange} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ticketPrice" className="text-sm">
                                Price ($) <span className="text-destructive">*</span>
                            </Label>
                            <Input id="ticketPrice" placeholder="0.00" type="number" step="0.01" min="0" value={formData.ticketPrice} onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* Event Image */}
                    <div className="space-y-2">
                        <Label className="text-sm">Event Image</Label>
                        {imagePreview ? (
                            <Card className="relative overflow-hidden p-0">
                                <CardContent className="p-0">
                                    <div className="relative">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
                                        <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 rounded-full" onClick={removeImage}>
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
                                <div className="flex flex-col items-center justify-center">
                                    <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                                    <p className="text-xs text-muted-foreground">Upload image</p>
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        )}
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 border-t">
                    <div className="flex w-full justify-end gap-2">
                        <Button variant="outline" onClick={resetForm} type="button">
                            Cancel
                        </Button>
                        {/* ONLY THIS BUTTON TEXT IS DIFFERENT */}
                        <Button onClick={handleSubmit} type="button">
                            Update Event
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
