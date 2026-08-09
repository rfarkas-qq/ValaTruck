"use client";

import React, { useState } from "react";
import { Track, MOCK_TRACKS } from "@/data/tracks";
import { TrackCard } from "./TrackCard";
import { Truck, Wifi, Search, Info, RotateCcw, Map } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

interface TrackListScreenProps {
  onSelectTrack: (trackId: string) => void;
  onShowTracks: () => void;
}

export const TrackListScreen: React.FC<TrackListScreenProps> = ({ onSelectTrack, onShowTracks }) => {
  const [tracks, setTracks] = useState<Track[]>(MOCK_TRACKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isReloading, setIsReloading] = useState(false);
  const { t } = useLanguage();

  const handleReloadTracks = async () => {
    setIsReloading(true);
    try {
      const res = await fetch(`/api/tracks?t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setTracks(data);
        }
      }
    } catch (err) {
      console.error("Failed to reload tracks:", err);
    } finally {
      setTimeout(() => setIsReloading(false), 400);
    }
  };

  const filteredTracks = tracks.filter((track) => {
    return (
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 flex flex-col justify-between max-w-7xl mx-auto">
      <div>
        {/* Top Header Banner */}
        <header className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-sky-700" />
                CAT 777G #402 • {t("siteHub")}
              </span>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Wifi className="w-3 h-3 text-emerald-600 animate-pulse" /> {t("offlineTilesReady")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Vala<span className="text-sky-600">Truck</span>
            </h1>
            <p className="text-slate-600 text-sm md:text-base">
              {t("subTitle")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Show Tracks Overview Button */}
            <button
              onClick={onShowTracks}
              className="h-10 px-3.5 bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold rounded-xl flex items-center gap-2 text-xs shadow-md shadow-sky-600/20 active:scale-95 transition-all"
              title={t("showTracks")}
            >
              <Map className="w-4 h-4" />
              <span>{t("showTracks")}</span>
            </button>

            {/* Reload Tracks Button */}
            <button
              onClick={handleReloadTracks}
              disabled={isReloading}
              className="h-10 px-3.5 bg-white border border-slate-200 hover:border-sky-500 text-slate-700 hover:text-sky-700 font-bold rounded-xl flex items-center gap-2 text-xs shadow-sm hover:shadow active:scale-95 transition-all disabled:opacity-50"
              title={t("reloadTracks")}
            >
              <RotateCcw className={`w-4 h-4 text-sky-600 ${isReloading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{t("reloadTracks")}</span>
            </button>

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </header>

        {/* Search Controls */}
        <div className="mb-8">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 focus:border-sky-600 rounded-xl pl-12 pr-4 py-3.5 text-slate-900 placeholder-slate-400 text-base focus:outline-none shadow-sm transition-colors"
            />
          </div>
        </div>

        {/* Tracks List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => (
            <TrackCard key={track.id} track={track} onSelectTrack={onSelectTrack} />
          ))}
        </div>

        {filteredTracks.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center my-8 shadow-sm">
            <Info className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">{t("noRoutesFound")}</h3>
            <p className="text-slate-500 text-sm">
              {t("noRoutesDesc")}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-3">
        <div>{t("footerTitle")}</div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> {t("gpsStandby")}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500" /> {t("swActive")}
          </span>
        </div>
      </footer>
    </div>
  );
};
