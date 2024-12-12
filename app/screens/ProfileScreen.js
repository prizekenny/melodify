import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          "https://674fe249bb559617b2705ea9.mockapi.io/tracks"
        );
        setPlaylists(response.data.slice(0, 10)); // Show only the first 10 tracks
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  const handlePlay = (item) => {
    navigation.navigate("MusicScreen", { song: item });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background">
        <ActivityIndicator size="large" color="#FF914D" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Top Section */}
      <View className="bg-white rounded-b-3xl shadow-md p-6 items-center">
        <Image
          source={{ uri: "https://picsum.photos/200?random=1001" }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-textSecondary">soroushnorozynui@gmail.com</Text>
        <Text className="text-textPrimary text-xl font-bold">Soroushnrz</Text>
        <View className="flex-row justify-around w-full mt-4">
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

      {/* Public Playlists Section */}
      <View className="p-4">
        <Text className="text-textPrimary text-lg font-bold mb-4">
          Public Playlists
        </Text>
        <FlatList
          data={playlists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handlePlay(item)}
              className="flex-row items-center mb-4"
            >
              <Image
                source={{ uri: item.cover }}
                className="w-16 h-16 rounded"
              />
              <View className="flex-1 mx-4">
                <Text className="text-textPrimary font-bold">{item.name}</Text>
                <Text className="text-textSecondary">{item.artist}</Text>
              </View>
              <Text className="text-textSecondary">
                {(item.duration / 1000 / 60).toFixed(2)} mins
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
