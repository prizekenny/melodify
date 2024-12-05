import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  const playlists = [
    {
      id: "1",
      title: "Dont Smile At Me",
      artist: "Billie Eilish",
      duration: "5:33",
      cover: "https://example.com/cover1.jpg",
    },
    {
      id: "2",
      title: "As It Was",
      artist: "Harry Styles",
      duration: "5:33",
      cover: "https://example.com/cover2.jpg",
    },
    {
      id: "3",
      title: "Super Freaky Girl",
      artist: "Nicki Minaj",
      duration: "5:33",
      cover: "https://example.com/cover3.jpg",
    },
  ];

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity>
          <Text>{"<"}</Text>
        </TouchableOpacity>
        <Text className="text-textPrimary text-lg font-bold">Profile</Text>
        <TouchableOpacity>
          <Text>⋮</Text>
        </TouchableOpacity>
      </View>

      <View className="items-center p-4">
        <Image
          source={{
            uri: "https://example.com/profile-avatar.jpg",
          }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-textSecondary">soroushnorozynui@gmail.com</Text>
        <Text className="text-textPrimary text-xl font-bold">Sorouhsnrz</Text>
        <View className="flex-row justify-between w-3/4 mt-4">
          <View className="items-center">
            <Text className="text-textPrimary font-bold">778</Text>
            <Text className="text-textSecondary">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-textPrimary font-bold">243</Text>
            <Text className="text-textSecondary">Following</Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-textPrimary text-lg font-bold mb-4">
          Public Playlists
        </Text>
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center mb-4">
              <Image
                source={{ uri: item.cover }}
                className="w-16 h-16 rounded"
              />
              <View className="flex-1 mx-4">
                <Text className="text-textPrimary font-bold">{item.title}</Text>
                <Text className="text-textSecondary">{item.artist}</Text>
              </View>
              <Text className="text-textSecondary">{item.duration}</Text>
              <TouchableOpacity>
                <Text>⋮</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
