import Link from 'next/link';
import { Menu, User } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-deep-slate-blue tracking-tight">
                            Vanguard
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/driver/register" className="text-slate-600 hover:text-electric-teal font-medium transition-colors">
                            Join as Driver
                        </Link>
                        <Link href="/login" className="text-slate-600 hover:text-deep-slate-blue font-medium transition-colors">
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-deep-slate-blue text-white px-4 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-deep-slate-blue/20"
                        >
                            Sign up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button className="text-slate-600 hover:text-deep-slate-blue p-2">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
