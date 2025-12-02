import ChatRow from "@/src/components/ChatRow";
import { defaultStyles } from "@/src/constants/Styles";
import chats from "@/src/data/chats.json";
import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
export default function Chats() {
  const { bottom } = useSafeAreaInsets();
  const renderItems = ({ item }: any) => {
    return <ChatRow {...item} />;
  };
  return (
    <GestureHandlerRootView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingBottom: bottom,
          backgroundColor: "#fff",
        }}
      >
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => (
            <View style={[defaultStyles.separator, { marginLeft: vs(20) }]} />
          )}
          renderItem={renderItems}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
