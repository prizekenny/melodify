import React from "react";
import { View, Text, Image } from "react-native";

const NewAlbum = ({ albumName, artistName, artistPhoto }) => {
  return (
    <View className="flex-row items-center bg-orange-400 rounded-3xl shadow-md p-4 m-2">
      {/* Album information on left part */}
      <View className="flex-1 gap-2">
        <Text className="text-xs text-white">New Album</Text>
        <Text className="text-lg font-bold text-white" numberOfLines={2}>
          {albumName}
        </Text>
        <Text className="text-sm text-white" numberOfLines={1}>
          {artistName}
        </Text>
      </View>

      {/* Artist photo on the right part */}
      <View className="relative w-40 h-40 pl-10">
        <Image
          source={{ uri: artistPhoto || "https://via.placeholder.com/40" }}
          className="w-full h-full rounded-3xl"
        />
      </View>
    </View>
  );
};

export default NewAlbum;
