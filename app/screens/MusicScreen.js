import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { useTracks } from "../context/TrackProvider";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const MusicScreen = () => {
  const {
    playingTrack,
    updateTrack,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    playMode,
    setPlayMode,
    playNextTrack,
    playPreviousTrack,
  } = useTracks();

  const router = useRouter();

  // Simulate playback using an interval
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const nextTime = prev + 1;
          if (nextTime >= playingTrack.duration / 1000) {
            playNextTrack();
            return 0;
          }
          return nextTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playingTrack, currentTime]);

  // Toggle play/pause
  const togglePlayPause = () => setIsPlaying(!isPlaying);

  // Toggle play mode
  const togglePlayMode = () =>
    setPlayMode((prevMode) => (prevMode === "order" ? "shuffle" : "order"));

  // Format time (milliseconds) into mm:ss
  const formatTime = (timeInMs) => {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View className="flex-1 p-4 mt-14">
      {/* Navigation Bar */}
      <View className="flex-row items-center justify-between py-4 px-4 shadow-sm">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Now Playing</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Album Cover */}
      <View
        className="items-center justify-center mt-16 mb-6"
        style={{ height: "40%" }}
      >
        <Image
          source={{ uri: playingTrack.cover }}
          className="w-96 h-96 mb-4 rounded-xl"
        />
      </View>

      {/* Song Info */}
      <View className="flex-row justify-between items-center mt-4 px-4">
        <View>
          <Text className="text-textPrimary text-xl font-bold">
            {playingTrack.name}
          </Text>
          <Text className="text-textSecondary">{playingTrack.artist}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            updateTrack(playingTrack.id, { favorite: !playingTrack.favorite })
          }
        >
          <Ionicons
            name={playingTrack.favorite ? "heart" : "heart-outline"}
            size={28}
            color={playingTrack.favorite ? "#E53935" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View className="mt-6 px-4">
        <Slider
          minimumValue={0}
          maximumValue={playingTrack.duration} // Duration in ms
          value={currentTime * 1000} // Convert seconds to ms
          minimumTrackTintColor="#FF914D" // Tailwind primary color
          maximumTrackTintColor="#ccc"
          thumbTintColor="#FF914D" // Tailwind primary color
          onValueChange={(value) => setCurrentTime(value / 1000)} // Convert ms to seconds
        />
        <View className="flex-row justify-between mt-2">
          <Text className="text-textSecondary">
            {formatTime(currentTime * 1000)}
          </Text>
          <Text className="text-textSecondary">
            {formatTime(playingTrack.duration - currentTime * 1000)}
          </Text>
        </View>
      </View>

      {/* Playback Controls */}
      <View className="absolute bottom-0 left-0 right-0 px-4 py-6 mb-14">
        <View className="flex-row justify-between items-center px-5">
          <TouchableOpacity onPress={togglePlayMode}>
            <Ionicons
              name={playMode === "shuffle" ? "shuffle" : "repeat"}
              size={28}
              color="#757575"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playPreviousTrack}>
            <Ionicons name="play-skip-back" size={40} color="#212121" />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={100}
              color="#FF914D" // Tailwind primary color
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={playNextTrack}>
            <Ionicons name="play-skip-forward" size={40} color="#212121" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="book-outline" size={28} color="#212121" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MusicScreen;
