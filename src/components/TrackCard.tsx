"use client";

import React from "react";
import { Track } from "@/data/tracks";
import { Navigation, Gauge, Clock, MapPin, ArrowRight, ExternalLink, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface TrackCardProps {
  track: Track;
  onSelectTrack: (trackId: string) => void;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, onSelectTrack }) => {
  const { t } = useLanguage();

  const isSinglePoint = track.isExternalOnly || track.waypoints.length <= 1;

  const startWpt = track.waypoints[0];
  const startLat = startWpt?.lat ?? 48.624454;
  const startLng = startWpt?.lng ?? 21.281608;

  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${startLat},${startLng}`;

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-sky-500/60 rounded-2xl p-5 md:p-6 transition-all duration-200 shadow-md hover:shadow-xl flex flex-col justify-between">
      {/* Top Banner Accent Line */}
      <div
        className="absolute top-0 left-6 right-6 h-1 rounded-b-md transition-all group-hover:h-1.5"
        style={{ backgroundColor: track.routeColor }}
      />

      <div>
        {/* Header Row: Title & Destination & Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-sky-700 uppercase">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                {track.destinationName}
              </span>
              {isSinglePoint && (
                <span className="bg-purple-100 text-purple-800 border border-purple-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                  <Globe className="w-3 h-3 text-purple-600" />
                  {t("externalLocation")}
                </span>
              )}
            </div>
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
        {!isSinglePoint ? (
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-100/90 rounded-xl border border-slate-200 mb-5">
            <div className="flex flex-col items-center justify-center p-1 text-center">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> {t("distance")}
              </span>
              <span className="text-base font-bold text-slate-900 mt-0.5">
                {track.distanceKm} <span className="text-xs text-slate-500 font-normal">km</span>
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-1 text-center border-l border-slate-200">
              <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-slate-500" /> {t("speedLimit")}
              </span>
              <span className="text-base font-bold text-amber-600 mt-0.5">
                {track.speedLimitKmH} <span className="text-xs text-slate-500 font-normal">km/h</span>
              </span>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200/80 mb-5 text-center text-xs text-purple-900 font-medium flex items-center justify-center gap-2">
            <Globe className="w-4 h-4 text-purple-600 shrink-0" />
            <span>{t("publicNavOnly")}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {isSinglePoint ? (
        /* Single Point Tile: Prominent External Navigation Button Only */
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-14 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-base md:text-lg rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-purple-600/20"
        >
          <MapPin className="w-6 h-6 fill-current text-white" />
          <span>{t("navigateExternal")}</span>
          <ExternalLink className="w-5 h-5 ml-auto mr-2 opacity-90" />
        </a>
      ) : (
        /* Multi-Point Route Tile: Dual Actions (External Start Nav + Internal Site Nav) */
        <div className="flex flex-col gap-2.5">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-300 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
            title={`${t("navigateToStart")} (${startWpt?.name || "Start"})`}
          >
            <MapPin className="w-4 h-4 text-rose-600" />
            <span className="truncate">{t("navigateToStart")}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-auto mr-1" />
          </a>

          <button
            onClick={() => onSelectTrack(track.id)}
            className="w-full h-14 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-base md:text-lg rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-sky-600/20"
          >
            <Navigation className="w-5 h-5 md:w-6 md:h-6 fill-current" />
            <span>{t("startNavigation")}</span>
            <ArrowRight className="w-5 h-5 ml-auto mr-2 opacity-80 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
