import Image from 'next/image';
import Link from 'next/link';

const BrandStory = () => {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-electric-teal/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-deep-slate-blue/10 rounded-full blur-3xl" />

                        <div className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-deep-slate-blue/10">
                            {/* Ideally we use the generated image here. For now using a placeholder or the generated artifact path if available. 
                                Since I can't know the exact path until generation, I'll assume it's moved to public or use a generic one if needed.
                                For now, I'll use a placeholder and expect the user to replace or I'll inject the path if I knew it. 
                                Actually, I will use a placeholder but comment where the generated image goes.
                            */}
                            <Image
                                src="/brand_story_hero.png" // Assumes we will move the generated image here
                                alt="Driver and customer shaking hands"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <h2 className="text-3xl lg:text-5xl font-bold text-black leading-tight">
                                Do more than just drive.
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Vanguard is built on a simple mission: Create a direct, fair marketplace for mobility.
                                No hidden fees. No commissions. Just drivers and passengers.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all bg-black rounded-lg hover:bg-gray-800"
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* Stats / Trust Indicators */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                            <div>
                                <p className="text-3xl font-bold text-black">0%</p>
                                <p className="text-sm text-gray-500 font-medium">Commission</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-black">100%</p>
                                <p className="text-sm text-gray-500 font-medium">Verified</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-black">24/7</p>
                                <p className="text-sm text-gray-500 font-medium">Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandStory;

