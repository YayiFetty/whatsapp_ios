import Colors from "@/src/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Settings",
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
        }}
      />
    </Stack>
  );
}
