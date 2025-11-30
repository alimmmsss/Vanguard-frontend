'use client';

import { useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

const LIBRARIES: ("places")[] = ["places"];

export default function GoogleMapsProvider({ children }: { children: ReactNode }) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: LIBRARIES,
    });

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    if (!isLoaded) {
        return <div className="h-screen w-full flex items-center justify-center bg-slate-50">Loading Maps...</div>;
    }

    return <>{children}</>;
}
