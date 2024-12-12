import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import NewAlbum from "../../components/NewAlbum";
import MusicCard from "../../components/MusicCard";
import Logo from "../../components/Logo";
import PlaylistItem from "../../components/PlayListItem";
import { usePlaylist } from "../../hooks/usePlaylist";

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
      artistId: "artist_1",
    },
    {
      image: "https://picsum.photos/200?random=3",
      name: "Shape of You",
      artist: "Ed Sheeran",
      artistId: "artist_2",
    },
    {
      image: "https://picsum.photos/200?random=4",
      name: "Levitating",
      artist: "Dua Lipa",
      artistId: "artist_3",
    },
    {
      image: "https://picsum.photos/200?random=5",
      name: "Bad Guy",
      artist: "Billie Eilish",
      artistId: "artist_5",
    },
    {
      image: "https://picsum.photos/200?random=6",
      name: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      artistId: "artist_6",
    },
    {
      image: "https://picsum.photos/200?random=7",
      name: "Rolling in the Deep",
      artist: "Adele",
      artistId: "artist_4",
    },
    {
      image: "https://picsum.photos/200?random=8",
      name: "Shallow",
      artist: "Lady Gaga & Bradley Cooper",
      artistId: "artist_7",
    },
    {
      image: "https://picsum.photos/200?random=9",
      name: "Someone Like You",
      artist: "Adele",
      artistId: "artist_4",
    },
    {
      image: "https://picsum.photos/200?random=10",
      name: "Havana",
      artist: "Camila Cabello",
      artistId: "artist_8",
    },
    {
      image: "https://picsum.photos/200?random=11",
      name: "Senorita",
      artist: "Shawn Mendes & Camila Cabello",
      artistId: "artist_8",
    },
  ];
  const initialPlaylist = [
    {
      id: 1,
      artistId: "artist_1",
      name: "Blinding Lights",
      artist: "The Weeknd",
      duration: "3:20",
      isFavorite: true,
    },
    {
      id: 2,
      artistId: "artist_2",
      name: "Shape of You",
      artist: "Ed Sheeran",
      duration: "4:24",
      isFavorite: false,
    },
    {
      id: 3,
      artistId: "artist_3",
      name: "Levitating",
      artist: "Dua Lipa",
      duration: "3:23",
      isFavorite: true,
    },
    {
      id: 4,
      artistId: "artist_4",
      name: "Rolling in the Deep",
      artist: "Adele",
      duration: "3:48",
      isFavorite: false,
    },
    {
      id: 5,
      artistId: "artist_5",
      name: "Bad Guy",
      artist: "Billie Eilish",
      duration: "3:15",
      isFavorite: false,
    },
    {
      id: 6,
      artistId: "artist_6",
      name: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      duration: "4:30",
      isFavorite: true,
    },
    {
      id: 7,
      artistId: "artist_7",
      name: "Shallow",
      artist: "Lady Gaga & Bradley Cooper",
      duration: "3:37",
      isFavorite: false,
    },
    {
      id: 8,
      artistId: "artist_4",
      name: "Someone Like You",
      artist: "Adele",
      duration: "4:45",
      isFavorite: true,
    },
    {
      id: 9,
      artistId: "artist_8",
      name: "Havana",
      artist: "Camila Cabello",
      duration: "3:36",
      isFavorite: false,
    },
    {
      id: 10,
      artistId: "artist_8",
      name: "Senorita",
      artist: "Shawn Mendes & Camila Cabello",
      duration: "3:11",
      isFavorite: true,
    },
    {
      id: 11,
      artistId: "artist_9",
      name: "All of Me",
      artist: "John Legend",
      duration: "4:29",
      isFavorite: false,
    },
    {
      id: 12,
      artistId: "artist_2",
      name: "Thinking Out Loud",
      artist: "Ed Sheeran",
      duration: "4:41",
      isFavorite: true,
    },
    {
      id: 13,
      artistId: "artist_10",
      name: "Sorry",
      artist: "Justin Bieber",
      duration: "3:20",
      isFavorite: false,
    },
    {
      id: 14,
      artistId: "artist_10",
      name: "Stay",
      artist: "The Kid LAROI & Justin Bieber",
      duration: "2:21",
      isFavorite: true,
    },
    {
      id: 15,
      artistId: "artist_11",
      name: "Old Town Road",
      artist: "Lil Nas X ft. Billy Ray Cyrus",
      duration: "2:38",
      isFavorite: false,
    },
    {
      id: 16,
      artistId: "artist_12",
      name: "Dance Monkey",
      artist: "Tones and I",
      duration: "3:29",
      isFavorite: true,
    },
    {
      id: 17,
      artistId: "artist_2",
      name: "Perfect",
      artist: "Ed Sheeran",
      duration: "4:23",
      isFavorite: false,
    },
    {
      id: 18,
      artistId: "artist_4",
      name: "Hello",
      artist: "Adele",
      duration: "4:55",
      isFavorite: true,
    },
    {
      id: 19,
      artistId: "artist_13",
      name: "Rockstar",
      artist: "Post Malone ft. 21 Savage",
      duration: "3:38",
      isFavorite: false,
    },
    {
      id: 20,
      artistId: "artist_14",
      name: "Closer",
      artist: "The Chainsmokers ft. Halsey",
      duration: "4:04",
      isFavorite: true,
    },
  ];

  const { playlist, handlePlay, handleToggleFavorite } =
    usePlaylist(initialPlaylist);

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
                artistId={music.artistId}
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
                artistId={item.artistId}
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
