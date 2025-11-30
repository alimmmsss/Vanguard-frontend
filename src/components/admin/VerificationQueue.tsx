'use client';

import { useState } from 'react';
import { PENDING_DRIVERS } from '@/lib/mockData';
import { Eye, Clock, CheckCircle } from 'lucide-react';
import DocumentViewer from './DocumentViewer';

export default function VerificationQueue() {
    const [drivers, setDrivers] = useState(PENDING_DRIVERS);
    const [selectedDriver, setSelectedDriver] = useState<any | null>(null);

    const handleApprove = (id: string) => {
        setDrivers(prev => prev.filter(d => d.id !== id));
        setSelectedDriver(null);
        // In real app: API call to approve
    };

    const handleReject = (id: string) => {
        setDrivers(prev => prev.filter(d => d.id !== id));
        setSelectedDriver(null);
        // In real app: API call to reject
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-deep-slate-blue">Verification Queue</h2>
                <p className="text-slate-500 text-sm">Review pending driver applications.</p>
            </div>

            {drivers.length === 0 ? (
                <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700">All Caught Up!</h3>
                    <p className="text-slate-500">No pending applications to review.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Driver Name</th>
                                <th className="px-6 py-4">Applied Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {drivers.map((driver) => (
                                <tr key={driver.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-deep-slate-blue">{driver.name}</td>
                                    <td className="px-6 py-4 text-slate-500">{driver.appliedDate}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                                            <Clock className="h-3 w-3" />
                                            Pending
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedDriver(driver)}
                                            className="text-electric-teal hover:text-teal-700 font-bold text-sm inline-flex items-center gap-1"
                                        >
                                            <Eye className="h-4 w-4" />
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedDriver && (
                <DocumentViewer
                    driver={selectedDriver}
                    onClose={() => setSelectedDriver(null)}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            )}
        </div>
    );
}
