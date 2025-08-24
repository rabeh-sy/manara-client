import { Mosque } from './types';

export const mockMosques: Mosque[] = [
  {
    id: "1",
    status: "active",
    name: "جامع الأموي",
    description: "مسجد تاريخي عريق يقع في قلب دمشق القديمة، يعود تاريخه إلى العصر الأموي",
    longitude: 36.3069,
    latitude: 33.5138,
    capacity: 3000,
    address: "دمشق القديمة، سوريا",
    donations_count: 5,
    city: "دمشق",
    size: "كبير",
    establish_year: 715,
    donations: [
      {
        id: "d1",
        title: "ترميم القبة الذهبية",
        description: "مشروع ترميم القبة الذهبية للمسجد الأموي",
        is_verified: true,
        current_amount: 150000,
        total_amount: 500000
      },
      {
        id: "d2",
        title: "تطوير نظام الإضاءة",
        description: "تحديث نظام الإضاءة الداخلي للمسجد",
        is_verified: true,
        current_amount: 75000,
        total_amount: 120000
      }
    ]
  },
  {
    id: "2",
    status: "active",
    name: "جامع خالد بن الوليد",
    description: "مسجد تاريخي في مدينة حمص، سمي على اسم الصحابي الجليل خالد بن الوليد",
    longitude: 36.7234,
    latitude: 34.7268,
    capacity: 1500,
    address: "حمص، سوريا",
    donations_count: 3,
    city: "حمص",
    size: "متوسط",
    establish_year: 1908,
    donations: [
      {
        id: "d3",
        title: "بناء مدرسة قرآنية",
        description: "إنشاء مدرسة لتعليم القرآن الكريم والعلوم الإسلامية",
        is_verified: true,
        current_amount: 25000,
        total_amount: 80000
      }
    ]
  },
  {
    id: "3",
    status: "active",
    name: "جامع النوري",
    description: "مسجد النوري الكبير في حلب، من أقدم المساجد في المدينة",
    longitude: 37.1611,
    latitude: 36.2021,
    capacity: 2000,
    address: "حلب، سوريا",
    donations_count: 4,
    city: "حلب",
    size: "كبير",
    establish_year: 1172,
    donations: [
      {
        id: "d4",
        title: "إعادة بناء المئذنة",
        description: "إعادة بناء المئذنة التاريخية للمسجد",
        is_verified: true,
        current_amount: 200000,
        total_amount: 600000
      },
      {
        id: "d5",
        title: "ترميم السقف",
        description: "ترميم السقف الخشبي للمسجد",
        is_verified: false,
        current_amount: 45000,
        total_amount: 150000
      }
    ]
  },
  {
    id: "4",
    status: "active",
    name: "جامع التوبة",
    description: "مسجد التوبة في مدينة اللاذقية، من المساجد المميزة في المنطقة",
    longitude: 35.7746,
    latitude: 35.5177,
    capacity: 800,
    address: "اللاذقية، سوريا",
    donations_count: 2,
    city: "اللاذقية",
    size: "صغير",
    establish_year: 1950,
    donations: [
      {
        id: "d6",
        title: "توسعة المسجد",
        description: "توسعة المسجد لاستيعاب المزيد من المصلين",
        is_verified: true,
        current_amount: 60000,
        total_amount: 200000
      }
    ]
  },
  {
    id: "5",
    status: "active",
    name: "جامع الحسن",
    description: "مسجد الحسن في مدينة درعا، من المساجد التاريخية في المنطقة",
    longitude: 36.1033,
    latitude: 32.6189,
    capacity: 1200,
    address: "درعا، سوريا",
    donations_count: 3,
    city: "درعا",
    size: "متوسط",
    establish_year: 1200,
    donations: [
      {
        id: "d7",
        title: "ترميم الجدران",
        description: "ترميم الجدران الخارجية للمسجد",
        is_verified: true,
        current_amount: 30000,
        total_amount: 100000
      },
      {
        id: "d8",
        title: "تطوير الحمامات",
        description: "تطوير وتحديث مرافق الوضوء",
        is_verified: false,
        current_amount: 15000,
        total_amount: 50000
      }
    ]
  }
];

export const getMosqueById = (id: string): Mosque | undefined => {
  return mockMosques.find(mosque => mosque.id === id);
};

export const getAllMosques = (): Mosque[] => {
  return mockMosques;
};
