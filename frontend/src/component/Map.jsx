


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ address }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  useEffect(() => {
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (address && Object.values(address).some(val => val)) {
      fetchLocation();
    } else {
      setLoading(false);
      setError("No address provided");
    }
  }, [address]);

  useEffect(() => {
    if (location && mapContainerRef.current) {
      initMap();
    }
  }, [location]);

  const fetchLocation = async () => {
    setLoading(true);
    try {
      const addressString = [
        address.street,
        address.city,
        address.state,
        address.country
      ].filter(Boolean).join(", ");

      const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: { 
          q: addressString, 
          key: apiKey 
        }
      });
      
      if (res.data.results.length > 0) {
        setLocation(res.data.results[0].geometry);
      } else {
        setError("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location", error);
      setError("Failed to fetch location");
    } finally {
      setLoading(false);
    }
  };

  const initMap = () => {
    
    if (mapRef.current) {
      mapRef.current.remove();
    }

 
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      tap: false,
      keyboard: false,
      attributionControl: false,
    }).setView(
      [location.lat, location.lng], 
      15
    );

   
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(mapRef.current);
   
    L.marker([location.lat, location.lng]).addTo(mapRef.current);
  };

  const openInGoogleMaps = () => {
    if (location) {
      const { lat, lng } = location;
      const addressString = [
        address.street,
        address.city,
        address.state,
        address.country
      ].filter(Boolean).join(", ");
      
      
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(addressString)}`;
      
      
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-md">
        <div className="text-sm text-gray-500">Loading map...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-md">
        <div className="text-sm text-gray-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full rounded-md overflow-hidden">
    
      <div 
        ref={mapContainerRef} 
        className="h-full w-full"
      />
      
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300">
        <button
          onClick={openInGoogleMaps}
          className="bg-white text-blue-600 text-xs font-medium px-2 py-1 rounded shadow hover:bg-blue-600 hover:text-white transition-colors duration-300"
        >
          View on Map
        </button>
      </div>
    </div>
  );
};

export default Map;