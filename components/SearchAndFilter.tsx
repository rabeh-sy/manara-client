'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onCityFilter: (cityId: number | null) => void;
  onViewModeChange: (mode: 'list' | 'map') => void;
  searchQuery: string;
  selectedCity: number | null;
  viewMode: 'list' | 'map';
}

const cities = [
  { id: 0, name: 'حلب' },
  { id: 1, name: 'دمشق' },
  { id: 2, name: 'حمص' },
];

export function SearchAndFilter({ onSearch, onCityFilter, onViewModeChange, searchQuery, selectedCity, viewMode }: SearchAndFilterProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = () => {
    onSearch(localSearchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCityFilter = (cityId: number) => {
    if (selectedCity === cityId) {
      onCityFilter(null); // Remove filter if same city is clicked
    } else {
      onCityFilter(cityId);
    }
  };

  const clearFilters = () => {
    setLocalSearchQuery('');
    onSearch('');
    onCityFilter(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث في اسم المسجد..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pr-10 pl-4 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#103935] focus:border-transparent text-right"
              dir="rtl"
              style={{ textAlign: 'right' }}
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-[#103935] hover:bg-[#0a2a27] px-6 h-12 w-full sm:w-auto"
          >
            بحث
          </Button>
        </div>

        {/* City Filter and View Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* City Filter and Reset Button */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">تصفية حسب المدينة:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cities.map((city) => (
                <Button
                  key={city.id}
                  variant={selectedCity === city.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCityFilter(city.id)}
                  className={`${
                    selectedCity === city.id 
                      ? 'bg-[#103935] hover:bg-[#0a2a27]' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {city.name}
                </Button>
              ))}
            </div>
            
            {/* Clear Filters Button - Next to filters */}
            {(searchQuery || selectedCity !== null) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                مسح الفلاتر
              </Button>
            )}
          </div>

          {/* View Mode Toggle - Positioned to the left */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm font-medium text-gray-600">عرض:</span>
            <div className="flex bg-white rounded-lg shadow-md p-1">
              <button
                onClick={() => onViewModeChange('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#103935] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                قائمة
              </button>
              <button
                onClick={() => onViewModeChange('map')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map'
                    ? 'bg-[#103935] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                خريطة
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
