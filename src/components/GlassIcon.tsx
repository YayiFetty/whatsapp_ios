import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";

interface GlassIconProps {
  name: keyof typeof MaterialIcons.glyphMap;
  focused: boolean;
  badge?: number;
}

const GlassIcon: React.FC<GlassIconProps> = ({ name, focused, badge }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const badgeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1.2 : 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: focused ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  useEffect(() => {
    if (badge) {
      Animated.spring(badgeAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  }, [badge]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      {/* Background glow effect for focused state */}
      {focused && (
        <Animated.View
          style={[
            styles.glow,
            {
              opacity: opacityAnim,
            },
          ]}
        />
      )}

      <BlurView
        intensity={focused ? 80 : 50}
        tint={focused ? "dark" : "light"}
        style={[styles.glass, focused && styles.glassFocused]}
      >
        <MaterialIcons
          name={name}
          size={28}
          color={focused ? "#25D366" : "rgba(255,255,255,0.7)"}
        />
      </BlurView>

      {/* Badge indicator */}
      {badge && badge > 0 && (
        <Animated.View
          style={[
            styles.badge,
            {
              transform: [{ scale: badgeAnim }],
            },
          ]}
        >
          <View style={styles.badgeInner}>
            <Animated.Text style={styles.badgeText}>
              {badge > 99 ? "99+" : badge}
            </Animated.Text>
          </View>
        </Animated.View>
      )}

      {/* Active indicator dot */}
      {focused && (
        <Animated.View
          style={[
            styles.activeDot,
            {
              opacity: opacityAnim,
            },
          ]}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  glow: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#25D366",
    opacity: 0.2,
  },
  glass: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  glassFocused: {
    borderColor: "rgba(37, 211, 102, 0.5)",
    borderWidth: 2,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  badgeInner: {
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  activeDot: {
    position: "absolute",
    bottom: -8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#25D366",
  },
});

export default GlassIcon;
