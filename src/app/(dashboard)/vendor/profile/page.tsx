"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { vendors, serviceCategories } from "@/lib/data";

// Mock data for a logged-in vendor
const currentVendor = vendors[0];

export default function VendorProfilePage() {
  const [isOnline, setIsOnline] = useState(currentVendor.isOnline);
  const [radius, setRadius] = useState([currentVendor.workingRadius]);

  return (
    <div className="grid gap-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Profile</CardTitle>
          <CardDescription>
            Keep your information up-to-date to get relevant job requests.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
            <div className="flex flex-col">
              <Label htmlFor="online-status" className="font-medium">Online Status</Label>
              <span className="text-sm text-muted-foreground">
                You will only receive job requests when you are online.
              </span>
            </div>
            <Switch
              id="online-status"
              checked={isOnline}
              onCheckedChange={setIsOnline}
              aria-label="Toggle online status"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={currentVendor.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue={currentVendor.phone} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="service-category">Service Category</Label>
            <Select defaultValue={currentVendor.serviceCategory}>
              <SelectTrigger id="service-category">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map(category => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
                 <Label htmlFor="working-radius">Working Radius</Label>
                 <span className="text-sm font-medium text-primary">{radius[0]} km</span>
            </div>
            <Slider
              id="working-radius"
              min={1}
              max={50}
              step={1}
              value={radius}
              onValueChange={setRadius}
            />
          </div>

          <Button className="w-full">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
