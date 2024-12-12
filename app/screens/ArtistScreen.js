// app/screens/ArtistScreen.js
import { View, Text, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import ArtistProfile from "../../components/ArtistProfile";
import AlbumCard from "../../components/AlbumCard";
import PlaylistItem from "../../components/PlayListItem";
import { getNewAlbums, getTracks } from "../api/music";
import { useTracks } from "../context/TrackProvider";
import NowPlaying from "../../components/NowPlaying";

const ArtistScreen = ({ artist }) => {
  const router = useRouter();
  const { setPlayingTrack, updateTrack } = useTracks();
  const [artistInfo, setArtistInfo] = useState({
    cover: "https://example.com/default.jpg",
    artist: artist || "Loading...",
    albumCount: 0,
    songCount: 0,
    biography: "Loading...",
  });
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        // Fetch album data
        const albumsData = await getNewAlbums();
        const artistAlbums = albumsData.filter(album => album.artist === artist);
        setAlbums(artistAlbums);

        // Fetch track data
        const tracksData = await getTracks();
        const artistTracks = tracksData.filter(track => track.artist === artist);
        setTracks(artistTracks);

        // Update artist info
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

  const handleToggleFavorite = async (trackId) => {
    const track = tracks.find(t => t.id === trackId);
    if (track) {
      updateTrack(trackId, { favorite: !track.favorite });
      setTracks(tracks.map(t => 
        t.id === trackId ? { ...t, favorite: !t.favorite } : t
      ));
    }
  };

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
          className="gap-4"
        >
          {albums.length === 0 ? (
            <Text className="text-gray-500">No albums available</Text>
          ) : (
            albums.map((album) => (
              <AlbumCard
                key={album.id}
                imgURL={album.cover}
                albumName={album.name}
                artistName={album.artist}
                onPlay={() => handlePlay(tracks.find(t => t.album === album.name))}
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
          className="gap-2 mb-24"
        >
          {tracks.length === 0 ? (
            <Text className="text-gray-500">No songs available</Text>
          ) : (
            tracks.map((track) => (
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
      <NowPlaying />
    </View>
  );
};

export default ArtistScreen;
