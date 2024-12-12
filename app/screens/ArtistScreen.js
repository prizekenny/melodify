// app/screens/ArtistScreen.js
import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import ArtistProfile from "../../components/ArtistProfile";
import AlbumCard from "../../components/AlbumCard";
import PlaylistItem from "../../components/PlayListItem";
import { usePlaylist } from "../../hooks/usePlaylist";
import { getNewAlbums, getTracks } from "../api/music";

const ArtistScreen = ({ artist }) => {
  const router = useRouter();
  const [artistInfo, setArtistInfo] = useState({
    cover: "https://example.com/default.jpg",
    artist: artist || "Loading...",
    albumCount: 0,
    songCount: 0,
    biography: "Loading...",
  });
  const [newAlbums, setNewAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const { handleToggleFavorite } = usePlaylist(tracks);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const albumsData = await getNewAlbums();
        const artistAlbums = albumsData.filter(album => album.artist === artist);
        setNewAlbums(artistAlbums);

        const tracksData = await getTracks();
        const artistTracks = tracksData.filter(track => track.artist === artist);
        setTracks(artistTracks);

        if (artistTracks.length > 0) {
          setArtistInfo(prev => ({
            ...prev,
            cover: artistTracks[0].cover,
            artist: artist,
            albumCount: new Set(artistTracks.map(track => track.album)).size,
            songCount: artistTracks.length,
            biography: "Biography will be added later...",
          }));
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    fetchArtistData();
  }, [artist]);

  const handlePlay = (trackId) => {
    const track = tracks.find(track => track.id === trackId);
    if (track) {
      router.push({
        pathname: "/screens/MusicScreen",
        params: track
      });
    }
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
        {newAlbums.map((album) => (
          <AlbumCard
            key={album.id}
            imgURL={album.cover}
            albumName={album.name}
            artistName={album.artist}
            onPlay={() => handlePlay(album.id)}
          />
        ))}
      </ScrollView>

      {/* Songs */}
      <Text className="text-textPrimary text-xl mt-6 mb-4">Songs</Text>
      <ScrollView showsVerticalScrollIndicator={true} className="gap-2">
        {tracks.map((track) => (
          <View key={track.id}>
            <PlaylistItem
              id={track.id}
              name={track.name}
              artist={track.artist}
              duration={track.duration}
              favorite={track.favorite}
              onPlay={() => handlePlay(track.id)}
              onToggleFavorite={() => handleToggleFavorite(track.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ArtistScreen;
