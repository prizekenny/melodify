import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      initialRouteName="screens/LoadingScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="screens/LoadingScreen"
        options={{ title: "Loading", headerShown: false }}
      />
      <Stack.Screen
        name="screens/LoginScreen"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen name="[tabs]" options={{ headerShown: false }} />
    </Stack>
  );
}
