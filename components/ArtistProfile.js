import { View, Text, Image } from "react-native";
import React from "react";

const ArtistProfile = ({
  cover,
  artist,
  albumCount,
  songCount,
  biography,
}) => {
  return (
    <View className="w-full flex-col items-center">
      {/* Artist Image */}
      <Image
        source={{ uri: cover || "https://via.placeholder.com/300" }}
        className="w-full h-48 rounded-3xl"
      />

      {/* Artist Name */}
      <Text className="text-2xl font-bold text-textPrimary mt-4">
        {artist}
      </Text>

      {/* Stats */}
      <Text className="text-gray-600 mt-1">
        {albumCount} Album{albumCount !== 1 ? "s" : ""} , {songCount} Songs
        {songCount !== 1 ? "s" : ""}
      </Text>

      {/* Biography */}
      <Text className="text-gray-500 text-center mt-3 px-4">{biography}</Text>
    </View>
  );
};

export default ArtistProfile;
