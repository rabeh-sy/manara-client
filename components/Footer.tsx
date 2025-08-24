'use client';

import { Building } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#103935] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white p-2 rounded-lg">
              <Building className="w-6 h-6 text-[#103935]" />
            </div>
            <h3 className="text-xl font-bold">منارة</h3>
          </div>
          <p className="text-gray-300 mb-4">
            تطبيق لإدارة وعرض تبرعات المساجد في سوريا
          </p>
          <div className="border-t border-gray-600 pt-4">
            <p className="text-sm text-gray-400">
              © 2024 منارة. جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
