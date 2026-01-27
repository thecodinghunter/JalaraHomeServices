"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

export default function ContactMap({ position, apiKey }: { position: { lat: number; lng: number }; apiKey: string }) {
  return (
    <APIProvider apiKey={apiKey}>
      <Map zoom={13} center={position} mapId="jalaram-contact-us-map" disableDefaultUI>
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}
