import Image from 'next/image';
import Link from 'next/link';
import { Star, ShieldCheck, MapPin } from 'lucide-react';
import { Car } from '@/lib/mockData';

interface CarCardProps {
    car: Car;
    onHover?: (carId: string | null) => void;
}

export default function CarCard({ car, onHover }: CarCardProps) {
    return (
        <div
            className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            onMouseEnter={() => onHover?.(car.id)}
            onMouseLeave={() => onHover?.(null)}
        >
            <div className="flex flex-col sm:flex-row h-full">
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                    <Image
                        src={car.image}
                        alt={car.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-deep-slate-blue uppercase tracking-wider">
                        {car.type}
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-deep-slate-blue">{car.name}</h3>
                            <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-full">
                                <Star className="h-3 w-3 text-orange-400 fill-orange-400" />
                                <span className="text-xs font-bold text-slate-700">{car.rating}</span>
                                <span className="text-xs text-slate-400">({car.trips})</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                {car.driver.name.charAt(0)}
                            </div>
                            <p className="text-sm text-slate-600">{car.driver.name}</p>
                            {car.driver.verified && (
                                <ShieldCheck className="h-4 w-4 text-electric-teal" />
                            )}
                        </div>

                        <div className="flex items-center gap-1 text-slate-400 text-xs mb-4">
                            <MapPin className="h-3 w-3" />
                            {car.location.address}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                        <div>
                            <p className="text-xs text-slate-400">Daily Rate</p>
                            <p className="text-xl font-bold text-deep-slate-blue">
                                ৳{car.price.toLocaleString()}
                            </p>
                        </div>

                        <Link
                            href={`/vehicles/${car.id}`}
                            className="bg-deep-slate-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-deep-slate-blue/10"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
