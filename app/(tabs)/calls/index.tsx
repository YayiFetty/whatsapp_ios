import AppleStyleSwipeableRow from "@/src/components/AppleSwipeRow";
import { SegmentedControl } from "@/src/components/SegmentControl";
import Colors from "@/src/constants/Colors";
import { defaultStyles } from "@/src/constants/Styles";
import calls from "@/src/data/calls.json";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { format } from "date-fns";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";

const options = ["All", "Missed"];

export default function Calls() {
  const call = React.useMemo(() => JSON.parse(JSON.stringify(calls)), []);

  const [isEditing, setIsEditing] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [items, setItems] = useState(call);
  const onEdit = () => {
    let editingNew = !isEditing;
    setIsEditing(editingNew);
  };
  const tabBarHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  const transition = CurvedTransition.delay(100);
  useEffect(() => {
    if (selectedOption === "All") {
      setItems(call);
    } else {
      setItems(call.filter((item) => item.missed));
    }
  }, [selectedOption]);
  const renderItems = ({ item, index }: { item: (typeof call)[0] }) => {
    return (
      <AppleStyleSwipeableRow onDelete={() => removeCall(item)}>
        <Animated.View
          entering={FadeInUp.delay(index * 10)}
          exiting={FadeOutUp}
        >
          <View style={defaultStyles.item}>
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
          </View>
        </Animated.View>
      </AppleStyleSwipeableRow>
    );
  };

  const removeCall = (item: any) => {
    setItems(items.filter((i) => i.id !== item.id));
  };
  return (
    <GestureHandlerRootView>
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
            skipEnteringExitingAnimations
            itemLayoutAnimation={transition}
            renderItem={renderItems}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
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
