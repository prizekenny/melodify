import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { useTracks } from "../context/TrackProvider";

const MusicScreen = () => {
  const { playingTrack } = useTracks();

  if (!playingTrack) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <Text className="text-textPrimary text-lg">Track not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background p-4">
      {/* Album Cover and Song Info */}
      <View className="items-center">
        <Image
          source={
            playingTrack.cover
              ? { uri: playingTrack.cover }
              : require("../../assets/images/default-cover.png")
          }
          className="w-40 h-40 mb-4 rounded"
        />
        <Text className="text-textPrimary text-xl font-bold">
          {playingTrack.title}
        </Text>
        <Text className="text-textSecondary">{playingTrack.artist}</Text>
      </View>

      {/* Music Controls */}
      <View className="flex-row justify-between mt-8">
        <TouchableOpacity className="bg-primary p-2 rounded w-24 items-center">
          <Text className="text-white">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-primary p-2 rounded w-24 items-center">
          <Text className="text-white">Play</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-primary p-2 rounded w-24 items-center">
          <Text className="text-white">Next</Text>
        </TouchableOpacity>
      </View>

      {/* View Lyrics Button */}
      <TouchableOpacity className="mt-8 bg-secondary p-4 rounded">
        <Text className="text-white text-center">View Lyrics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MusicScreen;
