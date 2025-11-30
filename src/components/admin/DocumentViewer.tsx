'use client';

import Image from 'next/image';
import { X, Check, Ban } from 'lucide-react';

interface DocumentViewerProps {
    driver: any;
    onClose: () => void;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}

export default function DocumentViewer({ driver, onClose, onApprove, onReject }: DocumentViewerProps) {
    if (!driver) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-deep-slate-blue">{driver.name}</h2>
                        <p className="text-sm text-slate-500">Applied on {driver.appliedDate}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <X className="h-6 w-6 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* NID */}
                        <div className="space-y-2">
                            <h3 className="font-bold text-slate-700">National ID</h3>
                            <div className="relative aspect-[16/10] bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
                                <Image src={driver.documents.nid} alt="NID" fill className="object-cover" />
                            </div>
                        </div>

                        {/* License */}
                        <div className="space-y-2">
                            <h3 className="font-bold text-slate-700">Driving License</h3>
                            <div className="relative aspect-[16/10] bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
                                <Image src={driver.documents.license} alt="License" fill className="object-cover" />
                            </div>
                        </div>

                        {/* Car */}
                        <div className="space-y-2">
                            <h3 className="font-bold text-slate-700">Vehicle Photo</h3>
                            <div className="relative aspect-[16/10] bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
                                <Image src={driver.documents.car} alt="Car" fill className="object-cover" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 bg-white p-6 rounded-xl border border-slate-100">
                        <h3 className="font-bold text-deep-slate-blue mb-4">Verification Checklist</h3>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-electric-teal focus:ring-electric-teal" />
                                <span className="text-slate-700">NID name matches application name</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-electric-teal focus:ring-electric-teal" />
                                <span className="text-slate-700">Driving license is valid and not expired</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-electric-teal focus:ring-electric-teal" />
                                <span className="text-slate-700">Vehicle photo matches description</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-100 flex justify-end gap-4 bg-white">
                    <button
                        onClick={() => onReject(driver.id)}
                        className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl flex items-center gap-2 transition-colors"
                    >
                        <Ban className="h-5 w-5" />
                        Reject Application
                    </button>
                    <button
                        onClick={() => onApprove(driver.id)}
                        className="px-6 py-3 bg-electric-teal hover:bg-teal-600 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-electric-teal/20 transition-colors"
                    >
                        <Check className="h-5 w-5" />
                        Approve Driver
                    </button>
                </div>
            </div>
        </div>
    );
}
