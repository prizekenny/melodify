import { View, Text } from "react-native";
import React from "react";
import NewAlbum from "../../components/NewAlbum";
import MusicCard from "../../components/MusicCard";
import { ScrollView } from "react-native-gesture-handler";

const MainScreen = () => {
  const album = {
    name: "Happier Than Ever",
    artist: "Billie Eilish",
    photo: "https://picsum.photos/200?random=1",
  };

  const musics = [
    {
      image: "https://picsum.photos/200?random=2",
      name: "Happier Than Ever",
      artist: "Billie Eilish",
    },
    {
      image: "https://picsum.photos/200?random=3",
      name: "Happier Than Ever",
      artist: "Billie Eilish",
    },
    {
      image: "https://picsum.photos/200?random=4",
      name: "Happier Than Ever",
      artist: "Billie Eilish",
    },
  ];

  return (
    <View className="flex-1 flex-col justify-center items-center bg-blue-500">
      {/* New Album */}
      <View className="flex-1">
        <Text className="text-white text-2xl font-bold">MainScreen</Text>
        <NewAlbum
          albumName={album.name}
          artistName={album.artist}
          photo={album.photo}
        />
      </View>

      {/* News */}
      <View className="flex-col">
        <Text className="text-white mb-5 text-2xl">News</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="gap-5"
        >
          {musics.map((music, index) => (
            <View
              key={index}
              className={index === musics.length - 1 ? "" : "mr-2"}
            >
              <MusicCard
                key={index}
                imgURL={music.image}
                songName={music.name}
                artistName={music.artist}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Play list */}
      <View className="flex-row">
        <View>
          <Text className="text-white">Play List</Text>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;
