import Colors from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function ChatLayout() {
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
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerLargeTitleShadowVisible: false,
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerSearchBarOptions: {
            placeholder: "Search",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Ionicons name="ellipsis-horizontal-circle-outline" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 30 }}>
              <TouchableOpacity>
                <Ionicons
                  name="camera-outline"
                  color={Colors.primary}
                  size={30}
                />
                <Link href="/" asChild>
                  <TouchableOpacity>
                    <Ionicons
                      name="add-circle"
                      color={Colors.primary}
                      size={30}
                    />
                  </TouchableOpacity>
                </Link>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
