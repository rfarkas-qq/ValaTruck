"use client";

import React, { useState } from "react";
import { MOCK_TRACKS, Track } from "@/data/tracks";
import { TrackListScreen } from "@/components/TrackListScreen";
import { NavigationView } from "@/components/NavigationView";
import { ShowTracksScreen } from "@/components/ShowTracksScreen";

export default function Home() {
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "navigate" | "overview">("list");
  const [allTracks, setAllTracks] = useState<Track[]>(MOCK_TRACKS);

  const selectedTrack = allTracks.find((t) => t.id === selectedTrackId);

  const handleSelectTrack = (trackId: string) => {
    setSelectedTrackId(trackId);
    setViewMode("navigate");
  };

  const handleBackToRoutes = () => {
    setSelectedTrackId(null);
    setViewMode("list");
  };

  const handleShowTracks = () => {
    setViewMode("overview");
  };

  if (viewMode === "navigate" && selectedTrack) {
    return (
      <NavigationView
        track={selectedTrack}
        onBackToRoutes={handleBackToRoutes}
      />
    );
  }

  if (viewMode === "overview") {
    return (
      <ShowTracksScreen
        tracks={allTracks}
        onBack={handleBackToRoutes}
        onSelectTrack={handleSelectTrack}
      />
    );
  }

  return (
    <TrackListScreen
      onSelectTrack={handleSelectTrack}
      onShowTracks={handleShowTracks}
    />
  );
}
