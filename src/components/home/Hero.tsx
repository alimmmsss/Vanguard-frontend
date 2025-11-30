import SearchWidget from '../search/SearchWidget';

const Hero = () => {
    return (
        <div className="relative bg-slate-50 pb-32">
            {/* Background / Hero Content */}
            <div className="bg-deep-slate-blue pt-20 pb-40 lg:pt-32 lg:pb-48 overflow-hidden relative">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                    <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-electric-teal rounded-full blur-[120px]" />
                    <div className="absolute top-[20%] -right-[10%] w-[50%] h-[100%] bg-purple-500 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                        Direct Car Rental. <br className="hidden md:block" />
                        <span className="text-electric-teal">Zero Commission.</span>
                    </h1>
                    <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Connect directly with verified drivers. No middleman fees.
                        Transparent pricing and instant communication via WhatsApp.
                    </p>
                </div>
            </div>

            {/* Search Widget Container */}
            <div className="px-4 sm:px-6 lg:px-8">
                <SearchWidget />
            </div>
        </div>
    );
};

export default Hero;
