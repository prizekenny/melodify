import { MOCK_API } from "@env";

const NEW_ALBUM_URL = `${MOCK_API}/new-album`;
const TRACKS_URL = `${MOCK_API}/tracks`;

export const getNewAlbums = async () => {
  try {
    const response = await fetch(NEW_ALBUM_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    // 返回模拟数据，确保UI不会崩溃
    return [{
      id: "1",
      name: "Sample Album",
      artist: "Sample Artist",
      cover: "https://via.placeholder.com/300"
    }];
  }
};

export const getTracks = async () => {
  try {
    const response = await fetch(TRACKS_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tracks:", error);
    // 返回模拟数据，确保UI不会崩溃
    return [{
      id: "1",
      name: "Sample Track",
      artist: "Sample Artist",
      duration: "3:30",
      favorite: false,
      cover: "https://via.placeholder.com/300"
    }];
  }
};

// Add a new track
export const addTrack = async (trackData) => {
  try {
    const response = await fetch(TRACKS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add track: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding track:", error);
    throw error;
  }
};

// Update an existing track
export const updateTrack = async (trackId, updatedTrackData) => {
  try {
    const response = await fetch(`${TRACKS_URL}/${trackId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTrackData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update track: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating track:", error);
    throw error;
  }
};

// Delete a track
export const deleteTrack = async (trackId) => {
  try {
    const response = await fetch(`${TRACKS_URL}/${trackId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete track: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting track:", error);
    throw error;
  }
};
