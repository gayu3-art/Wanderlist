import React from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

const ZoomControls = ({ onZoomIn, onZoomOut, onReset }) => {
    return (
        <div className="absolute bottom-8 right-8 flex flex-col gap-2 z-10">
            <button
                onClick={onZoomIn}
                className="p-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl text-slate-200 hover:text-teal-400 hover:border-teal-500/50 transition-all shadow-lg hover:shadow-teal-500/20 group"
                aria-label="Zoom In"
                title="Zoom In"
            >
                <ZoomIn className="w-5 h-5" />
            </button>

            <button
                onClick={onZoomOut}
                className="p-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl text-slate-200 hover:text-teal-400 hover:border-teal-500/50 transition-all shadow-lg hover:shadow-teal-500/20 group"
                aria-label="Zoom Out"
                title="Zoom Out"
            >
                <ZoomOut className="w-5 h-5" />
            </button>

            <button
                onClick={onReset}
                className="p-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl text-slate-200 hover:text-teal-400 hover:border-teal-500/50 transition-all shadow-lg hover:shadow-teal-500/20 group"
                aria-label="Reset View"
                title="Reset View"
            >
                <Maximize2 className="w-5 h-5" />
            </button>

            <div className="mt-2 text-xs text-slate-500 text-center bg-slate-900/60 backdrop-blur-sm rounded-lg px-2 py-1 border border-slate-700/30">
                Scroll to zoom
            </div>
        </div>
    );
};

export default ZoomControls;
