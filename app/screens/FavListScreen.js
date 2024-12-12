import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import MusicCard from "../../components/MusicCard";
import PlaylistItem from "../../components/PlayListItem";
import { usePlaylist } from "../../hooks/usePlaylist";

const FavListScreen = () => {
  const { playlist, handlePlay, handleToggleFavorite } =
    usePlaylist(initialPlaylist);

  return (
    <View className="bg-background flex-1 flex-col px-5 pt-8">
      {/* Artist Profile */}

      {/* Playlist */}
      <View className="flex-1 flex-col pb-2">
        <Text className="text-textPrimary mb-2 text-2xl">Songs</Text>
        <ScrollView
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          className="gap-2"
        >
          {playlist.map((item, index) => (
            /* must use View to wrap PlaylistItem, otherwise the parent gap does not work */
            <View key={item.id}>
              <PlaylistItem
                id={item.id}
                songName={item.name}
                artistName={item.artist}
                duration={item.duration}
                isFavorite={item.isFavorite}
                onPlay={handlePlay}
                onToggleFavorite={() => handleToggleFavorite(item.id)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FavListScreen;
