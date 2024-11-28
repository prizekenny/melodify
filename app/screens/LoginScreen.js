import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/[tabs]");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center", // 垂直居中
    alignItems: "center", // 水平居中
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
};

export default LoginScreen;
