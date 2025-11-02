import Colors from "@/src/constants/Colors";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import { CheckBackup } from "../../src/utils/backUpChecker";
export default function RestoreBackUp() {
  const [backupExists, setBackUpExists] = useState(null);
  const router = useRouter();
  const fecthBackUp = async () => {
    const exists = await CheckBackup();
    setBackUpExists(exists);
  };
  useEffect(() => {
    fecthBackUp();
  }, []);

  const handleRestore = () => {
    if (backupExists) console.log("Restore tapped");
  };

  const handleSkip = () => {
    console.log("Skip tapped");
    router.push("/(auth)/profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Restore from iCloud",
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={handleRestore}>
              <Text style={styles.headerButton}>Restore</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Restore Chat History</Text>
        <Text style={styles.description}>
          WhatsApp has detected an iCloud backup. Would you like to restore your
          chat history?
        </Text>
        {backupExists === null ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.green} />
            <Text style={styles.description}>Checking for backup...</Text>
          </View>
        ) : backupExists ? (
          <Text style={styles.description}>
            WhatsApp backup detected. You can restore your chat history.
          </Text>
        ) : (
          <Text style={styles.description}>No backup found.</Text>
        )}
        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
          <Text style={styles.restoreButtonText}>Restore Chat History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip Restore</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: s(20),
  },
  headerButton: {
    fontSize: 17,
    color: Colors.gray,
    marginRight: 15,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
    marginBottom: 30,
  },
  loadingContainer: { alignItems: "center", marginBottom: 30 },
  restoreButton: {
    backgroundColor: Colors.green,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
  },
  restoreButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  skipButtonText: {
    color: Colors.gray,
    fontSize: 17,
  },
});
