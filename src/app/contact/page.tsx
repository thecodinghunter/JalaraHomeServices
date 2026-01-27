"use client";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const ContactMap = dynamic(() => import("./ContactMap"), { ssr: false });
import { AppFooter } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";


export default function ContactUsPage() {
    const position = { lat: 23.2549, lng: 69.6631 }; // Bhuj center

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <PublicHeader />

            <main className="flex-1 py-12 md:py-20">
                <div className="container">
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader className="text-center p-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Contact Us</h1>
                            <p className="text-muted-foreground mt-4">
                                We're here to help. Reach out to us with any questions or service requests.
                            </p>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-8 p-8 pt-0">
                            {/* Contact Details */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 text-primary rounded-full p-3 mt-1">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Phone Numbers</h3>
                                        <p className="text-muted-foreground">For bookings and support:</p>
                                        <p className="text-foreground font-medium">9106433706</p>
                                        <p className="text-foreground font-medium">9687354521</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 text-primary rounded-full p-3 mt-1">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email Address</h3>
                                        <p className="text-muted-foreground">Send us your queries:</p>
                                        <p className="text-foreground font-medium">contact@jalaramhomeservice.in</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                     <div className="bg-primary/10 text-primary rounded-full p-3 mt-1">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Our Location</h3>
                                        <p className="text-muted-foreground">We are based in Bhuj, serving the entire Kutchh region.</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Map */}
                            <div className="h-80 w-full rounded-md overflow-hidden border">
                                {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                                    <ContactMap position={position} apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-muted">
                                        <p className="text-muted-foreground">Map requires API Key.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Footer */}
            <AppFooter />
        </div>
    );
}
