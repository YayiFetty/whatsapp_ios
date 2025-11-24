import ChatRow from "@/src/components/ChatRow";
import { defaultStyles } from "@/src/constants/Styles";
import chats from "@/src/data/chats.json";
import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { vs } from "react-native-size-matters";
export default function Chats() {
  const { bottom } = useSafeAreaInsets();
  const renderItems = ({ item }: any) => {
    return <ChatRow {...item} />;
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: bottom }}
    >
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: vs(30) }]} />
        )}
        renderItem={renderItems}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
