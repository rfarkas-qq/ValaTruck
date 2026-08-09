"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Track } from "@/data/tracks";
import { Loader2 } from "lucide-react";
import type { MapTileStyle } from "./MapContainerComponent";

interface OverviewMapViewProps {
  tracks: Track[];
  mapTileStyle?: MapTileStyle;
  onSelectTrack: (trackId: string) => void;
}

const DynamicOverviewMapContainer = dynamic(
  () => import("./OverviewMapContainerComponent").then((mod) => mod.OverviewMapContainerComponent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Loading Overview Map</h3>
        <p className="text-slate-500 text-sm max-w-sm">
          Rendering all tracks and site locations...
        </p>
      </div>
    ),
  }
);

export const OverviewMapView: React.FC<OverviewMapViewProps> = (props) => {
  return <DynamicOverviewMapContainer {...props} />;
};
