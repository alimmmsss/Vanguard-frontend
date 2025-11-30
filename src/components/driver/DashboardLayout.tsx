'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Settings, LogOut, User } from 'lucide-react';
import { useAppDispatch } from '@/lib/hooks';
import { logout } from '@/lib/features/userSlice';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    };

    const navItems = [
        { name: 'Overview', href: '/driver/dashboard', icon: LayoutDashboard },
        { name: 'Calendar', href: '/driver/calendar', icon: Calendar },
        { name: 'Profile', href: '/driver/profile', icon: User },
        { name: 'Settings', href: '/driver/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col fixed h-full">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-deep-slate-blue">Vanguard</h1>
                    <p className="text-xs text-slate-400 mt-1">Driver Partner</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                        ? 'bg-electric-teal/10 text-deep-slate-blue font-bold'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                    }`}
                            >
                                <item.icon className={`h-5 w-5 ${isActive ? 'text-electric-teal' : ''}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl w-full transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
