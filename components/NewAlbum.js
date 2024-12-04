import React from "react";
import { View, Text, Image } from "react-native";

const NewAlbum = ({ albumName, artistName, artistPhoto }) => {
  return (
    <View className="flex-row items-center bg-orange-400 rounded-lg shadow-md p-4 m-2">
      {/* Album information on left part */}
      <View className="flex-1">
        <Text className="text-xs uppercase text-gray-500">New Album</Text>
        <Text className="text-lg font-bold text-gray-900" numberOfLines={1}>
          {albumName}
        </Text>
        <Text className="text-sm text-gray-600" numberOfLines={1}>
          {artistName}
        </Text>
      </View>

      {/* Artist photo on the right part */}
      <View className="relative w-40 h-40 pl-10">
        <Image
          source={{ uri: artistPhoto || "https://via.placeholder.com/150" }}
          className="w-full h-full rounded-3xl"
        />
      </View>
    </View>
  );
};

export default NewAlbum;
