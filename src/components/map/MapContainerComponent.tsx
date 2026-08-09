"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Track } from "@/data/tracks";

export type MapTileStyle = "standard" | "satellite" | "voyager" | "dark";

interface MapContainerComponentProps {
  track: Track;
  driverLocation: {
    lat: number;
    lng: number;
    accuracy: number;
    heading: number | null;
  };
  autoRecenter: boolean;
  mapTileStyle?: MapTileStyle;
}

const TILE_PROVIDERS: Record<MapTileStyle, { url: string; attribution: string; maxZoom: number }> = {
  standard: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    maxZoom: 19,
  },
  voyager: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
  },
};

// Controller component to handle map panTo / flyTo dynamically
const MapController: React.FC<{ center: [number, number]; autoRecenter: boolean }> = ({
  center,
  autoRecenter,
}) => {
  const map = useMap();

  useEffect(() => {
    if (autoRecenter) {
      map.panTo(center, { animate: true, duration: 0.8 });
    }
  }, [center, autoRecenter, map]);

  return null;
};

// Create custom SVG markers for Leaflet Light Mode
const createCustomPinIcon = (color: string, label: string) => {
  return L.divIcon({
    className: "custom-pin-marker",
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; transform: translate(-50%, -100%);">
        <div style="background: #ffffff; color: #0f172a; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 8px; border: 2px solid ${color}; box-shadow: 0 4px 12px rgba(0,0,0,0.25); white-space: nowrap; font-family: sans-serif;">
          ${label}
        </div>
        <div style="width: 3px; height: 10px; background: ${color};"></div>
        <div style="width: 10px; height: 10px; border-radius: 50%; background: ${color}; border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const createDriverIcon = (heading: number | null) => {
  const rotateDeg = heading !== null ? heading : 0;
  return L.divIcon({
    className: "driver-location-marker",
    html: `
      <div class="driver-marker-ring"></div>
      <div class="driver-marker-icon" style="transform: rotate(${rotateDeg}deg);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
        </svg>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });
};

export const MapContainerComponent: React.FC<MapContainerComponentProps> = ({
  track,
  driverLocation,
  autoRecenter,
  mapTileStyle = "standard",
}) => {
  // Extract GeoJSON coordinates for Polyline [lat, lng]
  const lineFeature = track.geojson.features.find((f) => f.geometry.type === "LineString");
  const polylineCoords: [number, number][] =
    lineFeature && lineFeature.geometry.type === "LineString"
      ? lineFeature.geometry.coordinates.map((coord) => [coord[1], coord[0]])
      : [];

  const initialCenter: [number, number] = polylineCoords.length > 0 ? polylineCoords[0] : [48.624454, 21.281608];

  const activeProvider = TILE_PROVIDERS[mapTileStyle] || TILE_PROVIDERS.standard;

  return (
    <MapContainer
      center={initialCenter}
      zoom={15}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <MapController
        center={[driverLocation.lat, driverLocation.lng]}
        autoRecenter={autoRecenter}
      />

      {/* Selected Tile Layer Provider */}
      <TileLayer
        key={mapTileStyle}
        attribution={activeProvider.attribution}
        url={activeProvider.url}
        maxZoom={activeProvider.maxZoom}
      />

      {/* Track GeoJSON Polyline Outer Glow */}
      {polylineCoords.length > 0 && (
        <Polyline
          positions={polylineCoords}
          pathOptions={{
            color: mapTileStyle === "satellite" || mapTileStyle === "dark" ? "#38bdf8" : track.routeColor,
            weight: 14,
            opacity: 0.35,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      )}

      {/* Track GeoJSON Polyline Primary Path */}
      {polylineCoords.length > 0 && (
        <Polyline
          positions={polylineCoords}
          pathOptions={{
            color: mapTileStyle === "satellite" || mapTileStyle === "dark" ? "#00f0ff" : track.routeColor,
            weight: 6,
            opacity: 0.95,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      )}

      {/* Waypoints & Pins */}
      {track.waypoints.map((wpt, idx) => {
        let pinColor = "#0284c7";
        if (wpt.type === "start") pinColor = "#16a34a";
        if (wpt.type === "end") pinColor = "#dc2626";

        return (
          <Marker
            key={idx}
            position={[wpt.lat, wpt.lng]}
            icon={createCustomPinIcon(pinColor, wpt.name)}
          >
            <Popup>
              <div className="p-1">
                <div className="text-xs uppercase font-bold text-sky-700 mb-0.5">
                  {wpt.type} • Waypoint #{idx + 1}
                </div>
                <div className="font-bold text-slate-900 text-sm mb-1">{wpt.name}</div>
                <div className="text-slate-600 text-xs">{wpt.instruction}</div>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* GPS Accuracy Circle */}
      {driverLocation.accuracy > 0 && (
        <Circle
          center={[driverLocation.lat, driverLocation.lng]}
          radius={driverLocation.accuracy}
          pathOptions={{
            color: "#0284c7",
            fillColor: "#0284c7",
            fillOpacity: 0.15,
            weight: 1.5,
          }}
        />
      )}

      {/* Real-Time Driver Pulsing Truck Marker */}
      <Marker
        position={[driverLocation.lat, driverLocation.lng]}
        icon={createDriverIcon(driverLocation.heading)}
      >
        <Popup>
          <div className="p-1 text-center">
            <div className="font-bold text-sky-700 text-sm">CAT 777G #402</div>
            <div className="text-slate-600 text-xs font-mono mt-1">
              {driverLocation.lat.toFixed(5)}°N, {driverLocation.lng.toFixed(5)}°E
            </div>
            <div className="text-slate-500 text-xs mt-0.5">
              Accuracy: ±{Math.round(driverLocation.accuracy)}m
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};
