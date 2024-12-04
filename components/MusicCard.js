import { View, Text, Image } from "react-native";
import React from "react";

const MusicCard = ({ imgURL, songName, artistName, onPlay }) => {
  return (
    <View className="flex-column bg-slate-300 rounded-lg">
      {/* Image and play button */}
      <View className="relative w-48 h-48">
        <Image
          source={{ uri: imgURL || "https://via.placeholder.com/150" }}
          className="w-full h-full rounded-3xl"
        />
        {/* Play button，only display when handlePlay function is not null */}
        {onPlay && (
          <TouchableOpacity
            className="absolute bottom-1 right-1 bg-black w-6 h-6 rounded-full flex items-center justify-center"
            onPress={onPlay}
          >
            <Ionicons name="play" size={14} color="white" />
          </TouchableOpacity>
        )}
      </View>

      {/* Song information */}
      <View className="flex-1 ml-4 mt-1">
        <Text
          className="text-base font-bold text-textPrimary"
          numberOfLines={1}
        >
          {songName}
        </Text>
        <Text className="text-sm text-textSecondary" numberOfLines={1}>
          {artistName}
        </Text>
      </View>
    </View>
  );
};

export default MusicCard;
