import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Logo from "../../components/Logo";
import { useRouter } from "expo-router";

const LoadingScreen = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/screens/LoginScreen");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
      <Logo imageSize={100} fontSize={40} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center", // vertical align center
    alignItems: "center", // vertical align center
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
};

export default LoadingScreen;
