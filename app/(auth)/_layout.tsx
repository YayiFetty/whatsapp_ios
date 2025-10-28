import Colors from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="input_number"
        options={{
          headerTitle: "Enter your phone number",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            fontWeight: "600",
            fontSize: 20,
          },

          headerRight: () => (
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="dots-horizontal-circle-outline"
                size={30}
                color="blue"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="verify_otp" options={{ headerShown: false }} />
    </Stack>
  );
}
