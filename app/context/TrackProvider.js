import React, { createContext, useContext, useState } from "react";

const TracksContext = createContext();

export const TracksProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState(null);

  // Update a specific track by id
  const updateTrack = (id, updatedData) => {
    setTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.id === id ? { ...track, ...updatedData } : track
      )
    );
  };
  const getTrackById = (id) => {
    return tracks.find((track) => track.id === id);
  };

  return (
    <TracksContext.Provider
      value={{
        tracks,
        setTracks,
        updateTrack,
        getTrackById,
        playingTrack,
        setPlayingTrack,
      }}
    >
      {children}
    </TracksContext.Provider>
  );
};

export const useTracks = () => useContext(TracksContext);
