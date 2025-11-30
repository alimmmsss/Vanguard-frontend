'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { MapPin, Loader2 } from 'lucide-react';

const LIBRARIES: ("places")[] = ["places"];

interface PlaceResult {
    address: string;
    lat: number;
    lng: number;
    placeId: string;
}

interface GooglePlacesAutocompleteProps {
    onSelect: (place: PlaceResult) => void;
    placeholder?: string;
    className?: string;
}

export default function GooglePlacesAutocomplete({ onSelect, placeholder = "Where to?", className }: GooglePlacesAutocompleteProps) {
    // Removed local useJsApiLoader to use global provider
    const isLoaded = true; // Assumed loaded by provider

    const [mounted, setMounted] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Set mounted state only on client-side to prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
    const placesService = useRef<google.maps.places.PlacesService | null>(null);
    const sessionToken = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
    // We need a dummy div to initialize PlacesService (it requires a map or a node)
    const placesServiceDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mounted && isLoaded && !autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
            sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();

            if (placesServiceDiv.current) {
                placesService.current = new window.google.maps.places.PlacesService(placesServiceDiv.current);
            }
        }
    }, [mounted, isLoaded]);

    const fetchPredictions = useCallback((input: string) => {
        if (!input || !autocompleteService.current || !sessionToken.current) {
            setOptions([]);
            return;
        }

        const request: google.maps.places.AutocompletionRequest = {
            input,
            sessionToken: sessionToken.current,
            componentRestrictions: { country: 'bd' }, // Optional: restrict to Bangladesh or specific region if needed, removing if global
        };

        // Removing country restriction for now to be global, or we can add it back if the user specified. 
        // User didn't specify country, but "Vanguard" sounds global or specific. 
        // I'll keep it global for now by removing componentRestrictions.
        delete request.componentRestrictions;

        autocompleteService.current.getPlacePredictions(request, (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                setOptions(predictions);
                setIsOpen(true);
            } else {
                setOptions([]);
                setIsOpen(false);
            }
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        fetchPredictions(value);
    };

    const handleSelect = (prediction: google.maps.places.AutocompletePrediction) => {
        setInputValue(prediction.description);
        setIsOpen(false);

        if (!placesService.current || !sessionToken.current) return;

        const request: google.maps.places.PlaceDetailsRequest = {
            placeId: prediction.place_id,
            fields: ['geometry', 'formatted_address'],
            sessionToken: sessionToken.current, // CRITICAL: Use same token for details
        };

        placesService.current.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place && place.geometry && place.geometry.location) {
                onSelect({
                    address: place.formatted_address || prediction.description,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    placeId: prediction.place_id,
                });

                // REFRESH SESSION TOKEN after a complete transaction (Autocomplete -> Details)
                sessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
                console.log("Session Token Refreshed");
            }
        });
    };

    if (!mounted || !isLoaded) return <div className="animate-pulse bg-slate-100 h-12 rounded-xl w-full"></div>;

    return (
        <div className="relative w-full">
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-electric-teal focus:border-transparent outline-none transition-all text-slate-700 placeholder-slate-400 ${className}`}
                />
            </div>

            {/* Hidden div for PlacesService */}
            <div ref={placesServiceDiv} style={{ display: 'none' }}></div>

            {isOpen && options.length > 0 && (
                <ul className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl max-h-60 overflow-auto">
                    {options.map((option) => (
                        <li
                            key={option.place_id}
                            onClick={() => handleSelect(option)}
                            className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-start gap-3 border-b border-slate-50 last:border-0 transition-colors"
                        >
                            <MapPin className="h-5 w-5 text-slate-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-slate-700 font-medium text-sm">{option.structured_formatting.main_text}</p>
                                <p className="text-slate-400 text-xs">{option.structured_formatting.secondary_text}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
