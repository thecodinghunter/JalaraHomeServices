
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serviceCategories } from "@/lib/data";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, useRouter, useParams } from "next/navigation";

export default function SelectSubCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const categoryId = params.category as string;
    const category = serviceCategories.find(c => c.id === categoryId);

    if (!category) {
        notFound();
    }

  return (
    <div className="grid gap-6">
       <Card>
        <CardHeader>
            <div className="flex items-center gap-4">
                <Link href="/request-service">
                    <Button variant="outline" size="icon" >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <CardTitle>Select a Service</CardTitle>
                    <CardDescription>
                        Choose a specific service under {category.name}.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col gap-2">
                {category.subCategories.map((subCategory) => (
                    <Link 
                        key={subCategory.id} 
                        href={`/request-service/location?category=${encodeURIComponent(category.id)}&categoryName=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(subCategory.name)}`}
                        passHref
                    >
                       <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted hover:border-primary transition-colors cursor-pointer">
                            <div>
                                <span className="font-medium">{subCategory.name}</span>
                                {subCategory.name_gu && <span className="block text-sm text-muted-foreground">{subCategory.name_gu}</span>}
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                       </div>
                    </Link>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
