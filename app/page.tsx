'use client';

import { useState, useEffect } from 'react';
import { MosqueCard } from '@/components/MosqueCard';
import MosqueMapComponent from '@/components/MosqueMap';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { fetchMosques } from '@/lib/api';
import { Mosque } from '@/lib/types';


export default function HomePage() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<number | null>(null);

  useEffect(() => {
    const loadMosques = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMosques(searchQuery, selectedCity);
        setMosques(data);
      } catch (err) {
        setError('فشل في تحميل بيانات المساجد. يرجى المحاولة مرة أخرى.');
        console.error('Failed to load mosques:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMosques();
  }, [searchQuery, selectedCity]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCityFilter = (cityId: number | null) => {
    setSelectedCity(cityId);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "منارة",
    "description": "تطبيق لإدارة وعرض تبرعات المساجد في سوريا",
    "url": "https://manara.rabeh.sy",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://manara.rabeh.sy?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "منارة",
      "url": "https://manara.rabeh.sy"
    }
  };

  return (
    <div className="min-h-screen bg-[#EBE9E0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            منارة - تطبيق تبرعات المساجد
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ساعد في تطوير وإعمار المساجد في سوريا من خلال التبرعات الخيرية
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          onSearch={handleSearch}
          onCityFilter={handleCityFilter}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          selectedCity={selectedCity}
          viewMode={viewMode}
        />

        {/* Content */}
        <div id="mosques">
          {/* Results Count */}
          {!loading && !error && mosques.length > 0 && (
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                {searchQuery || selectedCity !== null 
                  ? `تم العثور على ${formatNumber(mosques.length)} مسجد` 
                  : `إجمالي المساجد: ${formatNumber(mosques.length)}`
                }
              </p>
            </div>
          )}
          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#103935] mx-auto mb-4"></div>
                <p className="text-gray-600">
                  {searchQuery || selectedCity !== null 
                    ? 'جاري البحث وتطبيق الفلاتر...' 
                    : 'جاري تحميل بيانات المساجد...'
                  }
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#103935] text-white px-6 py-2 rounded-lg hover:bg-[#0a2a27] transition-colors"
                >
                  إعادة المحاولة
                </button>
              </div>
            </div>
          ) : mosques.length === 0 ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <p className="text-gray-600">لا توجد مساجد متاحة حالياً</p>
              </div>
            </div>
          ) : viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mosques.map((mosque) => (
                <MosqueCard key={mosque.id} mosque={mosque} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <MosqueMapComponent mosques={mosques} selectedCity={selectedCity} />
            </div>
          )}
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
