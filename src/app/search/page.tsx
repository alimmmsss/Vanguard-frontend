import Navbar from "@/components/layout/Navbar";
import SearchResults from "@/components/search/SearchResults";
import { Suspense } from "react";

export default function SearchPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
                <SearchResults />
            </Suspense>
        </main>
    );
}
