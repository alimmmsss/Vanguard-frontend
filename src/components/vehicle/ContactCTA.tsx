'use client';

import { MessageCircle, Phone, MessageSquare } from 'lucide-react';

interface ContactCTAProps {
    phone: string;
    carName: string;
    driverId?: string;
    driverName?: string;
    onMessageDriver?: () => void;
}

export default function ContactCTA({ phone, carName, driverId, driverName, onMessageDriver }: ContactCTAProps) {
    const handleWhatsApp = () => {
        const message = encodeURIComponent(`Hi, is your ${carName} available? I found it on Vanguard.`);
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    return (
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-deep-slate-blue text-lg">Contact Driver</h3>
            <p className="text-sm text-slate-500">
                Negotiate directly. No middleman fees.
            </p>

            {/* Message Driver Button (In-app chat) */}
            {onMessageDriver && (
                <button
                    onClick={onMessageDriver}
                    type="button"
                    className="w-full py-3 bg-electric-teal hover:bg-teal-600 text-white rounded-xl font-bold shadow-lg shadow-electric-teal/20 transition-all flex items-center justify-center gap-2"
                >
                    <MessageSquare className="h-5 w-5" />
                    Message Driver
                </button>
            )}

            <button
                onClick={handleWhatsApp}
                type="button"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2"
            >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
            </button>

            <a
                href={`tel:${phone}`}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
                <Phone className="h-5 w-5" />
                Call Driver
            </a>

            <div className="text-center">
                <p className="text-xs text-slate-400 mt-2">
                    Mention "Vanguard" for the best price.
                </p>
            </div>
        </div>
    );
}
