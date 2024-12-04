import { View, Text } from "react-native";
import React, { useState } from "react";
import NewAlbum from "../../components/NewAlbum";
import MusicCard from "../../components/MusicCard";
import { ScrollView } from "react-native-gesture-handler";
import Logo from "../../components/Logo";
import PlayListItem from "../../components/PlayListItem";

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
  const initialPlaylist = [
    {
      id: 1,
      name: "Happier Than Ever",
      artist: "Billie Eilish",
      duration: "3:30",
      isFavorite: true,
    },
    {
      id: 2,
      name: "Happier Than Ever",
      artist: "Billie Eilish",
      duration: "3:30",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Happier Than Ever",
      artist: "Billie Eilish",
      duration: "3:30",
      isFavorite: false,
    },
  ];

  const [playlist, setPlaylist] = useState(initialPlaylist);

  const handlePlay = () => {};
  const handleToggleFavorite = (id) => {
    const newPlaylist = playlist.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setPlaylist(newPlaylist);
  };

  return (
    <View className="flex-1 flex-col p-10">
      {/* Header */}
      <View className="items-center">
        <Logo imageSize={80} fontSize={30} />
      </View>

      {/* New Album */}
      <View className="flex-col mb-5">
        <Text className="text-black mb-5 text-2xl">New Album</Text>
        <NewAlbum
          albumName={album.name}
          artistName={album.artist}
          artistPhoto={album.photo}
        />
      </View>

      {/* News */}
      <View className="flex-col mb-5">
        <Text className="text-black mb-5 text-2xl">News</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="gap-1"
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

      {/* Playlist */}
      <View className="flex-col">
        <Text className="text-black mb-5 text-2xl">Playlist</Text>
        <ScrollView showsVerticalScrollIndicator={false} className="gap-2">
          {playlist.map((item, index) => (
            <View
              key={index}
              className={index === musics.length - 1 ? "" : "mr-0"}
            >
              <PlayListItem
                key={item.id}
                id={item.id}
                songName={item.name}
                artistName={item.artist}
                duration={item.duration}
                isFavorite={item.isFavorite}
                onPlay={handlePlay}
                onToggleFavorite={() => handleToggleFavorite(item.id)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MainScreen;
