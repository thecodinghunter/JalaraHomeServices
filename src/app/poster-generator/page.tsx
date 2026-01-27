
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { UserProfile } from '@/lib/types';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Download, Wrench, Phone, CheckCircle } from 'lucide-react';
import { AppFooter } from '@/components/layout/footer';
import { PublicHeader } from '@/components/layout/public-header';

const findImage = (hint: string) => {
    return PlaceHolderImages.find(img => img.imageHint.includes(hint))?.imageUrl || PlaceHolderImages[0].imageUrl;
}

const PosterCard = ({ title, children, onDownload }: { title: string; children: React.ReactNode; onDownload: () => void }) => (
    <Card className="flex flex-col">
        <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center p-2">
            {children}
        </CardContent>
        <CardFooter>
             <Button className="w-full" onClick={onDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Poster
            </Button>
        </CardFooter>
    </Card>
);

const PosterTemplate1 = ({ name, category, phone, services, image }: { name: string; category: string; phone: string; services: string[]; image: string | null }) => (
    <div className="relative aspect-[10/16] w-full rounded-md overflow-hidden border bg-zinc-900 text-white p-8 flex flex-col shadow-2xl font-body">
        {/* Decorative corner lines */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50"></div>
        
        <div className={`text-center ${image ? 'mb-4' : ''}`}>
            {image ? (
                 <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-primary mx-auto">
                    <Image src={image} alt={name} fill className="object-cover" />
                </div>
            ) : (
                <Image src="/logo.png" width={60} height={60} alt="Jalaram Home Service Logo" className="mx-auto mb-4" />
            )}
            <h3 className="text-4xl font-bold tracking-tight leading-none">{name}</h3>
            <p className="text-primary font-semibold text-lg mt-1">{category}</p>
        </div>
        
        <div className="flex-1 my-10 space-y-3 text-left">
            <ul className="text-zinc-300 space-y-2">
                {services.slice(0, 5).map((s, i) => <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" /><span>{s}</span></li>)}
            </ul>
        </div>
        
        <div className="mt-auto text-center border-t-2 border-primary/50 pt-6">
            <p className="font-bold text-2xl">Call for Expert Service</p>
            <p className="text-3xl font-semibold text-accent mt-2 flex items-center justify-center gap-3">
                <Phone className="w-6 h-6"/> {phone}
            </p>
            <p className="text-xs text-zinc-500 mt-4">jalaramhomeservice.in</p>
        </div>
    </div>
);


const PosterTemplate2 = ({ name, category, phone, services, image }: { name: string; category: string; phone: string; services: string[]; image: string | null }) => (
    <div className="relative aspect-[10/16] w-full rounded-md overflow-hidden border p-8 flex flex-col shadow-2xl bg-slate-50 font-body">
        {image && (
            <div className="relative w-full h-40 mb-6 rounded-lg overflow-hidden">
                <Image src={image} alt={name} fill className="object-cover" />
            </div>
        )}
        <div className="relative z-10 text-center mb-8">
             <h3 className="text-5xl font-extrabold tracking-tighter text-slate-900">{name}</h3>
             <p className="text-slate-500 font-medium text-xl mt-2">{category} Professionals</p>
        </div>

        <div className="relative z-10 flex-1 space-y-4 text-center my-8">
            {services.slice(0, 4).map((s, i) => (
                <div key={i} className="font-medium text-slate-700 bg-slate-100 border-l-4 border-primary p-3 text-left">{s}</div>
            ))}
        </div>

        {/* Background shape */}
        <div className="absolute inset-x-0 top-1/3 h-1/3 bg-primary/5 transform -skew-y-6 z-0"></div>

         <div className="relative z-10 mt-auto text-center bg-slate-800 text-white rounded-lg p-6">
            <p className="text-sm uppercase tracking-widest">For Booking & Inquiries</p>
            <p className="font-bold text-3xl text-accent mt-1">{phone}</p>
            <div className='flex justify-center items-center gap-2 mt-2'>
              <Image src="/logo.png" width={20} height={20} alt="Jalaram Home Service Logo" />
              <p className="text-xs text-slate-400 opacity-70">jalaramhomeservice.in</p>
            </div>
        </div>
    </div>
);

const PosterTemplate3 = ({ name, category, phone, services, image }: { name: string; category: string; phone: string; services: string[]; image: string | null }) => (
  <div className="relative font-sans text-slate-900 aspect-[10/16] w-full rounded-md overflow-hidden border bg-white shadow-2xl">
    {/* Background shapes */}
    <div 
      className="absolute inset-x-0 top-0 h-[60%] bg-primary/80" 
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)' }}
    ></div>
    <div 
      className="absolute inset-x-0 bottom-0 h-[50%] bg-accent/80" 
      style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)' }}
    ></div>

    {/* Image of person */}
    <div 
      className="absolute top-0 left-0 w-[65%] h-[85%]" 
      style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
      <Image
        src={image || "https://picsum.photos/seed/businessman/400/640"}
        alt={name}
        fill
        className="object-cover object-top"
        data-ai-hint="professional businessman"
      />
    </div>

    {/* Logo and Name */}
    <div className="absolute z-20 text-white top-6 right-6 text-right">
        <Image src="/logo.png" width={48} height={48} alt="Jalaram Home Service Logo" className="ml-auto mb-2" />
        <p className="font-semibold text-lg drop-shadow-md">{name}</p>
    </div>

    {/* Headline */}
    <div className="absolute z-20 top-[55%] right-6 text-right">
        <h3 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">EXPERT</h3>
        <h3 className="text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">SERVICE</h3>
        <h3 className="text-5xl font-extrabold tracking-tight text-accent drop-shadow-lg">TODAY</h3>
    </div>
    
    {/* Bottom left info */}
    <div className="absolute z-20 text-white bottom-6 left-6">
        <p className="font-semibold uppercase">Get a Free Quote</p>
        <p className="font-bold text-lg">{phone}</p>
        <p className="text-xs opacity-70 mt-2">jalaramhomeservice.in</p>
    </div>
  </div>
);


const PosterTemplate4 = ({ name, category, phone, services, image }: { name: string; category: string; phone: string; services: string[]; image: string | null }) => (
    <div className="relative aspect-[10/16] w-full rounded-md overflow-hidden border p-6 flex flex-col shadow-2xl bg-primary text-primary-foreground font-body">
        <div className="w-full h-48 relative rounded-md overflow-hidden mb-6">
             <Image src={image || findImage('tools background')} alt="service" fill className="object-cover" data-ai-hint="tools background"/>
             <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="text-center relative -mt-16">
            <div className="inline-block p-2 bg-primary rounded-full">
                <div className="bg-primary-foreground text-primary p-4 rounded-full">
                   <Image src="/logo.png" width={40} height={40} alt="Jalaram Home Service Logo" />
                </div>
            </div>
             <h3 className="text-4xl font-bold mt-4">{name}</h3>
             <p className="text-primary-foreground/80 font-medium text-lg">{category}</p>
        </div>

        <ul className="my-auto space-y-2 py-8 text-center">
            {services.slice(0, 4).map((s, i) => <li key={i} className="text-lg">{s}</li>)}
        </ul>

         <div className="mt-auto text-center bg-primary-foreground text-primary rounded-md p-4">
            <p className="text-xl font-bold text-accent">{phone}</p>
            <p className="text-xs mt-1 opacity-80">jalaramhomeservice.in</p>
        </div>
    </div>
);


export default function PublicPosterGeneratorPage() {
    const [name, setName] = useState('Your Business Name');
    const [phone, setPhone] = useState('98765 43210');
    const [category, setCategory] = useState('Home Services');
    const [services, setServices] = useState('Service 1\nService 2\nService 3\nService 4');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const serviceList = useMemo(() => services.split('\n').filter(s => s.trim() !== ''), [services]);
    const posterProps = { name, phone, category, services: serviceList, image: uploadedImage };

    const { user, loading: userLoading } = useUser();
    const firestore = useFirestore();
    const userProfileRef = useMemo(() => user ? doc(firestore, 'users', user.uid) : null, [user, firestore]);
    const { data: userProfile, loading: profileLoading } = useDoc<UserProfile>(userProfileRef);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDownload = () => {
        if (user && userProfile?.role === 'vendor') {
            alert("Poster download functionality would be implemented here for vendors.");
        } else {
            setDialogOpen(true);
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <PublicHeader />
            <main className="flex-1 py-8 md:py-12">
                <div className="container">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Create Your Poster</CardTitle>
                                    <CardDescription>Enter your details to see them live on the posters.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="businessName">Business Name</Label>
                                        <Input id="businessName" value={name} onChange={e => setName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Service Category</Label>
                                        <Input id="category" value={category} onChange={e => setCategory(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="services">Services (1 per line)</Label>
                                        <Textarea id="services" value={services} onChange={e => setServices(e.target.value)} rows={4} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="imageUpload">Upload Your Photo (Optional)</Label>
                                        <Input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="pt-2 text-sm" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="md:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Choose Your Design</CardTitle>
                                    <CardDescription>Select a template and click download. Only registered vendors can download.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid sm:grid-cols-2 gap-6">
                                    <PosterCard title="Modern Dark" onDownload={handleDownload}>
                                        <PosterTemplate1 {...posterProps} />
                                    </PosterCard>
                                    <PosterCard title="Clean & Bold" onDownload={handleDownload}>
                                        <PosterTemplate2 {...posterProps} />
                                    </PosterCard>
                                    <PosterCard title="Modern Corporate" onDownload={handleDownload}>
                                        <PosterTemplate3 {...posterProps} />
                                    </PosterCard>
                                    <PosterCard title="Vibrant & Focused" onDownload={handleDownload}>
                                        <PosterTemplate4 {...posterProps} />
                                    </PosterCard>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Vendor Access Required</DialogTitle>
                        <DialogDescription>
                            To download your poster, you need to be a registered vendor. Please log in or create a vendor account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-4 pt-4">
                        <Link href="/login" passHref>
                            <Button>Login</Button>
                        </Link>
                        <Link href="/register/vendor" passHref>
                            <Button variant="outline">Register as Vendor</Button>
                        </Link>
                    </div>
                </DialogContent>
            </Dialog>
            <AppFooter />
        </div>
    );
}
