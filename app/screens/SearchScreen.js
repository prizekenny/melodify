import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the search icon

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "1", name: "The Best of 2024", image: "https://picsum.photos/200" },
    { id: "2", name: "Holiday", image: "https://picsum.photos/id/15/200" },
    { id: "3", name: "Hip-Hop/Rap", image: "https://picsum.photos/id/20/200" },
    { id: "4", name: "Chill", image: "https://picsum.photos/id/38/200" },
    { id: "5", name: "Relaxing", image: "https://picsum.photos/id/42/200" },
    { id: "6", name: "Top Hits", image: "https://picsum.photos/id/57/200" },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancel = () => {
    setSearchQuery(""); // Clear the search input
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
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
            placeholder="What Do You Want To Play?"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
            selectionColor="#f05a28" // Set the cursor color to orange
          />
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Browser Categories</Text>
      </View>

      {/* Categories Section */}
      <View style={styles.categorySection}>
        {filteredCategories.length > 0 ? (
          <FlatList
            data={filteredCategories}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            numColumns={2}
            contentContainerStyle={styles.categoriesContainer}
            columnWrapperStyle={styles.row}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>
              Sorry, there is no relevant result...
            </Text>
          </View>
        )}
      </View>
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
    marginBottom: 20, // Add spacing between sections
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderWidth: 2,
    borderColor: "#f05a28", // Orange outline
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50, // Ensure consistent height
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
    outlineColor: "transparent", 
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  categorySection: {
    flex: 1,
  },
  categoriesContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    elevation: 3, // Shadow for Android
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
