import BoxedIcon from "@/src/components/BoxedIcon";
import Colors from "@/src/constants/Colors";
import imagePath from "@/src/constants/imagePath";
import { avatar, devices, items, support } from "@/src/constants/settingsData";
import { handleLogout } from "@/src/services/authService";
import { Feather } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { s, vs } from "react-native-size-matters";

export default function Settings() {
  const router = useRouter();

  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes", onPress: handleLogout },
      ],
      { cancelable: true }
    );
  };

  const handleNavigation = (route: string, itemName: string) => {
    console.log(`Navigating to ${route} - ${itemName}`);
    router.push(route as any);
  };

  const handleProfilePress = () => {
    router.push("/(tabs)/settings/profile");
  };

  // Combine all sections into a single FlatList data array
  const sections = [
    { id: "profile", type: "profile" },
    { id: "avatar", type: "section", title: "Profile", data: avatar },
    { id: "devices", type: "section", title: "Devices", data: devices },
    { id: "items", type: "section", title: "Settings", data: items },
    { id: "support", type: "section", title: "Support", data: support },
    { id: "logout", type: "logout" },
  ];

  const renderItem = ({ item }: any) => {
    // Profile Header Section
    if (item.type === "profile") {
      return (
        <View style={styles.section}>
          <View style={styles.profileSection}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={handleProfilePress}
              activeOpacity={0.7}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image source={imagePath.icon} style={styles.avatar} />
                <View style={styles.profileInfo}>
                  <Text style={styles.username}>YayiFetty</Text>
                  <Text style={styles.caption}>Caption</Text>
                </View>
              </View>
              <AntDesign name="qrcode" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginHorizontal: 10 }}>
              <Feather name="plus-circle" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    // Regular Section (Profile, Devices, Settings, Support)
    if (item.type === "section") {
      return (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{item.title}</Text>
          <View style={styles.itemsContainer}>
            {item.data?.map((subItem: any, subIndex: number) => (
              <View key={subIndex}>
                <BoxedIcon
                  name={subItem.icon}
                  text={subItem.name}
                  backgroundColor={subItem.backgroundColor}
                  onPress={() => {
                    const route =
                      subItem.route ||
                      `/(tabs)/settings/${subItem.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`;
                    handleNavigation(route, subItem.name);
                  }}
                />
                {/* Add hairline separator between items */}
                {subIndex < item.data.length - 1 && (
                  <View style={styles.hairline} />
                )}
              </View>
            ))}
          </View>
        </View>
      );
    }

    // Logout Button
    if (item.type === "logout") {
      return (
        <TouchableOpacity style={styles.logoutBtn} onPress={confirmLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      );
    }

    return null;
  };

  return (
    <FlatList
      style={styles.container}
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustContentInsets={true}
      bounces={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: s(15),
    paddingBottom: vs(60),
  },
  // ---------- Profile Card ----------
  profileSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: vs(10),
    overflow: "hidden",
    borderRadius: s(5),

    elevation: 1, // Android subtle shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  avatar: {
    width: s(55),
    height: s(55),
    borderRadius: s(27.5),
    marginRight: s(12),
  },
  profileInfo: {
    justifyContent: "center",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    color: Colors.black,
    opacity: 0.6,
  },
  // ---------- Section ----------
  section: {
    marginBottom: vs(5),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray,
    paddingVertical: s(10),
    paddingHorizontal: s(5),
  },
  itemsContainer: {
    backgroundColor: "#fff",
    borderRadius: s(5),
    overflow: "hidden",
    gap: s(10),
    paddingHorizontal: s(10),
    paddingVertical: vs(10),
  },
  hairline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e0e0e0",
    marginLeft: s(60),
  },
  // ---------- Logout ----------
  logoutBtn: {
    backgroundColor: Colors.gray,
    paddingVertical: vs(15),
    borderRadius: s(10),
    alignItems: "center",
    marginTop: vs(10),
    marginBottom: vs(60),
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
