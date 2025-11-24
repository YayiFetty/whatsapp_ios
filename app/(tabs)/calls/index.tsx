import { MoreModal } from "@/src/components/MoreModal";
import { SegmentedControl } from "@/src/components/SegmentControl";
import SwipeableRow from "@/src/components/SwipeableRow";
import Colors from "@/src/constants/Colors";
import { defaultStyles } from "@/src/constants/Styles";
import calls from "@/src/data/calls.json";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { format } from "date-fns";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";

const options = ["All", "Missed"];

export default function Calls() {
  const callData = useMemo(() => JSON.parse(JSON.stringify(calls)), []);

  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [items, setItems] = useState(callData);

  const [moreModalVisible, setMoreModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof callData)[0] | null>(
    null
  );

  const { bottom } = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const transition = CurvedTransition.delay(100);
  const editing = useSharedValue(-30);

  const AnimatedtouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  const onEdit = () => {
    let editinNew = !isEditing;
    editing.value = editinNew ? 0 : -30;
    setIsEditing(editinNew);
  };

  useEffect(() => {
    if (selectedOption === "All") {
      setItems(callData);
    } else {
      setItems(callData.filter((item: any) => item.missed));
    }
  }, [selectedOption]);

  const onDelete = (item: any) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const onArchive = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log("Archived:", item.name);
  };

  const onPin = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log("Pinned:", item.name);
  };

  const onMore = (item: (typeof callData)[0]) => {
    setSelectedItem(item);
    setMoreModalVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(editing.value, { duration: 200 }) }],
  }));

  const animatedIconStyles = useAnimatedStyle(() => ({
    opacity: withTiming(editing.value === 0 ? 1 : 0, { duration: 200 }),
    transform: [{ translateX: withTiming(editing.value, { duration: 200 }) }],
  }));

  const removeCall = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems((prev) => prev.filter((i: any) => i.id !== item.id));
  };

  const renderItems = ({
    item,
    index,
  }: {
    item: (typeof callData)[0];
    index: number;
  }) => {
    return (
      <SwipeableRow
        onDelete={() => onDelete(item)}
        onArchive={() => onArchive(item)}
        onPin={() => onPin(item)}
        onMore={() => onMore(item)}
      >
        <Animated.View
          entering={FadeInUp.delay(index * 10)}
          exiting={FadeOutUp}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ width: 34, alignItems: "center" }}>
            {isEditing && (
              <AnimatedtouchableOpacity
                onPress={() => removeCall(item)}
                style={[animatedIconStyles]}
              >
                <Ionicons name="remove-circle" size={24} color={Colors.red} />
              </AnimatedtouchableOpacity>
            )}
          </View>
          <Animated.View
            style={[defaultStyles.item, animatedRowStyles, { flex: 1 }]}
          >
            <TouchableOpacity>
              <Image source={{ uri: item.img }} style={styles.avatar} />
            </TouchableOpacity>

            <View style={{ flex: 1, gap: 2 }}>
              <Text
                style={{
                  fontSize: 18,
                  color: item.missed ? Colors.red : "#000",
                }}
              >
                {item.name}
              </Text>

              <View style={{ flexDirection: "row", gap: 4 }}>
                <Ionicons
                  name={item.video ? "videocam" : "call"}
                  size={16}
                  color={Colors.gray}
                />
                <Text style={{ color: Colors.gray, flex: 1 }}>
                  {item.incoming ? "Incoming" : "Outgoing"}
                </Text>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
            >
              <Text style={{ color: Colors.gray }}>
                {format(item.date, "MM.dd.yy")}
              </Text>

              <Ionicons
                name="information-circle-outline"
                size={24}
                color={Colors.primary}
              />
            </View>
          </Animated.View>
        </Animated.View>
      </SwipeableRow>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <Stack.Screen
          options={{
            headerLeft: () => (
              <TouchableOpacity onPress={onEdit} style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 20, color: Colors.primary }}>
                  {isEditing ? "Done" : "Edit"}
                </Text>
              </TouchableOpacity>
            ),
            headerTitle: () => (
              <SegmentedControl
                options={options}
                selectedOption={selectedOption}
                onOptionPress={setSelectedOption}
              />
            ),
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: Colors.background },
          }}
        />

        <Animated.View
          style={[
            defaultStyles.block,
            { marginBottom: bottom + tabBarHeight + 10 },
          ]}
          layout={transition}
        >
          <Animated.FlatList
            data={items}
            renderItem={renderItems}
            skipEnteringExitingAnimations
            itemLayoutAnimation={transition}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>

        {/* MORE MODAL */}
        <MoreModal
          visible={moreModalVisible}
          item={selectedItem}
          onClose={() => setMoreModalVisible(false)}
          onBlock={(item: any) => console.log("Blocked", item.name)}
          onReport={(item: any) => console.log("Reported", item.name)}
          onFavourite={(item: any) => console.log("Favourited", item.name)}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: s(40),
    height: s(40),
    borderRadius: 100,
  },
});
