import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

const MusicScreen = ({ navigation }) => {
  return (
    <View className="flex-1 bg-background p-4">
      <View className="items-center">
        <Image
          source={{ uri: "https://example.com/album-cover.jpg" }}
          className="w-40 h-40 mb-4"
        />
        <Text className="text-textPrimary text-xl font-bold">Song Name</Text>
        <Text className="text-textSecondary">Artist Name</Text>
      </View>
      <View className="flex-row justify-between mt-8">
        <TouchableOpacity className="bg-primary p-2 rounded">
          <Text className="text-white">Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-primary p-2 rounded">
          <Text className="text-white">Play</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-primary p-2 rounded">
          <Text className="text-white">Next</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("LyricsScreen")}
        className="mt-8 bg-secondary p-4 rounded"
      >
        <Text className="text-white text-center">View Lyrics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MusicScreen;
