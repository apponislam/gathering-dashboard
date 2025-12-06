"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Copy, Tags, Zap } from "lucide-react";
import { CreatePromotionModal } from "@/components/dashboard/promotions/PromotionModal";

export default function PromotionsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buttonText, setButtonText] = useState("Copy Code");

    return (
        <div className="min-h-screen md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Promotions & Discounts</h1>
                    <p className="text-muted-foreground">Manage your events with ease</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Active Promotions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">1</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Tags className="w-4 h-4" />
                                Total Promotions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">1</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <CalendarDays className="w-4 h-4" />
                                Total Redemptions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">143</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Section */}
                <Card>
                    <CardHeader className="flex flex-col md:flex-row items-center justify-between pb-4 border-b">
                        <div>
                            <CardTitle>Promotions & Discounts</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">Create and manage promotional codes for your event</p>
                        </div>
                        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-primary-foreground">
                            + New Promotion
                        </Button>
                    </CardHeader>

                    <CardContent className="pt-6">
                        {/* Promotion Item */}
                        <div className="space-y-6">
                            <div className="flex items-start justify-between pb-6 border-b last:border-b-0">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-lg font-semibold text-foreground">EARLYBIRD</h3>
                                        <Badge variant="secondary">Active</Badge>
                                        <Switch defaultChecked />
                                        {/* Copy Button */}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="ml-auto"
                                            onClick={async () => {
                                                try {
                                                    await navigator.clipboard.writeText("EARLYBIRD");
                                                    setButtonText("Copied!");

                                                    setTimeout(() => {
                                                        setButtonText("Copy Code");
                                                    }, 2000);
                                                } catch (err) {
                                                    console.error("Failed to copy: ", err);
                                                }
                                            }}
                                        >
                                            <Copy className="w-4 h-4 mr-2" />
                                            {buttonText}
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Discount</p>
                                            <p className="text-xl font-bold text-foreground">$ 150</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Valid Until</p>
                                            <p className="text-xl font-bold text-foreground">7/16/2025</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">Usage</p>
                                            <div className="flex items-center gap-2">
                                                <Progress value={75} className="flex-1 h-2" />
                                                <p className="text-sm font-medium text-foreground">143 / 190</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Modal */}
            <CreatePromotionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
