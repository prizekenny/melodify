import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getTracks } from '../api/music';
import { useRouter } from "expo-router";
import PlaylistItem from "../../components/PlayListItem";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [displaySongs, setDisplaySongs] = useState([]);
  const router = useRouter();
  
  const categories = [
    { id: "1", name: "The Best of 2024", image: "https://picsum.photos/200" },
    { id: "2", name: "Holiday", image: "https://picsum.photos/id/15/200" },
    { id: "3", name: "Hip-Hop/Rap", image: "https://picsum.photos/id/20/200" },
    { id: "4", name: "Chill", image: "https://picsum.photos/id/38/200" },
    { id: "5", name: "Relaxing", image: "https://picsum.photos/id/42/200" },
    { id: "6", name: "Top Hits", image: "https://picsum.photos/id/57/200" },
  ];

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getTracks();
      setSongs(data);
    };
    fetchSongs();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setDisplaySongs([]);
      return;
    }
    const filtered = songs.filter(song =>
      song.name.toLowerCase().includes(text.toLowerCase()) ||
      song.artist.toLowerCase().includes(text.toLowerCase())
    );
    setDisplaySongs(filtered.length > 0 ? filtered : "noresults");
  };

  const handleCategoryPress = () => {
    const randomSongs = songs.sort(() => 0.5 - Math.random()).slice(0, 5);
    setDisplaySongs(randomSongs);
  };

  const handleCancel = () => {
    setSearchQuery(""); 
    setDisplaySongs([]);
  };

  const handlePlay = (trackId) => {
    const track = songs.find(song => song.id === trackId);
    if (track) {
      setPlayingTrack(track);
      router.push("/music");
    }
  };

  const handleToggleFavorite = async (trackId) => {
    const newSongs = songs.map(song =>
      song.id === trackId ? { ...song, favorite: !song.favorite } : song
    );
    setSongs(newSongs);
    
    const displayedSongs = displaySongs === "noresults" ? [] : displaySongs;
    const newDisplaySongs = displayedSongs.map(song =>
      song.id === trackId ? { ...song, favorite: !song.favorite } : song
    );
    setDisplaySongs(newDisplaySongs.length > 0 ? newDisplaySongs : "noresults");
  };

  const handleArtistPress = (artistName) => {
    router.push({
      pathname: "/artist/[name]",
      params: { name: artistName }
    });
  };

  const renderSongItem = ({ item }) => (
    <PlaylistItem
      id={item.id}
      name={item.name}
      artist={item.artist}
      duration={item.duration}
      favorite={item.favorite}
      onPlay={() => handlePlay(item.id)}
      onToggleFavorite={() => handleToggleFavorite(item.id)}
      onArtistPress={() => handleArtistPress(item.artist)}
    />
  );

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={handleCategoryPress}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar Section */}
      <View style={styles.searchBarSection}>
        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#aaa"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBarInput}
            placeholder="Search songs or artists..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={handleSearch}
            selectionColor="#f05a28"
          />
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Display Area */}
      <FlatList
        key={displaySongs.length > 0 && displaySongs !== "noresults" ? 'one-column' : 'two-column'}
        data={displaySongs.length > 0 && displaySongs !== "noresults" ? displaySongs : categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={displaySongs.length > 0 && displaySongs !== "noresults" ? renderSongItem : renderCategoryItem}
        numColumns={displaySongs.length > 0 && displaySongs !== "noresults" ? 1 : 2}
        contentContainerStyle={styles.displayContainer}
        ListEmptyComponent={
          displaySongs === "noresults" && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                Sorry, there are no relevant results...
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  searchBarSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 2,
    borderColor: "#f05a28",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    backgroundColor: "transparent",
  },
  cancelButton: {
    marginLeft: 10,
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#f05a28",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    elevation: 3,
  },
  categoryImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    padding: 10,
  },
  displayContainer: {
    paddingBottom: 20,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: "#888",
  },
});

export default SearchScreen;
