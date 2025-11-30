'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { login } from '@/lib/features/userSlice';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                dispatch(login({
                    role: user.role,
                    profile: user,
                    token: token
                }));
            } catch (e) {
                console.error("Failed to parse user from local storage", e);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
    }, [dispatch]);

    return <>{children}</>;
}
