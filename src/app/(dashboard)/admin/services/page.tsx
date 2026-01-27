import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serviceCategories } from "@/lib/data";
import { PlusCircle, Wrench } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const serviceImages = PlaceHolderImages;

export default function AdminServicesPage() {

    const findImage = (hint: string) => {
        return serviceImages.find(img => img.imageHint.includes(hint))?.imageUrl || serviceImages[0].imageUrl;
    }

  return (
    <div className="grid gap-6">
       <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle>Service Categories</CardTitle>
                    <CardDescription>
                    Manage the services offered on the platform.
                    </CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Service
                </Button>
            </div>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                {serviceCategories.map((category, index) => (
                    <AccordionItem key={category.id} value={category.id}>
                        <AccordionTrigger>
                             <div className="flex items-center gap-4 text-left">
                                <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                                     <Image
                                        src={findImage(category.imageHint)}
                                        alt={category.name}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={category.imageHint}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{category.name}</h3>
                                    {category.name_gu && <p className="text-sm text-primary font-normal">{category.name_gu}</p>}
                                    <p className="text-sm text-muted-foreground mt-1">{category.subCategories.length} services</p>
                                </div>
                             </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="pl-6 pt-2">
                                <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
                                    {category.subCategories.map(sub => (
                                        <li key={sub.id} className="p-3 rounded-md bg-muted/50">
                                            <div className="flex items-center gap-2 font-medium">
                                                <Wrench className="w-4 h-4 text-primary" />
                                                <span>{sub.name}</span>
                                            </div>
                                            {sub.name_gu && <p className="text-xs text-muted-foreground mt-1 pl-6">{sub.name_gu}</p>}
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="outline" size="sm" className="mt-4">Manage Category</Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
