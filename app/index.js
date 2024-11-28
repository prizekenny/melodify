import { StyleSheet, Text, View, Button } from "react-native";
import LoadingScreen from "./screens/LoadingScreen";
import { NativeWindStyleSheet } from "nativewind";
import Constants from "expo-constants";

export default function Page() {
  // Without this line, only one tag in className will be output
  NativeWindStyleSheet.setOutput({ default: "native" });
  return (
    <View className="flex-1">
      <LoadingScreen />
    </View>
  );
}
