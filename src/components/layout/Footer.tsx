import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="text-xl font-bold tracking-tight text-white mb-4 block">
                            Vanguard
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Vanguard is a direct-to-driver technology platform.
                            Go anywhere, anytime.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-white hover:text-gray-300 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link href="/search" className="text-slate-400 hover:text-white transition-colors">Find a Car</Link></li>
                            <li><Link href="/driver/register" className="text-slate-400 hover:text-white transition-colors">Become a Driver</Link></li>
                            <li><Link href="/login" className="text-slate-400 hover:text-white transition-colors">Sign In</Link></li>
                            <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Support</h3>
                        <ul className="space-y-4">
                            <li><Link href="/help" className="text-slate-400 hover:text-white transition-colors">Help Center</Link></li>
                            <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/safety" className="text-slate-400 hover:text-white transition-colors">Safety Guide</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-slate-400">
                                <MapPin className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                                <span>Level 4, Gulshan 1, Dhaka, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Phone className="h-5 w-5 text-white flex-shrink-0" />
                                <span>+880 1712 345 678</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <Mail className="h-5 w-5 text-white flex-shrink-0" />
                                <span>support@vanguard.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Vanguard Rentals. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
