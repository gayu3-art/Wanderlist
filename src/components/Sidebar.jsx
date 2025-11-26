import React from 'react';
import { X, MapPin } from 'lucide-react';

const Sidebar = ({ wishlist, removeFromWishlist }) => {
    return (
        <div className="absolute top-24 left-4 w-80 max-h-[calc(100vh-8rem)] bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 shadow-2xl z-10 flex flex-col transition-all duration-300 animate-in slide-in-from-left-4 fade-in duration-500">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-teal-400" />
                My Wanderlist
                {wishlist.length > 0 && (
                    <span className="ml-auto text-xs font-normal text-slate-400 bg-slate-800 px-2 py-1 rounded-full border border-slate-700">
                        {wishlist.length}
                    </span>
                )}
            </h2>

            {wishlist.length === 0 ? (
                <div className="text-center py-8">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-6 h-6 text-slate-600" />
                    </div>
                    <p className="text-sm text-slate-400">
                        Your list is empty. Explore the map and click on countries to add them!
                    </p>
                </div>
            ) : (
                <div className="overflow-y-auto pr-2 space-y-2 custom-scrollbar flex-1">
                    {wishlist.map((country) => (
                        <div
                            key={country}
                            className="group flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700/50 hover:border-teal-500/30 transition-all duration-200"
                        >
                            <span className="text-slate-200 font-medium truncate">{country}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFromWishlist(country);
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                aria-label={`Remove ${country}`}
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Sidebar;
