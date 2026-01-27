
'use client';

import { useRef, useEffect } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PlaceAutocompleteProps = {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  className?: string;
} & React.ComponentProps<'input'>;

export const PlaceAutocomplete = ({ onPlaceSelect, className, ...props }: PlaceAutocompleteProps) => {
  const places = useMapsLibrary('places');
  const inputRef = useRef<HTMLInputElement>(null);
  const autocomplete = useRef<google.maps.places.Autocomplete>();

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
       // Restrict to Kutch, Gujarat, India
      componentRestrictions: { country: 'IN' },
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(22.7, 68.4), // Approx SW corner of Kutch
        new google.maps.LatLng(24.7, 71.1)  // Approx NE corner of Kutch
      ),
      strictBounds: true,
    };

    autocomplete.current = new places.Autocomplete(inputRef.current, options);
    
    const listener = autocomplete.current.addListener('place_changed', () => {
      onPlaceSelect(autocomplete.current?.getPlace() || null);
    });

    return () => {
        if (autocomplete.current) {
            google.maps.event.removeListener(listener);
        }
    }

  }, [places, onPlaceSelect]);

  return (
    <div className={cn("autocomplete-container", className)}>
      <Input
        ref={inputRef}
        placeholder="Enter your address"
        type="text"
        className="w-full"
        {...props}
      />
    </div>
  );
};
