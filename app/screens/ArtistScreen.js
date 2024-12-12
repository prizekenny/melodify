// app/screens/ArtistScreen.js
import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import ArtistProfile from "../../components/ArtistProfile";
import AlbumCard from "../../components/AlbumCard";
import PlaylistItem from "../../components/PlayListItem";
import { usePlaylist } from "../../hooks/usePlaylist";
import { getNewAlbums, getTracks } from "../api/music";

const ArtistScreen = ({ artist }) => {
  const navigation = useNavigation();
  const [artistInfo, setArtistInfo] = useState({
    cover: "https://example.com/default.jpg",
    artist: artist || "Loading...",
    albumCount: 0,
    songCount: 0,
    biography: "Loading...",
  });
  const [newAlbums, setNewAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        // 获取艺术家的专辑
        const albumsData = await getNewAlbums();
        // 过滤出属于当前艺术家的专辑
        const artistAlbums = albumsData.filter(album => album.artist === artist);
        setNewAlbums(artistAlbums);

        // 获取艺术家的歌曲
        const tracksData = await getTracks();
        // 过滤出属于当前艺术家的歌曲
        const artistTracks = tracksData.filter(track => track.artist === artist);
        setTracks(artistTracks);

        // 更新艺术家信息
        if (artistTracks.length > 0) {
          setArtistInfo(prev => ({
            ...prev,
            cover: artistTracks[0].cover,
            artist: artist,
            albumCount: new Set(artistTracks.map(track => track.album)).size,
            songCount: artistTracks.length,
            biography: "Biography will be added later...", // 这个信息在当前API中没有
          }));
        }
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    fetchArtistData();
  }, [artist]);

  const { handlePlay, handleToggleFavorite } = usePlaylist(tracks);

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
        {newAlbums.map((album) => (
          <AlbumCard
            key={album.id}
            imgURL={album.cover}
            albumName={album.name}
            artistName={album.artist}
            onPlay={() => handlePlayAlbum(album.id)}
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
              songName={track.name}
              artistName={track.artist}
              duration={track.duration}
              isFavorite={track.favorite}
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
