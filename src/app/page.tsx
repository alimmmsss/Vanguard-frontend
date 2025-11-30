import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />

      {/* Value Proposition Section (Placeholder for now) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-deep-slate-blue">Why Choose Vanguard?</h2>
          <p className="mt-4 text-slate-600">The smartest way to rent a car in Bangladesh.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Zero Commission", desc: "We don't charge any fees. You pay the driver directly." },
            { title: "Direct Contact", desc: "Chat with drivers via WhatsApp to negotiate and book." },
            { title: "Verified Drivers", desc: "All drivers are verified with NID and License checks." },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-deep-slate-blue mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
