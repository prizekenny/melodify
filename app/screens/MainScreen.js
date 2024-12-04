import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import NewAlbum from "../../components/NewAlbum";
import MusicCard from "../../components/MusicCard";
import Logo from "../../components/Logo";
import PlaylistItem from "../../components/PlayListItem";

const MainScreen = () => {
  const album = {
    name: "Happier Than Ever",
    artist: "Billie Eilish",
    photo: "https://picsum.photos/200?random=1",
  };
  const musics = [
    {
      image: "https://picsum.photos/200?random=2",
      name: "Blinding Lights",
      artist: "The Weeknd",
    },
    {
      image: "https://picsum.photos/200?random=3",
      name: "Shape of You",
      artist: "Ed Sheeran",
    },
    {
      image: "https://picsum.photos/200?random=4",
      name: "Levitating",
      artist: "Dua Lipa",
    },
    {
      image: "https://picsum.photos/200?random=5",
      name: "Bad Guy",
      artist: "Billie Eilish",
    },
    {
      image: "https://picsum.photos/200?random=6",
      name: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
    },
    {
      image: "https://picsum.photos/200?random=7",
      name: "Rolling in the Deep",
      artist: "Adele",
    },
    {
      image: "https://picsum.photos/200?random=8",
      name: "Shallow",
      artist: "Lady Gaga & Bradley Cooper",
    },
    {
      image: "https://picsum.photos/200?random=9",
      name: "Someone Like You",
      artist: "Adele",
    },
    {
      image: "https://picsum.photos/200?random=10",
      name: "Havana",
      artist: "Camila Cabello",
    },
    {
      image: "https://picsum.photos/200?random=11",
      name: "Senorita",
      artist: "Shawn Mendes & Camila Cabello",
    },
  ];
  const initialPlaylist = [
    {
      id: 1,
      name: "Blinding Lights",
      artist: "The Weeknd",
      duration: "3:20",
      isFavorite: true,
    },
    {
      id: 2,
      name: "Shape of You",
      artist: "Ed Sheeran",
      duration: "4:24",
      isFavorite: false,
    },
    {
      id: 3,
      name: "Levitating",
      artist: "Dua Lipa",
      duration: "3:23",
      isFavorite: true,
    },
    {
      id: 4,
      name: "Rolling in the Deep",
      artist: "Adele",
      duration: "3:48",
      isFavorite: false,
    },
    {
      id: 5,
      name: "Bad Guy",
      artist: "Billie Eilish",
      duration: "3:15",
      isFavorite: false,
    },
    {
      id: 6,
      name: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      duration: "4:30",
      isFavorite: true,
    },
    {
      id: 7,
      name: "Shallow",
      artist: "Lady Gaga & Bradley Cooper",
      duration: "3:37",
      isFavorite: false,
    },
    {
      id: 8,
      name: "Someone Like You",
      artist: "Adele",
      duration: "4:45",
      isFavorite: true,
    },
    {
      id: 9,
      name: "Havana",
      artist: "Camila Cabello",
      duration: "3:36",
      isFavorite: false,
    },
    {
      id: 10,
      name: "Senorita",
      artist: "Shawn Mendes & Camila Cabello",
      duration: "3:11",
      isFavorite: true,
    },
    {
      id: 11,
      name: "All of Me",
      artist: "John Legend",
      duration: "4:29",
      isFavorite: false,
    },
    {
      id: 12,
      name: "Thinking Out Loud",
      artist: "Ed Sheeran",
      duration: "4:41",
      isFavorite: true,
    },
    {
      id: 13,
      name: "Sorry",
      artist: "Justin Bieber",
      duration: "3:20",
      isFavorite: false,
    },
    {
      id: 14,
      name: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      duration: "2:21",
      isFavorite: true,
    },
    {
      id: 15,
      name: "Old Town Road",
      artist: "Lil Nas X ft. Billy Ray Cyrus",
      duration: "2:38",
      isFavorite: false,
    },
    {
      id: 16,
      name: "Dance Monkey",
      artist: "Tones and I",
      duration: "3:29",
      isFavorite: true,
    },
    {
      id: 17,
      name: "Perfect",
      artist: "Ed Sheeran",
      duration: "4:23",
      isFavorite: false,
    },
    {
      id: 18,
      name: "Hello",
      artist: "Adele",
      duration: "4:55",
      isFavorite: true,
    },
    {
      id: 19,
      name: "Rockstar",
      artist: "Post Malone ft. 21 Savage",
      duration: "3:38",
      isFavorite: false,
    },
    {
      id: 20,
      name: "Closer",
      artist: "The Chainsmokers ft. Halsey",
      duration: "4:04",
      isFavorite: true,
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
    <View className="bg-background flex-1 flex-col px-5 pt-8">
      {/* Header */}
      <View className="items-center">
        <Logo imageSize={80} fontSize={30} />
      </View>

      {/* New Album */}
      <View className="flex-col mb-5">
        {/* <Text className="text-black mb-5 text-2xl">New Album</Text> */}
        <NewAlbum
          albumName={album.name}
          artistName={album.artist}
          artistPhoto={album.photo}
        />
      </View>

      {/* News */}
      <View className="flex-col mb-5 h-60">
        <Text className="text-textPrimary mb-2 text-2xl">News</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          className="gap-2"
        >
          {musics.map((music, index) => (
            /* must use View to wrap PlaylistItem, otherwise the parent gap does not work */
            <View key={index}>
              <MusicCard
                imgURL={music.image}
                songName={music.name}
                artistName={music.artist}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Playlist */}
      <View className="flex-1 flex-col pb-2">
        <Text className="text-textPrimary mb-2 text-2xl">Playlist</Text>
        <ScrollView
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          className="gap-2"
        >
          {playlist.map((item, index) => (
            /* must use View to wrap PlaylistItem, otherwise the parent gap does not work */
            <View key={item.id}>
              <PlaylistItem
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
