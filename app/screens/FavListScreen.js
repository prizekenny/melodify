import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import PlaylistItem from "../../components/PlayListItem";
import { useRouter } from "expo-router";
import { getTracks } from "../api/music";
import { useTracks } from "../context/TrackProvider";
import NowPlaying from "../../components/NowPlaying";

const FavListScreen = () => {
  const [tracks, setTracks] = useState([]);
  const [isRandom, setIsRandom] = useState(false);
  const router = useRouter();
  const { setPlayingTrack, updateTrack } = useTracks();

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

  // Handle play
  const handlePlay = (track) => {
    if (track) {
      setPlayingTrack(track);
      router.push("/music");
    }
  };

  // Toggle favorite status
  const handleToggleFavorite = async (trackId) => {
    try {
      const updatedTracks = tracks.map(track => 
        track.id === trackId ? { ...track, favorite: !track.favorite } : track
      );
      // Update local state
      setTracks(updatedTracks.filter(track => track.favorite));
      // Update global state
      updateTrack(trackId, { favorite: !tracks.find(t => t.id === trackId).favorite });
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  // Play all tracks
  const handlePlayAll = () => {
    if (tracks.length > 0) {
      const trackToPlay = isRandom 
        ? tracks[Math.floor(Math.random() * tracks.length)]
        : tracks[0];
      handlePlay(trackToPlay);
    }
  };

  // Toggle random state
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
        className="flex-1 mb-24"
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
                onPlay={() => handlePlay(track)}
                onToggleFavorite={() => handleToggleFavorite(track.id)}
                onArtistPress={() => router.push({
                  pathname: "/artist/[name]",
                  params: { name: track.artist }
                })}
              />
            </View>
          ))
        )}
      </ScrollView>

      {/* Now Playing */}
      <NowPlaying />
    </View>
  );
};

export default FavListScreen;
