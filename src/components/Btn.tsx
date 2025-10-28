import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { ms, vs } from "react-native-size-matters";
import Colors from "../constants/Colors";

type BtnProps = {
  title: string;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabledColor?: string;
  disabledTextColor?: string;
};

export default function Btn({
  title,
  disabled = false,
  onPress,
  style,
  textStyle,
  disabledColor = Colors.gray,
  disabledTextColor = "#807c7cff",
}: BtnProps) {
  const slideAnim = useRef(new Animated.Value(disabled ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: disabled ? 0 : 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [disabled]);

  // Calculate the percentage of blue color sliding from left to right
  const blueWidth = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "150%"],
  });

  const textColor = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [disabledTextColor, "#ffffff"],
  });

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.btn, { backgroundColor: disabledColor }, style]}
    >
      {/* Blue sliding overlay */}
      <Animated.View
        style={[
          styles.blueOverlay,
          {
            width: blueWidth,
          },
        ]}
      />

      <Animated.Text style={[styles.btnText, { color: textColor }, textStyle]}>
        {title}
      </Animated.Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: vs(12),
    paddingHorizontal: ms(25),
    borderRadius: ms(8),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  blueOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#0a84ff",
    borderRadius: ms(8),
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    zIndex: 1,
  },
});
