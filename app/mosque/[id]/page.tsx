'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Mosque } from '@/lib/types';
import { getMosqueById } from '@/lib/mock-data';
import { DonationProgress } from '@/components/DonationProgress';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Calendar, Building } from 'lucide-react';
import Link from 'next/link';

export default function MosquePage() {
  const params = useParams();
  const [mosque, setMosque] = useState<Mosque | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const mosqueData = getMosqueById(params.id as string);
      setMosque(mosqueData || null);
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EBE9E0]">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#103935] mx-auto"></div>
            <p className="mt-4 text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!mosque) {
    return (
      <div className="min-h-screen bg-[#EBE9E0]">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">المسجد غير موجود</h1>
            <Link href="/">
              <Button>العودة للصفحة الرئيسية</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };

  return (
    <div className="min-h-screen bg-[#EBE9E0]">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
            <Building className="w-20 h-20 text-[#103935]" />
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{mosque.name}</h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {mosque.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#103935]" />
                    <div>
                      <p className="font-semibold text-gray-900">الموقع</p>
                      <p className="text-gray-600">{mosque.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#103935]" />
                    <div>
                      <p className="font-semibold text-gray-900">السعة</p>
                      <p className="text-gray-600">{formatNumber(mosque.capacity)} مصلي</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#103935]" />
                    <div>
                      <p className="font-semibold text-gray-900">سنة الإنشاء</p>
                      <p className="text-gray-600">{mosque.establish_year}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donations Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">مشاريع التبرعات</h2>
            <div className="text-sm text-gray-600">
              {mosque.donations.length} مشروع تبرع
            </div>
          </div>

          {mosque.donations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">لا توجد مشاريع تبرعات حالياً</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mosque.donations.map((donation) => (
                <DonationProgress key={donation.id} donation={donation} />
              ))}
            </div>
          )}
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
