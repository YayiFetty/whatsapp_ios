import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { s } from "react-native-size-matters";
import Colors from "../constants/Colors";

export type BoxedIconProps = {
  name: any;
  text: string;
  backgroundColor: string;
  onPress: () => void;
};
export default function BoxedIcon({
  backgroundColor,
  name,
  onPress,
  text,
}: BoxedIconProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.iconAvatar}>
        <View style={{ backgroundColor, borderRadius: 6, padding: 6 }}>
          <Ionicons name={name} size={22} color="#fff" />
        </View>
        <Text style={styles.avatarText}>{text}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconAvatar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  avatarText: {
    fontSize: s(14),
    fontWeight: "bold",
  },
});
