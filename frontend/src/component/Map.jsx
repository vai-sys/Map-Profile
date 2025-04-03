
import React, { useEffect, useState } from "react";
import axios from "axios";

const Map = ({ address }) => {
  const [location, setLocation] = useState(null);
  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;


  useEffect(() => {
    if (address) {
      fetchLocation();
    }
  }, [address]);

  const fetchLocation = async () => {
    try {
      const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
        params: { q: `${address.street}, ${address.city}, ${address.state}, ${address.country}`, key: apiKey }
      });
      if (res.data.results.length > 0) {
        setLocation(res.data.results[0].geometry);
      }
    } catch (error) {
      console.error("Error fetching location", error);
    }
  };

  return (
    <div>
      {location ? (
        <a
          href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          View on Map
        </a>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default Map;