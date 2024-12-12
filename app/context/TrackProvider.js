import React, { createContext, useContext, useState } from "react";

const TracksContext = createContext();

export const TracksProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null); // Current playing track
  const [isPlaying, setIsPlaying] = useState(false); // Playback state
  const [currentTime, setCurrentTime] = useState(0); // Playback progress in seconds
  const [playMode, setPlayMode] = useState("order"); // Play mode: 'order' or 'shuffle'

  // Update a specific track
  const updateTrack = (id, updatedData) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.id === id ? { ...track, ...updatedData } : track
      )
    );
  };

  // Play the next track
  const playNextTrack = () => {
    if (!playingTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(
      (track) => track.id === playingTrack.id
    );
    if (playMode === "shuffle") {
      const nextIndex = Math.floor(Math.random() * tracks.length);
      setPlayingTrack(tracks[nextIndex]);
      setCurrentTime(0);
    } else {
      const nextIndex = (currentIndex + 1) % tracks.length;
      setPlayingTrack(tracks[nextIndex]);
      setCurrentTime(0);
    }
  };

  // Play the previous track
  const playPreviousTrack = () => {
    if (!playingTrack || tracks.length === 0) return;
    const currentIndex = tracks.findIndex(
      (track) => track.id === playingTrack.id
    );
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setPlayingTrack(tracks[prevIndex]);
    setCurrentTime(0);
  };

  return (
    <TracksContext.Provider
      value={{
        tracks,
        setTracks,
        playingTrack,
        setPlayingTrack,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        playMode,
        setPlayMode,
        updateTrack,
        playNextTrack,
        playPreviousTrack,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};

export const useTracks = () => useContext(TracksContext);
