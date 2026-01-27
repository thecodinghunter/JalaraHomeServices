
'use client';

import { Suspense, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader, ArrowLeft } from 'lucide-react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
} from '@vis.gl/react-google-maps';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlaceAutocomplete } from '@/components/places-autocomplete';

function RequestLocationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get('category');
  const serviceSubCategory = searchParams.get('subcategory');
  const serviceCategory = searchParams.get('categoryName');
  
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number} | null>(null);
  const [address, setAddress] = useState('');
  const [locationString, setLocationString] = useState('');

  const map = useMap();

  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    setSelectedPlace(place);
    if (place?.geometry?.location && map) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const newLocation = { lat, lng };
      
      setSelectedLocation(newLocation);
      setLocationString(`${lat},${lng}`);
      setAddress(place.formatted_address || '');
      map.panTo(newLocation);
      map.setZoom(15);
    } else {
      setLocationString('');
      setSelectedLocation(null);
    }
  };
  
  const handleNext = () => {
    if (!locationString || !serviceCategory || !serviceSubCategory) return;
    const params = new URLSearchParams({
      category: categoryId || '',
      categoryName: serviceCategory,
      subcategory: serviceSubCategory,
      location: locationString,
      address: address,
    });
    router.push(`/request-service/details?${params.toString()}`);
  };

  return (
    <div className="relative min-h-[calc(100vh_-_theme(spacing.16))] w-full">
      <div className="absolute inset-0 z-0">
         <Map
            defaultZoom={9}
            defaultCenter={{ lat: 23.7337, lng: 69.8597 }} // Kutch
            mapId="jalaram-request-service-map-fullscreen"
            disableDefaultUI
            gestureHandling="greedy"
          >
            {selectedLocation && <AdvancedMarker position={selectedLocation} />}
          </Map>
      </div>

      <div className="absolute top-4 right-4 z-10 w-full max-w-sm">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Link href={`/request-service/${encodeURIComponent(categoryId || '')}`}>
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <CardTitle>
                  Set your Location
                </CardTitle>
                <CardDescription>
                  Search for your address or area.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PlaceAutocomplete
              onPlaceSelect={handlePlaceSelect}
              className="bg-background/80 backdrop-blur-sm"
              defaultValue={address}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleNext} className="w-full" disabled={!locationString}>
              Next: Add Details
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function RequestLocationPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full min-h-screen"><Loader className="w-8 h-8 animate-spin" /></div>}>
            {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={['places']}>
                    <RequestLocationContent />
                </APIProvider>
            ) : (
                <div className="flex items-center justify-center h-full min-h-screen">
                    <p className="text-muted-foreground">Map requires API Key.</p>
                </div>
            )}
        </Suspense>
    )
}
