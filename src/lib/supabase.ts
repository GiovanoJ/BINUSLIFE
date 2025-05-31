import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Authentication helpers
export const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signUp = async (email: string, password: string) => {
  return supabase.auth.signUp({ email, password });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const resetPassword = async (email: string) => {
  return supabase.auth.resetPasswordForEmail(email);
};

// Fetch data from database
export const fetchCampuses = async () => {
  return supabase.from('campuses').select('*');
};

export const fetchAccommodations = async (filters: any = {}) => {
  let query = supabase.from('accommodations').select('*');
  
  if (filters.campusId) {
    query = query.eq('campus_id', filters.campusId);
  }
  
  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }
  
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  
  if (filters.facilities) {
    filters.facilities.forEach((facility: string) => {
      query = query.contains('facilities', [facility]);
    });
  }
  
  return query;
};

export const fetchRestaurants = async (filters: any = {}) => {
  let query = supabase.from('restaurants').select('*');
  
  if (filters.campusId) {
    query = query.eq('campus_id', filters.campusId);
  }
  
  if (filters.priceRange) {
    query = query.eq('price_range', filters.priceRange);
  }
  
  return query;
};

export const fetchClinics = async (filters: any = {}) => {
  let query = supabase.from('clinics').select('*');
  
  if (filters.campusId) {
    query = query.eq('campus_id', filters.campusId);
  }
  
  return query;
};