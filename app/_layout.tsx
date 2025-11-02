// app/_layout.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { Redirect, SplashScreen, Stack, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const segments = useSegments();

  useEffect(() => {
    async function loadResources() {
      try {
        // Load custom fonts
        await Font.loadAsync({
          helv: require("../src/assets/fonts/helmed.ttf"),
        });

        // Check authentication (replace with your logic)
        const token = await AsyncStorage.getItem("userToken");
        setAuthenticated(!!token);
      } catch (e) {
        console.warn("Error loading resources:", e);
      } finally {
        setReady(true);
        await SplashScreen.hideAsync();
      }
    }

    loadResources();
  }, []);

  // While fonts and auth are loading
  if (!ready || authenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const inAuthGroup = segments[0] === "(auth)";

  if (authenticated && inAuthGroup) {
    return <Redirect href="/(tabs)/chats" />;
  }

  if (!authenticated && !inAuthGroup) {
    return <Redirect href="/(auth)/input_number" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

const RootLayout = () => {
  return <InitialLayout />;
};

export default RootLayout;
