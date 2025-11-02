import Colors from "@/src/constants/Colors";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const handleDone = () => {
    console.log("Done");
    router.replace("/(tabs)/chats");
  };
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          title: "Restore from iCloud",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={handleDone}>
              <Text style={styles.headerButton}>Done</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    fontSize: 17,
    color: Colors.gray,
    marginRight: 15,
  },
});
