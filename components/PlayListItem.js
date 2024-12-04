import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PlaylistItem = ({
  id,
  songName,
  artistName,
  duration,
  isFavorite,
  onPlay,
  onToggleFavorite,
}) => {
  return (
    <View className="flex-row items-center justify-between bg-white rounded-lg p-3 m-2 shadow-md">
      {/* Play button */}
      <TouchableOpacity onPress={onPlay} className="p-2">
        <Ionicons name="play" size={24} color="#4CAF50" />
      </TouchableOpacity>

      {/* Song information */}
      <View className="flex-1 ml-3">
        <Text className="text-base font-bold text-gray-900" numberOfLines={1}>
          {songName}
        </Text>
        <Text className="text-sm text-gray-600" numberOfLines={1}>
          {artistName}
        </Text>
      </View>

      {/* Song time and fav button */}
      <View className="flex-row items-center">
        <Text className="text-sm text-gray-600 mr-3">{duration}</Text>
        <TouchableOpacity
          onPress={() => {
            onToggleFavorite(id);
          }}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={20}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaylistItem;
