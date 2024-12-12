import React, { createContext, useContext, useState, useEffect } from "react";

const TracksContext = createContext();

export const useTracks = () => {
  const context = useContext(TracksContext);
  if (!context) {
    throw new Error("useTracks must be used within a TracksProvider");
  }
  return context;
};

export const TracksProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]); // List of all tracks
  const [playingTrack, setPlayingTrack] = useState(null); // Currently playing track
  const [currentTime, setCurrentTime] = useState(0); // Playback progress in seconds
  const [isPlaying, setIsPlaying] = useState(false); // Play/Pause state
  const [playMode, setPlayMode] = useState("sequential"); // Play mode: "sequential", "shuffle", "repeat"

  // Handle playback progress globally
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (playingTrack && prev >= playingTrack.duration / 1000) {
            // Handle end of track
            playNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playingTrack]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const playNextTrack = () => {
    const currentIndex = tracks.findIndex(
      (track) => track.id === playingTrack?.id
    );
    let nextTrack;

    if (playMode === "repeat") {
      setCurrentTime(0);
      setIsPlaying(true);
      return;
    } else if (playMode === "shuffle") {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      nextTrack = tracks[randomIndex];
    } else {
      nextTrack = tracks[(currentIndex + 1) % tracks.length];
    }

    setPlayingTrack(nextTrack);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const playPreviousTrack = () => {
    const currentIndex = tracks.findIndex(
      (track) => track.id === playingTrack?.id
    );
    let prevTrack;

    if (playMode === "shuffle") {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      prevTrack = tracks[randomIndex];
    } else {
      prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
    }

    setPlayingTrack(prevTrack);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const togglePlayMode = () => {
    setPlayMode((prevMode) => {
      if (prevMode === "sequential") return "shuffle";
      if (prevMode === "shuffle") return "repeat";
      return "sequential";
    });
  };

  return (
    <TracksContext.Provider
      value={{
        tracks,
        setTracks,
        playingTrack,
        setPlayingTrack,
        currentTime,
        setCurrentTime,
        isPlaying,
        togglePlayPause,
        playNextTrack,
        playPreviousTrack,
        playMode,
        togglePlayMode,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};
