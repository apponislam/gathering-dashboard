export default function EventDetails() {
    return (
        <div className="space-y-4 mb-8">
            <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Title</label>
                <div className="bg-muted rounded-lg p-4 min-h-12 text-foreground">Tech Conference 2025 - Innovation & Development</div>
            </div>

            <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
                <div className="bg-muted rounded-lg p-4 min-h-32 text-foreground">Join industry leaders and innovators for a full day of cutting-edge talks, workshops, and networking. Discover the latest trends in web development, AI, and cloud technologies.</div>
            </div>
        </div>
    );
}
