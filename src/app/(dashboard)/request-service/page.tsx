"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { serviceCategories } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const serviceImages = PlaceHolderImages;

export default function RequestServicePage() {

  const findImage = (hint: string) => {
    return serviceImages.find(img => img.imageHint.includes(hint))?.imageUrl || serviceImages[0].imageUrl;
  }

  return (
    <div className="grid gap-6">
       <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle>Request a Service</CardTitle>
                    <p className="text-muted-foreground">
                        What do you need help with today? Select a category to get started.
                    </p>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {serviceCategories.map((category) => (
                    <Link key={category.id} href={`/request-service/${category.id}`} passHref>
                        <Card  className="overflow-hidden hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full flex flex-col">
                            <div className="relative h-40 w-full">
                                <Image
                                src={findImage(category.imageHint)}
                                alt={category.name}
                                fill
                                className="object-cover"
                                data-ai-hint={category.imageHint}
                                />
                            </div>
                            <CardHeader className="flex-1 p-4">
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
        </CardContent>
      </Card>
    </div>
  );
}
