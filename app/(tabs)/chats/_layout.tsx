import Colors from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";

export default function SettingsLayout() {
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Chats",
          headerLargeTitle: true,
          headerBlurEffect: "regular",
          headerLargeTitleShadowVisible: false,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text>{isEditing ? "Done" : "Edit"}</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons name="call-outline" color={Colors.primary} size={20} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
