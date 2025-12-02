import { format } from "date-fns";
import { Link } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import AppleSwipeRow from "./AppleSwipeRow";

interface RootObject {
  id: string;
  from: string;
  date: string;
  img: string;
  msg: string;
  read: boolean;
  unreadCount: number;
}
export default function ChatRow({
  id,
  from,
  date,
  img,
  msg,
  read,
  unreadCount,
}: RootObject) {
  return (
    <AppleSwipeRow>
      <Link href="/(modals)/new-chat" asChild>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={Colors.lightGray}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 15,
              paddingLeft: 15,
              paddingVertical: 15,
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: img }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{from}</Text>
              <Text style={{ fontSize: 16, color: Colors.gray }}>
                {msg.length > 40 ? `${msg.substring(0, 40)}...` : msg}
              </Text>
            </View>
            <Text
              style={{
                color: Colors.gray,
                paddingRight: 20,
                alignSelf: "flex-start",
              }}
            >
              {format(date, "MM.dd.yy")}
            </Text>
          </View>
        </TouchableHighlight>
      </Link>
    </AppleSwipeRow>
  );
}

const styles = StyleSheet.create({});
