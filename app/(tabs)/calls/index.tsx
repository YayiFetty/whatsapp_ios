import Colors from "@/src/constants/Colors";
import { defaultStyles } from "@/src/constants/Styles";
import calls from "@/src/data/calls.json";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { format } from "date-fns";
import { Stack } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";

export default function Calls() {
  const [isEditing, setIsEditing] = React.useState(false);

  const onEdit = () => {
    let editingNew = !isEditing;
    setIsEditing(editingNew);
  };
  const tabBarHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  const call = React.useMemo(() => JSON.parse(JSON.stringify(calls)), []);

  const renderItems = ({ item }: { item: (typeof call)[0] }) => {
    return (
      <View style={defaultStyles.item}>
        <TouchableOpacity>
          <Image source={{ uri: item.img }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{ fontSize: 18, color: item.missed ? Colors.red : "#000" }}
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

        <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
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
    );
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
          }}
        />
        <View
          style={[
            defaultStyles.block,
            { marginBottom: bottom + tabBarHeight + 10 },
          ]}
        >
          <FlatList
            data={call}
            renderItem={renderItems}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
