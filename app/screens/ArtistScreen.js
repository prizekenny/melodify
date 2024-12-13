import { View, Text, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import ArtistProfile from "../../components/ArtistProfile";
import AlbumCard from "../../components/AlbumCard";
import PlaylistItem from "../../components/PlayListItem";
import { getNewAlbums, getTracks, updateTrack } from "../api/music";
import { useTracks } from "../context/TrackProvider";
import NowPlaying from "../../components/NowPlaying";

const ArtistScreen = ({ artist }) => {
  const { tracks, setTracks, updateTrack, setPlayingTrack } = useTracks();
  const [artistInfo, setArtistInfo] = useState({
    cover: "https://example.com/default.jpg",
    artist: artist || "Loading...",
    albumCount: 0,
    songCount: 0,
    biography: "Loading...",
  });
  const [newAlbums, setNewAlbums] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const albums = await getNewAlbums();
        const artistAlbums = albums.filter(album => album.artist === artist);
        setNewAlbums(artistAlbums);

        const tracksData = await getTracks();
        setTracks(tracksData);

        const artistTracks = tracksData.filter(track => track.artist === artist);
        if (artistTracks.length > 0) {
          setArtistInfo({
            cover: artistTracks[0].cover,
            artist: artist,
            albumCount: new Set(artistTracks.map(track => track.album)).size,
            songCount: artistTracks.length,
            biography: "Artist biography will be updated soon...",
          });
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    if (artist) {
      fetchArtistData();
    }
  }, [artist]);

  const handlePlay = (track) => {
    setPlayingTrack(track);
    router.push("/music");
  };

  const handleToggleFavorite = async (id) => {
    const updatedTrack = tracks.find((track) => track.id === id);
    if (updatedTrack) {
      updateTrack(id, { favorite: !updatedTrack.favorite });
    }
  };

  const artistTracks = tracks.filter(track => track.artist === artist);

  return (
    <View className="bg-background flex-1 flex-col px-5 pt-8">
      {/* Artist Profile */}
      <ArtistProfile {...artistInfo} />

      {/* Albums */}
      <View className="mt-6">
        <Text className="text-textPrimary text-xl mb-4">Albums</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          className="gap-4"
        >
          {newAlbums.length === 0 ? (
            <Text className="text-gray-500">Loading...</Text>
          ) : (
            newAlbums.map((album) => (
              <AlbumCard
                key={album.id}
                imgURL={album.cover}
                albumName={album.name}
                artistName={album.artist}
                onPlay={() => handlePlay(artistTracks.find(t => t.album === album.name))}
              />
            ))
          )}
        </ScrollView>
      </View>

      {/* Popular Songs */}
      <View className="mt-6 flex-1">
        <Text className="text-textPrimary text-xl mb-4">Popular Songs</Text>
        <ScrollView 
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled={true}
          className="gap-2 pb-24"
        >
          {artistTracks.length === 0 ? (
            <Text className="text-gray-500">Loading...</Text>
          ) : (
            artistTracks.map((track) => (
              <View key={track.id}>
                <PlaylistItem
                  id={track.id}
                  name={track.name}
                  artist={track.artist}
                  duration={track.duration}
                  favorite={track.favorite}
                  onPlay={() => handlePlay(track)}
                  onToggleFavorite={() => handleToggleFavorite(track.id)}
                />
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/* Now Playing */}
      <View>
        <NowPlaying />
      </View>
    </View>
  );
};

export default ArtistScreen;