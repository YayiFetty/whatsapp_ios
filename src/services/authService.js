import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

export const handleLogout = async () => {
  try {
    await AsyncStorage.multiRemove(["generatedOtp", "userToken", "userData"]);

    router.replace("/(auth)/input_number");
  } catch (error) {
    console.log("Logout failed:", error);
    Alert.alert("Error", "Failed to logout. Please try again.");
  }
};
