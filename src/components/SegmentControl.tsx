import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { s, vs } from "react-native-size-matters";
import { Palette } from "../constants/Colors";

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress }) => {
    const internalPadding = s(13);
    const segmentedControlWidth = s(140);

    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(
          itemWidth * options.indexOf(selectedOption) + internalPadding / 2
        ),
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 10,
            paddingLeft: internalPadding / 2,
          },
        ]}
      >
        {/* Render labels first so they're above the highlight */}
        {options.map((option) => (
          <TouchableOpacity
            onPress={() => onOptionPress?.(option)}
            key={option}
            style={[
              {
                width: itemWidth,
              },
              styles.labelContainer,
            ]}
          >
            <Text style={styles.label}>{option}</Text>
          </TouchableOpacity>
        ))}

        {/* Animated highlight box (behind text) */}
        <Animated.View
          style={[
            {
              width: itemWidth,
            },
            rStyle,
            styles.activeBox,
          ]}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: vs(25),
    alignSelf: "center",
    backgroundColor: Palette.baseGray05,
  },
  activeBox: {
    position: "absolute",
    borderRadius: 9,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    elevation: Platform.OS === "android" ? 0 : 3,
    height: vs(20),
    top: "10%",
    backgroundColor: Palette.background,
    zIndex: 0, // ensure it's behind
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // ensure text is above highlight
  },
  label: {
    fontFamily: "SF-Compact-Rounded-Medium",
    fontSize: 16,
    color: "#000",
  },
});

export { SegmentedControl };
