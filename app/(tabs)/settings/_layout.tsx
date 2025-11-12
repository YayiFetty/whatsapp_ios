import Colors from "@/src/constants/Colors";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.background },
        headerTintColor: "#464343ff",
        headerTitleStyle: { fontWeight: "bold" },
        headerShadowVisible: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerLargeTitle: true,
          headerLargeTitleShadowVisible: false,
          headerBlurEffect: "regular",
          headerSearchBarOptions: {
            placeholder: "Search Settings",
          },
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Stack>
  );
}
