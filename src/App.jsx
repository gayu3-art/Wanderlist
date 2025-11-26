import React, { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import ZoomControls from './components/ZoomControls';
import { feature } from 'topojson-client';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function App() {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wanderlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState({ coordinates: [0, 20], zoom: 1 });

  useEffect(() => {
    localStorage.setItem('wanderlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    fetch(geoUrl)
      .then(res => res.json())
      .then(data => {
        const countries = feature(data, data.objects.countries).features;
        const names = countries.map(c => c.properties.name).sort();
        setAllCountries(names);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load map data", err);
        setLoading(false);
      });
  }, []);

  const toggleWishlist = (country) => {
    setWishlist(prev => {
      if (prev.includes(country)) {
        return prev.filter(c => c !== country);
      } else {
        return [...prev, country];
      }
    });
  };

  const removeFromWishlist = (country) => {
    setWishlist(prev => prev.filter(c => c !== country));
  };

  const handleSearchSelect = (country) => {
    if (!wishlist.includes(country)) {
      setWishlist(prev => [...prev, country]);
    }
  };

  const handleZoomIn = () => {
    if (position.zoom < 8) {
      setPosition(prev => ({ ...prev, zoom: prev.zoom * 1.5 }));
    }
  };

  const handleZoomOut = () => {
    if (position.zoom > 1) {
      setPosition(prev => ({ ...prev, zoom: prev.zoom / 1.5 }));
    }
  };

  const handleResetZoom = () => {
    setPosition({ coordinates: [0, 20], zoom: 1 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-teal-400">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden font-sans">
      <SearchBar allCountries={allCountries} onSelectCountry={handleSearchSelect} />
      <Sidebar wishlist={wishlist} removeFromWishlist={removeFromWishlist} />
      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleResetZoom}
      />
      <Map
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        position={position}
        setPosition={setPosition}
      />
      <Tooltip
        id="my-tooltip"
        style={{
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          borderRadius: "8px",
          padding: "8px 12px",
          fontSize: "14px",
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
        }}
      />
    </div>
  );
}

export default App;
