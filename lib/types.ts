export interface Donation {
  id: string;
  title: string;
  description: string;
  is_verified: boolean;
  current_amount: number;
  total_amount: number;
}

export interface Mosque {
  id: string;
  status: string;
  name: string;
  description: string;
  longitude: number;
  latitude: number;
  capacity: number;
  address: string;
  donations_count: number;
  city: string;
  size: string;
  establish_year: number;
  donations: Donation[];
}
