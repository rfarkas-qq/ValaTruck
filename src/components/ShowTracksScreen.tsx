"use client";

import React, { useState } from "react";
import { Track } from "@/data/tracks";
import { OverviewMapView } from "./map/OverviewMapView";
import type { MapTileStyle } from "./map/MapContainerComponent";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { ArrowLeft, Layers, Map } from "lucide-react";

interface ShowTracksScreenProps {
  tracks: Track[];
  onBack: () => void;
  onSelectTrack: (trackId: string) => void;
}

export const ShowTracksScreen: React.FC<ShowTracksScreenProps> = ({ tracks, onBack, onSelectTrack }) => {
  const { t } = useLanguage();
  const [mapTileStyle, setMapTileStyle] = useState<MapTileStyle>("standard");
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-50 select-none">
      {/* Overview Map Component */}
      <OverviewMapView
        tracks={tracks}
        mapTileStyle={mapTileStyle}
        onSelectTrack={onSelectTrack}
      />

      {/* TOP FLOATING HEADER OVERLAY */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col gap-3 pointer-events-none max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-3 pointer-events-auto">
          {/* Top Back Button */}
          <button
            onClick={onBack}
            className="h-14 px-5 bg-white/95 backdrop-blur-md border border-slate-200 hover:border-sky-600 text-slate-950 font-bold rounded-2xl flex items-center gap-2.5 shadow-xl active:scale-95 transition-all shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-sky-600" />
            <span className="hidden sm:inline text-base">{t("backToRoutes")}</span>
          </button>

          {/* Overview Header Title Card */}
          <div className="flex-1 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 px-4 shadow-xl flex items-center justify-between gap-3 overflow-hidden">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Map className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                  {t("allTracksOverview")} ({tracks.length})
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 truncate">
                Gate 6 Industrial Site • Map Overview
              </h2>
            </div>
          </div>

          {/* Language Selector */}
          <div className="shrink-0">
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* RIGHT FLOATING CONTROLS */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {/* Map Layer Switcher Button & Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setIsLayerMenuOpen((prev) => !prev)}
            title={t("selectMapLayer")}
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-xl transition-all active:scale-95 ${
              isLayerMenuOpen
                ? "bg-sky-700 text-white border-sky-700 font-bold"
                : "bg-white/95 text-slate-700 border-slate-200 hover:text-sky-600"
            }`}
          >
            <Layers className="w-7 h-7" />
          </button>

          {isLayerMenuOpen && (
            <div className="absolute right-16 top-0 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 w-48 text-xs font-bold">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                {t("selectMapLayer")}
              </div>
              <button
                onClick={() => {
                  setMapTileStyle("standard");
                  setIsLayerMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
                  mapTileStyle === "standard"
                    ? "bg-sky-100 text-sky-800"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>🗺</span>
                <span>{t("standardOsm")}</span>
              </button>
              <button
                onClick={() => {
                  setMapTileStyle("satellite");
                  setIsLayerMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
                  mapTileStyle === "satellite"
                    ? "bg-sky-100 text-sky-800"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>🛰</span>
                <span>{t("esriSatellite")}</span>
              </button>
              <button
                onClick={() => {
                  setMapTileStyle("voyager");
                  setIsLayerMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
                  mapTileStyle === "voyager"
                    ? "bg-sky-100 text-sky-800"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>🎨</span>
                <span>{t("cartoVoyager")}</span>
              </button>
              <button
                onClick={() => {
                  setMapTileStyle("dark");
                  setIsLayerMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
                  mapTileStyle === "dark"
                    ? "bg-sky-100 text-sky-800"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>🌙</span>
                <span>{t("cartoDark")}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
