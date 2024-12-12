import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const MusicScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  return (
    <View className="flex-1 bg-background p-4">
      <View className="items-center">
        <Image
          source={{ uri: params.cover || "https://example.com/album-cover.jpg" }}
          className="w-40 h-40 mb-4"
        />
        <Text className="text-textPrimary text-xl font-bold">{params.name}</Text>
        <Text className="text-textSecondary">{params.artist}</Text>
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
    </View>
  );
};

export default MusicScreen;
