import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import BrandStory from "@/components/home/BrandStory";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />

      {/* Value Proposition Section (Placeholder for now) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-black mt-3 mb-6">Built for you.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Zero Commission", desc: "No fees. Drivers earn more, you pay less." },
            { title: "Direct Choice", desc: "Choose your driver, choose your car. Full control." },
            { title: "Safety First", desc: "Verified drivers and community reviews." },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 p-8 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 mb-4 text-black">
                {/* Icons */}
                <div className="h-8 w-8 rounded-full border-2 border-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <BrandStory />
      <Footer />
    </main >
  );
}
