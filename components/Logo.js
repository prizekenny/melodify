import { View, Text, Image } from "react-native";
import React from "react";
import { APP_NAME } from "../config/constants";
import { useFonts } from "expo-font";

const Logo = ({
  imageSize = 50,
  fontSize = 24,
  color = "#FF914D",
  spacing = 2,
}) => {
  const [fontsLoaded] = useFonts({
    FredokaOne: require("../assets/fonts/FredokaOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>"FredokaOne font loads failed!</Text>;
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          width: imageSize - 20, // 调整容器宽度以去除空白
          height: imageSize,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/icon.png")}
          style={{
            width: imageSize * 1.5,
            height: imageSize,
            resizeMode: "cover",
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: "FredokaOne",
          fontSize: fontSize,
          color: color,
          marginLeft: spacing,
        }}
      >
        {APP_NAME}
      </Text>
    </View>
  );
};

export default Logo;
