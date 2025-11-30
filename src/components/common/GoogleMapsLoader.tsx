'use client';

import { useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

const LIBRARIES: ("places")[] = ["places"];

interface GoogleMapsLoaderProps {
    children: ReactNode;
}

export default function GoogleMapsLoader({ children }: GoogleMapsLoaderProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // Client-side API key validation
    if (!apiKey) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-red-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">API Key Missing</h2>
                    <p className="text-gray-700 mb-2">
                        Google Maps API key is not configured.
                    </p>
                    <p className="text-sm text-gray-600">
                        Please add <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> file.
                    </p>
                </div>
            </div>
        );
    }

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries: LIBRARIES,
    });

    if (loadError) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-red-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Maps</h2>
                    <p className="text-gray-700">
                        Failed to load Google Maps. Please check your API key and try again.
                    </p>
                </div>
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading Google Maps...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
