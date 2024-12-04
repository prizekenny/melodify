import { View, Text, Image } from "react-native";
import React from "react";

const MusicCard = ({ imgURL, songName, artistName, onPlay }) => {
  return (
    <View className="flex-column bg-white rounded-lg shadow-md">
      {/* Image and play button */}
      <View className="relative w-60 h-60">
        <Image
          source={{ uri: imgURL || "https://via.placeholder.com/150" }}
          className="w-full h-full rounded-3xl"
        />
        {/* Play button，only display when handlePlay function is not null */}
        {onPlay && (
          <TouchableOpacity
            className="absolute bottom-1 right-1 bg-black/60 w-6 h-6 rounded-full flex items-center justify-center"
            onPress={onPlay}
          >
            <Ionicons name="play" size={14} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Song information */}
      <View className="flex-1 ml-4 mt-2">
        <Text
          className="text-base font-bold mb-2 text-gray-900"
          numberOfLines={1}
        >
          {songName}
        </Text>
        <Text className="text-sm text-gray-600" numberOfLines={1}>
          {artistName}
        </Text>
      </View>
    </View>
  );
};

export default MusicCard;
