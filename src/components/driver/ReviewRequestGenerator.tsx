'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

export default function ReviewRequestGenerator() {
    const [copied, setCopied] = useState(false);
    const [generatedLink, setGeneratedLink] = useState('');

    const generateLink = () => {
        // Mock link generation
        const uniqueId = Math.random().toString(36).substring(7);
        const link = `${window.location.origin}/reviews/new?driver=${uniqueId}`;
        setGeneratedLink(link);
        setCopied(false);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-deep-slate-blue mb-2">Request Reviews</h2>
            <p className="text-slate-500 text-sm mb-6">
                Generate a unique link to send to your passengers after a trip.
            </p>

            {!generatedLink ? (
                <button
                    onClick={generateLink}
                    className="bg-electric-teal text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-teal-600 transition-colors shadow-lg shadow-electric-teal/20"
                >
                    <Share2 className="h-5 w-5" />
                    Generate Review Link
                </button>
            ) : (
                <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                        <code className="text-sm text-slate-600 truncate flex-1">
                            {generatedLink}
                        </code>
                        <button
                            onClick={copyToClipboard}
                            className={`p-2 rounded-lg transition-colors ${copied ? 'bg-emerald-100 text-emerald-600' : 'bg-white border border-slate-200 hover:bg-slate-100 text-slate-500'
                                }`}
                        >
                            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 text-center">
                        Link expires in 24 hours.
                    </p>
                    <button
                        onClick={generateLink}
                        className="text-electric-teal text-sm font-bold hover:underline w-full text-center"
                    >
                        Generate New Link
                    </button>
                </div>
            )}
        </div>
    );
}
