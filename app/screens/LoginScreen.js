import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/[tabs]");
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text>Login Page</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
