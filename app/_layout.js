import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { TracksProvider } from "./context/TrackProvider";

// NativeWindStyleSheet.setOutput({
//   default: "native",
// });

export default function Layout() {
  return (
    <TracksProvider>
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
            <Stack.Screen
              name="screens/ForgetPasswordScreen"
              options={{ title: "Reset Password", headerShown: false }}
            />
            <Stack.Screen
              name="screens/RegisterScreen"
              options={{ title: "Register Account", headerShown: false }}
            />
            <Stack.Screen name="[tabs]" options={{ headerShown: false }} />

            <Stack.Screen
              name="artist/[name]"
              options={{
                headerShown: true,
                headerTitle: "",
                headerBackTitle: "",
              }}
            />
            <Stack.Screen
              name="screens/MusicScreen"
              options={{
                headerShown: true,
                headerTitle: "Now Playing",
                headerBackTitle: "",
              }}
            />
          </Stack>
    </TracksProvider>
  );
}
