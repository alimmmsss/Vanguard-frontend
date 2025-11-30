'use client';

import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Car } from '@/lib/mockData';
import { Navigation } from 'lucide-react';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 23.8103,
    lng: 90.4125
};

const LIBRARIES: ("places")[] = ["places"];

interface MapProps {
    cars: Car[];
    hoveredCarId: string | null;
    initialCenter?: { lat: number; lng: number };
}

export default function Map({ cars, hoveredCarId, initialCenter }: MapProps) {
    // Removed local useJsApiLoader to use global provider
    const isLoaded = true;

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [center, setCenter] = useState(initialCenter || defaultCenter);

    useEffect(() => {
        if (initialCenter) {
            setCenter(initialCenter);
            map?.panTo(initialCenter);
        }
    }, [initialCenter, map]);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    const handleNearMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setCenter(pos);
                    map?.panTo(pos);
                    map?.setZoom(14);
                },
                () => {
                    alert("Error: The Geolocation service failed.");
                }
            );
        } else {
            alert("Error: Your browser doesn't support geolocation.");
        }
    };

    if (!isLoaded) return <div className="w-full h-full bg-slate-100 animate-pulse" />;

    return (
        <div className="relative w-full h-full">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: [
                        {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [{ visibility: "off" }],
                        },
                    ],
                }}
            >
                {cars.map((car) => (
                    <Marker
                        key={car.id}
                        position={car.location}
                        animation={hoveredCarId === car.id ? google.maps.Animation.BOUNCE : undefined}
                        icon={{
                            url: hoveredCarId === car.id
                                ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                                : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        }}
                    />
                ))}
            </GoogleMap>

            {/* Near Me Button */}
            <button
                onClick={handleNearMe}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-slate-50 transition-colors z-10 text-deep-slate-blue"
                title="Show cars near me"
            >
                <Navigation className="h-5 w-5" />
            </button>
        </div>
    );
}
