'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ImageGallery from '@/components/vehicle/ImageGallery';
import AvailabilityCalendar from '@/components/vehicle/AvailabilityCalendar';
import ContactCTA from '@/components/vehicle/ContactCTA';
import ChatWidget from '@/components/chat/ChatWidget';
import { MOCK_CARS } from '@/lib/mockData';
import { ShieldCheck, Star, MapPin, User, Calendar, CheckCircle2 } from 'lucide-react';

interface VehicleDetailsClientProps {
    carId: string;
}

export default function VehicleDetailsClient({ carId }: VehicleDetailsClientProps) {
    const [chatDriverId, setChatDriverId] = useState<string | undefined>();
    const [chatDriverName, setChatDriverName] = useState<string | undefined>();

    const car = MOCK_CARS.find((c) => c.id === carId);

    if (!car) {
        notFound();
    }

    const handleOpenChat = () => {
        setChatDriverId(car.id);
        setChatDriverName(car.driver.name);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-20 pb-32 lg:pb-10 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* LEFT COLUMN (Gallery & Info) */}
                        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                            <ImageGallery images={car.images} />

                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-black/10 text-black text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                                {car.type}
                                            </span>
                                            <div className="flex items-center gap-1 text-orange-400">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span className="text-sm font-bold">{car.rating}</span>
                                                <span className="text-slate-400 text-xs">({car.trips} trips)</span>
                                            </div>
                                        </div>
                                        <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">{car.name}</h1>
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <MapPin className="h-4 w-4" />
                                            {car.location.address}
                                        </div>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm text-slate-400">Daily Rate</p>
                                        <p className="text-3xl font-bold text-black">৳{car.price.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 my-6" />

                                <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Description</h2>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                                    {car.description}
                                </p>

                                <h2 className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">Features</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {car.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-slate-600">
                                            <CheckCircle2 className="h-5 w-5 text-black flex-shrink-0" />
                                            <span className="text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Driver Info */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100">
                                <h2 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">Meet the Driver</h2>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-slate-100 flex items-center justify-center text-xl sm:text-2xl font-bold text-slate-400">
                                        {car.driver.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-black">{car.driver.name}</h3>
                                            {car.driver.verified && (
                                                <ShieldCheck className="h-5 w-5 text-black" aria-label="Verified Driver" />
                                            )}
                                        </div>
                                        <p className="text-slate-500 text-sm">Joined {car.driver.joined} • Response rate: {car.driver.responseRate}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN (Sticky Sidebar) */}
                        <div className="lg:col-span-1 hidden lg:block">
                            <div className="sticky top-24 space-y-6">
                                <AvailabilityCalendar unavailableDates={car.unavailableDates} />

                                <ContactCTA
                                    phone={car.driver.phone}
                                    carName={car.name}
                                    driverId={car.id}
                                    driverName={car.driver.name}
                                    onMessageDriver={handleOpenChat}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Mobile Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs text-slate-400">Daily Rate</p>
                        <p className="text-2xl font-bold text-black">৳{car.price.toLocaleString()}</p>
                    </div>
                    <div className="flex-1 max-w-[200px]">
                        <ContactCTA
                            phone={car.driver.phone}
                            carName={car.name}
                            driverId={car.id}
                            driverName={car.driver.name}
                            onMessageDriver={handleOpenChat}
                            condensed
                        />
                    </div>
                </div>
            </div>

            {/* Chat Widget */}
            <ChatWidget
                userId="current-user-id"
                initialDriverId={chatDriverId}
                initialDriverName={chatDriverName}
            />
        </>
    );
}
