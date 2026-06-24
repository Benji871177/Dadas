export interface Product {
  id: string;
  name: string;
  category: 'flower' | 'edible' | 'vape' | 'oil';
  type: 'Indica' | 'Sativa' | 'Hybrid' | 'CBD-Rich';
  thc: string;
  cbd?: string;
  terpenes?: string[];
  price: number;
  weight: string;
  effects: string[];
  description: string;
  image: string;
  strainLineage?: string;
  isCollectorDrop?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface MemberProfile {
  name: string;
  email: string;
  phone?: string;
  dob: string;
  tier: 'Vanguard' | 'Collector' | 'Private Circle';
  memberId: string;
  joinedAt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  verified: boolean;
}
