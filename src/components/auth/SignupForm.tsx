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

const signupSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(11, 'Invalid phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
    role?: 'passenger' | 'driver';
}

export default function SignupForm({ role = 'passenger' }: SignupFormProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setError('');

        try {
            // MOCK API CALL
            await new Promise(resolve => setTimeout(resolve, 1500));

            const mockUser = {
                id: '456',
                name: data.name,
                email: data.email,
                role: role,
            };
            const mockToken = 'mock-jwt-token';

            dispatch(login({ role: role, profile: mockUser, token: mockToken }));

            localStorage.setItem('token', mockToken);
            localStorage.setItem('user', JSON.stringify(mockUser));

            if (role === 'driver') {
                router.push('/driver/dashboard'); // Or verification step
            } else {
                router.push('/');
            }

        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-deep-slate-blue">
                    {role === 'driver' ? 'Join as Driver' : 'Create Account'}
                </h1>
                <p className="text-slate-500 mt-2">
                    {role === 'driver' ? 'Start earning with 0% commission' : 'Sign up to book your first ride'}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input
                        {...register('name')}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-electric-teal focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

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
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                    <input
                        {...register('phone')}
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-electric-teal focus:border-transparent outline-none transition-all"
                        placeholder="017..."
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
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

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-electric-teal focus:border-transparent outline-none transition-all"
                        placeholder="••••••••"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-deep-slate-blue hover:bg-slate-800 text-white rounded-xl font-bold shadow-lg shadow-deep-slate-blue/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign Up'}
                </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link href="/login" className="text-electric-teal font-bold hover:underline">
                    Log in
                </Link>
            </div>
        </div>
    );
}
