
import SearchWidget from '../search/SearchWidget';

const Hero = () => {
    return (
        <div className="relative bg-white pb-16 lg:pb-24">
            {/* Background / Hero Content */}
            <div className="flex flex-col items-center justify-center pt-20 pb-12 lg:pt-32 lg:pb-20 bg-black text-white relative overflow-hidden">
                {/* Optional Subtle Background Image of a dark city street, obscured */}
                {/* <div className="absolute inset-0 bg-[url('/some-city-pattern.png')] opacity-20" /> */}

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                        Go anywhere with Vanguard.
                    </h1>
                    <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-12 sm:mb-14 px-4 leading-relaxed">
                        Request a ride, hop in, and go. Direct connection to drivers.
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
