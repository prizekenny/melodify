import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const AlbumCard = ({ imgURL, albumName, artistName, onPlay }) => {
  return (
    <View className="flex-1 w-36 flex-column rounded-lg">
      {/* Image and play button */}
      <View className="w-36 h-36">
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

      {/* Album information */}
      <View className="mt-1">
        <Text
          className="text-base font-bold text-gray-900"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {albumName}
        </Text>
      </View>
    </View>
  );
};

export default AlbumCard;
