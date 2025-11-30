'use client';

import { useState } from 'react';

interface UploadResult {
    url: string;
    key: string;
}

export const useS3Upload = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = async (file: File): Promise<string | null> => {
        setIsUploading(true);
        setError(null);

        try {
            // 1. Get Presigned URL (Mocked)
            // In real app: const res = await fetch('/api/uploads/presigned-url', { method: 'POST', body: JSON.stringify({ filename: file.name, filetype: file.type }) });
            // const { url, key } = await res.json();

            // Mocking the response
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network
            const mockUrl = 'https://httpbin.org/put'; // Test endpoint that accepts PUT
            const mockKey = `uploads/${Date.now()}-${file.name}`;

            // 2. Upload to S3 (using the mock URL)
            const uploadRes = await fetch(mockUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            });

            if (!uploadRes.ok) {
                throw new Error('Upload failed');
            }

            return mockKey;
        } catch (err) {
            console.error(err);
            setError('Failed to upload file');
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return { uploadFile, isUploading, error };
};
