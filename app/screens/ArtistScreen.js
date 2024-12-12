// app/screens/ArtistScreen.js
import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ArtistProfile from "../../components/ArtistProfile";
import AlbumCard from "../../components/AlbumCard";
import PlaylistItem from "../../components/PlayListItem";
import { usePlaylist } from "../../hooks/usePlaylist";

const ArtistScreen = ({ route }) => {
  const { artistId } = route.params;
  const navigation = useNavigation();

  const artistsInfo = {
    artist_1: {
      imageUrl: "https://example.com/weeknd.jpg",
      artistId: "artist_1",
      artistName: "The Weeknd",
      albumCount: 4,
      songCount: 52,
      biography: "Abel Makkonen Tesfaye, known professionally as The Weeknd...",
    },
    artist_2: {
      imageUrl: "https://example.com/edsheeran.jpg",
      artistId: "artist_2",
      artistName: "Ed Sheeran",
      albumCount: 5,
      songCount: 89,
      biography:
        "Edward Christopher Sheeran MBE is an English singer-songwriter...",
    },
    artist_3: {
      imageUrl: "https://example.com/dualipa.jpg",
      artistId: "artist_3",
      artistName: "Dua Lipa",
      albumCount: 2,
      songCount: 28,
      biography: "Dua Lipa is an English singer and songwriter...",
    },
    artist_4: {
      imageUrl: "https://example.com/adele.jpg",
      artistId: "artist_4",
      artistName: "Adele",
      albumCount: 4,
      songCount: 48,
      biography:
        "Adele Laurie Blue Adkins MBE is an English singer and songwriter...",
    },
    artist_5: {
      imageUrl: "https://example.com/billieeilish.jpg",
      artistId: "artist_5",
      artistName: "Billie Eilish",
      albumCount: 2,
      songCount: 32,
      biography:
        "Billie Eilish Pirate Baird O'Connell is an American singer-songwriter...",
    },
  };

  const artistInfo = artistsInfo[artistId] || {
    imageUrl: "https://example.com/default.jpg",
    artistId: artistId,
    artistName: "Unknown Artist",
    albumCount: 0,
    songCount: 0,
    biography: "No biography available",
  };

  const albums = [];

  const { initialPlaylist } = require("./MainScreen");

  const artistSongs = initialPlaylist.filter(
    (song) => song.artistId === artistId
  );

  const { handlePlay, handleToggleFavorite } = usePlaylist(artistSongs);

  const handlePlayAlbum = (albumId) => {
    // TODO: 实现专辑播放逻辑
    handlePlay(albumId);
  };

  return (
    <View className="bg-background flex-1 flex-col px-5 pt-8">
      {/* Artist Profile */}
      <ArtistProfile {...artistInfo} />

      {/* Albums */}
      <Text className="text-textPrimary text-xl mt-6 mb-4">Albums</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="gap-4"
      >
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            imgURL={album.coverUrl}
            albumName={album.name}
            artistId={artistInfo.artistId}
            artistName={artistInfo.artistName}
            onPlay={() => handlePlayAlbum(album.id)}
          />
        ))}
      </ScrollView>

      {/* Songs */}
      <Text className="text-textPrimary text-xl mt-6 mb-4">Songs</Text>
      <ScrollView showsVerticalScrollIndicator={true} className="gap-2">
        {artistSongs.map((song) => (
          <View key={song.id}>
            <PlaylistItem
              id={song.id}
              songName={song.name}
              artistId={song.artistId}
              artistName={song.artist}
              duration={song.duration}
              isFavorite={song.isFavorite}
              onPlay={() => handlePlay(song.id)}
              onToggleFavorite={() => handleToggleFavorite(song.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ArtistScreen;
