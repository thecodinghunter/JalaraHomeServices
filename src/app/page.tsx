
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { serviceCategories } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Wrench, CheckCircle, Rocket, Search, UserCheck, Smile, ShieldCheck, BadgePercent, Clock, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AppFooter } from '@/components/layout/footer';
import { PublicHeader } from '@/components/layout/public-header';

const serviceImages = PlaceHolderImages;

const findImage = (hint: string) => {
    return serviceImages.find(img => img.imageHint.includes(hint))?.imageUrl || serviceImages[0].imageUrl;
}

const heroSlides = [
    {
        title: "Reliable Home Services in Bhuj & Kutchh",
        subtitle: "ભરોસાપાત્ર હોમ સર્વિસ, તમારી માંગ પર",
        description: "From plumbing, electrician, cleaning, and appliance repair to pest control and construction, get trusted professionals for all home services in Bhuj and Kutchh. Book a home service provider in Bhuj for your household needs. Fast, efficient, and available across Kutchh.",
        imageHint: "home repair",
        primaryCta: {
            text: "Book a Service",
            href: "/request-service",
        },
        secondaryCta: {
            text: "Become a Vendor",
            href: "/register/vendor",
        }
    },
    {
        title: "Professional Cleaning Services in Bhuj",
        subtitle: "પ્રોફેશનલ સફાઈ સેવાઓ",
        description: "Get your home or office sparkling clean with our cleaning services in Bhuj. Hassle-free booking for home cleaning, office cleaning, and more. Trusted local cleaning service provider in Bhuj.",
        imageHint: "cleaning supplies",
        primaryCta: {
            text: "Book Cleaning",
            href: "/request-service/cleaning-services",
        },
        secondaryCta: {
            text: "Become a Vendor",
            href: "/register/vendor",
        }
    },
    {
        title: "Expert Appliance Repair in Bhuj",
        subtitle: "નિષ્ણાત એપ્લાયન્સ રિપેર",
        description: "Fast and reliable AC repair, fridge repair, and washing machine repair in Bhuj. Certified technicians for all appliance services. Appliance repair in Bhuj and Kutchh for every brand.",
        imageHint: "home appliances",
        primaryCta: {
            text: "Repair an Appliance",
            href: "/request-service/appliance-services",
        },
        secondaryCta: {
            text: "Become a Vendor",
            href: "/register/vendor",
        }
    },
    {
        title: "Construction & Renovation Services in Bhuj",
        subtitle: "ગુણવત્તાયુક્ત બાંધકામ અને નવીનીકરણ",
        description: "Building your dreams or renovating your space? Find skilled professionals for construction services, home renovation, and repair services in Bhuj. Quality construction and repair services in Bhuj and Kutchh.",
        imageHint: "construction tools",
        primaryCta: {
            text: "Request a Quote",
            href: "/request-service/construction-repair",
        },
        secondaryCta: {
            text: "Become a Vendor",
            href: "/register/vendor",
        }
    }
];


export default function LandingPage() {
    const plugin = React.useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true })
    );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero Slider Section */}
        <section className="relative w-full">
            <Carousel 
                className="w-full" 
                opts={{ loop: true }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {heroSlides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-[60vh] md:h-[80vh] w-full">
                                <Image
                                    src={findImage(slide.imageHint)}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={slide.imageHint}
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="container text-center text-white">
                                        <div className="bg-white/10 backdrop-blur-sm text-white inline-block rounded-full px-4 py-2 text-sm font-semibold mb-4">
                                            Your One-Stop Solution for Home Needs
                                            <span className="block text-xs mt-1 text-white/80">ઘરની જરૂરિયાતો માટે તમારું વન-સ્ટોપ સોલ્યુશન</span>
                                        </div>
                                        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 drop-shadow-md">
                                            {slide.title}
                                        </h1>
                                        {slide.subtitle && (
                                            <h2 className="text-2xl md:text-3xl font-semibold text-accent mb-6 drop-shadow">
                                                {slide.subtitle}
                                            </h2>
                                        )}
                                        <p className="max-w-2xl mx-auto text-lg text-white/90 mb-10 drop-shadow">
                                            {slide.description}
                                        </p>
                                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                            <Link href={slide.primaryCta.href}>
                                                <Button size="lg" className="w-full sm:w-auto transition-transform hover:scale-105 bg-primary hover:bg-primary/90 text-primary-foreground">
                                                    {slide.primaryCta.text} <ArrowRight className="ml-2 h-5 w-5" />
                                                </Button>
                                            </Link>
                                            <Link href={slide.secondaryCta.href}>
                                                <Button size="lg" variant="outline" className="w-full sm:w-auto transition-transform hover:scale-105 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                                                    {slide.secondaryCta.text}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 border-none h-10 w-10" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/30 hover:bg-black/50 border-none h-10 w-10" />
            </Carousel>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-24 bg-muted/50">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
                    <p className="max-w-xl mx-auto text-muted-foreground mt-4">
                        Get any service in 3 simple steps.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="bg-primary/10 text-primary rounded-full p-4 mb-4">
                            <Search className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">1. Select a Service</h3>
                        <p className="text-muted-foreground">Browse our wide range of services and choose what you need.</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <div className="bg-primary/10 text-primary rounded-full p-4 mb-4">
                            <UserCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">2. We Assign an Expert</h3>
                        <p className="text-muted-foreground">We find the best-rated, available professional for your job.</p>
                    </div>
                     <div className="flex flex-col items-center">
                        <div className="bg-primary/10 text-primary rounded-full p-4 mb-4">
                            <Smile className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">3. Job Done</h3>
                        <p className="text-muted-foreground">Your chosen expert arrives and completes the job to your satisfaction.</p>
                    </div>
                </div>
            </div>
        </section>


        {/* Services Section */}
        <section id="services" className="py-20 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold">Our Home Services in Bhuj</h2>
                            <p className="max-w-xl mx-auto text-muted-foreground mt-4">
                                Explore a wide range of home services in Bhuj: plumbing, electrician, cleaning, appliance repair, pest control, construction, and more. Book trusted home service providers in Bhuj and Kutchh for your household needs.
                            </p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {serviceCategories.slice(0, 8).map((category) => (
                <Link key={category.id} href={`/request-service/${category.id}`} passHref>
                  <Card className="overflow-hidden h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className="relative h-48 w-full">
                      <Image
                        src={findImage(category.imageHint)}
                        alt={category.name + ' in Bhuj'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={category.imageHint}
                      />
                    </div>
                    <CardHeader className="flex-1">
                        <CardTitle className="text-lg">
                            {category.name}
                            {category.name_gu && <span className="block text-sm font-medium text-accent/90 mt-1">{category.name_gu}</span>}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-2 pt-2">{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
             <div className="text-center mt-12">
                <Link href="/request-service">
                    <Button variant="outline">
                        View All Services <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
          </div>
        </section>
        
        {/* Poster Builder Section */}
        <section className="py-20 md:py-24 bg-primary/5">
            <div className="container text-center">
                <div className="bg-accent/10 text-accent inline-block rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                    New Feature
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Create Posters for Your Business</h2>
                <p className="max-w-xl mx-auto text-muted-foreground mt-4">
                    Instantly generate beautiful, professional posters to advertise your services. Just enter your details and choose a design to get started.
                    <span className="block mt-1 text-primary/90">તમારી સેવાઓની જાહેરાત કરવા માટે તરત જ સુંદર, વ્યાવસાયિક પોસ્ટરો બનાવો. ફક્ત તમારી વિગતો દાખલ કરો અને પ્રારંભ કરવા માટે ડિઝાઇન પસંદ કરો.</span>
                </p>
                <Link href="/poster-generator">
                    <Button size="lg" className="mt-8 transition-transform hover:scale-105 !h-auto">
                        <div className="flex flex-col items-center py-1">
                            <span>Try the Poster Builder</span>
                            <span className="text-sm opacity-90">પોસ્ટર બિલ્ડરનો પ્રયાસ કરો</span>
                        </div>
                        <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 md:py-24 bg-muted/50">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
                    <p className="max-w-xl mx-auto text-muted-foreground mt-4">
                        Your satisfaction is our priority. We guarantee quality and reliability.
                    </p>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <ShieldCheck className="w-8 h-8 text-primary"/>
                            <div>
                                <CardTitle>Verified Professionals</CardTitle>
                                <CardDescription>All our vendors are background-checked and experienced.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <BadgePercent className="w-8 h-8 text-primary"/>
                            <div>
                                <CardTitle>Transparent Pricing</CardTitle>
                                <CardDescription>No hidden fees. Know the price before you book.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Clock className="w-8 h-8 text-primary"/>
                            <div>
                                <CardTitle>On-Time Service</CardTitle>
                                <CardDescription>We value your time and ensure our professionals are punctual.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </section>

        {/* Vendor Onboarding Section */}
        <section className="py-20 md:py-24">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Onboard Your Service</h2>
                        <p className="text-muted-foreground text-lg mb-6">
                            Join our network of trusted professionals and grow your business. Reach thousands of customers in Kutchh looking for your skills.
                            <span className="block mt-1 text-base text-primary/90">અમારા વિશ્વસનીય વ્યાવસાયિકોના નેટવર્કમાં જોડાઓ અને તમારો વ્યવસાય વધારો. કચ્છમાં હજારો ગ્રાહકો સુધી પહોંચો જે તમારી કુશળતા શોધી રહ્યા છે.</span>
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start gap-4">
                                <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Constant Flow of Jobs</h3>
                                    <p className="text-muted-foreground">
                                        Get access to a wide range of job requests in your area.
                                        <span className="block text-sm text-primary/90">તમારા વિસ્તારમાં નોકરીની વિનંતીઓની વિશાળ શ્રેણીની ઍક્સેસ મેળવો.</span>
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Flexible Schedule</h3>
                                    <p className="text-muted-foreground">
                                        Work on your own terms and accept jobs that fit your schedule.
                                        <span className="block text-sm text-primary/90">તમારી પોતાની શરતો પર કામ કરો અને તમારા શેડ્યૂલને અનુરૂપ નોકરીઓ સ્વીકારો.</span>
                                    </p>
                                </div>
                            </li>
                             <li className="flex items-start gap-4">
                                <CheckCircle className="w-6 h-6 text-green-500 mt-1 shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Easy Payments</h3>
                                    <p className="text-muted-foreground">
                                        Receive timely and secure payments directly to your bank account.
                                        <span className="block text-sm text-primary/90">તમારા બેંક ખાતામાં સીધા સમયસર અને સુરક્ષિત ચુકવણીઓ મેળવો.</span>
                                    </p>
                                </div>
                            </li>
                        </ul>
                         <Link href="/register/vendor">
                            <Button size="lg" className="transition-transform hover:scale-105">
                                Register as a Vendor <Rocket className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                     <div className="order-1 md:order-2 relative h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl group">
                        <Image
                            src={findImage('construction tools')}
                            alt="Vendor working"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            data-ai-hint="construction tools"
                        />
                    </div>
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
