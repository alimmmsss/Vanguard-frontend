import { Suspense } from 'react';
import SearchResults from '../../components/search/SearchResults';

export default function SearchResultsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div></div>}>
                <SearchResults />
            </Suspense>
        </div>
    );
}