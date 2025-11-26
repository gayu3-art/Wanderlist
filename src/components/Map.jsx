import React, { memo } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const Map = ({ wishlist, toggleWishlist, position, setPosition }) => {
    const handleMoveEnd = (position) => {
        setPosition(position);
    };

    return (
        <div className="w-full h-full bg-slate-900 overflow-hidden">
            <ComposableMap projection="geoMercator" projectionConfig={{ scale: 140 }}>
                <ZoomableGroup
                    center={position.coordinates}
                    zoom={position.zoom}
                    minZoom={1}
                    maxZoom={8}
                    onMoveEnd={handleMoveEnd}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const countryName = geo.properties.name;
                                const isWishlisted = wishlist.includes(countryName);
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={countryName}
                                        onClick={() => toggleWishlist(countryName)}
                                        className="outline-none focus:outline-none transition-all duration-300 ease-in-out"
                                        style={{
                                            default: {
                                                fill: isWishlisted ? "#2dd4bf" : "#cbd5e1", // Teal-400 or Slate-300
                                                stroke: "#0f172a", // Slate-900 (ocean color)
                                                strokeWidth: 0.5,
                                            },
                                            hover: {
                                                fill: isWishlisted ? "#14b8a6" : "#94a3b8", // Teal-500 or Slate-400
                                                cursor: "pointer",
                                                stroke: "#f8fafc",
                                                strokeWidth: 0.75,
                                            },
                                            pressed: {
                                                fill: "#0d9488", // Teal-600
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
};

export default memo(Map);
