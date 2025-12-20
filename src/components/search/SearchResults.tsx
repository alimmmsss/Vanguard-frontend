'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CarCard from './CarCard';
import Map from './Map';
import { MOCK_CARS } from '@/lib/mockData';
import { Loader2, Map as MapIcon, List } from 'lucide-react';

export default function SearchResults() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState<typeof MOCK_CARS>([]);
    const [error, setError] = useState<string | null>(null);
    const [hoveredCarId, setHoveredCarId] = useState<string | null>(null);
    const [showMapMobile, setShowMapMobile] = useState(false);

    // Parse params
    const lat = parseFloat(searchParams.get('lat') || '23.8103');
    const lng = parseFloat(searchParams.get('lng') || '90.4125');
    const address = searchParams.get('address') || 'Dhaka';

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            setError(null);
            try {
                const query = new URLSearchParams(searchParams.toString()).toString();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicles/search?${query}`);

                if (!res.ok) {
                    throw new Error('Failed to fetch vehicles');
                }

                const data = await res.json();
                setCars(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load vehicles. Please try again.');
                // Fallback to mock data for demo if API fails
                setCars(MOCK_CARS);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [searchParams]);

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
            {/* List View */}
            <div className={`w-full lg:w-1/2 h-full overflow-y-auto bg-slate-50 p-4 lg:p-6 ${showMapMobile ? 'hidden lg:block' : 'block'}`}>
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-deep-slate-blue">
                            Available Cars in <span className="text-electric-teal">{address.split(',')[0]}</span>
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            {cars.length} vehicles found • No commission
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm">
                            {error} Using offline data.
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="h-8 w-8 animate-spin text-electric-teal" />
                        </div>
                    ) : (
                        <div className="space-y-4 pb-20 lg:pb-0">
                            {cars.map((car) => (
                                <CarCard
                                    key={car.id}
                                    car={car}
                                    onHover={setHoveredCarId}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Map View */}
            <div className={`w-full lg:w-1/2 h-full sticky top-16 ${showMapMobile ? 'block' : 'hidden lg:block'}`}>
                <Map
                    cars={cars}
                    hoveredCarId={hoveredCarId}
                    initialCenter={{ lat, lng }}
                />
            </div>

            {/* Mobile Toggle Button */}
            <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
                <button
                    onClick={() => setShowMapMobile(!showMapMobile)}
                    className="bg-deep-slate-blue text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 hover:bg-slate-800 transition-all"
                >
                    {showMapMobile ? (
                        <>
                            <List className="h-5 w-5" /> Show List
                        </>
                    ) : (
                        <>
                            <MapIcon className="h-5 w-5" /> Show Map
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
