import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ allCountries, onSelectCountry }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (query.length > 0) {
            const filtered = allCountries.filter(c =>
                c.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 5));
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [query, allCountries]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelect = (country) => {
        onSelectCountry(country);
        setQuery('');
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-md z-20 px-4">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-teal-400 transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-11 pr-4 py-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all shadow-lg"
                    placeholder="Search for a country..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 0 && setIsOpen(true)}
                />

                {isOpen && suggestions.length > 0 && (
                    <div className="absolute mt-2 w-full bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {suggestions.map((country) => (
                            <button
                                key={country}
                                className="w-full text-left px-4 py-3 text-slate-200 hover:bg-slate-800 hover:text-teal-400 transition-colors flex items-center justify-between"
                                onClick={() => handleSelect(country)}
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
