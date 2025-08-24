'use client';

import { Mosque } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';
import Link from 'next/link';

interface MosqueCardProps {
  mosque: Mosque;
  showDetails?: boolean;
}

export function MosqueCard({ mosque }: MosqueCardProps) {
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-200" dir="rtl">
      <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-t-lg flex items-center justify-center">
        <Building className="w-16 h-16 text-[#103935]" />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold leading-tight" style={{ textAlign: 'right' }}>
          {mosque.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-700 leading-relaxed" style={{ textAlign: 'right' }}>
          {truncateDescription(mosque.description)}
        </p>
        
        <div className="text-sm text-gray-600" style={{ textAlign: 'right' }}>
          {mosque.address}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            التبرعات المفتوحة: {mosque.donations_count}
          </span>
          <Link href={`/mosque/${mosque.id}`}>
            <Button size="sm" className="bg-[#103935] hover:bg-[#0a2a27]">
              عرض التفاصيل
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
