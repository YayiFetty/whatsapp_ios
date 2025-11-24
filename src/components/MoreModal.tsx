import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { SlideInUp, SlideOutDown } from "react-native-reanimated";

export type MoreModalProps = {
  visible: boolean;
  item: { name: string; img: string } | null;
  onClose: () => void;
  onBlock?: (item: { name: string; img: string }) => void;
  onReport?: (item: { name: string; img: string }) => void;
  onFavourite?: (item: { name: string; img: string }) => void;
};

export const MoreModal: React.FC<MoreModalProps> = ({
  visible,
  item,
  onClose,
  onBlock,
  onReport,
  onFavourite,
}) => {
  if (!item) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "flex-end",
        }}
        onPress={onClose}
      >
        <Animated.View
          entering={SlideInUp}
          exiting={SlideOutDown}
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {/* Profile Row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Image
              source={{ uri: item.img }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 12,
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: "600" }}>{item.name}</Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                onBlock?.(item);
                onClose();
              }}
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="ban" size={28} color="#dd2c00" />
              <Text style={{ textAlign: "center", marginTop: 4 }}>Block</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onReport?.(item);
                onClose();
              }}
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="alert-circle" size={28} color="#ff9500" />
              <Text style={{ textAlign: "center", marginTop: 4 }}>Report</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                onFavourite?.(item);
                onClose();
              }}
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="heart" size={28} color="#ff2d55" />
              <Text style={{ textAlign: "center", marginTop: 4 }}>
                Favourite
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};
