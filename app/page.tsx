'use client';

import { useState, useEffect } from 'react';
import { MosqueCard } from '@/components/MosqueCard';
import MosqueMapComponent from '@/components/MosqueMap';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { fetchMosques } from '@/lib/api';
import { Mosque } from '@/lib/types';
import { Toggle } from '@/components/ui/toggle';
import { List, Map } from 'lucide-react';

export default function HomePage() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMosques = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMosques();
        setMosques(data);
      } catch (err) {
        setError('فشل في تحميل بيانات المساجد. يرجى المحاولة مرة أخرى.');
        console.error('Failed to load mosques:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMosques();
  }, []);

  return (
    <div className="min-h-screen bg-[#EBE9E0]">
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

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg shadow-md p-1">
            <Toggle
              pressed={viewMode === 'list'}
              onPressedChange={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === 'list'
                  ? 'bg-[#103935] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4 ml-2" />
              عرض القائمة
            </Toggle>
            <Toggle
              pressed={viewMode === 'map'}
              onPressedChange={() => setViewMode('map')}
              className={`px-4 py-2 rounded-md transition-all ${
                viewMode === 'map'
                  ? 'bg-[#103935] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Map className="w-4 h-4 ml-2" />
              عرض الخريطة
            </Toggle>
          </div>
        </div>

        {/* Content */}
        <div id="mosques">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#103935] mx-auto mb-4"></div>
                <p className="text-gray-600">جاري تحميل بيانات المساجد...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-16">
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
            <div className="flex justify-center items-center py-16">
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
              <MosqueMapComponent mosques={mosques} />
            </div>
          )}
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
