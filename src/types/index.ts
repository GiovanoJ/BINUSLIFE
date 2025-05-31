export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
}

export interface Campus {
  id: number;
  name: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  image: string;
}

export interface Accommodation {
  id: number;
  name: string;
  address: string;
  distance: number;
  campusId: number;
  price: number;
  gender: 'male' | 'female' | 'mixed';
  hasAC: boolean;
  hasPrivateBathroom: boolean;
  hasFurnishedBed: boolean;
  hasWifi: boolean;
  hasParking: boolean;
  images: string[];
  description: string;
  rules: string[];
  facilities: string[];
  benefits: string[];
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  hasPromotion: boolean;
  promotionDetails?: string;
  availability: number;
}

export interface Restaurant {
  id: number;
  name: string;
  address: string;
  distance: number;
  campusId: number;
  cuisine: string;
  priceRange: 'low' | 'medium' | 'high';
  images: string[];
  menuItems: MenuItem[];
  openingHours: string;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
  hasPromotion: boolean;
  promotionDetails?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  isPopular: boolean;
}

export interface Clinic {
  id: number;
  name: string;
  address: string;
  distance: number;
  campusId: number;
  images: string[];
  doctors: Doctor[];
  services: string[];
  openingHours: string;
  hasEmergencyService: boolean;
  rating: number;
  reviewCount: number;
  latitude: number;
  longitude: number;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  image?: string;
  schedule: Schedule[];
  rating: number;
}

export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Review {
  id: number;
  userId: string;
  entityId: number;
  entityType: 'accommodation' | 'restaurant' | 'clinic';
  rating: number;
  comment: string;
  date: string;
  userName: string;
  userImage?: string;
}

export interface Filter {
  [key: string]: any;
}