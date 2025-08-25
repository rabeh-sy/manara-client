'use client';

import { Donation } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface DonationProgressProps {
  donation: Donation;
}

export function DonationProgress({ donation }: DonationProgressProps) {
  const progressPercentage = (donation.current_amount / donation.target_amount) * 100;
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200" dir="rtl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold" style={{ textAlign: 'right' }}>{donation.title}</CardTitle>
          <Badge variant={donation.is_verified ? "default" : "secondary"} className={`flex items-center gap-1 ${donation.is_verified ? 'bg-[#103935]' : ''}`}>
            {donation.is_verified ? (
              <>
                <CheckCircle className="w-3 h-3" />
                موثق
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                قيد المراجعة
              </>
            )}
          </Badge>
        </div>
        <CardDescription className="text-gray-600 leading-relaxed" style={{ textAlign: 'right' }}>
          {donation.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-green-600">
              {formatNumber(donation.current_amount)} ل.س
            </span>
            <span className="text-gray-600">المبلغ المحقق</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-gray-800">
              {formatNumber(donation.target_amount)} ل.س
            </span>
            <span className="text-gray-600">المبلغ المطلوب</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold text-blue-600">
              {progressPercentage.toFixed(1)}%
            </span>
            <span className="text-gray-600">نسبة الإنجاز</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden" style={{ direction: 'rtl' }}>
            <div 
              className="h-2 bg-[#103935] rounded-full transition-all duration-300"
              style={{ 
                width: `${progressPercentage}%`,
                float: 'right'
              }}
            />
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <div className="flex justify-between text-sm text-gray-600">
            <span className="font-semibold text-orange-600">
              {formatNumber(donation.target_amount - donation.current_amount)} ل.س
            </span>
            <span>المتبقي</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
