import Colors from "@/src/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ms } from "react-native-size-matters";
export default function VerifyLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="[phone]"
        options={{
          headerTitle: "Verify your phone number",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.background },
          headerTitleStyle: { fontWeight: "600", fontSize: 16 },

          // ✅ Header Left "< Edit" button
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: ms(15),
              }}
            >
              <MaterialIcons name="arrow-back-ios" size={14} color="black" />
              <Text
                style={{
                  color: Colors.primary,
                  fontSize: 17,
                  fontWeight: "500",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
