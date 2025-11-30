'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CarCard from './CarCard';
import Map from './Map';
import { MOCK_CARS } from '@/lib/mockData';
import { Loader2 } from 'lucide-react';

export default function SearchResults() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [cars, setCars] = useState<typeof MOCK_CARS>([]);
    const [error, setError] = useState<string | null>(null);
    const [hoveredCarId, setHoveredCarId] = useState<string | null>(null);

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
            <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-slate-50 p-4 lg:p-6">
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
                        <div className="space-y-4">
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
            <div className="hidden lg:block w-1/2 h-full sticky top-16">
                <Map
                    cars={cars}
                    hoveredCarId={hoveredCarId}
                    initialCenter={{ lat, lng }}
                />
            </div>
        </div>
    );
}
