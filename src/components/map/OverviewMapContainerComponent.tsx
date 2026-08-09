"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Track } from "@/data/tracks";
import type { MapTileStyle } from "./MapContainerComponent";
import { Navigation, MapPin, ExternalLink } from "lucide-react";

interface OverviewMapContainerComponentProps {
  tracks: Track[];
  mapTileStyle?: MapTileStyle;
  onSelectTrack: (trackId: string) => void;
}

const TILE_PROVIDERS: Record<MapTileStyle, { url: string; attribution: string; maxZoom: number }> = {
  standard: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Source: Esri",
    maxZoom: 19,
  },
  voyager: {
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO',
    maxZoom: 19,
  },
  dark: {
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO',
    maxZoom: 19,
  },
};

// Fit bounds to encompass all tracks and waypoints
const FitAllBoundsController: React.FC<{ tracks: Track[] }> = ({ tracks }) => {
  const map = useMap();

  useEffect(() => {
    const points: [number, number][] = [];
    tracks.forEach((t) => {
      t.waypoints.forEach((w) => points.push([w.lat, w.lng]));
      const lineFeature = t.geojson.features.find((f) => f.geometry.type === "LineString");
      if (lineFeature && lineFeature.geometry.type === "LineString") {
        lineFeature.geometry.coordinates.forEach((c) => points.push([c[1], c[0]]));
      }
    });

    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [60, 60], animate: true });
    }
  }, [tracks, map]);

  return null;
};

// Custom DIV Icon for Track Name Badges
const createTrackBadgeIcon = (title: string, color: string, isSinglePoint: boolean) => {
  return L.divIcon({
    className: "custom-track-badge-marker",
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -100%);">
        <div style="background: #ffffff; color: #0f172a; font-weight: 800; font-size: 11px; padding: 5px 12px; border-radius: 10px; border: 2.5px solid ${color}; box-shadow: 0 4px 14px rgba(0,0,0,0.3); white-space: nowrap; font-family: sans-serif; display: flex; align-items: center; gap: 4px;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${color};"></span>
          <span>${title}</span>
          ${isSinglePoint ? '<span style="font-size: 9px; background: #f3e8ff; color: #6b21a8; padding: 1px 4px; border-radius: 4px; font-weight: 700;">EXT</span>' : ''}
        </div>
        <div style="width: 3px; height: 10px; background: ${color};"></div>
        <div style="width: 10px; height: 10px; border-radius: 50%; background: ${color}; border: 2px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

export const OverviewMapContainerComponent: React.FC<OverviewMapContainerComponentProps> = ({
  tracks,
  mapTileStyle = "standard",
  onSelectTrack,
}) => {
  const activeProvider = TILE_PROVIDERS[mapTileStyle] || TILE_PROVIDERS.standard;
  const initialCenter: [number, number] = [48.6309, 21.2800];

  return (
    <MapContainer
      center={initialCenter}
      zoom={14}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <FitAllBoundsController tracks={tracks} />

      <TileLayer
        key={mapTileStyle}
        attribution={activeProvider.attribution}
        url={activeProvider.url}
        maxZoom={activeProvider.maxZoom}
      />

      {tracks.map((track) => {
        const lineFeature = track.geojson.features.find((f) => f.geometry.type === "LineString");
        const polylineCoords: [number, number][] =
          lineFeature && lineFeature.geometry.type === "LineString"
            ? lineFeature.geometry.coordinates.map((coord) => [coord[1], coord[0]])
            : [];

        const isSinglePoint = track.isExternalOnly || track.waypoints.length <= 1;
        const startWpt = track.waypoints[0];
        const startLat = startWpt?.lat ?? 48.624454;
        const startLng = startWpt?.lng ?? 21.281608;
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${startLat},${startLng}`;

        return (
          <React.Fragment key={track.id}>
            {/* Polyline Glow */}
            {polylineCoords.length > 0 && (
              <Polyline
                positions={polylineCoords}
                pathOptions={{
                  color: track.routeColor,
                  weight: 12,
                  opacity: 0.35,
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />
            )}

            {/* Polyline Primary Path */}
            {polylineCoords.length > 0 && (
              <Polyline
                positions={polylineCoords}
                pathOptions={{
                  color: track.routeColor,
                  weight: 5,
                  opacity: 0.95,
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />
            )}

            {/* Track Name Label Pin Marker */}
            <Marker
              position={[startLat, startLng]}
              icon={createTrackBadgeIcon(track.title, track.routeColor, !!isSinglePoint)}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="text-xs uppercase font-bold text-sky-700 mb-0.5">
                    {track.destinationName}
                  </div>
                  <div className="font-extrabold text-slate-900 text-base mb-1">{track.title}</div>
                  <p className="text-slate-600 text-xs mb-3">{track.description}</p>

                  <div className="flex flex-col gap-2">
                    {isSinglePoint ? (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all text-center no-underline"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Navigate via External Maps</span>
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    ) : (
                      <>
                        <button
                          onClick={() => onSelectTrack(track.id)}
                          className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Navigation className="w-3.5 h-3.5 fill-current" />
                          <span>Start Site Navigation</span>
                        </button>
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-semibold text-[11px] rounded-lg flex items-center justify-center gap-1.5 transition-all text-center no-underline"
                        >
                          <MapPin className="w-3 h-3 text-rose-600" />
                          <span>Navigate to Start Point</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
};
