import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const ProfileScreen = ({ navigation }) => {
  const playlists = [
    {
      id: "1",
      title: "Dont Smile At Me",
      artist: "Billie Eilish",
      duration: "5:33",
      cover: require("../../assets/images/profile_image1.png"),
    },
    {
      id: "2",
      title: "As It Was",
      artist: "Harry Styles",
      duration: "5:33",
      cover: require("../../assets/images/profile_image2.png"),
    },
    {
      id: "3",
      title: "Super Freaky Girl",
      artist: "Nicki Minaj",
      duration: "5:33",
      cover: require("../../assets/images/profile_image3.png"),
    },
    {
      id: "4",
      title: "Bad Habit",
      artist: "Steve Lacy",
      duration: "5:33",
      cover: require("../../assets/images/profile_image4.png"),
    },
    {
      id: "5",
      title: "Planet Her",
      artist: "Doja Cat",
      duration: "5:33",
      cover: require("../../assets/images/profile_image5.png"),
    },
    {
      id: "6",
      title: "Sweetest Pie",
      artist: "Megan Thee Stallion",
      duration: "5:33",
      cover: require("../../assets/images/profile_image6.png"),
    },
  ];

  const handlePlay = (item) => {
    navigation.navigate("MusicScreen", { song: item });
  };

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Top Section */}
      <View className="bg-white rounded-b-3xl shadow-md p-6 items-center">
        <Image
          source={require("../../assets/images/profile_image1.png")}
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
              <Image source={item.cover} className="w-16 h-16 rounded" />
              <View className="flex-1 mx-4">
                <Text className="text-textPrimary font-bold">{item.title}</Text>
                <Text className="text-textSecondary">{item.artist}</Text>
              </View>
              <Text className="text-textSecondary">{item.duration}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
