import { Ionicons } from "@expo/vector-icons";
import React, { Component, PropsWithChildren } from "react";
import { I18nManager, StyleSheet, Text, View } from "react-native";

import { RectButton } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import Animated, { SharedValue, interpolate } from "react-native-reanimated";
import Colors from "../constants/Colors";

type SwipeableRowProps = {
  children: React.ReactNode;
  onDelete: () => void;
};

export default class AppleSwipeRow extends Component<
  PropsWithChildren<unknown>
> {
  // ✅ Ref to swipeable, 'any' because instance type is not exported
  private swipeableRow = React.createRef<any>();

  // Right action button
  private renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: SharedValue<number>
  ) => {
    const trans = interpolate(progress.value, [0, 1], [x, 0], "clamp");

    const pressHandler = () => {
      this.close();
      window.alert(text);
      this.props.onDelete();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Ionicons
            name={text === "More" ? "ellipsis-horizontal" : "archive"}
            size={24}
            color={"#fff"}
            style={{ paddingTop: 10 }}
          />
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  // Render all right actions
  private renderRightActions = (
    progress: SharedValue<number>,
    translation: SharedValue<number>,
    _methods: any
  ) => (
    <View
      style={{
        width: 192,
        flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      }}
    >
      {this.renderRightAction("More", "#C8C7CD", 192, progress)}
      {this.renderRightAction("Archive", Colors.muted, 128, progress)}
    </View>
  );

  // Close swipeable row
  private close = () => {
    this.swipeableRow.current?.close?.();
  };

  render() {
    return (
      <ReanimatedSwipeable
        ref={this.swipeableRow}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
        onSwipeableOpen={(direction) => {
          console.log(`Opening swipeable from the ${direction}`);
        }}
        onSwipeableClose={(direction) => {
          console.log(`Closing swipeable to the ${direction}`);
        }}
      >
        {this.props.children}
      </ReanimatedSwipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
