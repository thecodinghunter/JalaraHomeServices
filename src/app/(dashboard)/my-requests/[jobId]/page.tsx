
'use client';

import {
  APIProvider,
  Map,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { jobRequests, vendors } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Phone, Star, User, MapPin, Calendar, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailsPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const request = jobRequests.find((r) => r.id === jobId);
  const vendor = request?.vendorId
    ? vendors.find((v) => v.id === request.vendorId)
    : null;

  if (!request) {
    notFound();
  }
  
  const position = {
    lat: request.customerLocation.latitude,
    lng: request.customerLocation.longitude,
  };

  const fullAddress = [
    request.address,
    request.locality,
    request.city,
    `${request.state} ${request.pincode}`,
  ].filter(Boolean).join(', ');

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Location</CardTitle>
            <CardDescription>
              Map view of the service request location.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
              <APIProvider
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              >
                <div className="h-[400px] w-full rounded-md overflow-hidden border">
                  <Map
                    zoom={15}
                    center={position}
                    mapId="jalaram-home-service-map"
                    disableDefaultUI
                  >
                    <AdvancedMarker position={position} />
                  </Map>
                </div>
              </APIProvider>
            ) : (
              <div className="h-[400px] w-full rounded-md border flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">Map requires API Key.</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Detailed Address</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <p className="font-semibold">{request.name}</p>
                    <p className="text-muted-foreground">{request.phone}</p>
                    {request.alternatePhone && <p className="text-muted-foreground">{request.alternatePhone}</p>}
                    <p className="text-muted-foreground pt-2">{fullAddress}</p>
                    {request.landmark && <p className="text-muted-foreground">Landmark: {request.landmark}</p>}
                </div>
            </CardContent>
        </Card>

      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Request Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Status</span>
              <Badge
                variant={
                  request.status === 'completed'
                    ? 'secondary'
                    : request.status === 'pending'
                    ? 'default'
                    : 'outline'
                }
              >
                {request.status}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2"><Wrench className="w-4 h-4"/> Service</span>
                <span className="font-medium">{request.serviceCategory}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4"/> Date</span>
                <span className="font-medium">
                    {new Date(request.createdAt).toLocaleDateString()}
                </span>
            </div>
            <Separator />
            <p className="text-sm text-muted-foreground">
              {request.description}
            </p>
          </CardContent>
        </Card>

        {vendor && (
          <Card>
            <CardHeader>
              <CardTitle>Assigned Vendor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <User className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold">{vendor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {vendor.serviceCategory}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <span>{vendor.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{vendor.phone}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Contact Vendor
              </Button>
            </CardFooter>
          </Card>
        )}
         {!vendor && (
           <Card>
              <CardHeader>
                <CardTitle>Vendor Not Assigned</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">We are currently finding the best vendor for your job. You will be notified once a vendor has been assigned.</p>
              </CardContent>
           </Card>
         )}
         
        <Link href="/my-requests">
            <Button variant="outline" className="w-full">Back to My Requests</Button>
        </Link>
      </div>
    </div>
  );
}
