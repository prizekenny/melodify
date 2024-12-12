import { View, Text, Image } from "react-native";
import React from "react";

const MusicCard = ({ cover, name, artist, onPlay }) => {
  return (
    <View className="flex-1 w-36 flex-column rounded-lg">
      {/* Image and play button */}
      <View className="w-36 h-36">
        <Image
          source={{ uri: cover || "https://via.placeholder.com/150" }}
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
      <View className="mt-1">
        <Text
          className="text-base font-bold text-gray-900"
          numberOfLines={1} // Limit to single line
          ellipsizeMode="tail" // Display as ... when exceeding
        >
          {name}
        </Text>
        <Text
          className="text-sm text-gray-600"
          numberOfLines={1} // Limit to single line
          ellipsizeMode="tail" // Display as ... when exceeding
        >
          {artist}
        </Text>
      </View>
    </View>
  );
};

export default MusicCard;
