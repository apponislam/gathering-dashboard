// "use client";

// import type React from "react";

// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent } from "@/components/ui/card";
// import { Upload, X } from "lucide-react";

// interface EditEventModalProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
// }

// export function EditEventModal({ open, onOpenChange }: EditEventModalProps) {
//     const [formData, setFormData] = useState({
//         eventTitle: "",
//         description: "",
//         category: "",
//         status: "",
//         location: "",
//         date: "",
//         time: "",
//         capacity: "",
//         ticketPrice: "",
//     });
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const [imagePreview, setImagePreview] = useState<string>("");

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { id, value } = e.target;
//         setFormData((prev) => ({ ...prev, [id]: value }));
//     };

//     const handleSelectChange = (field: string, value: string) => {
//         setFormData((prev) => ({ ...prev, [field]: value }));
//     };

//     const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             if (file.size > 5 * 1024 * 1024) {
//                 // 5MB limit
//                 alert("File size must be less than 5MB");
//                 return;
//             }
//             setImageFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setImagePreview(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const removeImage = () => {
//         setImageFile(null);
//         setImagePreview("");
//     };

//     const handleSubmit = async () => {
//         // Basic validation
//         const requiredFields = ["eventTitle", "description", "category", "location", "date", "time", "capacity", "ticketPrice"];
//         const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

//         if (missingFields.length > 0) {
//             alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
//             return;
//         }

//         const eventData = {
//             ...formData,
//             imageFile,
//             capacity: parseInt(formData.capacity),
//             ticketPrice: parseFloat(formData.ticketPrice),
//         };

//         console.log("Event data:", eventData);
//         // TODO: Add API call here for UPDATE
//         resetForm();
//     };

//     const resetForm = () => {
//         setFormData({
//             eventTitle: "",
//             description: "",
//             category: "",
//             status: "",
//             location: "",
//             date: "",
//             time: "",
//             capacity: "",
//             ticketPrice: "",
//         });
//         setImageFile(null);
//         setImagePreview("");
//         onOpenChange(false);
//     };

//     return (
//         <Dialog open={open} onOpenChange={resetForm}>
//             <DialogContent className="sm:max-w-[500px] p-0">
//                 {/* ONLY THESE 2 LINES ARE DIFFERENT */}
//                 <DialogHeader className="px-6 pt-6 pb-4">
//                     <DialogTitle className="text-xl font-semibold">Edit Event</DialogTitle>
//                     <p className="text-sm text-muted-foreground mt-1">Update your event details below.</p>
//                 </DialogHeader>

//                 <div className="px-6 space-y-4">
//                     {/* Event Title */}
//                     <div className="space-y-2">
//                         <Label htmlFor="eventTitle" className="text-sm">
//                             Event Title <span className="text-destructive">*</span>
//                         </Label>
//                         <Input id="eventTitle" placeholder="Enter event title" value={formData.eventTitle} onChange={handleInputChange} />
//                     </div>

//                     {/* Description */}
//                     <div className="space-y-2">
//                         <Label htmlFor="description" className="text-sm">
//                             Description <span className="text-destructive">*</span>
//                         </Label>
//                         <Textarea id="description" placeholder="Describe your event..." value={formData.description} onChange={handleInputChange} className="min-h-20" />
//                     </div>

//                     {/* Category and Status */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="category" className="text-sm">
//                                 Category <span className="text-destructive">*</span>
//                             </Label>
//                             <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
//                                 <SelectTrigger id="category" className="w-full">
//                                     <SelectValue placeholder="Select" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="conference">Conference</SelectItem>
//                                     <SelectItem value="workshop">Workshop</SelectItem>
//                                     <SelectItem value="music">Music</SelectItem>
//                                     <SelectItem value="tech">Tech</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="status" className="text-sm">
//                                 Status <span className="text-destructive">*</span>
//                             </Label>
//                             <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
//                                 <SelectTrigger id="status" className="w-full">
//                                     <SelectValue placeholder="Select" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="draft">Draft</SelectItem>
//                                     <SelectItem value="published">Published</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>

//                     {/* Location */}
//                     <div className="space-y-2">
//                         <Label htmlFor="location" className="text-sm">
//                             Location <span className="text-destructive">*</span>
//                         </Label>
//                         <Input id="location" placeholder="Enter venue or address" value={formData.location} onChange={handleInputChange} />
//                     </div>

//                     {/* Date and Time */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="date" className="text-sm">
//                                 Date <span className="text-destructive">*</span>
//                             </Label>
//                             <Input id="date" type="date" value={formData.date} onChange={handleInputChange} />
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="time" className="text-sm">
//                                 Time <span className="text-destructive">*</span>
//                             </Label>
//                             <Input id="time" type="time" value={formData.time} onChange={handleInputChange} />
//                         </div>
//                     </div>

//                     {/* Capacity and Ticket Price */}
//                     <div className="grid grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="capacity" className="text-sm">
//                                 Capacity <span className="text-destructive">*</span>
//                             </Label>
//                             <Input id="capacity" placeholder="100" type="number" min="1" value={formData.capacity} onChange={handleInputChange} />
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="ticketPrice" className="text-sm">
//                                 Price ($) <span className="text-destructive">*</span>
//                             </Label>
//                             <Input id="ticketPrice" placeholder="0.00" type="number" step="0.01" min="0" value={formData.ticketPrice} onChange={handleInputChange} />
//                         </div>
//                     </div>

//                     {/* Event Image */}
//                     <div className="space-y-2">
//                         <Label className="text-sm">Event Image</Label>
//                         {imagePreview ? (
//                             <Card className="relative overflow-hidden p-0">
//                                 <CardContent className="p-0">
//                                     <div className="relative">
//                                         {/* eslint-disable-next-line @next/next/no-img-element */}
//                                         <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover" />
//                                         <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 rounded-full" onClick={removeImage}>
//                                             <X className="h-3 w-3" />
//                                         </Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         ) : (
//                             <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent/50 transition-colors">
//                                 <div className="flex flex-col items-center justify-center">
//                                     <Upload className="w-5 h-5 text-muted-foreground mb-1" />
//                                     <p className="text-xs text-muted-foreground">Upload image</p>
//                                 </div>
//                                 <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
//                             </label>
//                         )}
//                     </div>
//                 </div>

//                 <DialogFooter className="px-6 py-4 border-t">
//                     <div className="flex w-full justify-end gap-2">
//                         <Button variant="outline" onClick={resetForm} type="button">
//                             Cancel
//                         </Button>
//                         {/* ONLY THIS BUTTON TEXT IS DIFFERENT */}
//                         <Button onClick={handleSubmit} type="button">
//                             Update Event
//                         </Button>
//                     </div>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }

"use client";

import type React from "react";
import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Loader2, MapPin } from "lucide-react";
import { useUpdateEventMutation } from "@/redux/features/events/eventsApi";
import { EVENT_CATEGORIES } from "@/redux/features/events/eventsApi";
import Image from "next/image";
import { getImageUrl } from "@/utils/imageUrl";

// Add Google Maps types
declare global {
    interface Window {
        google: any;
    }
}

interface ImageFile {
    file: File;
    preview: string;
    id: string;
}

interface EventData {
    _id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    visibility: "public" | "private";
    startDate: string;
    startTime: string;
    locationType: "physical" | "virtual" | "hybrid";
    address: string;
    capacity: number;
    ticketPrice: number;
    status: string;
    images: string[];
    location?: {
        type: string;
        coordinates: number[];
    };
}

interface EditEventModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    eventData?: EventData;
}

export function EditEventModal({ open, onOpenChange, eventData }: EditEventModalProps) {
    const [updateEvent, { isLoading }] = useUpdateEventMutation();

    // Initialize all state directly based on eventData using useMemo
    const initialFormData = useMemo(() => {
        if (!eventData) {
            return {
                title: "",
                description: "",
                category: "",
                tags: "",
                visibility: "public",
                startDate: "",
                startTime: "",
                locationType: "physical",
                address: "",
                capacity: "",
                ticketPrice: "",
            };
        }

        // Format date for input field (YYYY-MM-DD)
        const formattedDate = eventData.startDate ? new Date(eventData.startDate).toISOString().split("T")[0] : "";

        return {
            title: eventData.title || "",
            description: eventData.description || "",
            category: eventData.category || "",
            tags: eventData.tags?.join(", ") || "",
            visibility: eventData.visibility || "public",
            startDate: formattedDate,
            startTime: eventData.startTime || "",
            locationType: eventData.locationType || "physical",
            address: eventData.address || "",
            capacity: eventData.capacity?.toString() || "",
            ticketPrice: eventData.ticketPrice?.toString() || "",
        };
    }, [eventData]);

    const initialImages = useMemo(() => eventData?.images || [], [eventData]);

    const [formData, setFormData] = useState(initialFormData);
    const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>(initialImages);
    // const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
    const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
    const [isLoadingLocations, setIsLoadingLocations] = useState(false);
    // const [selectedPlaceId, setSelectedPlaceId] = useState<string>("");

    const locationRef = useRef<HTMLDivElement>(null);
    const autocompleteService = useRef<any>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load Google Maps Places API
    useEffect(() => {
        const loadGoogleMaps = () => {
            if (!window.google && open) {
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);

                script.onload = () => {
                    if (window.google?.maps?.places) {
                        autocompleteService.current = new window.google.maps.places.AutocompleteService();
                    }
                };
            } else if (window.google?.maps?.places && open) {
                autocompleteService.current = new window.google.maps.places.AutocompleteService();
            }
        };

        if (open) {
            loadGoogleMaps();
        }

        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, [open]);

    // Handle dialog open/close
    const handleDialogChange = useCallback(
        (open: boolean) => {
            if (!open) {
                // Reset form when closing
                setFormData(initialFormData);
                setImageFiles([]);
                setExistingImages(initialImages);
                // setImagesToDelete([]);
                setError("");
                setShowLocationSuggestions(false);
                setLocationSuggestions([]);
                // setSelectedPlaceId("");
                setIsLoadingLocations(false);

                // Clear any pending search timeout
                if (searchTimeout.current) {
                    clearTimeout(searchTimeout.current);
                    searchTimeout.current = null;
                }
            }
            onOpenChange(open);
        },
        [initialFormData, initialImages, onOpenChange]
    );

    // Click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
                setShowLocationSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle location query changes with debouncing
    const handleLocationQueryChange = useCallback((query: string) => {
        if (!query.trim() || query.length < 2) {
            setLocationSuggestions([]);
            return;
        }

        if (!autocompleteService.current) {
            return;
        }

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        setIsLoadingLocations(true);

        searchTimeout.current = setTimeout(() => {
            autocompleteService.current.getPlacePredictions(
                {
                    input: query,
                    types: ["establishment", "geocode"],
                },
                (predictions: any[], status: string) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                        setLocationSuggestions(predictions);
                    } else {
                        setLocationSuggestions([]);
                    }
                    setIsLoadingLocations(false);
                }
            );
        }, 300);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setError("");
    };

    const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        handleLocationQueryChange(value);
        setFormData((prev) => ({ ...prev, address: value }));
        setShowLocationSuggestions(true);
        setError("");
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setError("");
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages: ImageFile[] = [];
        let uploadError = "";

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validate file size
            if (file.size > 5 * 1024 * 1024) {
                uploadError = `File "${file.name}" must be less than 5MB`;
                continue;
            }

            // Validate file type
            if (!file.type.startsWith("image/")) {
                uploadError = `File "${file.name}" must be an image`;
                continue;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const newImage: ImageFile = {
                    file,
                    preview: reader.result as string,
                    id: Math.random().toString(36).substr(2, 9) + Date.now(),
                };
                newImages.push(newImage);

                // Update state once with all new images
                if (i === files.length - 1) {
                    setImageFiles((prev) => [...prev, ...newImages]);
                    if (uploadError) {
                        setError(uploadError);
                    }
                }
            };
            reader.readAsDataURL(file);
        }

        // Clear file input
        e.target.value = "";
    };

    const removeExistingImage = (imageUrl: string) => {
        setExistingImages((prev) => prev.filter((img) => img !== imageUrl));
        // setImagesToDelete((prev) => [...prev, imageUrl]);
    };

    const removeNewImage = (id: string) => {
        setImageFiles((prev) => prev.filter((img) => img.id !== id));
    };

    const handleLocationSelect = (prediction: any) => {
        const newAddress = prediction.description;
        setFormData((prev) => ({ ...prev, address: newAddress }));
        // setSelectedPlaceId(prediction.place_id);
        setShowLocationSuggestions(false);
        setLocationSuggestions([]);
    };

    const handleSubmit = async () => {
        setError("");

        // Basic validation
        const requiredFields = ["title", "description", "category", "startDate", "startTime", "address", "capacity", "ticketPrice"];
        const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData]);

        if (missingFields.length > 0) {
            setError(`Please fill in all required fields: ${missingFields.join(", ")}`);
            return;
        }

        if (!eventData?._id) {
            setError("Event ID is missing");
            return;
        }

        // Validate capacity and ticket price
        const capacity = parseInt(formData.capacity);
        const ticketPrice = parseFloat(formData.ticketPrice);

        if (isNaN(capacity) || capacity <= 0) {
            setError("Capacity must be a positive number");
            return;
        }

        if (isNaN(ticketPrice) || ticketPrice < 0) {
            setError("Ticket price must be a non-negative number");
            return;
        }

        // Prepare tags array
        const tagsArray = formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        // Create event data object - matching your API structure
        const eventUpdateData = {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            tags: tagsArray.length > 0 ? tagsArray : ["tech", "innovation", "conference", "startups"],
            visibility: formData.visibility as "public" | "private",
            startDate: formData.startDate,
            startTime: formData.startTime,
            locationType: formData.locationType as "physical" | "virtual" | "hybrid",
            address: formData.address,
            capacity: capacity,
            ticketPrice: ticketPrice,
        };

        // Create FormData
        const formDataToSend = new FormData();

        // Append the data object as JSON string
        formDataToSend.append("data", JSON.stringify(eventUpdateData));

        // Append new images
        imageFiles.forEach((imageFile) => {
            formDataToSend.append("images", imageFile.file);
        });

        try {
            const result = await updateEvent({
                id: eventData._id,
                data: formDataToSend,
            }).unwrap();

            if (result.success) {
                // Close modal on success
                handleDialogChange(false);
                // Optional: Refresh page or update local state
                // window.location.reload();
            } else {
                setError(result.message || "Failed to update event");
            }
        } catch (error: any) {
            console.error("Error updating event:", error);

            // More detailed error handling
            if (error.data?.errorMessages) {
                const errorMessages = error.data.errorMessages.map((err: any) => err.message).join(", ");
                setError(`Validation error: ${errorMessages}`);
            } else if (error.data?.message) {
                setError(error.data.message);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError("Failed to update event. Please try again.");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle className="text-xl font-semibold">Edit Event</DialogTitle>
                    <p className="text-sm text-muted-foreground mt-1">Update your event details below.</p>
                </DialogHeader>

                <div className="px-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Event Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm">
                            Event Title <span className="text-destructive">*</span>
                        </Label>
                        <Input id="title" placeholder="Enter event title" value={formData.title} onChange={handleInputChange} disabled={isLoading} />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm">
                            Description <span className="text-destructive">*</span>
                        </Label>
                        <Textarea id="description" placeholder="Describe your event..." value={formData.description} onChange={handleInputChange} className="min-h-20" disabled={isLoading} />
                    </div>

                    {/* Category and Tags */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm">
                                Category <span className="text-destructive">*</span>
                            </Label>
                            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)} disabled={isLoading}>
                                <SelectTrigger id="category" className="w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(EVENT_CATEGORIES).map(([key, value]) => (
                                        <SelectItem key={value} value={value}>
                                            {key.replace("_", " ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags" className="text-sm">
                                Tags (comma separated)
                            </Label>
                            <Input id="tags" placeholder="tech, innovation, conference, startups" value={formData.tags} onChange={handleInputChange} disabled={isLoading} />
                        </div>
                    </div>

                    {/* Visibility and Location Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="visibility" className="text-sm">
                                Visibility
                            </Label>
                            <Select value={formData.visibility} onValueChange={(value) => handleSelectChange("visibility", value)} disabled={isLoading}>
                                <SelectTrigger id="visibility" className="w-full">
                                    <SelectValue placeholder="Select visibility" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="locationType" className="text-sm">
                                Location Type
                            </Label>
                            <Select value={formData.locationType} onValueChange={(value) => handleSelectChange("locationType", value)} disabled={isLoading}>
                                <SelectTrigger id="locationType" className="w-full">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="physical">Physical</SelectItem>
                                    <SelectItem value="virtual">Virtual</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Location with Google Places Suggestions */}
                    <div className="space-y-2 relative" ref={locationRef}>
                        <Label htmlFor="address" className="text-sm">
                            Location <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                            <Input id="address" ref={inputRef} placeholder="Enter venue or address" value={formData.address} onChange={handleLocationInputChange} onFocus={() => setShowLocationSuggestions(true)} disabled={isLoading} />
                            {isLoadingLocations && <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400" />}
                        </div>

                        {showLocationSuggestions && formData.address && locationSuggestions.length > 0 && (
                            <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {locationSuggestions.map((prediction, index) => (
                                    <div key={`${prediction.place_id}-${index}`} onClick={() => handleLocationSelect(prediction)} className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition border-b last:border-b-0">
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="font-semibold text-sm text-gray-900">{prediction.structured_formatting?.main_text || prediction.description}</p>
                                                {prediction.structured_formatting?.secondary_text && <p className="text-xs text-gray-600">{prediction.structured_formatting.secondary_text}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate" className="text-sm">
                                Date <span className="text-destructive">*</span>
                            </Label>
                            <Input id="startDate" type="date" value={formData.startDate} onChange={handleInputChange} disabled={isLoading} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="startTime" className="text-sm">
                                Time <span className="text-destructive">*</span>
                            </Label>
                            <Input id="startTime" type="time" value={formData.startTime} onChange={handleInputChange} disabled={isLoading} />
                        </div>
                    </div>

                    {/* Capacity and Ticket Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="capacity" className="text-sm">
                                Capacity <span className="text-destructive">*</span>
                            </Label>
                            <Input id="capacity" placeholder="100" type="number" min="1" value={formData.capacity} onChange={handleInputChange} disabled={isLoading} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ticketPrice" className="text-sm">
                                Price ($) <span className="text-destructive">*</span>
                            </Label>
                            <Input id="ticketPrice" placeholder="0.00" type="number" step="0.01" min="0" value={formData.ticketPrice} onChange={handleInputChange} disabled={isLoading} />
                        </div>
                    </div>

                    {/* Event Images */}
                    <div className="space-y-2">
                        <Label className="text-sm">Event Images</Label>

                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <div className="mb-4">
                                <p className="text-xs text-muted-foreground mb-2">Existing Images:</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {existingImages.map((imageUrl, index) => (
                                        <Card key={`existing-${index}`} className="relative overflow-hidden p-0">
                                            <CardContent className="p-0">
                                                <div className="relative aspect-video">
                                                    <Image
                                                        src={getImageUrl(imageUrl)}
                                                        alt={`Event image ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = "/eventpicture.png";
                                                        }}
                                                    />
                                                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 rounded-full" onClick={() => removeExistingImage(imageUrl)} disabled={isLoading}>
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New Images Preview */}
                        {imageFiles.length > 0 && (
                            <div className="mb-4">
                                <p className="text-xs text-muted-foreground mb-2">New Images to Upload:</p>
                                <div className="grid grid-cols-2 gap-4">
                                    {imageFiles.map((image) => (
                                        <Card key={image.id} className="relative overflow-hidden p-0">
                                            <CardContent className="p-0">
                                                <div className="relative aspect-video">
                                                    <Image src={image.preview} alt="Preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                                                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6 rounded-full" onClick={() => removeNewImage(image.id)} disabled={isLoading}>
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Upload Button */}
                        <label className={`flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent/50 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}>
                            <div className="flex flex-col items-center justify-center">
                                <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                                <p className="text-xs text-muted-foreground">Upload new images (Max 5MB each)</p>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isLoading} multiple />
                        </label>
                    </div>
                </div>

                <DialogFooter className="px-6 py-4 border-t">
                    <div className="flex w-full justify-end gap-2">
                        <Button variant="outline" onClick={() => handleDialogChange(false)} type="button" disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} type="button" disabled={isLoading} className="bg-[#5C22BF] hover:bg-[#5C22BF]/90">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Event"
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
