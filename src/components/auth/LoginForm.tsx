'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch } from '@/lib/hooks';
import { login } from '@/lib/features/userSlice';
import { Loader2, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['passenger', 'driver']),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            role: 'passenger',
        },
    });

    const role = watch('role');

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError('');

        try {
            // MOCK API CALL
            // In real app: const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, ...);

            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

            // Mock Success
            const mockUser = {
                id: '123',
                name: 'Test User',
                email: data.email,
                role: data.role,
            };
            const mockToken = 'mock-jwt-token';

            // Dispatch to Redux
            dispatch(login({ role: data.role, profile: mockUser, token: mockToken }));

            // Save to LocalStorage
            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));

            // Redirect
            if (data.role === 'driver') {
                router.push('/driver/dashboard');
            } else {
                router.push('/');
            }

        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-deep-slate-blue">Welcome Back</h1>
                <p className="text-slate-500 mt-2">Log in to your account</p>
            </div>

            {/* Role Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
                <button
                    type="button"
                    onClick={() => setValue('role', 'passenger')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'passenger'
                            ? 'bg-white text-deep-slate-blue shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Passenger
                </button>
                <button
                    type="button"
                    onClick={() => setValue('role', 'driver')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === 'driver'
                            ? 'bg-white text-deep-slate-blue shadow-sm'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    Driver
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-electric-teal focus:border-transparent outline-none transition-all"
                        placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input
                        {...register('password')}
                        type="password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-electric-teal focus:border-transparent outline-none transition-all"
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-deep-slate-blue hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-deep-slate-blue/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Log In'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <Link href={role === 'driver' ? '/driver/register' : '/signup'} className="text-electric-teal font-bold hover:underline">
                    Sign up
                </Link>
            </div>
        </div>
    );
}
