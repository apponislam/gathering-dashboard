// components/broadcast/StreamCreator.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Video } from "lucide-react";
import { toast } from "sonner";
import { useCreateLivestreamMutation } from "@/redux/features/stream/streamApi";

interface StreamCreatorProps {
    onStreamCreated: (streamId: string) => void;
}

const StreamCreator = ({ onStreamCreated }: StreamCreatorProps) => {
    const params = useParams();
    const eventId = params.id as string;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const [createLivestream] = useCreateLivestreamMutation();

    const handleCreateStream = async () => {
        if (!title.trim()) {
            toast.error("Please enter a stream title");
            return;
        }

        setIsCreating(true);
        try {
            const result = await createLivestream({
                eventId,
                title,
                description,
            }).unwrap();

            if (result.success) {
                toast.success("Stream created successfully!");
                onStreamCreated(result.data.id);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to create stream");
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground">Create Your Live Stream</h1>
                <p className="text-muted-foreground">Set up your live stream with a title and description</p>
            </div>

            <div className="space-y-6">
                <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">Stream Title *</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-muted rounded-lg p-4 min-h-12 text-foreground" placeholder="Enter stream title" />
                </div>

                <div>
                    <Label className="text-sm font-semibold text-foreground mb-2 block">Description</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="bg-muted rounded-lg p-4 min-h-32 text-foreground resize-none" rows={5} placeholder="Describe your stream" />
                </div>
            </div>

            <div className="pt-4">
                <Button onClick={handleCreateStream} disabled={isCreating || !title.trim()} className="w-full gap-2 py-6 text-lg">
                    {isCreating ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Creating Stream...
                        </>
                    ) : (
                        <>
                            <Video className="w-5 h-5" />
                            Create Stream & Go Live
                        </>
                    )}
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-3">After creating the stream, you&apos;ll be taken to the live stream dashboard</p>
            </div>
        </div>
    );
};

export default StreamCreator;
