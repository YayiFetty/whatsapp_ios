import BoxedIcon from "@/src/components/BoxedIcon";
import Colors from "@/src/constants/Colors";
import imagePath from "@/src/constants/imagePath";
import { avatar, devices, items, support } from "@/src/constants/settingsData";
import { handleLogout } from "@/src/services/authService";
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

  // Navigation handlers for each section
  const handleNavigation = (route: string, itemName: string) => {
    console.log(`Navigating to ${route} - ${itemName}`);
    router.push(route as any);
  };

  // Specific handlers for profile actions
  const handleProfilePress = () => {
    router.push("/profile" as any);
  };

  const handleQRCodePress = () => {
    router.push("/qr-code" as any);
  };

  // Combine all sections into a single data array for FlatList
  const sections = [
    { id: "profile", type: "profile" },
    { id: "avatar", type: "section", title: "Profile", data: avatar },
    { id: "devices", type: "section", title: "Devices", data: devices },
    { id: "items", type: "section", title: "Settings", data: items },
    { id: "support", type: "section", title: "Support", data: support },
    { id: "logout", type: "logout" },
  ];

  const renderItem = ({ item }: any) => {
    // Render Profile Header
    if (item.type === "profile") {
      return (
        <TouchableOpacity
          style={styles.profileSection}
          onPress={handleProfilePress}
          activeOpacity={0.7}
        >
          <Image source={imagePath.icon} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.username}>YayiFetty</Text>
            <Text style={styles.caption}>Caption</Text>
          </View>
          <TouchableOpacity onPress={handleQRCodePress} activeOpacity={0.7}>
            <AntDesign name="qrcode" size={24} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }

    // Render Section with Items
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
                    // Handle navigation based on item name or route
                    const route =
                      subItem.route ||
                      `/${subItem.name.toLowerCase().replace(/\s+/g, "-")}`;
                    handleNavigation(route, subItem.name);
                  }}
                />
                {/* Add hairline separator between items, but not after the last one */}
                {subIndex < item.data.length - 1 && (
                  <View style={styles.hairline} />
                )}
              </View>
            ))}
          </View>
        </View>
      );
    }

    // Render Logout Button
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
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: s(15),
    paddingBottom: vs(50),
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray,
    paddingVertical: vs(15),
    paddingHorizontal: s(15),
    borderRadius: s(10),
    marginBottom: vs(20),
  },
  avatar: {
    width: s(60),
    height: s(60),
    borderRadius: s(30),
    marginRight: s(15),
  },
  profileInfo: {
    flex: 1,
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
  section: {
    marginBottom: vs(20),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.gray,
    marginBottom: vs(10),
    paddingHorizontal: s(5),
  },
  itemsContainer: {
    backgroundColor: "#fff",
    gap: s(10),
    padding: s(10),
    overflow: "hidden",
    borderRadius: s(5),
  },
  hairline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e0e0e0",
    marginLeft: s(60), // Indent to align with text, not icon
  },
  logoutBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: vs(15),
    borderRadius: s(10),
    alignItems: "center",
    marginTop: vs(10),
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
