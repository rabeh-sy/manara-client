import { Metadata } from 'next';
import { Mosque } from '@/lib/types';
import { fetchMosqueById } from '@/lib/api';
import { DonationProgress } from '@/components/DonationProgress';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, Calendar, Building } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const mosque = await fetchMosqueById(id);
    
    if (!mosque) {
      return {
        title: 'المسجد غير موجود - منارة',
        description: 'المسجد المطلوب غير موجود في قاعدة البيانات',
      };
    }

    const coverImageUrl = mosque.cover_image 
      ? `${mosque.cover_image}`
      : undefined;

    return {
      title: `${mosque.name} - منارة`,
      description: mosque.description,
      keywords: `مسجد، ${mosque.name}، ${mosque.city}، تبرعات، سوريا، منارة`,
      authors: [{ name: "منارة" }],
      openGraph: {
        title: `${mosque.name} - منارة`,
        description: mosque.description,
        type: "website",
        locale: "ar",
        siteName: "منارة",
        images: coverImageUrl ? [
          {
            url: coverImageUrl,
            width: 1200,
            height: 630,
            alt: mosque.name,
          }
        ] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: `${mosque.name} - منارة`,
        description: mosque.description,
        images: coverImageUrl ? [coverImageUrl] : undefined,
      },
    };
  } catch (error) {
    return {
      title: 'خطأ في تحميل المسجد - منارة',
      description: 'حدث خطأ أثناء تحميل بيانات المسجد',
    };
  }
}

export default async function MosquePage({ params }: Props) {
  const { id } = await params;
  let mosque: Mosque;
  
  try {
    mosque = await fetchMosqueById(id);
  } catch (error) {
    notFound();
  }

  if (!mosque) {
    notFound();
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    "name": mosque.name,
    "description": mosque.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": mosque.city,
      "addressCountry": "SY"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": mosque.latitude,
      "longitude": mosque.longitude
    },
    "image": mosque.cover_image ? `${mosque.cover_image}` : undefined,
    "url": `https://manara.rabeh.sy/mosque/${id}`,
    "telephone": "+963",
    "openingHours": "24/7",
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Capacity",
        "value": mosque.capacity
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#EBE9E0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="h-120 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
            {mosque.cover_image ? (
              <Image
                src={`${mosque.cover_image}`}
                alt={mosque.name}
                width={800}
                height={300}
                className="w-full h-full object-cover"
                priority={true}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building className="w-20 h-20 text-[#103935]" />
              </div>
            )}
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{mosque.name}</h1>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
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
                      <p className="text-gray-600">{formatNumber(mosque.establish_year)}</p>
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
              {formatNumber(mosque.donations.length)} مشروع تبرع
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
