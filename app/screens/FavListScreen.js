import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import PlaylistItem from "../../components/PlayListItem";
import { useRouter } from "expo-router";
import { getTracks } from "../api/music";

const FavListScreen = () => {
  const [tracks, setTracks] = useState([]);
  const [isRandom, setIsRandom] = useState(false);
  const router = useRouter();

  // Fetch favorite tracks
  useEffect(() => {
    const fetchFavoriteTracks = async () => {
      try {
        const allTracks = await getTracks();
        const favoriteTracks = allTracks.filter(track => track.favorite);
        setTracks(favoriteTracks);
      } catch (error) {
        console.error("Error fetching favorite tracks:", error);
      }
    };

    fetchFavoriteTracks();
  }, []);

  // Create playlist handlers
  const handlePlay = (trackId) => {
    // Find the index of the current track
    const currentIndex = tracks.findIndex(track => track.id === trackId);
    if (currentIndex === -1) return;

    // If random play is enabled, shuffle the playlist
    if (isRandom) {
      const shuffledTracks = [...tracks].sort(() => Math.random() - 0.5);
      // TODO: Implement play logic
      console.log("Playing shuffled tracks starting from:", shuffledTracks[0].name);
    } else {
      // Sequential play
      // TODO: Implement play logic
      console.log("Playing tracks in order starting from:", tracks[currentIndex].name);
    }
  };

  const handleToggleFavorite = async (trackId) => {
    try {
      // Update local state
      const updatedTracks = tracks.map(track => 
        track.id === trackId ? { ...track, favorite: !track.favorite } : track
      );
      setTracks(updatedTracks.filter(track => track.favorite)); // Keep only favorite tracks
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Handle artist navigation
  const handleArtistPress = (artistName) => {
    router.push({
      pathname: "/artist/[name]",
      params: { name: artistName }
    });
  };

  // Play all tracks in the list
  const handlePlayAll = () => {
    if (tracks.length > 0) {
      if (isRandom) {
        // Random play logic
        const randomIndex = Math.floor(Math.random() * tracks.length);
        handlePlay(tracks[randomIndex].id);
      } else {
        // Sequential play, start from the first track
        handlePlay(tracks[0].id);
      }
    }
  };

  // Toggle random play state
  const toggleRandom = () => {
    setIsRandom(!isRandom);
  };

  return (
    <View className="bg-background flex-1 flex-col px-5 pt-8">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold text-textPrimary">Favorite Songs</Text>
        <Text className="text-gray-500">{tracks.length} songs</Text>
      </View>

      {/* Play Controls */}
      <View className="flex-row items-center justify-between bg-white rounded-xl p-4 mb-6 shadow-sm">
        <TouchableOpacity 
          onPress={handlePlayAll}
          className="flex-row items-center"
        >
          <Ionicons name="play-circle" size={32} color="#4CAF50" />
          <Text className="ml-2 text-lg font-semibold text-textPrimary">
            Play All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={toggleRandom}
          className="flex-row items-center"
        >
          <Ionicons 
            name={isRandom ? "shuffle" : "shuffle-outline"} 
            size={24} 
            color={isRandom ? "#4CAF50" : "#666"} 
          />
          <Text className={`ml-1 ${isRandom ? "text-green-600" : "text-gray-600"}`}>
            Random
          </Text>
        </TouchableOpacity>
      </View>

      {/* Playlist */}
      <ScrollView
        showsVerticalScrollIndicator={true}
        className="flex-1"
      >
        {tracks.length === 0 ? (
          <Text className="text-center text-gray-500 mt-10">
            No favorite songs yet
          </Text>
        ) : (
          tracks.map((track) => (
            <View key={track.id} className="mb-2">
              <PlaylistItem
                id={track.id}
                name={track.name}
                artist={track.artist}
                duration={track.duration}
                favorite={track.favorite}
                onPlay={() => handlePlay(track.id)}
                onToggleFavorite={() => handleToggleFavorite(track.id)}
                onArtistPress={() => handleArtistPress(track.artist)}
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default FavListScreen;
