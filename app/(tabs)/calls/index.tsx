import Colors from "@/src/constants/Colors";
import calls from "@/src/data/calls.json";
import { Stack } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Calls() {
  const [isEditing, setIsEditing] = React.useState(false);

  const onEdit = () => {
    let editingNew = !isEditing;
    setIsEditing(editingNew);
  };

  const call = React.useMemo(() => JSON.parse(JSON.stringify(calls)), []);

  const renderItems = ({ item }: { item: (typeof call)[0] }) => {
    return (
      <View>
        <Text>{item.name}</Text>
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
        <FlatList
          data={calls}
          renderItem={renderItems}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
