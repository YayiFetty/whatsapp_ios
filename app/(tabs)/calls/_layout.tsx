import Colors from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function CallsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Calls",
          headerLargeTitle: false,
          headerBlurEffect: "regular",
          headerLargeTitleShadowVisible: false,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.background },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="call-outline" size={30} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
