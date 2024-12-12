import { useState } from "react";

export const usePlaylist = (initialPlaylist) => {
  const [playlist, setPlaylist] = useState(initialPlaylist);

  const handlePlay = () => {
    // TODO: Implement play logic
  };

  const handleToggleFavorite = (id) => {
    const newPlaylist = playlist.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setPlaylist(newPlaylist);
  };

  return {
    playlist,
    setPlaylist,
    handlePlay,
    handleToggleFavorite,
  };
};
