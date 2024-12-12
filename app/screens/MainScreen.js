import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import NewAlbum from "../../components/NewAlbum";
import MusicCard from "../../components/MusicCard";
import Logo from "../../components/Logo";
import PlaylistItem from "../../components/PlayListItem";
import { useRouter } from "expo-router";
import { getNewAlbums, getTracks, updateTrack } from "../api/music";
import { useTracks } from "../context/TrackProvider";
import NowPlaying from "../../components/NowPlaying";

const MainScreen = () => {
  const [newAlbums, setNewAlbums] = useState([]);
  const { tracks, setTracks, updateTrack, setPlayingTrack } = useTracks();
  useEffect(() => {
    // fetch new albums
    const fetchNewAlbums = async () => {
      try {
        const albums = await getNewAlbums();
        setNewAlbums(albums);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    const fetchTracks = async () => {
      try {
        const tracks = await getTracks();
        setTracks(tracks);
        console.log("tracks", tracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      }
    };

    fetchNewAlbums();
    fetchTracks();
  }, []);

  const handlePlay = (track) => {
    setPlayingTrack(track);
    router.push("/music");
  };

  const handleArtistPress = (artistName) => {
    router.push({
      pathname: "/artist/[name]",
      params: { name: artistName }
    });
  };

  const handleToggleFavorite = async (id) => {
    const updatedTrack = tracks.find((track) => track.id === id);
    if (updatedTrack) {
      updateTrack(id, { favorite: !updatedTrack.favorite });
    }
  };

  return (
    <View className="bg-background flex-1 flex-col px-5">
      {/* Header */}
      <View className="items-center">
        <Logo imageSize={80} fontSize={30} />
      </View>

      {/* New Album */}
      {newAlbums.length == 0 && <Text>Loading...</Text>}
      {newAlbums.length > 0 && (
        <View className="flex-col mb-5">
          <NewAlbum
            album={newAlbums[0].name}
            artist={newAlbums[0].artist}
            cover={newAlbums[0].cover}
            onArtistPress={() => handleArtistPress(newAlbums[0].artist)}
          />
        </View>
      )}

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
          {tracks.length == 0 && <Text>Loading...</Text>}
          {tracks.map((track, index) => (
            <View key={index}>
              <MusicCard
                cover={track.cover}
                name={track.name}
                artist={track.artist}
                onArtistPress={() => handleArtistPress(track.artist)}
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
          className="gap-2 pb-24"
        >
          {tracks.length == 0 && <Text>Loading...</Text>}
          {tracks.map((track, index) => (
            <View key={index}>
              <PlaylistItem
                id={track.id}
                name={track.name}
                artist={track.artist}
                duration={track.duration}
                favorite={track.favorite}
                onPlay={() => handlePlay(track)}
                onToggleFavorite={() => handleToggleFavorite(track.id)}
                onArtistPress={() => handleArtistPress(track.artist)}
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Now Playing */}
      <View className="pr-24">
        <NowPlaying />
      </View>
    </View>
  );
};

export default MainScreen;
