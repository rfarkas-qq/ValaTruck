"use client";

import React from "react";
import { Track } from "@/data/tracks";
import { Navigation, Gauge, Clock, MapPin, ArrowRight } from "lucide-react";

interface TrackCardProps {
  track: Track;
  onSelectTrack: (trackId: string) => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, onSelectTrack }) => {
  return (
    <div className="group relative bg-white border border-slate-200 hover:border-sky-500/60 rounded-2xl p-5 md:p-6 transition-all duration-200 shadow-md hover:shadow-xl flex flex-col justify-between">
      {/* Top Banner Accent Line */}
      <div
        className="absolute top-0 left-6 right-6 h-1 rounded-b-md transition-all group-hover:h-1.5"
        style={{ backgroundColor: track.routeColor }}
      />

      <div>
        {/* Header Row: Title & Destination */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-sky-700 uppercase mb-1">
              <MapPin className="w-3.5 h-3.5 text-sky-600" />
              {track.destinationName}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
              {track.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-5 line-clamp-2">
          {track.description}
        </p>

        {/* Spec Stats Grid */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-slate-100/90 rounded-xl border border-slate-200 mb-5">
          <div className="flex flex-col items-center justify-center p-1 text-center">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" /> Distance
            </span>
            <span className="text-base font-bold text-slate-900 mt-0.5">
              {track.distanceKm} <span className="text-xs text-slate-500 font-normal">km</span>
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-1 text-center border-l border-slate-200">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-slate-500" /> Speed Limit
            </span>
            <span className="text-base font-bold text-amber-600 mt-0.5">
              {track.speedLimitKmH} <span className="text-xs text-slate-500 font-normal">km/h</span>
            </span>
          </div>
        </div>
      </div>

      {/* Driver Touch Action Button */}
      <button
        onClick={() => onSelectTrack(track.id)}
        className="w-full h-14 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-sky-600/20"
      >
        <Navigation className="w-6 h-6 fill-current" />
        <span>Start Navigation</span>
        <ArrowRight className="w-5 h-5 ml-auto mr-2 opacity-80 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
