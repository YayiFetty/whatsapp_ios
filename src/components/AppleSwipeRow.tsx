import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { ReactNode, useRef } from "react";
import { Alert, Animated, StyleSheet, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";

export type SwipeableProps = {
  children: ReactNode;
  onDelete: () => void;
  onArchive?: () => void;
  onPin?: () => void;
  onMore?: () => void;
};

export default function AppleSwipeRow({
  children,
  onDelete,
  onArchive,
  onPin,
  onMore,
}: SwipeableProps) {
  const ref = useRef<Swipeable>(null);

  const close = () => ref.current?.close();

  /** --- HAPTIC FEEDBACK --- */
  const triggerHaptics = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  /** --- DELETE CONFIRMATION --- */
  const handleDelete = () => {
    Alert.alert("Delete Item", "Are you sure you want to delete this call?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          triggerHaptics();
          onDelete();
        },
      },
    ]);
  };

  /** --- RIGHT ACTIONS: MORE + DELETE --- */
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
    });

    return (
      <View style={{ width: 160, flexDirection: "row" }}>
        {/* MORE */}
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <RectButton
            style={[styles.rightAction, { backgroundColor: "#C8C7CC" }]}
            onPress={() => {
              close();
              triggerHaptics();
              onMore?.();
            }}
          >
            <Ionicons name="ellipsis-horizontal" size={22} color="white" />
            <Text style={styles.actionText}>More</Text>
          </RectButton>
        </Animated.View>

        {/* DELETE */}
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <RectButton
            style={[styles.leftAction, { backgroundColor: "#497AFC" }]}
            onPress={() => {
              close();
              triggerHaptics();
              onArchive?.();
            }}
          >
            <Animated.View style={{ transform: [{ translateX: trans }] }}>
              <Ionicons name="archive" size={22} color="white" />
              <Text style={styles.actionText}>Archive</Text>
            </Animated.View>
          </RectButton>
        </Animated.View>
        {/* PIN */}
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <RectButton
            style={[styles.leftAction, { backgroundColor: "#ffb300" }]}
            onPress={() => {
              close();
              triggerHaptics();
              onPin?.();
            }}
          >
            <Animated.View style={{ transform: [{ translateX: trans }] }}>
              <Ionicons name="pin" size={22} color="white" />
              <Text style={styles.actionText}>Pin</Text>
            </Animated.View>
          </RectButton>
        </Animated.View>
      </View>
    );
  };

  return (
    <Swipeable
      ref={ref}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      overshootLeft={false}
      overshootRight={false}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rightAction: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
});
