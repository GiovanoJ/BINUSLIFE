import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchCampuses } from '../../lib/supabase';
import { Campus } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { MapPin, ChevronRight } from 'lucide-react';

const CampusSelector: React.FC = () => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadCampuses = async () => {
      try {
        const { data, error } = await fetchCampuses();
        
        if (error) {
          setError('Failed to load campuses. Please try again.');
        } else if (data) {
          setCampuses(data);
          
          // Get unique cities
          const cities = [...new Set(data.map(campus => campus.city))];
          if (cities.length > 0) {
            setSelectedCity(cities[0]);
          }
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCampuses();
  }, []);
  
  // Placeholder data for development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && campuses.length === 0) {
      const placeholderCampuses: Campus[] = [
        {
          id: 1,
          name: 'BINUS Anggrek Campus',
          address: 'Jl. Kebon Jeruk Raya No. 27, Kebon Jeruk',
          city: 'Jakarta',
          latitude: -6.201820,
          longitude: 106.782352,
          image: '/images/binus1.jpg'
        },
        {
          id: 2,
          name: 'BINUS Syahdan Campus',
          address: 'Jl. K.H. Syahdan No. 9, Palmerah',
          city: 'Jakarta',
          latitude: -6.200462,
          longitude: 106.785102,
          image: '/images/binus2.jpg'
        },
        {
          id: 3,
          name: 'BINUS Alam Sutera Campus',
          address: 'Jl. Jalur Sutera Barat Kav. 21, Alam Sutera',
          city: 'Tangerang',
          latitude: -6.224335,
          longitude: 106.649177,
          image: '/images/binus3.jpg'
        },
        {
          id: 4,
          name: 'BINUS Bandung Campus',
          address: 'Jl. Pasir Kaliki No. 25-27, Cicendo',
          city: 'Bandung',
          latitude: -6.914744,
          longitude: 107.602680,
          image: '/images/binus4.jpg'
        },
        {
          id: 5,
          name: 'BINUS Bekasi Campus',
          address: 'Summarecon Bekasi, Jl. Boulevard Ahmad Yani Blok M',
          city: 'Bekasi',
          latitude: -6.226107,
          longitude: 107.000183,
          image: '/images/binus5.jpg'
        },
        {
          id: 6,
          name: 'BINUS Kijang Campus',
          address: 'Jl. Kemanggisan Ilir III No.45, Kemanggisan',
          city: 'Jakarta',
          latitude: -6.226107,
          longitude: 106.800183,
          image: '/images/binus6.jpg'
        },
      ];
      
      setCampuses(placeholderCampuses);
      setSelectedCity('Jakarta');
      setIsLoading(false);
    }
  }, [campuses.length]);
  
  const cities = [...new Set(campuses.map(campus => campus.city))];
  const filteredCampuses = campuses.filter(campus => campus.city === selectedCity);
  
  const handleCampusSelect = (campus: Campus) => {
    setSelectedCampus(campus);
    
    // Store selected campus in localStorage
    localStorage.setItem('selectedCampus', JSON.stringify(campus));
    
    // Navigate to dashboard
    navigate('/dashboard');
  };
  
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl p-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
        <p className="text-center mt-4 text-neutral-600">Loading campuses...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full max-w-4xl p-6">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
        <div className="mt-4 text-center">
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-4xl p-6">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">Select Your Campus</h2>
      
      {/* City Selector */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-neutral-700 mb-3">City</h3>
        <div className="flex flex-wrap gap-2">
          {cities.map(city => (
            <Button
              key={city}
              variant={selectedCity === city ? 'primary' : 'outline'}
              size="md"
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Campuses */}
      <div>
        <h3 className="text-lg font-medium text-neutral-700 mb-3">
          {selectedCity} Campuses
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCampuses.map(campus => (
            <motion.div
              key={campus.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                clickable 
                onClick={() => handleCampusSelect(campus)}
                className="overflow-hidden"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={campus.image} 
                    alt={campus.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-neutral-800">{campus.name}</h3>
                  <div className="mt-2 flex items-start">
                    <MapPin className="h-5 w-5 text-neutral-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-neutral-600">{campus.address}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      size="sm" 
                      variant="primary"
                      rightIcon={<ChevronRight className="h-4 w-4" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCampusSelect(campus);
                      }}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusSelector;