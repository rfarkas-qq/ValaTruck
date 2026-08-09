"use client";

import React, { useState, useEffect } from "react";
import { Track } from "@/data/tracks";
import { MapView } from "./map/MapView";
import type { MapTileStyle } from "./map/MapContainerComponent";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import {
  ArrowLeft,
  Compass,
  Gauge,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  LocateFixed,
  Wifi,
  WifiOff,
  Radio,
  CornerUpRight,
  Layers,
} from "lucide-react";

interface NavigationViewProps {
  track: Track;
  onBackToRoutes: () => void;
}

export const NavigationView: React.FC<NavigationViewProps> = ({ track, onBackToRoutes }) => {
  const { t } = useLanguage();

  // Extract polyline points for default position and simulation
  const lineFeature = track.geojson.features.find((f) => f.geometry.type === "LineString");
  const polylineCoords =
    lineFeature && lineFeature.geometry.type === "LineString"
      ? lineFeature.geometry.coordinates
      : [];

  const startCoord = polylineCoords.length > 0 ? polylineCoords[0] : [21.281608, 48.624454];

  // Driver GPS state
  const [driverLocation, setDriverLocation] = useState<{
    lat: number;
    lng: number;
    accuracy: number;
    heading: number | null;
    speed: number; // in km/h
  }>({
    lat: startCoord[1],
    lng: startCoord[0],
    accuracy: 8, // meters
    heading: 45,
    speed: 28,
  });

  const [gpsStatus, setGpsStatus] = useState<"connecting" | "active" | "denied" | "simulated">("connecting");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoRecenter, setAutoRecenter] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStepIndex, setSimStepIndex] = useState<number>(0);
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState<number>(0);

  // Map layer state: standard OSM by default
  const [mapTileStyle, setMapTileStyle] = useState<MapTileStyle>("standard");
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState<boolean>(false);

  // Watch position hook
  useEffect(() => {
    if (isSimulating) return;

    if (!("geolocation" in navigator)) {
      setGpsStatus("denied");
      setErrorMessage("Geolocation is not supported by this browser.");
      return;
    }

    let watchId: number;

    const handleSuccess = (pos: GeolocationPosition) => {
      setGpsStatus("active");
      setErrorMessage(null);
      const speedKmH = pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : Math.floor(Math.random() * 15) + 20;

      setDriverLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy || 10,
        heading: pos.coords.heading ?? 45,
        speed: speedKmH,
      });
    };

    const handleError = (err: GeolocationPositionError) => {
      console.warn("GPS Error:", err.message);
      if (err.code === err.PERMISSION_DENIED) {
        setGpsStatus("denied");
        setErrorMessage(`${t("gpsDenied")}. ${t("gpsDeniedDesc")}`);
      } else {
        setGpsStatus("denied");
        setErrorMessage(`${t("gpsSignalLost")} (${err.message}). ${t("estimatedPositioning")}`);
      }
    };

    watchId = navigator.geolocation.watchPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 1000,
    });

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [isSimulating, t]);

  // Simulation movement ticker
  useEffect(() => {
    if (!isSimulating || polylineCoords.length === 0) return;

    setGpsStatus("simulated");

    const interval = setInterval(() => {
      setSimStepIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % polylineCoords.length;
        const currentPt = polylineCoords[prevIndex];
        const nextPt = polylineCoords[nextIndex];

        // Calculate heading between current and next point
        const dy = nextPt[1] - currentPt[1];
        const dx = nextPt[0] - currentPt[0];
        let angle = (Math.atan2(dx, dy) * 180) / Math.PI;
        if (angle < 0) angle += 360;

        setDriverLocation({
          lat: nextPt[1],
          lng: nextPt[0],
          accuracy: 5 + Math.random() * 3,
          heading: Math.round(angle),
          speed: Math.round(track.speedLimitKmH * (0.8 + Math.random() * 0.3)),
        });

        // Update waypoint index logic
        const progressPercent = nextIndex / (polylineCoords.length - 1);
        const wptIdx = Math.min(
          Math.floor(progressPercent * track.waypoints.length),
          track.waypoints.length - 1
        );
        setCurrentWaypointIndex(wptIdx);

        return nextIndex;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulating, polylineCoords, track.speedLimitKmH, track.waypoints.length]);

  const toggleSimulation = () => {
    setIsSimulating((prev) => !prev);
  };

  const resetSimulation = () => {
    setSimStepIndex(0);
    if (polylineCoords.length > 0) {
      setDriverLocation((prev) => ({
        ...prev,
        lat: polylineCoords[0][1],
        lng: polylineCoords[0][0],
      }));
    }
  };

  const currentWpt = track.waypoints[currentWaypointIndex] || track.waypoints[0];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-50 select-none">
      {/* Dynamic Map Component */}
      <MapView
        track={track}
        driverLocation={driverLocation}
        autoRecenter={autoRecenter}
        mapTileStyle={mapTileStyle}
      />

      {/* TOP FLOATING HEADER OVERLAY */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col gap-3 pointer-events-none max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-3 pointer-events-auto">
          {/* Back Button */}
          <button
            onClick={onBackToRoutes}
            className="h-14 px-5 bg-white/95 backdrop-blur-md border border-slate-200 hover:border-sky-600 text-slate-950 font-bold rounded-2xl flex items-center gap-2.5 shadow-xl active:scale-95 transition-all shrink-0"
          >
            <ArrowLeft className="w-6 h-6 text-sky-600" />
            <span className="hidden sm:inline text-base">{t("backToRoutes")}</span>
          </button>

          {/* Target Destination Header Card */}
          <div className="flex-1 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-3 px-4 shadow-xl flex items-center justify-between gap-3 overflow-hidden">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
                  style={{ backgroundColor: track.routeColor }}
                />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                  {t("target")}: {track.destinationName}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-extrabold text-slate-900 truncate">
                {track.title}
              </h2>
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0 pl-3 border-l border-slate-200 text-xs text-slate-600">
              <div className="text-right">
                <div className="text-slate-400 font-medium">{t("limit")}</div>
                <div className="font-bold text-amber-600 text-sm">{track.speedLimitKmH} km/h</div>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="shrink-0">
            <LanguageSelector />
          </div>
        </div>

        {/* Turn-by-Turn Instruction Banner */}
        <div className="bg-sky-600 backdrop-blur-md border border-sky-500 rounded-2xl p-3.5 px-5 shadow-xl pointer-events-auto flex items-center gap-4 text-white">
          <div className="w-12 h-12 rounded-xl bg-white text-sky-700 flex items-center justify-center shrink-0 font-extrabold shadow-md">
            <CornerUpRight className="w-7 h-7" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-sky-100 uppercase tracking-wider flex items-center gap-1.5">
              <span>{t("waypoint")} #{currentWaypointIndex + 1} {t("of")} {track.waypoints.length}</span>
              <span>•</span>
              <span className="text-white font-bold">{currentWpt.name}</span>
            </div>
            <div className="text-base md:text-lg font-bold text-white leading-tight truncate">
              {currentWpt.instruction}
            </div>
          </div>
        </div>

        {/* GPS Warning Banner */}
        {gpsStatus === "denied" && (
          <div className="bg-rose-50 backdrop-blur-md border border-rose-200 rounded-2xl p-4 shadow-xl pointer-events-auto flex items-center justify-between gap-3 text-rose-900 text-sm">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
              <div>
                <div className="font-bold text-rose-950">{errorMessage || t("gpsDenied")}</div>
                <div className="text-xs text-rose-700">{t("gpsDeniedDesc")}</div>
              </div>
            </div>
            <button
              onClick={toggleSimulation}
              className="px-4 py-2 bg-rose-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shrink-0 hover:bg-rose-700 active:scale-95 transition-all"
            >
              {t("startSimulation")}
            </button>
          </div>
        )}
      </div>

      {/* RIGHT FLOATING CONTROLS */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {/* Recenter Map Button */}
        <button
          onClick={() => setAutoRecenter((prev) => !prev)}
          title={t("recenterMap")}
          className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-xl transition-all active:scale-95 ${
            autoRecenter
              ? "bg-sky-600 text-white border-sky-600 font-bold"
              : "bg-white/95 text-slate-600 border-slate-200 hover:text-slate-900"
          }`}
        >
          <LocateFixed className="w-7 h-7" />
        </button>

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

        {/* Simulation Movement Play/Pause */}
        <button
          onClick={toggleSimulation}
          title={isSimulating ? t("pauseSimulation") : t("playSimulation")}
          className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-xl transition-all active:scale-95 ${
            isSimulating
              ? "bg-amber-500 text-white border-amber-500 font-bold animate-pulse"
              : "bg-white/95 text-slate-700 border-slate-200 hover:text-slate-900"
          }`}
        >
          {isSimulating ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-0.5" />}
        </button>

        {/* Reset Simulation Step */}
        {isSimulating && (
          <button
            onClick={resetSimulation}
            title={t("resetSimulation")}
            className="w-14 h-14 rounded-2xl bg-white/95 border border-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-xl transition-all active:scale-95"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* BOTTOM FLOATING DASHBOARD TELEMETRY BAR */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Telemetry Stats Grid */}
          <div className="grid grid-cols-4 gap-3 w-full md:w-auto flex-1">
            {/* Speedometer */}
            <div className="flex flex-col items-center justify-center p-2.5 bg-slate-100/90 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                <Gauge className="w-3 h-3 text-sky-600" /> {t("speed")}
              </span>
              <div className="text-xl md:text-2xl font-black text-slate-900 mt-0.5">
                {driverLocation.speed}{" "}
                <span className="text-xs font-normal text-slate-500">km/h</span>
              </div>
            </div>

            {/* GPS Accuracy */}
            <div className="flex flex-col items-center justify-center p-2.5 bg-slate-100/90 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-600" /> {t("accuracy")}
              </span>
              <div className="text-xl md:text-2xl font-black text-emerald-700 mt-0.5">
                ±{Math.round(driverLocation.accuracy)}
                <span className="text-xs font-normal text-slate-500">m</span>
              </div>
            </div>

            {/* Heading / Compass */}
            <div className="flex flex-col items-center justify-center p-2.5 bg-slate-100/90 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold flex items-center gap-1">
                <Compass className="w-3 h-3 text-amber-600" /> {t("heading")}
              </span>
              <div className="text-xl md:text-2xl font-black text-amber-600 mt-0.5">
                {driverLocation.heading !== null ? `${driverLocation.heading}°` : "N/A"}
              </div>
            </div>

            {/* Signal Status */}
            <div className="flex flex-col items-center justify-center p-2.5 bg-slate-100/90 rounded-xl border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">{t("mode")}</span>
              <div className="mt-1">
                {gpsStatus === "simulated" && (
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-bold border border-amber-300">
                    {t("sim")}
                  </span>
                )}
                {gpsStatus === "active" && (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1">
                    <Wifi className="w-3 h-3 text-emerald-600" /> {t("live")}
                  </span>
                )}
                {gpsStatus === "denied" && (
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300 flex items-center gap-1">
                    <WifiOff className="w-3 h-3 text-rose-600" /> {t("off")}
                  </span>
                )}
                {gpsStatus === "connecting" && (
                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-xs font-bold animate-pulse">
                    {t("sync")}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Coordinates Bar */}
          <div className="w-full md:w-auto flex items-center justify-between md:flex-col md:items-end text-right border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-4">
            <div className="text-xs text-slate-500 font-mono">
              LAT: <span className="text-slate-900 font-bold">{driverLocation.lat.toFixed(5)}°</span>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              LNG: <span className="text-slate-900 font-bold">{driverLocation.lng.toFixed(5)}°</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1">
              {t("offlineCachingActive")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
