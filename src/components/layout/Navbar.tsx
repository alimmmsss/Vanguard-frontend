'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="bg-black text-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <Link href="/" className="text-2xl font-bold tracking-tight text-white hover:text-gray-300 transition-colors">
                            Vanguard
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/driver/register" className="text-white hover:bg-gray-800 px-4 py-2 rounded-full font-medium transition-colors text-sm">
                            Drive using Vanguard
                        </Link>
                        <Link href="/login" className="text-white hover:bg-gray-800 px-4 py-2 rounded-full font-medium transition-colors text-sm">
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-white text-black px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors text-sm"
                        >
                            Sign up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white hover:text-gray-300 p-2 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="md:hidden bg-black absolute w-full left-0 h-screen z-50 animate-in slide-in-from-top-5">
                    <div className="px-4 pt-8 pb-6 space-y-4">
                        <Link
                            href="/driver/register"
                            className="block px-4 py-4 text-2xl font-bold text-white hover:text-gray-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Drive using Vanguard
                        </Link>
                        <Link
                            href="/login"
                            className="block px-4 py-4 text-2xl font-bold text-white hover:text-gray-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="block px-4 py-4 text-2xl font-bold text-white hover:text-gray-300"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
