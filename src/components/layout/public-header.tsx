'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/poster-generator", label: "Make a Poster" },
];

export function PublicHeader() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                    <Image src="/img/logo.png" width={48} height={48} alt="Jalaram Home Service Logo" />
                    <span className="hidden sm:inline-block">Jalaram Home Service</span>
                </Link>
                
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} passHref>
                            <Button variant="ghost">{link.label}</Button>
                        </Link>
                    ))}
                    <Link href="/login" passHref>
                        <Button variant="ghost">Login</Button>
                    </Link>
                    <Link href="/register" passHref>
                        <Button>Register</Button>
                    </Link>
                </nav>

                {/* Mobile Nav */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm">
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-8">
                                     <Link href="/" className="flex items-center gap-2 font-bold text-lg" onClick={() => setIsOpen(false)}>
                                        <Image src="/logo.png" width={32} height={32} alt="Jalaram Home Service Logo" />
                                        <span>Jalaram Service</span>
                                    </Link>
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                        <X className="h-6 w-6" />
                                    </Button>
                                </div>
                                <nav className="flex flex-col gap-6">
                                    {navLinks.map(link => (
                                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} passHref>
                                            <span className="text-xl font-medium text-foreground hover:text-primary transition-colors">{link.label}</span>
                                        </Link>
                                    ))}
                                </nav>
                                <div className="border-t pt-6 mt-6 flex flex-col gap-3">
                                    <Link href="/login" onClick={() => setIsOpen(false)} passHref>
                                        <Button variant="outline" className="w-full text-lg h-12">Login</Button>
                                    </Link>
                                    <Link href="/register" onClick={() => setIsOpen(false)} passHref>
                                        <Button className="w-full text-lg h-12">Register</Button>
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
