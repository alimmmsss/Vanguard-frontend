'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Car, Search } from 'lucide-react';
import GooglePlacesAutocomplete from './GooglePlacesAutocomplete';

export default function SearchWidget() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'daily' | 'outstation'>('daily');
    const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [vehicleType, setVehicleType] = useState('sedan');

    const handleSearch = () => {
        if (!location || !startDate || !endDate) {
            alert("Please fill in all fields");
            return;
        }

        const params = new URLSearchParams({
            lat: location.lat.toString(),
            lng: location.lng.toString(),
            address: location.address,
            start: startDate,
            end: endDate,
            type: vehicleType,
            mode: activeTab
        });

        router.push(`/search-results?${params.toString()}`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl shadow-slate-200/50 p-6 w-full max-w-4xl mx-auto -mt-24 relative z-20 border border-slate-100">
            {/* Tabs */}
            <div className="flex gap-6 mb-6 border-b border-slate-100 pb-4">
                <button
                    onClick={() => setActiveTab('daily')}
                    className={`pb-2 text-sm font-semibold transition-all relative ${activeTab === 'daily'
                        ? 'text-deep-slate-blue'
                        : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    Daily Rental
                    {activeTab === 'daily' && (
                        <span className="absolute bottom-[-17px] left-0 w-full h-1 bg-electric-teal rounded-t-full" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('outstation')}
                    className={`pb-2 text-sm font-semibold transition-all relative ${activeTab === 'outstation'
                        ? 'text-deep-slate-blue'
                        : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    Long Distance
                    {activeTab === 'outstation' && (
                        <span className="absolute bottom-[-17px] left-0 w-full h-1 bg-electric-teal rounded-t-full" />
                    )}
                </button>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

                {/* Location */}
                <div className="md:col-span-4 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Location</label>
                    <GooglePlacesAutocomplete
                        onSelect={(place) => setLocation(place)}
                        placeholder="Pick-up location"
                    />
                </div>

                {/* Dates */}
                <div className="md:col-span-3 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Start Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-electric-teal focus:border-transparent outline-none text-slate-700"
                        />
                    </div>
                </div>

                <div className="md:col-span-3 space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">End Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5 pointer-events-none" />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-electric-teal focus:border-transparent outline-none text-slate-700"
                        />
                    </div>
                </div>

                {/* Vehicle Type (Hidden on mobile or simplified) */}
                {/* For now, let's keep it simple or add a small selector. 
            Actually, let's make the Search button bigger and maybe put vehicle type in a filter later?
            The prompt asked for Vehicle Type in the widget. */}

                {/* Search Button */}
                <div className="md:col-span-2">
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="w-full py-3 bg-deep-slate-blue hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-deep-slate-blue/30 transition-all flex items-center justify-center gap-2"
                    >
                        <Search className="h-5 w-5" />
                        Search
                    </button>
                </div>
            </div>

            {/* Vehicle Type Selector (Optional row below or integrated) */}
            <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                {['Sedan', 'SUV', 'Microbus', 'Luxury'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setVehicleType(type.toLowerCase())}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all flex items-center gap-2 ${vehicleType === type.toLowerCase()
                            ? 'bg-electric-teal/10 border-electric-teal text-deep-slate-blue'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                            }`}
                    >
                        <Car className="h-4 w-4" />
                        {type}
                    </button>
                ))}
            </div>
        </div>
    );
}
