
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Wrench, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AppFooter } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";

export const metadata: Metadata = {
    title: "Home Services in Bhuj – Jalaram Home Services | Trusted Local Providers",
    description: "Book trusted local home services in Bhuj with Jalaram Home Services. We connect you with verified electricians, plumbers, AC repair, and cleaning services. Quick, reliable, and affordable.",
    keywords: "home services in bhuj, electrician in bhuj, plumber in bhuj, ac repair bhuj, house cleaning bhuj, local service providers bhuj, jalaram home services",
};

export default function AboutUsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <PublicHeader />

            <main className="flex-1 py-12 md:py-20">
                <div className="container">
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader className="text-center p-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Home Services in Bhuj – Jalaram Home Services</h1>
                            <p className="text-muted-foreground mt-4">
                                Jalaram Home Services is a trusted local home service platform in Bhuj, designed to connect customers with skilled and verified service providers in their area.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-12 p-8 pt-0">
                            
                            {/* Intro Section */}
                            <div className="space-y-4 text-center">
                                 <p className="text-muted-foreground">
                                    We aim to make daily home services simple, fast, and reliable for every household in Bhuj and nearby regions. Whether you are looking for a professional electrician in Bhuj, plumber in Bhuj, AC repair service, house cleaning service, painting service, or other home maintenance solutions, Jalaram Home Services brings all essential services under one easy-to-use app.
                                </p>
                                 <p className="text-muted-foreground">
                                   Our platform focuses on providing quality services from experienced local vendors who understand the needs of Bhuj residents. We carefully onboard service providers to ensure safety, professionalism, and customer satisfaction.
                                </p>
                            </div>

                            {/* Mission & Vision */}
                            <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
                                    <p className="text-muted-foreground">
                                        Our mission is to simplify home service booking in Bhuj while creating growth opportunities for local service professionals. We believe in empowering small businesses and freelancers by connecting them directly with customers through technology.
                                    </p>
                                </div>
                                <div className="space-y-4 md:text-right">
                                    <h2 className="text-2xl font-semibold text-primary">અમારું મિશન</h2>
                                    <p className="text-muted-foreground">
                                        અમારું મિશન ભુજમાં ઘર સેવા બુકિંગને સરળ બનાવવાનું છે જ્યારે સ્થાનિક સેવા પ્રોફેશનલ્સ માટે વિકાસની તકો ઊભી કરવી. અમે ટેકનોલોજી દ્વારા ગ્રાહકો સાથે સીધા જોડાણ કરીને નાના ઉદ્યોગો અને ફ્રીલાન્સર્સને સશક્ત બનાવવામાં માનીએ છીએ.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                     <h2 className="text-2xl font-semibold text-foreground">Our Vision</h2>
                                    <p className="text-muted-foreground">
                                        Our vision is to become the most trusted and preferred home service platform in Bhuj by delivering high-quality services, transparent pricing, and excellent customer support.
                                    </p>
                                </div>
                                 <div className="space-y-4 md:text-right">
                                    <h2 className="text-2xl font-semibold text-primary">અમારું વિઝન</h2>
                                    <p className="text-muted-foreground">
                                        અમારું વિઝન ઉચ્ચ-ગુણવત્તાવાળી સેવાઓ, પારદર્શક ભાવો અને ઉત્તમ ગ્રાહક સમર્થન આપીને ભુજમાં સૌથી વિશ્વસનીય અને પસંદગીનું હોમ સર્વિસ પ્લેટફોર્મ બનવાનું છે.
                                    </p>
                                </div>
                            </div>
                            
                            {/* What we offer */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold text-center text-foreground">Book Professional Home Services in Bhuj</h2>
                                 <p className="text-muted-foreground text-center">At Jalaram Home Services, we provide a wide range of home services in Bhuj, including:</p>
                                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-muted-foreground pt-4">
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Electrical repair & installation services</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Plumbing & water leakage solutions</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Home cleaning & deep cleaning services</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>AC repair and maintenance</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Painting and renovation services</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Carpenter & furniture repair services</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Pest control services</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>And many more local home services...</span></li>
                                </ul>
                                <p className="text-center text-sm pt-2">All services are offered by verified and experienced professionals in Bhuj.</p>
                            </div>

                             {/* Why Choose Us */}
                            <div className="space-y-6 rounded-lg bg-muted/50 p-8">
                                <h2 className="text-2xl font-semibold text-center text-foreground">Why Choose Jalaram Home Services in Bhuj</h2>
                                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-muted-foreground">
                                    <li className="flex flex-col items-center text-center gap-2">
                                        <div className="bg-primary/10 text-primary rounded-full p-3"><Wrench className="w-6 h-6" /></div>
                                        <h3 className="font-semibold text-foreground">Trusted Local Providers</h3>
                                        <p className="text-sm">ભુજમાં વિશ્વસનીય સ્થાનિક સેવા પ્રદાતાઓ.</p>
                                    </li>
                                     <li className="flex flex-col items-center text-center gap-2">
                                        <div className="bg-primary/10 text-primary rounded-full p-3"><Wrench className="w-6 h-6" /></div>
                                        <h3 className="font-semibold text-foreground">Quick & Easy Booking</h3>
                                        <p className="text-sm">ઝડપી અને સરળ ઓનલાઇન બુકિંગ.</p>
                                    </li>
                                     <li className="flex flex-col items-center text-center gap-2">
                                        <div className="bg-primary/10 text-primary rounded-full p-3"><Wrench className="w-6 h-6" /></div>
                                        <h3 className="font-semibold text-foreground">Transparent Pricing</h3>
                                         <p className="text-sm">પારદર્શક અને વ્યાજબી ભાવો.</p>
                                    </li>
                                    <li className="flex flex-col items-center text-center gap-2">
                                        <div className="bg-primary/10 text-primary rounded-full p-3"><Wrench className="w-6 h-6" /></div>
                                        <h3 className="font-semibold text-foreground">Quality Guaranteed</h3>
                                        <p className="text-sm">ગુણવત્તાયુક્ત કામની ગેરંટી.</p>
                                    </li>
                                     <li className="flex flex-col items-center text-center gap-2">
                                        <div className="bg-primary/10 text-primary rounded-full p-3"><Wrench className="w-6 h-6" /></div>
                                        <h3 className="font-semibold text-foreground">Support Local Business</h3>
                                        <p className="text-sm">સ્થાનિક વ્યવસાયોને સમર્થન.</p>
                                    </li>
                                     <li className="flex flex-col items-center text-center gap-2">
                                        <div className="bg-primary/10 text-primary rounded-full p-3"><Wrench className="w-6 h-6" /></div>
                                        <h3 className="font-semibold text-foreground">On-Time Service</h3>
                                        <p className="text-sm">સમયસર સેવા ડિલિવરી.</p>
                                    </li>
                                </ul>
                            </div>

                            {/* Supporting Local Vendors */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold text-center text-foreground">Supporting Local Vendors</h2>
                                <p className="text-muted-foreground text-center">Jalaram Home Services is not just a service app — it is a growth platform for local service providers in Bhuj. Registered vendors receive:</p>
                                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-muted-foreground pt-4">
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Regular service leads</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Business profile visibility</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Digital promotional banners</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Custom marketing support</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Tools to grow their customer base</span></li>
                                </ul>
                                 <p className="text-center text-sm pt-2">Our goal is to help Bhuj’s local workforce succeed and expand their businesses.</p>
                            </div>
                            
                            {/* Commitment */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold text-center text-foreground">Our Commitment to Customers</h2>
                                <p className="text-muted-foreground text-center">Customer satisfaction is at the heart of everything we do. With Jalaram Home Services, your home is in trusted hands. We are committed to:</p>
                                <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-muted-foreground pt-4 max-w-lg mx-auto">
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>On-time service delivery</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Professional behavior</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>High-quality work</span></li>
                                    <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" /><span>Safe and secure bookings</span></li>
                                </ul>
                            </div>
                            
                            {/* Serving Area */}
                            <div className="text-center text-muted-foreground">
                                <h2 className="text-2xl font-semibold text-center text-foreground mb-4">Trusted Local Service Providers in Bhuj</h2>
                                <p>We proudly serve Bhuj city and surrounding areas, offering fast and reliable home services wherever you are located.</p>
                                <p className="mt-2">If you’re searching for the best home services in Bhuj, trusted plumbers in Bhuj, or professional electricians in Bhuj, Jalaram Home Services is your one-stop solution.</p>
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
